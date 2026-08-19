const Movie = require("../models/Movie");

// GET /api/v1/movies
async function getMovies(req, res) {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: movies.length, data: movies });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch movies" });
  }
}

// GET /api/v1/movies/:id
async function getMovie(req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch movie" });
  }
}

// POST /api/v1/movies
async function createMovie(req, res) {
  try {
    const { title, genre, releaseYear } = req.body;
    const movie = await Movie.create({ title, genre, releaseYear });
    res.status(201).json({ success: true, data: movie });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Failed to create movie" });
  }
}

// PUT /api/v1/movies/:id
async function updateMovie(req, res) {
  try {
    const { title, genre, releaseYear } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, genre, releaseYear },
      { new: true, runValidators: true }
    );
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: "Failed to update movie" });
  }
}

// DELETE /api/v1/movies/:id
async function deleteMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete movie" });
  }
}

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
