const Joi = require('joi');

const id    = Joi.number().integer();
const title = Joi.string().min(5);
const state = Joi.string().valid('activo', 'pendiente');

const createTask = Joi.object({
  title  : title.required(),
  state  : state.required(),
});

const updateTask = Joi.object({
  state: state.required(),
});

const deleteTask = Joi.object({
  id: id.required(),
});

module.exports = {
  createTask,
  updateTask,
  deleteTask,
};
