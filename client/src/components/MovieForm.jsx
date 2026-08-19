import { useState } from "react";

export default function MovieForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    genre: initialData?.genre || "",
    releaseYear: initialData?.releaseYear || "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.genre.trim() || !form.releaseYear) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({ ...form, releaseYear: Number(form.releaseYear) });
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      {error && <p className="status-message status-error">{error}</p>}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="e.g. Spirited Away"
        value={form.title}
        onChange={handleChange}
      />

      <label htmlFor="genre">Genre</label>
      <input
        id="genre"
        name="genre"
        type="text"
        placeholder="e.g. Animation"
        value={form.genre}
        onChange={handleChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        id="releaseYear"
        name="releaseYear"
        type="number"
        placeholder="e.g. 2001"
        value={form.releaseYear}
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
