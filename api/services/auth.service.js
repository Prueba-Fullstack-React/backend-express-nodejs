const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const { config } = require('../../config/config');
const { models } = require('../lib/postgreSQL/sequelize');
const bcrypt = require('bcrypt');
const { UserTableSchema } = require('../lib/postgreSQL/models/user.model');

class authService {

  async getByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email
      },
      attributes: { include: Object.keys(UserTableSchema) }, 
    });
    if (!user) {
      throw new boom.unauthorized('Correo no está registrado');
    }
    return user;
  }

  async getUser(email, password) {
    const user = await this.getByEmail(email);

    if (!user) {
      throw boom.unauthorized('Correo no está registrado');
    }

    const isPassMatch = await bcrypt.compare(password, user.dataValues.password);
    if (!isPassMatch) {
      throw boom.unauthorized('Contraseña incorrecta');
    }
    delete user.dataValues.password;
    return user;
  }

  verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
  }

  signToken(user) {
    const payload = {
      id: user.id,
      email: user.email
    };

    console.log("user ", user);
    const token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn
    });
    return {
      user,
      token
    }
  }

  async signInWithToken(token) {
    const { id } = this.verifyToken(token);
    console.log("signintoken");
    const user = await models.User.findByPk(id);

    if (!user) {
      throw boom.notFound('Usuario no existe');
    }

    return user;
  }

  async create(data) {

    try {
      console.log("User ", data);

      const hashedPassword = await bcrypt.hash(`${data.password}`, 10);

      // Create a new user using Sequelize's create method
      const newUser = await models.User.create({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      });

      // Note: If using Sequelize.QueryTypes.INSERT, the returned object might not have the same structure as a regular model instance.

      return newUser[0];

    } catch(error) {
      console.error("Error creating user:", error);
      throw new Error('Signup failed'); // or handle the error accordingly
    }
  }
}

module.exports = authService;
