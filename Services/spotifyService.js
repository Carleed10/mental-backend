const axios = require('axios');
const qs = require('querystring');
const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
} = process.env;

let accessToken = null;
let tokenExpiresAt = 0;

// Function to get a new Spotify access token using Client Credentials flow
async function getSpotifyAccessToken() {
  // If token exists and not expired, return cached token
  if (accessToken && Date.now() < tokenExpiresAt) {
    return accessToken;
  }

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      tokenUrl,
      qs.stringify({ grant_type: 'client_credentials' }),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    accessToken = response.data.access_token;
    // Set expiration 1 minute earlier than actual expiry time for safety
    tokenExpiresAt = Date.now() + (response.data.expires_in - 60) * 1000;

    return accessToken;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.response?.data || error.message);
    throw new Error('Could not get Spotify access token');
  }
}

// Function to search playlists by mood keyword
async function searchPlaylists(mood) {
  const token = await getSpotifyAccessToken();

  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: mood + ' mood',
        type: 'playlist',
        limit: 5,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching playlists:', error.response?.data || error.message);
    throw new Error('Failed to fetch playlists from Spotify');
  }
}

module.exports = {
  getSpotifyAccessToken,
  searchPlaylists,
};
