import { useState } from "react";
import axios from "axios";

import QueryInput from "./components/QueryInput";
import SQLPreview from "./components/SQLPreview";
import ResultTable from "./components/ResultTable";

function App() {
  const [query, setQuery] = useState("");
  const [sql, setSql] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [executeLoading, setExecuteLoading] = useState(false);

  const handlePreview = async () => {
    try {
      setPreviewLoading(true);
      setError("");
      setData([]);

      const res = await axios.post("http://127.0.0.1:8000/preview", null, {
        params: { query }
      });

      setSql(res.data.sql);
      setExplanation(res.data.explanation);
    } catch (err) {
      setError("Failed to generate SQL.");
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleExecute = async () => {
    try {
      if (executeLoading) return;
      setExecuteLoading(true);
      setError("");

      const res = await axios.post("http://127.0.0.1:8000/execute", {
        sql: sql
      });

      setData(res.data.data);
    } catch (err) {
      setError("Execution failed. Check your query.");
    } finally {
      setExecuteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center p-6">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            🎓 AI Student Query System
          </h1>
          <p className="text-gray-500 mt-2">
            Ask questions in natural language → Generate SQL → Get results
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            ❌ {error}
          </div>
        )}

        {/* PREVIEW LOADING */}
        {previewLoading && (
          <div className="flex items-center justify-center space-x-2 text-blue-600 mb-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>Generating SQL...</span>
          </div>
        )}

        {/* EXECUTE LOADING */}
        {executeLoading && (
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-600"></div>
            <span>Fetching results...</span>
          </div>
        )}

        {/* INPUT CARD */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            🔍 Enter Query
          </h2>

          <QueryInput
            query={query}
            setQuery={setQuery}
            onPreview={handlePreview}
            previewLoading={previewLoading}
          />
        </div>

        {/* SQL CARD */}
        {sql && (
          <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              🧠 Generated SQL
            </h2>

            <SQLPreview
              sql={sql}
              setSql={setSql}
              explanation={explanation}
              onExecute={handleExecute}
              executeLoading={executeLoading}
            />
          </div>
        )}

        {/* RESULT CARD */}
        {data.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              📊 Results
            </h2>

            <ResultTable data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;