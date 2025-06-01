const axios = require('axios');
const querystring = require('querystring');
const { SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI,} = require('../Config/spotifyConf');


let accessToken = null;
let refreshToken = null;

async function requestAccessToken(code) {
  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    querystring.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'),
      },
    }
  );

  accessToken = response.data.access_token;
  refreshToken = response.data.refresh_token;
  return { accessToken, refreshToken };
}

async function searchPlaylists(mood) {
  if (!accessToken) throw new Error('No access token available');

  const response = await axios.get(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=playlist&limit=5`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  return response.data.playlists.items.map((pl) => ({
    id: pl.id,
    name: pl.name,
    description: pl.description,
    uri: pl.uri,
    external_url: pl.external_urls.spotify,
    image: pl.images[0]?.url,
  }));
}

function getAccessToken() {
  return accessToken;
}

module.exports = {
  requestAccessToken,
  searchPlaylists,
  getAccessToken,
};
