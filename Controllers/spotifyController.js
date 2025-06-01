const querystring = require('querystring');
const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI,} = require('../Config/spotifyConf');
const { requestAccessToken, searchPlaylists } = require('../Services/spotifyService');

const login = (req, res) => {
  const scope = 'user-read-private user-read-email';
  const authQuery = querystring.stringify({
    response_type: 'code',
    client_id: SPOTIFY_CLIENT_ID,
    scope,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${authQuery}`);
};

const callback = async (req, res) => {
  const code = req.query.code || null;

  try {
    await requestAccessToken(code);
    res.send('Spotify authorization successful! You can close this window.');
  } catch (error) {
    console.error('Error getting tokens:', error.response?.data || error.message);
    res.status(500).send('Failed to get tokens');
  }
};

const getPlaylistsByMood = async (req, res) => {
  const mood = req.params.mood;

  try {
    const playlists = await searchPlaylists(mood);
    res.json(playlists);
  } catch (error) {
    console.error('Error fetching playlists:', error.response?.data || error.message);
    res.status(500).send('Failed to fetch playlists');
  }
};

module.exports = {
  login,
  callback,
  getPlaylistsByMood,
};
