require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const cors = require('cors');
const URL = require('url-parse');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const cookieSecret = process.env.COOKIE_SECRET || 'this is very secret like what the hell';
const port = process.env.PORT || 4000;

const GamesController = require('./Games');
const googleAuth = require('./middlewares/google-auth');
const facebookAuth = require('./middlewares/fb-auth');
const authRouter = require('./routes/auth');


const app = express();

app.use(morgan('dev'));
app.use(cookieParser(cookieSecret));
// app.use(session({ secret: cookieSecret, /*cookie: { maxAge: 60000 }*/}));
app.use(bodyParser.json());
app.use(cors());


app.use('/auth', authRouter.router);

app.get('*', (req, res) => {
  res.json({ hello: 'hello', user: req.user });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.response || 'Something broke!');
});



const server = app.listen(port, () => {
  console.log(`Sho Tai Ti server listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

const games = new GamesController(wss);


wss.on('connection', (ws, req) => {
  // const location = URL(req.url, true);
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (!err) {
      ws.user_id = decoded._id;
    }
  });

  ws.on('message', message => {
    console.log('received: %s', message);
  });

  ws.send('ping');
});
