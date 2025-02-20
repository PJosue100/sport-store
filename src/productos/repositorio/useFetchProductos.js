import { useState, useEffect } from "react";

const API_URL = "http://10.1.0.86:8083/api/productos/publico";
//const API_URL = "http://localhost:8080/api/productos/publico";

function useFetchProductos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (response.status === 403) {
          throw new Error("Acceso denegado");
        }
        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message));
  }, []);

  return { productos, error };
}

export default useFetchProductos;
