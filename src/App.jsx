import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await axios.post("http://localhost:8000/predict", { text });
      setResult(res.data);
    } catch (err) {
      setResult({ error: "Could not connect to server." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-purple-700 mb-4 text-center">🧠 NLP Anomaly Detector</h1>
        <textarea
          className="w-full border border-purple-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="5"
          placeholder="Enter a message to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-full bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition"
          onClick={handleCheck}
          disabled={loading || !text.trim()}
        >
          {loading ? "Checking..." : "Check for Anomaly"}
        </button>
        {result && (
          <div className="mt-6 p-4 bg-purple-50 border border-purple-300 rounded-xl">
            {result.error ? (
              <p className="text-red-600 font-semibold">{result.error}</p>
            ) : (
              <>
                <p className="text-lg">
                  <strong>Prediction:</strong>{" "}
                  <span className={result.anomaly ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                    {result.anomaly ? "Anomalous (Spam)" : "Normal"}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong>Score:</strong> {result.score}
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}