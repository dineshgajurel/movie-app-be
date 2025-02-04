import express from 'express';
import { getMovieDetails, searchMovies, fetchAllMovies } from '../controllers/movie.controller.js';

const router = express.Router();

router.get('/', fetchAllMovies);
router.get('/search', searchMovies);
router.get('/:id', getMovieDetails);

export default router;
