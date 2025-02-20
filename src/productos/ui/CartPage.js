import React from "react";
import { Link } from "react-router-dom";

function CartPage() {
  const productos = [
    { id: 1, nombre: "Producto 1", precio: "$10" },
    { id: 2, nombre: "Producto 2", precio: "$20" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {productos.map((p) => (
            <p>
            Soy el carrito ajajajaj
            </p>
      ))}
    </div>
  );
}

export default CartPage;