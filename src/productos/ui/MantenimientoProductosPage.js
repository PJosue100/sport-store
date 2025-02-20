import React, { useEffect, useState } from "react";
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
    <div>
      <h2>Mantenimiento de Productos</h2>
      {mensaje && <p style={{ color: mensaje.includes("Error") ? "red" : "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="imagenUrl" placeholder="URL de la Imagen" value={formData.imagenUrl} onChange={handleChange} required />
        <input type="text" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required />
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
        <button type="submit">{editingProducto ? "Actualizar Producto" : "Crear Producto"}</button>
      </form>

      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.descripcion} - ${producto.precio}
            <button onClick={() => setEditingProducto(producto) || setFormData(producto)}>Modificar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}