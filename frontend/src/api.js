const BASE = import.meta.env.VITE_API_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getEntries: () => request("/entries/"),
  getEntry: (id) => request(`/entries/${id}`),
  createEntry: (data) => request("/entries/", { method: "POST", body: JSON.stringify(data) }),
  updateEntry: (id, data) => request(`/entries/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEntry: (id) => request(`/entries/${id}`, { method: "DELETE" }),
};
