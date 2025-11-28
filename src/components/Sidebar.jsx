import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  HomeIcon,
  ClipboardDocumentListIcon,
  TruckIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  MapIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth(); // 🔥 pega o tipo de usuário

  const role = user?.role || "operador"; // padrão

  const menu = [
    // 📌 TODOS OS USUÁRIOS
    { name: "Dashboard", path: "/", icon: <HomeIcon className="w-6 h-6" />, roles: ["admin", "operador", "mantenedor"] },
    { name: "Histórico Veículo", path: "/historico-veiculo", icon: <ClockIcon className="w-6 h-6" />, roles: ["admin", "operador", "mantenedor"] },

    // 📌 OPERADOR & ADMIN
    { name: "Portaria", path: "/portaria", icon: <ClipboardDocumentListIcon className="w-6 h-6" />, roles: ["admin", "operador"] },
    { name: "Veículos", path: "/veiculos", icon: <TruckIcon className="w-6 h-6" />, roles: ["admin", "operador"] },
    { name: "Motoristas", path: "/motoristas", icon: <UserIcon className="w-6 h-6" />, roles: ["admin", "operador"] },
    { name: "Relatórios", path: "/relatorios", icon: <DocumentChartBarIcon className="w-6 h-6" />, roles: ["admin", "operador"] },

    // 📌 MANTENEDOR & ADMIN
    { name: "Manutenção", path: "/manutencao", icon: <WrenchScrewdriverIcon className="w-6 h-6" />, roles: ["admin", "mantenedor"] },
    { name: "Checklist", path: "/checklist", icon: <ClipboardDocumentCheckIcon className="w-6 h-6" />, roles: ["admin", "mantenedor"] },

    // 📌 APENAS ADMIN
    { name: "Mapa da Frota", path: "/mapa-frota", icon: <MapIcon className="w-6 h-6" />, roles: ["admin"] },
    { name: "Usuários", path: "/usuarios", icon: <ShieldCheckIcon className="w-6 h-6" />, roles: ["admin"] },
    { name: "Configurações", path: "/configuracoes", icon: <Cog6ToothIcon className="w-6 h-6" />, roles: ["admin"] },
  ];

  return (
    <div className="w-64 bg-blue-900 text-white min-h-screen py-6 px-4 shadow-xl flex flex-col">

      {/* LOGO */}
      <h1 className="text-2xl font-bold mb-10 text-center">SIFM</h1>

      {/* MENU */}
      <nav className="flex-1 flex flex-col gap-2">
        {menu
          .filter((item) => item.roles.includes(role)) // 🔥 Filtra conforme o tipo de usuário
          .map((item) => {
            const ativo = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                  ${ativo ? "bg-blue-600 text-white shadow" : "text-blue-100 hover:bg-blue-700 hover:text-white"}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
      </nav>

      {/* RODAPÉ */}
      <div className="mt-auto text-center text-blue-200 text-sm">
        © 2025 SIFM
      </div>
    </div>
  );
}
