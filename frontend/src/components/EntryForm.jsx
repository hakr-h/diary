import { useState } from "react";

const MOODS = [
  { value: 1, label: "😞 1" },
  { value: 2, label: "😕 2" },
  { value: 3, label: "😐 3" },
  { value: 4, label: "🙂 4" },
  { value: 5, label: "😄 5" },
];

export default function EntryForm({ initial, onSave, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [mood, setMood] = useState(initial?.mood ?? 3);

  async function handleSubmit(e) {
    e.preventDefault();
    await onSave({ title: title || null, content, mood });
  }

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <h2>{initial ? "Edit Entry" : "New Entry"}</h2>

      <label>
        Title (optional)
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Give it a title..." />
      </label>

      <label>
        Content *
        <textarea
          required
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />
      </label>

      <label>
        Mood
        <div className="mood-selector">
          {MOODS.map((m) => (
            <button
              key={m.value}
              type="button"
              className={`mood-btn ${mood === m.value ? "selected" : ""}`}
              onClick={() => setMood(m.value)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </label>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Save</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
