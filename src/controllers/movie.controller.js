
import dotenv from 'dotenv';
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?language=en-US&append_to_response=videos`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Movie not found');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMovies = async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllMovies = async (req, res) => {
  try {
    const { page = 1} = req.query;
    const response = await fetch(
      `${TMDB_BASE_URL}//discover/movie?sort_by=popularity.desc&page=${page}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );

    console.log({
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
