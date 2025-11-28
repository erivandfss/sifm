// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Páginas
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Portaria from "./pages/Portaria";
import Veiculos from "./pages/Veiculos";
import Motoristas from "./pages/Motoristas";
import Manutencao from "./pages/Manutencao";
import Relatorios from "./pages/Relatorios";
import Usuarios from "./pages/Usuarios";
import Configuracoes from "./pages/Configuracoes";
import HistoricoVeiculo from "./pages/HistoricoVeiculo";
import MapaFrota from "./pages/MapaFrota";
import ChecklistVeiculo from "./pages/ChecklistVeiculo";

// Layout com Header + Sidebar
import Layout from "./components/Layout";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login público */}
        <Route path="/login" element={<Login />} />

        {/* Todas as rotas protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/portaria" element={<Portaria />} />
                  <Route path="/veiculos" element={<Veiculos />} />
                  <Route path="/motoristas" element={<Motoristas />} />
                  <Route path="/manutencao" element={<Manutencao />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                  <Route path="/historico-veiculo" element={<HistoricoVeiculo />} />
                  <Route path="/mapa-frota" element={<MapaFrota />} />
                  <Route path="/checklist" element={<ChecklistVeiculo />} />

                  {/* Redireciona qualquer rota desconhecida para o dashboard */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}