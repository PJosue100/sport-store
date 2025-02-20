import React from "react";
import { useCart } from "../control/SesionPedido";
import { useUser } from "../../usuario/control/SesionUsuario";
import { ApiService } from "../repositorio/RepositorioPedidos";

function CarritoPage() {
  const { cart, removeProduct, updateQuantity, clearCart } = useCart();
  const { user, token } = useUser();

  const handleSaveOrder = async () => {
    if (!user) {
      alert("Debe iniciar sesión para realizar un pedido.");
      return;
    }

    const pedido = {
      idUsuario: user.id,
      fechaPedido: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0),
      estado: "pruebajueves"
    };

    try {
      const response = await ApiService.crearPedido(pedido, token);
      
      if (!response) {
        throw new Error("Respuesta vacía del servidor");
      }
    
      console.log("Respuesta del pedido:", response);
    
      if (response.id) {
        console.log("ID Pedido:", response.id);
    
        for (const item of cart) {
          await ApiService.crearDetallePedido(
            {
              idPedido: response.id, // Ahora se accede correctamente
              idProducto: item.idProducto,
              cantidad: item.cantidad,
              precioUnitario: item.precio * item.cantidad, // Corregido
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Carrito de Compras</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Producto</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">Subtotal</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.idProducto} className="border">
              <td className="p-2">{item.descripcion}</td>
              <td className="p-2">
                <input
                  type="number"
                  value={item.cantidad}
                  min="1"
                  className="w-16 border px-2"
                  onChange={(e) => updateQuantity(item.idProducto, parseInt(e.target.value))}
                />
              </td>
              <td className="p-2">₡{(item.precio * item.cantidad).toFixed(2)}</td>
              <td className="p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => removeProduct(item.idProducto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSaveOrder}>
          Guardar Pedido
        </button>
      </div>
    </div>
  );
}

export default CarritoPage;
