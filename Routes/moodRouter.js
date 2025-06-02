const express = require('express');
const moodRouter = express.Router();
const { addMood, getMoodHistory } = require('../Controllers/moodController');
const verifyToken = require('../Middleware/verifyToken');

moodRouter.post('/add', verifyToken, addMood);
moodRouter.get('/history/:userId', verifyToken, getMoodHistory);

module.exports = moodRouter;
