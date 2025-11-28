// src/pages/Configuracoes.jsx
import { useState } from "react";
import Input from "../components/Input";

export default function Configuracoes() {
  const [empresa, setEmpresa] = useState({
    nome: "Águas do Pantanal",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Projetada, 51 - Cáceres/MT",
    telefone: "(65) 99999-9999",
  });

  const [manutencao, setManutencao] = useState({
    trocaOleoKm: 8000,
    revisaoKm: 15000,
  });

  const [preferencias, setPreferencias] = useState({
    mostrarGrafico: true,
    modoEscuro: false,
    alertasSonoros: true,
  });

  const [seguranca, setSeguranca] = useState({
    timeout: 15,
    complexidadeSenha: "Alta",
  });

  const salvarTudo = () => {
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Configurações Gerais do Sistema
      </h1>

      {/* CARD 1 — Dados da Empresa */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Dados da Empresa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="Nome da empresa"
            value={empresa.nome}
            onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })}
          />
          <Input
            label="CNPJ"
            value={empresa.cnpj}
            onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })}
          />
          <Input
            label="Endereço"
            value={empresa.endereco}
            onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })}
          />
          <Input
            label="Telefone"
            value={empresa.telefone}
            onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })}
          />
        </div>
      </div>

      {/* CARD 2 — Parâmetros de Manutenção */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Parâmetros de Manutenção</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            type="number"
            label="KM para troca de óleo"
            value={manutencao.trocaOleoKm}
            onChange={(e) => setManutencao({ ...manutencao, trocaOleoKm: Number(e.target.value) })}
          />
          <Input
            type="number"
            label="KM para revisão geral"
            value={manutencao.revisaoKm}
            onChange={(e) => setManutencao({ ...manutencao, revisaoKm: Number(e.target.value) })}
          />
        </div>
      </div>

      {/* CARD 3 — Preferências */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Preferências do Sistema</h2>
        <div className="space-y-6">
          <label className="flex items-center gap-4 text-lg cursor-pointer">
            <input
              type="checkbox"
              checked={preferencias.mostrarGrafico}
              onChange={() => setPreferencias({ ...preferencias, mostrarGrafico: !preferencias.mostrarGrafico })}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Mostrar gráfico no dashboard</span>
          </label>

          <label className="flex items-center gap-4 text-lg cursor-pointer">
            <input
              type="checkbox"
              checked={preferencias.modoEscuro}
              onChange={() => setPreferencias({ ...preferencias, modoEscuro: !preferencias.modoEscuro })}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Ativar modo escuro</span>
          </label>

          <label className="flex items-center gap-4 text-lg cursor-pointer">
            <input
              type="checkbox"
              checked={preferencias.alertasSonoros}
              onChange={() => setPreferencias({ ...preferencias, alertasSonoros: !preferencias.alertasSonoros })}
              className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Habilitar alertas sonoros</span>
          </label>
        </div>
      </div>

      {/* CARD 4 — Segurança */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Segurança</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            type="number"
            label="Tempo máximo de sessão (minutos)"
            value={seguranca.timeout}
            onChange={(e) => setSeguranca({ ...seguranca, timeout: Number(e.target.value) })}
          />

          <div>
            <label className="block text-gray-700 font-medium mb-2">Força da senha</label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              value={seguranca.complexidadeSenha}
              onChange={(e) => setSeguranca({ ...seguranca, complexidadeSenha: e.target.value })}
            >
              <option>Baixa</option>
              <option>Média</option>
              <option>Alta</option>
            </select>
          </div>
        </div>
      </div>

      {/* BOTÃO SALVAR */}
      <div className="flex justify-end">
        <button
          onClick={salvarTudo}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xl px-12 py-4 rounded-xl shadow-lg transition transform hover:scale-105"
        >
          Salvar Todas as Configurações
        </button>
      </div>
    </div>
  );
}