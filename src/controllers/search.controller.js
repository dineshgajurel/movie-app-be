import { appwriteService } from '../services/appwrite.service.js';

export const updateSearchCount = async (req, res) => {
    try {
        const { searchTerm, movie } = req.body;
        const result = await appwriteService.updateSearchCount(searchTerm, movie);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTrendingMovies = async (req, res) => {
    try {
        const movies = await appwriteService.getTrendingMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
