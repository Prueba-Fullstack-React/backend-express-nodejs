const Joi = require('joi');

const id = Joi.number().integer();
const page = Joi.number().integer();

const getMovie = Joi.object({
  id: id.required(),
});

const getMovies = Joi.object({
  page: page.required(),
});

module.exports = {
  getMovie,
  getMovies,
};
