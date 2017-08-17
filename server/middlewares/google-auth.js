const GoogleAuth = require('google-auth-library');
const Users = require('../db').Users;

const CLIENT_ID = process.env.GOOGLE_OAUTH2_CLIENT_ID;
const auth = new GoogleAuth();
const client = new auth.OAuth2(CLIENT_ID, '', '');

function validateToken(token) {
  return new Promise((resolve, reject) => {
    client.verifyIdToken(
      token,
      CLIENT_ID,
      (err, login) => {
        if (err) return reject(err);
        const payload = login.getPayload();
        const userid = payload['sub'];
        resolve({ email: payload.email, userid });
      }
    );
  });
}

// exports.validateToken = validateToken;

module.exports = (req, res, next) => {
  const authApp = req.get('authApp');
  const token = req.get('token');
  if (authApp === 'google') {
    validateToken(token).then((userData) => {
      req.googleUserId = userData.userid;
      Users.findOne({ email: userData.email }).then((user) => {
        req.user = user;
        return next();
      })
    }).catch((err) => next())
  }
  next();
}
