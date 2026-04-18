import React from "react";

function QueryInput({ query, setQuery, onPreview, previewLoading }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      
      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        🔍 Ask your query
      </h2>

      {/* Input + Button */}
      <div className="flex flex-col sm:flex-row gap-3">
        
        <input
          className="flex-1 border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="e.g., Top 3 students in math"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={onPreview}
          disabled={!query || previewLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg disabled:bg-gray-400 transition flex items-center justify-center"
        >
          {previewLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            "Preview"
          )}
        </button>
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 mt-3">
        Try: "Top 5 students in science" or "Students with marks above 80"
      </p>
    </div>
  );
}

export default QueryInput;