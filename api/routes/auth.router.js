const express = require('express');
const passport = require('passport');

const AuthService = require('../services/auth.service');
const validatorHandler = require('../utils/middleware/validator.handler');
const { getUserLogin, getUserToken, signUpUser } = require('../utils/schema/user.schema');

const router = express.Router();
const service = new AuthService;

router.post('/login',
  validatorHandler(getUserLogin, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (error) {
      res.status(500).json({ error: 'An unexpected error occurred during login. Please try again.' });
      next(error);
    }
  }
);

router.post('/sign-in-token',
  validatorHandler(getUserToken, 'body'),
  async (req, res, next) => {
    try {
      const accessToken = req.body.accessToken;
      const response = await service.signInWithToken(accessToken);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/sign-up',
  validatorHandler(signUpUser, 'body'),
  async (req, res, next) => {
    try {
      const user = await service.create(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
