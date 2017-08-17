const express = require('express');
const graph = require('fbgraph');
const Users = require('../db').Users;
const google = require('googleapis');
const plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;

const auth = new OAuth2(
  process.env.GOOGLE_OAUTH2_CLIENT_ID,
  process.env.GOOGLE_OAUTH2_CLIENT_SECRET
);

const router = express.Router();
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
})

const extractGoogleProfile = (data) => ({
  email: data.emails[0].value,
  name: data.displayName,
  avatar: data.image && data.image.url,
  googleId: data.id
});

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
    Users.findOne({ email: userData.email }).then((user) => {
      if (!user) {
        return Users.insert(userData);
      } else {
        return user;
      }
    })
    .then((dbUser) => {
      req.session.user = dbUser;
      res.json(dbUser);
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err });
    });
  });
});

const extractFacebookProfile = (data) => ({
  email: data.email,
  name: data.name,
  avatar: data.picture && data.picture.data && data.picture.data.url,
  facebookId: data.id
});

router.post('/facebook', (req, res) => {
  const accessToken = req.body.accessToken;
  if (req.session.user) return res.json(req.session.user);

  graph.get(`/me?fields=id,name,email,picture&access_token=${accessToken}`, (err, data) => {
    if (err) return res.json({ err: err });

    Users.findOne({ email: data.email }).then((user) => {
      if (!user) {
        return Users.insert(extractFacebookProfile(data));
      } else {
        return user;
      }
    })
    .then((dbUser) => {
      req.session.user = dbUser;
      res.json(dbUser);
    })
    .catch((err) => {
      console.error(err);
      return res.json({ err: err });
    });
  });

});

module.exports = router;
