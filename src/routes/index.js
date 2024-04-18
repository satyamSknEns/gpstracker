import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import GeoLocation from "../pages/geoLocation";

const RoutePage = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/get-location" element={<GeoLocation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutePage;
