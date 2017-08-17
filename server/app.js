require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');

const WebSocket = require('ws');
const cookieSecret = process.env.COOKIE_SECRET || 'this is very secret like what the hell';

const googleAuth = require('./middlewares/google-auth');
const facebookAuth = require('./middlewares/fb-auth');

const authRouter = require('./routes/auth');

const port = process.env.PORT || 4000;

const app = express();

app.use(morgan('dev'));
app.use(cookieParser(cookieSecret));
app.use(session({ secret: cookieSecret, /*cookie: { maxAge: 60000 }*/}));
app.use(bodyParser.json());


app.use('/auth', authRouter);

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

wss.on('connection', (ws, req) => {
  // const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', message => {
    console.log('received: %s', message);
  });

  ws.send('ping');
});
