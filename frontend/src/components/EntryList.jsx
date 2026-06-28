const MOOD_EMOJI = { 1: "😞", 2: "😕", 3: "😐", 4: "🙂", 5: "😄" };

function formatDate(iso) {
  return new Date(iso).toLocaleString();
}

export default function EntryList({ entries, onEdit, onDelete }) {
  if (entries.length === 0) {
    return <p className="empty-state">No entries yet. Create your first one!</p>;
  }

  return (
    <ul className="entry-list">
      {entries.map((entry) => (
        <li key={entry.id} className="entry-card">
          <div className="entry-header">
            <span className="mood-display">{MOOD_EMOJI[entry.mood]} {entry.mood}/5</span>
            <span className="entry-date">{formatDate(entry.created_at)}</span>
          </div>
          {entry.title && <h2 className="entry-title">{entry.title}</h2>}
          <p className="entry-content">{entry.content}</p>
          <div className="entry-actions">
            <button onClick={() => onEdit(entry)}>Edit</button>
            <button className="btn-danger" onClick={() => onDelete(entry.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
