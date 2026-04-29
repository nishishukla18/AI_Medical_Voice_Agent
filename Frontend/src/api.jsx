const API_URL = "http://localhost:5000/api/messages";

export async function fetchMessages() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch messages");
  }
  return res.json();
}

export async function postMessage(content) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Failed to post message");
  }
  return res.json();
}
