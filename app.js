require("dotenv").config();
const express = require("express");
const cors = require('cors');

const routerApi = require("./api/routes/index");

const app = express();

// Add middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    // Redirect to the same URL with HTTP protocol
    return res.redirect(`http://${req.hostname}${req.url}`);
  }
  return next();
});

app.use(express.json());
app.use(cors());

routerApi(app);

// Authentication
require('./api/utils/auth');

// Set the 'public' folder as static
app.use(express.static('public'));

module.exports = app;
