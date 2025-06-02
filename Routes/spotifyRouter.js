const express = require('express');
const spotifyRoouter = express.Router();
const {
  login,
  callback,
  getPlaylistsByMood,
} = require('../Controllers/spotifyController');

spotifyRoouter.get('/login', login);
spotifyRoouter.get('/callback', callback);
spotifyRoouter.get('/playlists/:mood', getPlaylistsByMood);

module.exports = spotifyRoouter
