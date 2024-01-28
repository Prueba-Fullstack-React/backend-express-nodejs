const { models } = require('../lib/postgreSQL/sequelize');

class TaskService {
  async getTasks(page, pageSize) {
    const allTasks = await models.Task.findAll();
    const offset = page * pageSize;
    const tasks = await models.Task.findAll({
      limit: pageSize,
      offset,
      order: [
        ['id', 'ASC']
      ],
    });
    return { tasks, count: allTasks.length };
  }

  async createTask(title, state) {
    const newTask = await models.Task.create({
      title,
      state,
    });
    return newTask;
  }

  async updateTaskState(taskId, newState) {
    const updatedTask = await models.Task.findByPk(taskId);

    if (!updatedTask) {
      throw new Error('Task not found');
    }

    updatedTask.state = newState;
    await updatedTask.save();

    return updatedTask;
  }

  async deleteTask(taskId) {
    const task = await models.Task.findByPk(taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    await task.destroy();
  }
}

module.exports = TaskService;
