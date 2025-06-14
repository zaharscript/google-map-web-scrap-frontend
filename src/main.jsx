import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Import Font Awesome CSS (required)
import "@fortawesome/fontawesome-free/css/all.min.css";
// Import Font Awesome JS (optional if you only use static icons)
import "@fortawesome/fontawesome-free/js/all.min.js";
// main.jsx
import "./index.css"; // This MUST be present for Tailwind to work

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
