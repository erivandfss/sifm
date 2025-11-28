import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

export default function App() {
  return (
    <Router>
      <Routes>

        {/* TELA PRINCIPAL */}
        <Route path="/" element={<Dashboard />} />

        {/* PORTARIA */}
        <Route path="/portaria" element={<Portaria />} />

        {/* VEÍCULOS */}
        <Route path="/veiculos" element={<Veiculos />} />

        {/* MOTORISTAS */}
        <Route path="/motoristas" element={<Motoristas />} />

        {/* MANUTENÇÃO */}
        <Route path="/manutencao" element={<Manutencao />} />

        {/* RELATÓRIOS */}
        <Route path="/relatorios" element={<Relatorios />} />

        {/* USUÁRIOS & PERMISSÕES */}
        <Route path="/usuarios" element={<Usuarios />} />

        {/* CONFIGURAÇÕES DO SISTEMA */}
        <Route path="/configuracoes" element={<Configuracoes />} />

        {/* HISTÓRICO COMPLETO DO VEÍCULO */}
        <Route path="/historico-veiculo" element={<HistoricoVeiculo />} />

        {/* MAPA DA FROTA */}
        <Route path="/mapa-frota" element={<MapaFrota />} />

        {/* CHECKLIST DO VEÍCULO */}
        <Route path="/checklist" element={<ChecklistVeiculo />} />

      </Routes>
    </Router>
  );
}
