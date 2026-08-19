import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

export const getMovies = () => api.get("/movies");
export const getMovie = (id) => api.get(`/movies/${id}`);
export const createMovie = (movie) => api.post("/movies", movie);
export const updateMovie = (id, movie) => api.put(`/movies/${id}`, movie);
export const deleteMovie = (id) => api.delete(`/movies/${id}`);
