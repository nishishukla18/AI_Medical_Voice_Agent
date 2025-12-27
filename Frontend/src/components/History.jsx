import React, { useEffect, useState } from "react";

function History() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/ai/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");

        const data = await res.json();
        setAnalytics(data);
      } catch (err) {
        setError("Unable to load mood analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Mood Analytics History
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-600">Loading analytics...</p>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {/* Empty State */}
      {!loading && analytics.length === 0 && (
        <p className="text-center text-gray-500">
          No mood analytics available yet.
        </p>
      )}

      {/* Analytics Cards */}
      <div className="grid gap-4">
        {analytics.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow border"
          >
            <p className="text-sm text-gray-500 mb-1">
              🕒 {new Date(item.created_at).toLocaleString()}
            </p>

            <p className="text-lg">
              <strong>🧠 Emotion:</strong> {item.emotion}
            </p>

            <p>
              <strong>📊 Mood Score:</strong> {item.mood_score}/5
            </p>

            <p className="mt-2 italic text-gray-700">
              📝 {item.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
