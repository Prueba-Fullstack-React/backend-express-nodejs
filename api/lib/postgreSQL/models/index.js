const { User, UserTableSchema } = require('./user.model');
const { Task, TaskTableSchema } = require('./task.model');

function setupModels (sequelize) {
  User.init(UserTableSchema, User.config(sequelize));
  Task.init(TaskTableSchema, Task.config(sequelize));

  User.associate(sequelize.models);
  Task.associate(sequelize.models);
}

module.exports = setupModels;
