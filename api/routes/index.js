const express = require("express");
const { swaggerUi, swaggerSpec } = require('../../swagger');

const authRouter = require('./auth.router');
const taskRouter = require('./task.router');
const movieRouter = require('./movie.router');

function routerApi(app) {
  const publicRouter = express.Router();
  publicRouter.use("/movies/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  const router = express.Router();
  app.use("/api/v1", publicRouter);
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/task", taskRouter);
  router.use("/movies", movieRouter);
}

module.exports = routerApi;
