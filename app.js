require("dotenv").config();
const express = require("express");
const cors = require('cors');

const routerApi = require("./api/routes/index");

const app = express();

app.use(express.json());
app.use(cors());

routerApi(app);

// Authentication
require('./api/utils/auth');

//Set the 'public' folder as static
app.use(express.static('public'));

module.exports = app;
