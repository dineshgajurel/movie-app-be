import dotenv from 'dotenv';
dotenv.config();

import { Client, Databases, Query, ID } from 'node-appwrite';

const client = new Client()
    .setEndpoint(process.env.APPWRITE_BASE_URL)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

export const appwriteService = {
    async updateSearchCount(searchTerm, movie) {
        try {
            const result = await databases.listDocuments(
                process.env.APPWRITE_DATABASE_ID,
                process.env.APPWRITE_COLLECTION_ID,
                [Query.equal("searchTerm", searchTerm)]
            );

            if (result.documents.length > 0) {
                const doc = result.documents[0];
                return await databases.updateDocument(
                    process.env.APPWRITE_DATABASE_ID,
                    process.env.APPWRITE_COLLECTION_ID,
                    doc.$id,
                    {
                        count: doc.count + 1,
                    }
                );
            } else {
                return await databases.createDocument(
                    process.env.APPWRITE_DATABASE_ID,
                    process.env.APPWRITE_COLLECTION_ID,
                    ID.unique(),
                    {
                        searchTerm,
                        count: 1,
                        movie_id: movie.id,
                        movie_title: movie.title,
                        poster_url: `${process.env.TMDB_BASE_URL}/t/p/w500${movie.poster_path}`,
                    }
                );
            }
        } catch (error) {
            throw error;
        }
    },

    async getTrendingMovies() {
        try {
            const result = await databases.listDocuments(
                process.env.APPWRITE_DATABASE_ID,
                process.env.APPWRITE_COLLECTION_ID,
                [
                    Query.limit(5),
                    Query.orderDesc("count"),
                ]
            );
            return result.documents;
        } catch (error) {
            throw error;
        }
    }
};
