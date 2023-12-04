const { config } = require('../../../config/config');

console.log("config in sequelize ", config);

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URL = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  url: URL,
  dialect: 'postgres', // Add this line to specify the dialect
  protocol: 'postgres',
  dialectOptions: {
    ssl: false
  },
}
