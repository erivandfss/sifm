// src/components/HeaderUsuario.jsx
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HeaderUsuario() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-end items-center gap-4 bg-blue-900 px-8 py-4 shadow-lg">
      <div className="text-right text-white">
        <p className="font-semibold">{user.nome || user.email.split("@")[0]}</p>
        <p className="text-xs opacity-90">
          {user.role === "admin" ? "Administrador" :
           user.role === "operador" ? "Operador - Portaria" :
           user.role === "mantenedor" ? "Técnico de Manutenção" : "Usuário"}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
      >
        Sair
      </button>
    </div>
  );
}