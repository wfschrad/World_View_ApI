//hide in .env for production
const newsToken = `78bf6a2d1a574d3995099f73fb8f6cd3`;
const baseURL = `https://newsapi.org/v2/top-headlines?country=`;
const Axios = require('axios');

const express = require('express');
const { asyncHandler } = require('../utils/utils');

const router = express.Router();


router.post('/', asyncHandler(async (req, res) => {
    // parse request params
    //?state variables for query (more comments below route)
    const {
        currCountry
    } = req.body;
    console.log('currCountry', currCountry);
    const newsRes = await Axios({
        url: `${baseURL}${currCountry}&apiKey=${newsToken}`,
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
