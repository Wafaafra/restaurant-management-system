import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Inventory from "./pages/Inventory/Inventory";
import Suppliers from "./pages/Suppliers/Suppliers";
import Menu from "./pages/Menu/Menu";
import Expenses from "./pages/Expenses/Expenses";
import Purchases from "./pages/Purchases/Purchases";
import Employees from "./pages/Employees/Employees";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Menu */}
        <Route
          path="/menu"
          element={
            isAuthenticated ? (
              <Menu />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Inventory */}
        <Route
          path="/inventory"
          element={
            isAuthenticated ? (
              <Inventory />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /><Route
          path="/employees"
          element={
            isAuthenticated ? (
              <Employees />
            ) : (
              <Navigate to="/login" replace />
            )
         }
/>

        {/* Purchases */}
        <Route
          path="/purchases"
          element={
            isAuthenticated ? (
              <Purchases />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Suppliers */}
        <Route
          path="/suppliers"
          element={
            isAuthenticated ? (
              <Suppliers />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Expenses */}
        <Route
          path="/expenses"
          element={
            isAuthenticated ? (
              <Expenses />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;