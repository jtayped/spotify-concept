// React Util
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Components
import { Auth, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
