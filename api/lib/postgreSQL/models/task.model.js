const { Model, DataTypes } = require("sequelize");

const TASK_TABLE = "task";

const TaskTableSchema = {
  id: {
    type         : DataTypes.INTEGER,
    primaryKey   : true,
    autoIncrement: true,
    allowNull    : false
  },
  title: {
    type     : DataTypes.STRING,
    allowNull: false
  },
  state: {
    type     : DataTypes.STRING,
    allowNull: false
  },
};

class Task extends Model {
      // eslint-disable-next-line no-unused-vars
  static associate(_models) {
        // No associations to define
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName : TASK_TABLE,
      modelName : "Task",
      timestamps: false
    };
  }
}

module.exports = { TASK_TABLE, TaskTableSchema, Task };
