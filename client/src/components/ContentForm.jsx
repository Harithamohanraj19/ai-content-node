import React, { useState } from "react";
import axios from "axios";

export default function ContentForm() {
  const [topic, setTopic] = useState("");
  const [mode, setMode] = useState("generate");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    setError("");

    try {
        const { data } = await axios.post("http://localhost:5000/api/ai/generate", {
          topic,
          mode,
        });
        setResult(data.content);
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again!");
      } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
        {/* <h1 className="text-2xl font-bold text-center text-blue-700 mb-6">
          AI Content Assistant
        </h1> */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Text Area */}
          <textarea
            className="w-full p-3 border-4 border-black rounded-lg outline-none resize-none focus:border-blue-600 transition duration-200 text-gray-800"
            placeholder="Enter your topic or text..."
            rows={4}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />

          {/* Dropdown - centered and well aligned */}
          <div className="flex justify-center">
            <select
              className="w-2/3 p-3 border-2 border-blue-500 rounded-lg bg-blue-50 text-blue-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none cursor-pointer"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="generate">Generate</option>
              <option value="summarize">Summarize</option>
              <option value="rewrite">Rewrite</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-200"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-red-600 font-medium bg-red-50 p-2 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {/* Result Box */}
        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-blue-700 mb-2 text-lg">AI Result:</h3>
            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
