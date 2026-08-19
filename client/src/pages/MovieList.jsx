import { useEffect, useState } from "react";
import { getMovies, deleteMovie } from "../api/movies";
import MovieCard from "../components/MovieCard";
import Status from "../components/Status";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  async function fetchMovies() {
    try {
      setLoading(true);
      const res = await getMovies();
      setMovies(res.data.data);
      setError("");
    } catch (err) {
      setError("Couldn't load your movie collection. Is the API running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Remove this movie from your collection?")) return;
    try {
      await deleteMovie(id);
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      setError("Failed to delete that movie. Try again.");
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>My Collection</h1>
        <p className="page-subtitle">Every film worth remembering, in one place.</p>
      </div>

      <Status loading={loading} error={error}>
        {movies.length === 0 ? (
          <p className="empty-state">
            No movies yet — head to "Add Movie" to start your collection.
          </p>
        ) : (
          <div className="movie-grid">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </Status>
    </div>
  );
}
