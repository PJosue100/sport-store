import React, { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

import { useUser } from "../../usuario/control/SesionUsuario";
import { ApiService } from "../repositorio/RepositorioPedidos";
import useFetchProductos from "../../productos/repositorio/useFetchProductos";

function PedidosPage() {
  const { user, token } = useUser();
  const [pedidos, setPedidos] = useState([]);
  const [detalles, setDetalles] = useState({});
  const [productosInfo, setProductosInfo] = useState({});
  const { productos, error } = useFetchProductos(token);

  useEffect(() => {
    if (user) {
      obtenerPedidos();
    }
  }, [user]);

  const obtenerPedidos = async () => {
    try {
      const pedidosUsuario = await ApiService.obtenerPedidosPorUsuario(user.id, token);
      setPedidos(pedidosUsuario);
      pedidosUsuario.forEach(async (pedido) => {
        const detallesPedido = await ApiService.obtenerDetallesPorPedido(pedido.id, token);
        setDetalles((prevDetalles) => ({ ...prevDetalles, [pedido.id]: detallesPedido }));
        detallesPedido.forEach(async (detalle) => {
          const producto = await obtenerProductoPorId(detalle.idProducto);
          setProductosInfo((prevProductos) => ({ ...prevProductos, [detalle.idProducto]: producto }));
        });
      });
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };

  const obtenerProductoPorId = async (idProducto) => {
    try {
      const response = await fetch(`http://localhost:8085/api/productos/${idProducto}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener producto");
      }
      return await response.json();
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return null;
    }
  };

  return (
    <div className="container mt-24">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-400">Mis Pedidos</h1>
      {pedidos.length === 0 ? (
        <p className="text-center text-lg text-gray-300">No hay pedidos disponibles.</p>
      ) : (
        <div className="overflow-x-auto">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="bg-gray-800 p-6 mb-6 rounded-lg shadow-md">
              <h2 className="text-2xl text-green-400">Pedido No.: {pedido.id}</h2>
              <p className="text-gray-300">Fecha: {format(parseISO(pedido.fechaPedido), "d MMM yyyy, HH:mm", { locale: es })}</p>
              <table className="w-full mt-4 border-collapse">
                <thead>
                  <tr className="bg-gray-700 text-left text-white">
                    <th className="p-3">Imagen</th>
                    <th className="p-3">Producto</th>
                    <th className="p-3">Cantidad</th>
                    <th className="p-3">Precio</th>
                    <th className="p-3">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detalles[pedido.id]?.map((detalle) => (
                    <tr key={detalle.id} className="border-b border-gray-600">
                      <td className="p-3">
                        {productosInfo[detalle.idProducto]?.imagenUrl ? (
                          <img
                            src={productosInfo[detalle.idProducto].imagenUrl}
                            alt={productosInfo[detalle.idProducto].descripcion}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "Cargando..."
                        )}
                      </td>
                      <td className="p-3 text-white">
                        {productosInfo[detalle.idProducto]?.descripcion || "Cargando..."}
                      </td>
                      <td className="p-3 text-green-400">{detalle.cantidad}</td>
                      <td className="p-3 text-green-400">Q {productosInfo[detalle.idProducto]?.precio}.00</td>
                      <td className="p-3 text-green-400">Q {detalle.cantidad * productosInfo[detalle.idProducto]?.precio}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-right text-green-400 text-lg font-bold mt-4">
                Total: Q {detalles[pedido.id]?.reduce((total, detalle) => total + (detalle.cantidad * (productosInfo[detalle.idProducto]?.precio || 0)), 0)}.00
              </p>
            </div>
          ))}
        </div>
      )}
      {error && <p className="text-red-500 text-center">Error al cargar productos: {error}</p>}
    </div>
  );
}

export default PedidosPage;

