const Joi = require('joi');

const username = Joi.string().max(20);
const email    = Joi.string().email();
const password = Joi.string().min(8);
const jwtToken = Joi.string().min(5);

const getUserLogin = Joi.object({
  email   : email.required(),
  password: password.required(),
});

const getUserToken = Joi.object({
  accessToken: jwtToken.required(),
});

const signUpUser = Joi.object({
  username: username.required(),
  email   : email.required(),
  password: password.required(),
})

module.exports = {
  getUserLogin,
  getUserToken,
  signUpUser
};
