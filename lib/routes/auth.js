const { Router } =  require('express');
const ensureAuth = require('../middleware/ensure-auth');
const User = require('../models/User');

const setSessionCookie = (res, token) => {
  res.cookie('session', token, {
    maxAge: 24 * 60 * 60 * 1000
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User
      .create(req.body)
      .then(user => {
        setSessionCookie(res, user.authToken());
        res.send(user);
      })
      .catch(next);
  })

  .post('/login', (req, res, next) => {
    User
      .authenticate(req.body)
      .then(user => res.send(user))
      .catch(next);
  })

  .get('verify', ensureAuth, (req, res, next) => {
    res.send(req.user)
      .catch(next);
  });

