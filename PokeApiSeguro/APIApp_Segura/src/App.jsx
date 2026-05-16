import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { checkAuth } from "./services/auth";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Detalles from "./pages/Detalles";
import Filtrar from "./pages/Filtrar";

import SecureRoute from "./components/SecureRoute";

export default function App() {
  const [isAuth, setIsAuth] = useState(null); // null = cargando

  useEffect(() => {
    checkAuth().then(setIsAuth);
  }, []);

  // ⏳ Mientras valida sesión
  if (isAuth === null) return <h1>Cargando...</h1>;

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔁 Redirección inicial */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 🌐 Ruta pública */}
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />

        {/* 🔐 Rutas protegidas */}
        <Route
          path="/home"
          element={
            <SecureRoute isAuth={isAuth}>
              <Home />
            </SecureRoute>
          }
        />

        <Route
          path="/detalles"
          element={
            <SecureRoute isAuth={isAuth}>
              <Detalles />
            </SecureRoute>
          }
        />

        <Route
          path="/filtrar"
          element={
            <SecureRoute isAuth={isAuth}>
              <Filtrar />
            </SecureRoute>
          }
        />

        {/* ❌ Ruta no encontrada */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
