const express = require('express');
const fetch = require('node-fetch');
const validatorHandler = require('../utils/middleware/validator.handler');
const { getMovies, getMovie } = require('../utils/schema/movie.schema');

const router = express.Router();

const accessKey = process.env.ACCESS_KEY;

/**
 * @swagger
 * /movies/{page}:
 *   get:
 *     summary: Get a list of movies
 *     description: Retrieve a list of movies
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         description: Page number for movie listing
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of movies
 */
router.get('/:page',
  validatorHandler(getMovies, 'params'),
  async (req, res) => {
    try {
      const page = req.params.page;
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${accessKey}&page=${page}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

/**
 * @swagger
 * /movies/id/{id}:
 *   get:
 *     summary: Get details of a movie by ID
 *     description: Retrieve details of a movie by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the movie
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the movie
 */
router.get('/id/:id',
  validatorHandler(getMovie, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${accessKey}`);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
