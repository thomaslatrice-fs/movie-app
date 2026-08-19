import { Link } from "react-router-dom";

export default function MovieCard({ movie, onDelete }) {
  const addedDate = new Date(movie.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="movie-card">
      <div className="movie-card-top">
        <h3>{movie.title}</h3>
        <span className="genre-pill">{movie.genre}</span>
      </div>
      <p className="movie-year">{movie.releaseYear}</p>
      <p className="movie-added">Added {addedDate}</p>
      <div className="movie-card-actions">
        <Link to={`/edit/${movie._id}`} className="btn btn-secondary">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={() => onDelete(movie._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
