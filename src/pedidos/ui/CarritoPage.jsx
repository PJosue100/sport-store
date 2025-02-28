import React from "react";
import { useCart } from "../control/SesionPedido";
import { useUser } from "../../usuario/control/SesionUsuario";
import { ApiService } from "../repositorio/RepositorioPedidos";

function CarritoPage() {
  const { cart, removeProduct, updateQuantity, clearCart } = useCart();
  const { user, token } = useUser();

  const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const handleSaveOrder = async () => {
    if (!user) {
      alert("Debe iniciar sesión para realizar un pedido.");
      return;
    }

    const pedido = {
      idUsuario: user.id,
      fechaPedido: new Date().toISOString(),
      total,
      estado: "pendiente"
    };

    try {
      const response = await ApiService.crearPedido(pedido, token);
      
      if (!response) {
        throw new Error("Respuesta vacía del servidor");
      }
    
      if (response.id) {
        for (const item of cart) {
          await ApiService.crearDetallePedido(
            {
              idPedido: response.id,
              idProducto: item.idProducto,
              cantidad: item.cantidad,
              precioUnitario: item.precio,
              subtotal: item.precio * item.cantidad,
            },
            token
          );
        }
    
        alert(`Pedido creado con éxito. ID: ${response.id}`);
        clearCart();
      } else {
        throw new Error("No se recibió un ID de pedido válido.");
      }
    } catch (error) {
      console.error("Error al crear el pedido:", error);
      alert("Error al crear el pedido.");
    }
  };

  return (
    <div className="container mt-20 mx-auto px-6 text-white">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-green-400">Carrito de Compras</h1>
      <div className="overflow-x-auto bg-gray-800 p-6 rounded-xl shadow-lg text-white">
        <table className="w-full text-left border-collapse text-white">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-2">Imagen</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Cantidad</th>
              <th className="p-2">Subtotal</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.idProducto} className="border-b border-gray-600">
                <td className="p-2">
                  <img src={item.imagenUrl} alt={item.descripcion} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="p-2">{item.descripcion}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.cantidad}
                    min="1"
                    className="w-16 border px-2 bg-gray-900 text-white text-center"
                    onChange={(e) => updateQuantity(item.idProducto, parseInt(e.target.value))}
                  />
                </td>
                <td className="p-2">Q {(item.precio * item.cantidad).toFixed(2)}</td>
                <td className="p-2">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => removeProduct(item.idProducto)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 bg-gray-800 p-4 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-bold">Total: Q {total.toFixed(2)}</h2>
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4 md:mt-0" onClick={handleSaveOrder}>
          Guardar Pedido
        </button>
      </div>
    </div>
  );
}

export default CarritoPage;
