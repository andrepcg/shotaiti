const express = require('express');
const graph = require('fbgraph');
const Users = require('../db').Users;
const google = require('googleapis');
const createHash = require('sha.js');
const uuid = require('uuid/v4');
const plus = google.plus('v1');
const jwt = require('jsonwebtoken');
const OAuth2 = google.auth.OAuth2;

const sha256 = createHash('sha256');

const auth = new OAuth2(
  process.env.GOOGLE_OAUTH2_CLIENT_ID,
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET
);

const router = express.Router();


const extractFacebookProfile = (data) => ({
  email: data.email,
  name: data.name,
  avatar: data.picture && data.picture.data && data.picture.data.url,
  facebookId: data.id
});

const extractGoogleProfile = (data) => ({
  email: data.emails[0].value,
  name: data.displayName,
  avatar: data.image && data.image.url,
  googleId: data.id
});


const findOrCreateUser = (email, userData) => Users.findOne({ email: email }).then((user) => {
  if (!user) {
    return Users.insert(userData);
  } else {
    return user;
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.user && req.cookies.access_token) {
    return next();
  }
  return res.status(401).json({ err: 'Not authenticated' });
}

const validateJwtToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {      
      if (err) {
        return res.status(401).json({ err: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;    
        next();
      }
    });

  } else {
    return res.status(401).json({
      err: 'No token provided.' 
    });

  }
}


// GET /user
router.get('/user', validateJwtToken, (req, res) => {
  Users.findOne({ email: req.user.email })
    .then((user) => res.json({ err: null, data: user }));
});

// POST /logout
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  req.session.destroy(() => {
    res.redirect('/');
  });
});

// POST /google
router.post('/google', (req, res) => {
  const accessToken = req.body.accessToken;
  // const googleUserId = req.get('googleUserId');
  auth.setCredentials({ access_token: accessToken });
  plus.people.get({
    userId: 'me',
    auth: auth
  }, (err, response) => {
    if (err) return res.json({ err: err });

    const userData = extractGoogleProfile(response);
    findOrCreateUser(userData.email, userData)
      .then((dbUser) => {
        const token = jwt.sign(dbUser, process.env.JWT_SECRET, {
          expiresIn: 1440 * 7 // expires in 24 hours * 7
        });
        res.json({ err: null, data: dbUser, token: token });
      })
      .catch((err) => {
        console.error(err);
        return res.json({ err: 'Something bad occured' });
      });
  });
});

// POST /facebook
router.post('/facebook', (req, res) => {
  const accessToken = req.body.accessToken;
  if (req.session.user) return res.json(req.session.user);

  graph.get(`/me?fields=id,name,email,picture&access_token=${accessToken}`, (err, data) => {
    if (err) return res.json({ err: err });

    findOrCreateUser(data.email, extractFacebookProfile(data))
      .then((dbUser) => {
        const token = jwt.sign(dbUser, process.env.JWT_SECRET, {
          expiresIn: 1440 * 7 // expires in 24 hours * 7
        });
        res.json({ err: null, data: dbUser, token: token });
      })
      .catch((err) => {
        console.error(err);
        return res.json({ err: 'Something bad occured' });
      });
  });

});


module.exports = {
  router: router,
  isAuthenticated: isAuthenticated
};
