import React, { useEffect, useState } from "react";
import { useUser } from "../control/SesionUsuario";
import { ApiService } from "../repositorio/RepositorioUsuario";

export default function MantenimientoUsuarioPage() {
  const { token } = useUser();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    direccionEnvio: "",
    email: "",
    fechaNacimiento: "",
    passwordHash: "",
    rol: "cliente",
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await ApiService.obtenerUsuarios(token);
        setUsuarios(data);
      } catch (err) {
        setError("Error al obtener usuarios");
      }
    };
    fetchUsuarios();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await ApiService.actualizarUsuario(editingUser.id, formData, token);
        setUsuarios((prev) => prev.map((u) => (u.id === editingUser.id ? formData : u)));
      } else {
        const newUser = await ApiService.crearUsuario(formData, token);
        setUsuarios((prev) => [...prev, newUser]);
      }
      handleCancel();
    } catch {
      setError("Error al procesar la solicitud");
    }
  };

  const handleCancel = () => {
    setFormData({
      nombres: "",
      apellidos: "",
      direccionEnvio: "",
      email: "",
      fechaNacimiento: "",
      passwordHash: "",
      rol: "cliente",
    });
    setEditingUser(null);
  };

  return (
    <div className="container mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Lista de usuarios */}
      <div className="md:col-span-3 bg-gray-700 p-6 rounded-xl shadow-lg text-white overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Usuarios</h2>
        {error && <p className="text-red-500">{error}</p>}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-600 text-white">
              <th className="p-2">Nombres</th>
              <th className="p-2">Apellidos</th>
              <th className="p-2">Dirección</th>
              <th className="p-2">Email</th>
              <th className="p-2">Fecha de Nacimiento</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b border-gray-500">
                <td className="p-2">{usuario.nombres}</td>
                <td className="p-2">{usuario.apellidos}</td>
                <td className="p-2">{usuario.direccionEnvio}</td>
                <td className="p-2">{usuario.email}</td>
                <td className="p-2">{usuario.fechaNacimiento}</td>
                <td className="p-2">{usuario.rol}</td>
                <td className="p-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg"
                    onClick={() => {
                      setEditingUser(usuario);
                      setFormData(usuario);
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
        <h2 className="text-2xl font-bold mb-4">{editingUser ? "Editar Usuario" : "Crear Usuario"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required className="input" />
          <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required className="input" />
          <input type="text" name="direccionEnvio" placeholder="Dirección" value={formData.direccionEnvio} onChange={handleChange} required className="input" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="input" />
          <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required className="input" />
          <select name="rol" value={formData.rol} onChange={handleChange} className="input">
            <option value="cliente">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
          <div className="flex gap-4">
            <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg">
              {editingUser ? "Actualizar Usuario" : "Crear Usuario"}
            </button>
            <button type="button" onClick={handleCancel} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
