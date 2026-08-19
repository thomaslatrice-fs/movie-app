import { useNavigate } from "react-router-dom";
import { createMovie } from "../api/movies";
import MovieForm from "../components/MovieForm";

export default function AddMovie() {
  const navigate = useNavigate();

  async function handleCreate(movie) {
    await createMovie(movie);
    navigate("/");
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add a Movie</h1>
        <p className="page-subtitle">Add a new title to your collection.</p>
      </div>
      <MovieForm onSubmit={handleCreate} submitLabel="Add Movie" />
    </div>
  );
}
