import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../control/SesionUsuario";
import { ApiService } from  "../repositorio/RepositorioUsuario";


export default function AccountPage() {
  const { user, token } = useUser();
  const navigate = useNavigate();
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");
  const { logout } = useUser();

  return (
    <div>
      <h2>Mi Cuenta</h2>
      <p><strong>Nombre:</strong> {user?.nombres} {user?.apellidos}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Fecha de Nacimiento:</strong> {user?.fechaNacimiento}</p>
      <p><strong>Direccion de Envio:</strong> {user?.direccionEnvio}</p>
      <p><strong>Rol:</strong> {user?.rol}</p>


        <button onClick={() => navigate("/usuarios")} style={{ marginTop: "20px" }}>
          Mantenimiento de Usuarios
        </button>

        <button onClick={() => logout()} style={{ marginTop: "20px" }}>
          Cerrar Sesión
        </button>
    </div>
  );
}

      /*{isAdmin && (
        <button onClick={() => navigate("/usuarios")} style={{ marginTop: "20px" }}>
          Mantenimiento de Usuarios
        </button>

      )}*/