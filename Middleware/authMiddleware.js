const { getAccessToken } = require('../Services/spotifyService');

function ensureAuth(req, res, next) {
  if (!getAccessToken()) {
    return res.status(401).json({ message: 'User not authorized. Please login via /login' });
  }
  next();
}

module.exports = ensureAuth;
