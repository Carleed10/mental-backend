const express = require('express');
const spotifyRoouter = express.Router();
const {
  login,
  callback,
  getPlaylistsByMood,
} = require('../Controllers/spotifyController');

spotifyRoouter.get('/login', login);
spotifyRoouter.get('/callback', callback);

spotifyRoouter.get("/playlists/:mood", async (req, res) => {
  try {
    const token = await getSpotifyAccessToken();

    const mood = req.params.mood.toLowerCase();
    const moodQueryMap = {
      excited: "party",
      happy: "uplifting",
      neutral: "chill",
      sad: "calm",
      angry: "angry"
    };

    const query = moodQueryMap[mood] || "mood";

    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Spotify API error:", response.status, await response.text());
      return res.status(500).json({ error: "Failed to fetch playlists from Spotify" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});

module.exports = spotifyRoouter
