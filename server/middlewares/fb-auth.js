const crypto = require('crypto');
const Users = require('../db').Users;

function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}

function parseSignedRequest(signedRequest) {
  const encodedData = signedRequest.split('.');
  // decode the data
  const sig = encodedData[0];
  const json = atob(encodedData[1]);
  const data = JSON.parse(json); // ERROR Occurs Here!

  // check algorithm - not relevant to error
  if (!data.algorithm || data.algorithm.toUpperCase() !== 'HMAC-SHA256') {
    throw Error(`Unknown algorithm: ${data.algorithm}. Expected HMAC-SHA256`);
  }

  // check sig - not relevant to error
  const expectedSig = crypto
    .createHmac('sha256', process.env.FACEBOOK_APP_SECRET)
    .update(encodedData[1])
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace('=', '');

  if (sig !== expectedSig) {
    throw Error(`Invalid signature: ${sig}. Expected ${expectedSig}`);
  }

  return data;
}

module.exports = (req, res, next) => {
  const authApp = req.get('authApp');
  const signedRequest = req.get('signedRequest');
  if (authApp === 'facebook') {
    try {
      const userData = parseSignedRequest(signedRequest);
      req.fbUserId = userData.user_id;
      return Users.findOne({ facebookUserId: userData.user_id }).then((user) => {
        req.user = user;
        return next();
      });
    } catch (err) {

    }
    return next();
  }
  next();
}