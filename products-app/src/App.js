import React, { useEffect, useState } from "react";
import ImageFormAPI from "./imageForm";
import ProductEffectAPI from "./productsAffectAPI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <ImageFormAPI></ImageFormAPI>
    // <ProductEffectAPI></ProductEffectAPI>
    <Router>
      <Routes>
        <Route path="/" element={<ProductEffectAPI />} />

        <Route path="/newProduct" element={<ImageFormAPI />} />
      </Routes>
    </Router>
  );
}

export default App;
