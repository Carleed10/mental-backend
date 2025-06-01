const express = require('express');
const router = express.Router();
const { addMood, getMoodHistory } = require('../Controllers/moodController');

router.post('/add', addMood);
router.get('/history/:userId', getMoodHistory);

module.exports = router;
