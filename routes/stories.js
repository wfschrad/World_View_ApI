const express = require('express');
const { asyncHandler, handleValidationErrors } = require('../utils/utils');
const { NewsStory, SavedStory } = require('../models');

const router = express.Router();

//newsStory routes

//create new story instance in db

router.post('/', asyncHandler(async (req, res) => {
    const {
        url,
        urlImg,
        title,
        description,
        content,
        upVoteCount,
        downVoteCount
    } = req.body;

    try {
        const story = await NewsStory.findOrCreate({
            where: {
                url,
                urlImg,
                title,
                description,
                content,
                upVoteCount,
                downVoteCount
            }
        });
        res.json({ story });
    } catch (e) { console.log(e) }
}))

//omit story delete route for phase 1


router.post('/saveStory', asyncHandler(async (req, res) => {
    const { userId, storyId } = req.body;
    try {
        const savedStory = await SavedStory.findOrCreate({
            where: {
                userId,
                storyId
            },
            include: [
                {
                    model: NewsStory,
                    attributes: ["url", "urlImg", "title", "description", "content"]
                }
            ]
        });
        res.json({ savedStory })
    } catch (e) { console.log(e); }
}))

//get all saved stories for user

router.get('/savedStories/:userId(\\d+)', asyncHandler(async (req, res) => {
    try {
        const stories = await SavedStory.findAll({
            where: {
                userId: req.params.userId
            }
        });
        res.json({ stories });
    } catch (e) { console.log(e); }
}))


module.exports = router;

