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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="form-area bg-cover bg-center w-full p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-6">
          <span className="animate-globe">🌍</span> Location Search
        </h1>
        <div id="content">
          <form className="form-inline ">
            <div className="input-group mb-3 w-full max-w-md mx-auto">
              <input
                type="text"
                id="search"
                className="form-control search-form custom-input"
                placeholder="e.g. cafe in Kuala Lumpur"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <span className="input-group-btn" style={{ width: "39px" }}>
                <button
                  id="search-this"
                  type="button"
                  className="pull-right btn btn-default search-btn"
                  onClick={handleSearch}
                  disabled={loading}
                >
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          <p className="text-center">Find your favorite places!</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {results.length > 0 && (
          <div className="mt-6 ml-8 mr-8">
            <h2 className="text-xl font-semibold  m-8">Results:</h2>
            <div className="overflow-x-auto">
              <table className="styled-table w-full border-collapse">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td>{r.address}</td>
                      <td>{r.lat}</td>
                      <td>{r.lon}</td>
                      <td>{r.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => downloadFile("csv")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Download CSV
              </button>
              <button
                onClick={() => downloadFile("excel")}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
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
