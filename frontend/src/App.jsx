import { useState, useEffect } from "react";
import { api } from "./api";
import EntryList from "./components/EntryList";
import EntryForm from "./components/EntryForm";
import "./App.css";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEntries() {
    try {
      const data = await api.getEntries();
      setEntries(data);
      setError(null);
    } catch {
      setError("Could not reach the backend. Is it running on port 8000?");
    }
  }

  async function handleSave(data) {
    if (editing) {
      await api.updateEntry(editing.id, data);
    } else {
      await api.createEntry(data);
    }
    setShowForm(false);
    setEditing(null);
    await loadEntries();
  }

  async function handleDelete(id) {
    await api.deleteEntry(id);
    await loadEntries();
  }

  function handleEdit(entry) {
    setEditing(entry);
    setShowForm(true);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Software Diary</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>
          + New Entry
        </button>
      </header>

      {error && <p className="error-banner">{error}</p>}

      {showForm && (
        <EntryForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      <EntryList entries={entries} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
