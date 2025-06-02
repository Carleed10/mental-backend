const express = require('express');
const spotifyRouter = express.Router();
const { getSpotifyAccessToken, searchPlaylists } = require('../Services/spotifyService'); // Adjust path as needed
const {
  login,
  callback,
  getPlaylistsByMood,
} = require('../Controllers/spotifyController');

spotifyRouter.get('/login', login);
spotifyRouter.get('/callback', callback);

spotifyRouter.get('/playlists/:mood', async (req, res) => {
  try {
    const mood = req.params.mood.toLowerCase();

    const moodQueryMap = {
      excited: 'party',
      happy: 'uplifting',
      neutral: 'chill',
      sad: 'calm',
      angry: 'angry',
    };

    const query = moodQueryMap[mood] || mood;

    // Use the searchPlaylists function from spotifyService to handle token & API call
    const data = await searchPlaylists(query);

    res.json(data);
  } catch (error) {
    console.error('Error fetching playlists:', error.message);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

module.exports = spotifyRouter;
