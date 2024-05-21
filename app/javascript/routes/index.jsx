import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlist from "../components/Playlist";
import Playlists from "../components/Playlists";

export default (
  <Router>
    <Routes>
      <Route path="/" exact element={<Playlists />} />
      <Route path="/playlist/:id" element={<Playlist />} />
      <Route path="/playlists" element={<Playlists />} />
    </Routes>
  </Router>
);
