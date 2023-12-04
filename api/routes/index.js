const express = require("express");

const authRouter = require('./auth.router');
const taskRouter = require('./task.router');

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/task", taskRouter);
}

module.exports = routerApi;
