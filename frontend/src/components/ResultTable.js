import React from "react";

function ResultTable({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

      {/* Heading */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        📊 Results
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">

          {/* Header */}
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              {Object.keys(data[0]).map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left font-semibold border-b"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition"
              >
                {Object.values(row).map((val, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-gray-700"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ResultTable;