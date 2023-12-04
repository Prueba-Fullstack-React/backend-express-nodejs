const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "user";

const UserTableSchema = {
  id: {
    type         : DataTypes.INTEGER,
    primaryKey   : true,
    autoIncrement: true,
    allowNull    : false
  },
  username: {
    type     : DataTypes.STRING,
    allowNull: false
  },
  email: {
    type     : DataTypes.STRING,
    allowNull: false
  },
  password: {
    type     : DataTypes.STRING,
    allowNull: false
  },
};

class User extends Model {
      // eslint-disable-next-line no-unused-vars
  static associate(_models) {
        // No associations to define
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName : USER_TABLE,
      modelName : "User",
      timestamps: false
    };
  }
}

module.exports = { USER_TABLE, UserTableSchema, User };
