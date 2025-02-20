import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchProductos from "../repositorio/useFetchProductos";
import ProductoController from "../control/ProductoController";
import { useCart } from "../../pedidos/control/SesionPedido";

function HomePage() {
  const { productos, error } = useFetchProductos();
  const [listaProductos, setListaProductos] = useState([]);
  const { addProduct } = useCart();

  useEffect(() => {
    if (productos.length > 0) {
      ProductoController.setProductos(productos);
      setListaProductos(ProductoController.getProductos());
    }
  }, [productos]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listaProductos.map((p) => (
          <div key={p.id} className="bg-white border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <img
              src={p.imagenUrl}
              alt={p.descripcion}
              className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
              onClick={() => addProduct({ idProducto: p.id, descripcion: p.descripcion, precio: p.precio, cantidad: 1 })}
            />
            <h2 className="text-lg font-semibold text-gray-800 truncate">{p.descripcion}</h2>
            <p className="text-lg font-bold text-gray-900">₡{p.precio.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;










/*import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetchProductos from "../repositorio/useFetchProductos";
import ProductoController from "../control/ProductoController";

function HomePage() {
  const { productos, error } = useFetchProductos();
  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    if (productos.length > 0) {
      ProductoController.setProductos(productos);
      setListaProductos(ProductoController.getProductos());
    }
  }, [productos]);

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listaProductos.map((p) => (
          <Link
            key={p.id}
            to={`/producto/${p.id}`}
            className="bg-white border rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={p.imagenUrl}
              alt={p.descripcion}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 truncate">{p.descripcion}</h2>
            <p className="text-lg font-bold text-gray-900">₡{p.precio.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;*/


