// React Util
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// JSX Components
import { Auth, Home } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/spotify-concept/" element={<Auth />} />
        <Route path="/spotify-concept/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
