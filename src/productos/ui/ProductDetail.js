import React from "react";
import { Link } from "react-router-dom";

function ProductDetail() {
  const productos = [
    { id: 1, nombre: "Producto 1", precio: "$10" },
    { id: 2, nombre: "Producto 2", precio: "$20" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {productos.map((p) => (
            <p>
            Any kind of content here. Such as &lt;p&gt;, &lt;table&gt;. You name it!
            </p>
      ))}
    </div>
  );
}

export default ProductDetail;