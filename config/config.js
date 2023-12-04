require('dotenv').config({path:__dirname+'/./../.env'});

const config = {
  port              : process.env.LOCAL_DB_PORT,
  dbUser            : process.env.LOCAL_DB_USER,
  dbPassword        : process.env.LOCAL_DB_PASSWORD,
  dbHost            : process.env.LOCAL_DB_HOST,
  dbName            : process.env.LOCAL_DB_NAME,
  dbPort            : process.env.LOCAL_DB_PORT,
  jwtSecret         : process.env.SECRET_JWT,
  jwtExpiresIn      : process.env.JWT_EXPIRES_IN,
  dialect           : process.env.DIALECT,
}

module.exports = { config };
