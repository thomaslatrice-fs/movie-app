import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovie, updateMovie } from "../api/movies";
import MovieForm from "../components/MovieForm";
import Status from "../components/Status";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await getMovie(id);
        setMovie(res.data.data);
      } catch (err) {
        setError("Couldn't load that movie.");
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  async function handleUpdate(updatedMovie) {
    await updateMovie(id, updatedMovie);
    navigate("/");
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Movie</h1>
        <p className="page-subtitle">Update the details for this title.</p>
      </div>
      <Status loading={loading} error={error}>
        {movie && <MovieForm initialData={movie} onSubmit={handleUpdate} submitLabel="Save Changes" />}
      </Status>
    </div>
  );
}
