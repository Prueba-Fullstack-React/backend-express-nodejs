const { Sequelize } = require('sequelize');
const { config } = require('../../../config/config');
const setupModels = require('./models');

// Build the database connection URI
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// Set the options for Sequelize, including the beforeCreate hook
const options = {
  dialect: config.dialect,
  host: config.dbHost,
  define: {
    timestamps: false,
  },
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    }
  },
  logging: (sql) => {
    console.log(sql);
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  hooks: {
    beforeCreate: (attributes) => {
      console.log(attributes);
      if (
        attributes &&
        attributes.dataValues &&
        // eslint-disable-next-line no-prototype-builtins
        attributes.dataValues.hasOwnProperty('id')
      ) {
        delete attributes.dataValues.id;
      }
    },
  },
};

// Create a new Sequelize instance with the connection URI and options
const sequelize = new Sequelize(URI, options);

// Setup the models using the created Sequelize instance
setupModels(sequelize);

module.exports = sequelize;
