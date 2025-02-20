import React from "react";
import { Routes, Route } from "react-router-dom"
;
import HomePage from "../productos/ui/HomePage";
import CarritoPage from "../pedidos/ui/CarritoPage";
import PedidosPage from "../pedidos/ui/PedidosPage";
import MantenimientoProductosPage from "../productos/ui/MantenimientoProductosPage";



import AccountPage from "../usuario/ui/AccountPage";
import MantenimientoUsuarioPage from "../usuario/ui/MantenimientoUsuarioPage";
import LoginPage from "../usuario/ui/LoginPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/carrito" element={<CarritoPage />} />
      <Route path="/cuenta" element={<AccountPage />} />
      <Route path="/iniciosesion" element={<LoginPage />} />
      <Route path="/usuarios" element={<MantenimientoUsuarioPage />} />
      <Route path="/productos" element={<MantenimientoProductosPage />} />
      <Route path="/pedidos" element={<PedidosPage />} />
    </Routes>
  );
}

export default AppRoutes;

