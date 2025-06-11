import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/search`,
        { query },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setResults(response.data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (type) => {
    window.open(
      `${import.meta.env.VITE_API_BASE_URL}/download/${type}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4">
      <div className="w-full max-w-screen-xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-blue-700 mb-6">
          🌍 Location Search
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            className="w-full sm:w-2/3 md:w-1/2 px-4 py-2 border rounded shadow-sm focus:outline-none"
            placeholder="e.g. grocery in Johor Bahru"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <i className="fa fa-search mr-2" />
            Search
          </button>
        </div>

        {results.length > 0 && (
          <div className="bg-white shadow rounded-lg p-4 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">Results:</h2>
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Latitude</th>
                  <th className="p-2 border">Longitude</th>
                  <th className="p-2 border">Type</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-2 border">{r.name}</td>
                    <td className="p-2 border">{r.address}</td>
                    <td className="p-2 border">{r.lat}</td>
                    <td className="p-2 border">{r.lon}</td>
                    <td className="p-2 border">{r.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => downloadFile("csv")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              >
                Download CSV
              </button>
              <button
                onClick={() => downloadFile("excel")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
              >
                Download Excel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
