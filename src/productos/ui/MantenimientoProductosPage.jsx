import React, { useState } from "react";
import { useUser } from "../../usuario/control/SesionUsuario";
import useFetchProductos from "../repositorio/useFetchProductos";

export default function MantenimientoProductosPage() {
  const { token } = useUser();
  const { productos, error, crearProducto, actualizarProducto } = useFetchProductos(token);
  const [formData, setFormData] = useState({
    imagenUrl: "",
    descripcion: "",
    precio: "",
    creadoEn: new Date().toISOString(),
  });
  const [editingProducto, setEditingProducto] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProducto) {
        await actualizarProducto(editingProducto.id, formData);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await crearProducto(formData);
        setMensaje("Producto creado correctamente.");
      }
      setFormData({ imagenUrl: "", descripcion: "", precio: "", creadoEn: new Date().toISOString() });
      setEditingProducto(null);
    } catch {
      setMensaje("Error al procesar la solicitud.");
    }
  };

  return (
    <div className="container mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Lista de productos */}
      <div className="md:col-span-3 bg-gray-700 p-6 rounded-xl shadow-lg text-white overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Productos</h2>
        {mensaje && <p className={mensaje.includes("Error") ? "text-red-500" : "text-green-400"}>{mensaje}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="p-2">Imagen</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-b border-gray-500">
                <td className="p-2">
                  <img src={producto.imagenUrl} alt={producto.descripcion} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="p-2">{producto.descripcion}</td>
                <td className="p-2">Q{producto.precio}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                    onClick={() => {
                      setEditingProducto(producto);
                      setFormData(producto);
                    }}
                  >
                    Modificar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formulario */}
      <div className="md:col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-4">{editingProducto ? "Editar Producto" : "Crear Producto"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input type="text" name="imagenUrl" placeholder="URL de la Imagen" value={formData.imagenUrl} onChange={handleChange} required className="input" />
          {formData.imagenUrl && (
            <div className="w-full h-64 flex justify-center items-center bg-gray-700 rounded-lg overflow-hidden">
              <img src={formData.imagenUrl} alt="Vista previa" className="h-full object-cover" />
            </div>
          )}
          <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required className="input" />
          <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required className="input" />
          <div className="flex gap-4">
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
              {editingProducto ? "Actualizar Producto" : "Crear Producto"}
            </button>
            <button type="button" onClick={() => setEditingProducto(null)} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
