const axios = require('axios');
const querystring = require('querystring');
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REDIRECT_URI,
} = require('../Config/spotifyConf');

let accessToken = null;

const requestAccessToken = async (code) => {
  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const payload = querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const response = await axios.post(tokenUrl, payload, { headers });
  accessToken = response.data.access_token;
};

const refreshTokenIfNeeded = async () => {
  if (!accessToken) {
    // Optionally: Handle token expiration and refresh logic
    throw new Error('Spotify access token not available.');
  }
};

const searchPlaylists = async (mood) => {
  await refreshTokenIfNeeded();

  const response = await axios.get(`https://api.spotify.com/v1/search`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      q: mood + ' mood',
      type: 'playlist',
      limit: 5,
    },
  });

  return response.data;
};

module.exports = {
  requestAccessToken,
  searchPlaylists,
};
