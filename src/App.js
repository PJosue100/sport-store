import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./usuario/control/SesionUsuario";
import AppRoutes from "./utileria/Routes";
import Header from "./principal/ui/Header";

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <main className="container mx-auto p-4">
          <AppRoutes />
        </main>
      </Router>
    </UserProvider>
  );
}

export default App;
