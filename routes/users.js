const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { getUserToken, requireAuth } = require('../utils/auth.js');

//validate Password
const router = express.Router();

const validateEmailAndPassword = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Please provide a password."),
];

//routes

//create user
router.post('/signup',
validateEmailAndPassword,
handleValidationErrors,
asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        hashedPass
    });
    console.log("after user creation!!!!!!")

    const token = getUserToken(user);
    console.log('after get token')
    res.status(201).json({
        user: { id: user.id },
        token,
    });
})
);

//get specific user
router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [{ model: StatusType, attributes: ['type'] }],
        attributes: ['id', 'userName', 'firstName', 'revScore']
    });
    res.json({ user });
}))

//update specific user
router.put('/:id(\\d+)', requireAuth, validateEmailAndPassword, asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
        include: [{ model: StatusType, attributes: ['type'] }],
    });
    if (user) {
        user.update({ ...req.body });
        res.json({
            user: {
                id: user.id,
                userName: user.userName,
                firstName: user.firstName,
                revScore: user.revScore,
                statusType: user.StatusType.type
            }
        });
    } else {
        const err = new Error();
        err.title = "User Not Found";
        err.status = 404
        next(err);
    }
}));

//delete specific user
router.delete('/:id(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, {
        attributes: ['id']
    });
    await user.destroy();
    res.end();
}));

//authenticate
router.post('/login', asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email,
        },
    });
    //pass validate and error handling
    if (!user || !user.validatePassword(password)) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }
    //login successful
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id } });
}));

//get all reviews for specific user
//functioning 4.21.20
router.get('/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.params.id },
        order: [['createdAt', 'DESC']]
    });
    res.json({ reviews });
}))

//get all votes for specified user and given review
router.get('/:id(\\d+)/votes',
    // requireAuth,
    asyncHandler(async (req, res) => {
        const userVotes = await VoteInstance.findAll({
            where: { userId: req.params.id }
        });
        res.json({ userVotes });
    }))

module.exports = router;
