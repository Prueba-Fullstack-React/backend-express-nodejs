const express = require('express');
const passport = require('passport');

const TaskService = require('../services/task.service');
const validatorHandler = require('../utils/middleware/validator.handler');
const { createTask, updateTask, deleteTask } = require('../utils/schema/task.schema');

const router = express.Router();
const service = new TaskService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { page, pageSize } = req.query;
      const tasks = await service.getTasks(page, pageSize, userId);
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  });

router.post('/create',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createTask, 'body'),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { title, state } = req.body;
      const newTask = await service.createTask(title, state, userId);
      res.status(201).json(newTask);
    } catch (error) {
      next(error);
    }
  });

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateTask, 'body'),
  async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const { state } = req.body;

      await service.updateTaskState(taskId, state);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(deleteTask, 'params'),
  async (req, res, next) => {
    try {
      const taskId = req.params.id;
      await service.deleteTask(taskId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
