import React from "react";

function SQLPreview({ sql, setSql, explanation, onExecute, executeLoading }) {
  if (!sql) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        🧠 Generated SQL
      </h2>

      {/* SQL Editor */}
      <textarea
        className="w-full bg-gray-900 text-green-400 font-mono p-4 rounded-lg mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        rows={6}
        value={sql}
        onChange={(e) => setSql(e.target.value)}
      />

      {/* Explanation Card */}
      {explanation && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
          <h3 className="font-semibold text-blue-700 mb-1">
            📖 Explanation
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {explanation}
          </p>
        </div>
      )}

      {/* Execute Button */}
      <div className="flex justify-end">
        <button
          onClick={onExecute}
          disabled={!sql || executeLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg disabled:bg-gray-400 transition flex items-center"
        >
          {executeLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Executing...
            </>
          ) : (
            "Generate Output"
          )}
        </button>
      </div>
    </div>
  );
}

export default SQLPreview;