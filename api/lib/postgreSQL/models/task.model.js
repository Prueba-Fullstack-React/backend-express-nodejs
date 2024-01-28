const { Model, DataTypes } = require("sequelize");

const TASK_TABLE = "task";

const TaskTableSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: { // Add user_id as a foreign key
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class Task extends Model {
  static associate(models) {
    Task.belongsTo(models.User, { foreignKey: "user_id" });
    // Define other associations if needed
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_TABLE,
      modelName: "Task",
      timestamps: false,
    };
  }
}

module.exports = { TASK_TABLE, TaskTableSchema, Task };
