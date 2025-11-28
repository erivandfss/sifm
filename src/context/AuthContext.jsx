// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula login persistente (depois você coloca localStorage + backend)
    const saved = localStorage.getItem("sifm-user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = (email, senha) => {
    // MOCK: remover quando tiver backend
    const mockUsers = {
      "admin@aguas.com": { email: "admin@aguas.com", role: "admin", nome: "Admin" },
      "portaria@aguas.com": { email: "portaria@aguas.com", role: "operador", nome: "José" },
      "manutencao@aguas.com": { email: "manutencao@aguas.com", role: "mantenedor", nome: "Márcio" },
    };

    if (mockUsers[email] && senha === "123") {
      const userData = mockUsers[email];
      localStorage.setItem("sifm-user", JSON.stringify(userData));
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("sifm-user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);