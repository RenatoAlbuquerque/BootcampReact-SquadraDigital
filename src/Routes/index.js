import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageUf from "../Pages/PageUf";
import PageMun from "../Pages/PageMun";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PageUf />} />
        <Route path="/municipio" element={<PageMun />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
