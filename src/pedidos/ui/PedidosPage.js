import React, { useEffect, useState } from "react";
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
    <div>
      <h1>Mis Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>No hay pedidos disponibles.</p>
      ) : (
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.id}>
              <h2>Pedido ID: {pedido.id}</h2>
              <p>Fecha: {pedido.fechaPedido}</p>
              <h3>Detalles:</h3>
              <ul>
                {detalles[pedido.id]?.map((detalle) => (
                  <li key={detalle.id}>
                    Producto: {productosInfo[detalle.idProducto] ? `${productosInfo[detalle.idProducto].descripcion} - Q ${productosInfo[detalle.idProducto].precio}.00` : "Cargando..."}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      {error && <p>Error al cargar productos: {error}</p>}
    </div>
  );
}

export default PedidosPage;
