import express from 'express';
import { updateSearchCount, getTrendingMovies } from '../controllers/search.controller.js';

const router = express.Router();

router.post('/update-count', updateSearchCount);
router.get('/trending', getTrendingMovies);

export default router;
