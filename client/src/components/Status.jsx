export default function Status({ loading, error, children }) {
  if (loading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message status-error">{error}</p>;
  return children;
}
