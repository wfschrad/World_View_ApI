//change some funcitonality below???
//change 32b to 64b encoding?

const jwt = require('jsonwebtoken');
const bearerToken = require("express-bearer-token");

const { jwtConfig } = require("../config");
const { secret, expiresIn } = jwtConfig;
const { User } = require("../models");


const restoreUser = (req, res, next) => {
    const { token } = req;
    if (!token) {
        return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
        }
        const { id } = jwtPayload.data;
        try {
            req.user = await User.findByPk(id);
        } catch (e) {
            return next(e);
        }
        if (!req.user) {
            return res.set("WWW-Authenticate", "Bearer").status(401).end();
        }
        return next();
    });
};

const requireAuth = [bearerToken(), restoreUser];

const getUserToken = (user) => {
    console.log("user 38", user)
    const userDataForToken = {
        id: user.id,
        email: user.email,
    };
    const token = jwt.sign(
        { data: userDataForToken },
        secret,
        { expiresIn: parseInt(expiresIn, 10) }
    );
    return token;
};

module.exports = { getUserToken, requireAuth };