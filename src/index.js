// React Util
import React from "react";
import ReactDOM from "react-dom/client";

// CSS
import "./index.css";

// JSX Components
import App from "./App1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
