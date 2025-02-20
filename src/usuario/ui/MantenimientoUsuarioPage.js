import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../control/SesionUsuario";
import { ApiService } from  "../repositorio/RepositorioUsuario";

export default  function MantenimientoUsuarioPage() {
        const { token } = useUser();
        const [usuarios, setUsuarios] = useState([]);
        const [error, setError] = useState(null);
        const [formData, setFormData] = useState({ nombres: "", apellidos: "",direccionEnvio: "", email: "", fechaNacimiento: "", passwordHash: "", rol: "cliente" });
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
            setFormData({ nombres: "", apellidos: "",direccionEnvio: "", email: "", fechaNacimiento: "", passwordHash: "", rol: "cliente" });
            setEditingUser(null);
          } catch {
            setError("Error al procesar la solicitud");
          }
        };
      
        return (
          <div>
            <h2>Mantenimiento de Usuarios</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} onChange={handleChange} required />
              <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} required />
              <input type="text" name="direccionEnvio" placeholder="Direccion" value={formData.direccionEnvio} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />
              <input type="password" name="passwordHash" placeholder="Contraseña" value={formData.passwordHash} onChange={handleChange} required />
              <select name="rol" value={formData.rol} onChange={handleChange}>
                <option value="cliente">Cliente</option>
                <option value="admin">Administrador</option>
              </select>
              <button type="submit">{editingUser ? "Actualizar Usuario" : "Crear Usuario"}</button>
            </form>
            
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id}>
                  {usuario.nombres} {usuario.apellidos} - {usuario.email}
                  <button onClick={() => setEditingUser(usuario) || setFormData(usuario)}>Modificar</button>
                </li>
              ))}
            </ul>
          </div>
        );
      }
      