//hide in .env for production
const newsToken = process.env.apiKEY;
const baseURL = `https://newsapi.org/v2/top-headlines?country=`;
const Axios = require('axios');

const express = require('express');
const { asyncHandler } = require('../utils/utils');

const router = express.Router();


router.post('/', asyncHandler(async (req, res) => {
    // parse request params
    //?state variables for query (more comments below route)
    console.log('req body:', req.body)
    const {
        currCountry,
        currCategory,
        currKeyword
    } = req.body;

    let queryString = baseURL;

    const stateKeys = Object.keys(req.body);
    for (let i = 0; i < stateKeys.length; i++) {
        const param = stateKeys[i];
        if (req.body[param] === 'none') continue;
        switch (param) {
            case 'currCountry':
                queryString += `${currCountry}&`
                break;
            case 'currCategory':
                queryString += `category=${currCategory}&`
                break;
            case 'currKeyword':
                queryString += `topic=${currKeyword}&`
        }
    }
    queryString += `apiKey=${newsToken}`;

    console.log('queryString:', queryString);

    const newsRes = await Axios({
        url: queryString,
    });

    const { articles } = newsRes.data;
    console.log('articles ', articles)
    const resArticles = articles.map((article) => {
        return {
            author: article.author,
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            content: article.content
        };
    });

    console.log('data', newsRes.data);

    res.json({ resArticles });
}));

//const {xx
//       yy} = req.body;

// fetch to newsapi

// handle api response

// return relevant data to client

module.exports = router;
