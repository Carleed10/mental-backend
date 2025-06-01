const express = require('express');
const router = express.Router();

const spotifyController = require('../Controllers/spotifyController');
const ensureAuth = require('../Middleware/authMiddleware');

router.get('/login', spotifyController.login);
router.get('/callback', spotifyController.callback);
router.get('/playlists/:mood', ensureAuth, spotifyController.getPlaylistsByMood);

module.exports = router;
