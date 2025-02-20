import React from "react";
import { Routes, Route } from "react-router-dom"
;
import HomePage from "../productos/ui/HomePage";
import ProductDetail from "../productos/ui/ProductDetail";
import CartPage from "../productos/ui/CartPage";

import AccountPage from "../usuario/ui/AccountPage";
import MantenimientoUsuarioPage from "../usuario/ui/MantenimientoUsuarioPage";
import LoginPage from "../usuario/ui/LoginPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/producto/:id" element={<ProductDetail />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/cuenta" element={<AccountPage />} />
      <Route path="/iniciosesion" element={<LoginPage />} />
      <Route path="/usuarios" element={<MantenimientoUsuarioPage />} />
    </Routes>
  );
}

export default AppRoutes;

