import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import clientRouter from './routers/client';
import db from './db';

////////////////////////////////////////////////////////////////////////////
// Server Setup
////////////////////////////////////////////////////////////////////////////
const app = express();
const port = 1337;
app.listen(port, () => console.log(`Listening on port ${port}`))

////////////////////////////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.resolve(__dirname, '../../static')));

app.use(cookieParser());
app.use(session({
  secret: '2135732421412356364733123',
  resave: true,
  saveUninitialized: false,
}));

app.use((req, res, next) => {
  if (!req.session.uuid) {
    req.session.uuid = '5be8664251115854e06e77b7';
    console.log('\nadded uuid to session\n')
  }
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////////////////////////////////////////////////////////////////////////////
// Api Routes
////////////////////////////////////////////////////////////////////////////
const api = express.Router();
app.use('/api', api);

import artistR from './routers/artist';
api.use('/artist', artistR);

import userR from './routers/user';
api.use('/user', userR);

api.get('/', (req, res) => {
  res.send('Hello API');
});

app.use('*', clientRouter);
