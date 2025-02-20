import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiService } from  "../repositorio/RepositorioUsuario";
import { useUser } from "../control/SesionUsuario";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, usuarioActual } = useUser();

  const handleLogin = async () => {
    setError(null);
    try {
      const response = await ApiService.loginUser(email, password);
      if (!response.success) {
        throw new Error("Credenciales incorrectas");
      }
      
      const token = response.token;
      login(token);
      

      console.log(email);
      console.log(token);

      const userData = await ApiService.obtenerDatosUsuario(email, token);
      usuarioActual(userData);
      
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input 
        type="email" 
        placeholder="Correo electrónico" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Contraseña" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Acceder</button>
    </div>
  );
}


/*import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { loginUser }  from "../repositorio/RepositorioUsuario";
import { datosusuario }  from "../repositorio/RepositorioUsuario";
import  UsuarioController  from "../control/UsuarioController";
import { useUser } from "../control/SesionUsuario";
import Usuario from "../modelo/Usuario";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usuarioActual] = useState(new Usuario());
  const [error, setError] = useState(null);
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let jsonData;
    var usuarios = [];
    const result = await loginUser(email, password);
    if (result.success) {
      login(result.token);

      jsonData = await datosusuario(email , result.token);
      /*
      
      
      usuarios = jsonData.map(
        (item) => new Usuario(item.id, item.nombres, item.apellidos, item.direccionEnvio, item.email, item.fechaNacimiento, item.passwordHash,item.rol,item.creadoEn)
      );

      usuarioActual(usuarios[0]);*/
      /*
    } else {
      setError("Credenciales incorrectas");
    }


  };




  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Acceder</button>
      </form>
    </div>
  );
}

export default Login;
*/