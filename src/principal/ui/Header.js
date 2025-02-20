import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../usuario/control/SesionUsuario";
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  const { user } = useUser(); // Obtiene el usuario desde el contexto

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/logo-store.png" alt="Logo" className="h-10" />
        </Link>

        {/* Barra de búsqueda */}
        <input
          type="text"
          placeholder="Buscar productos..."
          className="px-4 py-2 rounded border border-gray-300"
        />

        {/* Botón de cuenta */}
        <Link to={user ? "/cuenta" : "/iniciosesion"}>
          <button className="px-4 py-2 bg-blue-600 rounded">
            {user ? `${user.nombres} ${user.apellidos}` : "Mi cuenta"}
          </button>
        </Link>

        {/* Icono del carrito */}
        <Link to="/perfil">
          <button className="p-2">
            <FaShoppingCart size={24} />
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
