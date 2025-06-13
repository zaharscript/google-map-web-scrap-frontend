import { useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError(null); // Clear previous errors
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
      setError("Failed to fetch results. Please try again.");
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
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .search-container {
            background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #1e3a8a 100%);
            min-height: 200px;
          }
          .search-input:focus {
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
          }
          .search-button:hover {
            transform: scale(1.05);
          }
        `}
      </style>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Hero Section */}
        <div
          className="form-area bg-cover bg-center w-full p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, #1e40af 0%, #1d4ed8 50%, #1e3a8a 100%)",
            minHeight: "200px",
            padding: "2rem 1rem",
          }}
        >
          <h1
            className="font-bold text-white mb-6"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              marginBottom: "2rem",
            }}
          >
            <span
              className="inline-block"
              style={{
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "rotate(45deg)")}
              onMouseLeave={(e) => (e.target.style.transform = "rotate(0deg)")}
              role="img"
              aria-label="Globe"
            >
              🌍
            </span>
            Location Search
          </h1>

          <div id="content">
            <div className="mb-6 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
              <div className="flex rounded-lg overflow-hidden shadow-lg border border-white/20">
                <input
                  type="text"
                  id="search"
                  className="flex-1 min-h-10 sm:min-h-12 px-3 sm:px-4 text-sm sm:text-base 
                           bg-white text-gray-900 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  placeholder="e.g. cafe in Kuala Lumpur"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  style={{ touchAction: "manipulation" }}
                  aria-label="Search location"
                />
                <button
                  id="search-this"
                  type="button"
                  className="min-h-10 sm:min-h-12 w-10 sm:w-12 bg-white text-blue-600 
                           hover:bg-blue-50 hover:scale-105 transition-all duration-200 
                           flex items-center justify-center focus:outline-none focus:ring-2 
                           focus:ring-white focus:ring-opacity-50"
                  onClick={handleSearch}
                  disabled={loading}
                  aria-label="Search button"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <p className="text-sm sm:text-base text-white opacity-90 mt-2">
              Find your favorite places!
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div
          className="w-full max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl 
                        mx-auto bg-white p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 
                        rounded-lg shadow-md mt-4 sm:mt-6"
        >
          {error && <p className="text-red-500">{error}</p>}
          {results.length > 0 && (
            <div className="mt-3 sm:mt-4 md:mt-6">
              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 
                             font-semibold text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center"
              >
                Results:
              </h2>

              <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 mb-4 sm:mb-6">
                <table className="styled-table w-full border-collapse min-w-full">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r) => (
                      <tr key={r.id}>
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

              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={() => downloadFile("csv")}
                  className="text-blue-600 hover:text-blue-800 underline"
                  aria-label="Download results as CSV"
                >
                  Download CSV
                </button>
                <button
                  onClick={() => downloadFile("excel")}
                  className="text-blue-600 hover:text-blue-800 underline"
                  aria-label="Download results as Excel"
                >
                  Download Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
