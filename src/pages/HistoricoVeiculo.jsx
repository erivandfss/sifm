// src/pages/HistoricoVeiculo.jsx
import { useState } from "react";

export default function HistoricoVeiculo() {
  const [aba, setAba] = useState("informacoes");

  const veiculo = {
    nome: "Hilux 04",
    placa: "ABC-1234",
    ano: 2020,
    kmAtual: 87400,
    status: "Ativo",
  };

  const entradas = [
    { id: 1, motorista: "Carlos", data: "2025-01-20", hora: "08:12", tipo: "Saída" },
    { id: 2, motorista: "Carlos", data: "2025-01-20", hora: "12:40", tipo: "Entrada" },
  ];

  const manutencoes = [
    { id: 1, tipo: "Troca de Óleo", km: 87000, data: "2025-01-12", responsavel: "Oficina Interna" },
    { id: 2, tipo: "Alinhamento", km: 82000, data: "2024-11-18", responsavel: "Autocenter Silva" },
  ];

  const abastecimentos = [
    { id: 1, litros: 52, data: "2025-01-18", km: 86500, posto: "Posto Bandeira" },
    { id: 2, litros: 48, data: "2025-01-10", km: 85500, posto: "Posto 3 Corações" },
  ];

  const motoristas = [
    { id: 1, nome: "Carlos Silva", vezes: 32, ultimoUso: "2025-01-20" },
    { id: 2, nome: "João Pereira", vezes: 12, ultimoUso: "2024-12-15" },
  ];

  const Abas = [
    { id: "informacoes", label: "Informações Gerais" },
    { id: "entradas", label: "Entradas/Saídas" },
    { id: "manutencoes", label: "Manutenções" },
    { id: "abastecimentos", label: "Abastecimentos" },
    { id: "motoristas", label: "Motoristas" },
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* TÍTULO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Histórico do Veículo — {veiculo.nome}
        </h1>
        <p className="text-lg text-gray-600">Placa: <span className="font-bold">{veiculo.placa}</span></p>
      </div>

      {/* ABAS DE NAVEGAÇÃO */}
      <div className="flex flex-wrap gap-3 mb-8">
        {Abas.map((item) => (
          <button
            key={item.id}
            onClick={() => setAba(item.id)}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md
              ${aba === item.id
                ? "bg-blue-700 text-white shadow-blue-500/50"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-8">

          {/* ABA 1 - INFORMAÇÕES GERAIS */}
          {aba === "informacoes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                <p className="text-blue-600 font-medium mb-1">Nome do Veículo</p>
                <p className="text-2xl font-bold text-blue-900">{veiculo.nome}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-300">
                <p className="text-gray-600 font-medium mb-1">Placa</p>
                <p className="text-2xl font-bold text-gray-900">{veiculo.placa}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <p className="text-purple-600 font-medium mb-1">Ano</p>
                <p className="text-2xl font-bold text-purple-900">{veiculo.ano}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                <p className="text-orange-600 font-medium mb-1">KM Atual</p>
                <p className="text-2xl font-bold text-orange-900">{veiculo.kmAtual.toLocaleString()} km</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                <p className="text-green-600 font-medium mb-1">Status</p>
                <span className="inline-block px-6 py-3 bg-green-600 text-white font-bold rounded-full text-lg">
                  {veiculo.status}
                </span>
              </div>
            </div>
          )}

          {/* ABA 2 - ENTRADAS/SAÍDAS */}
          {aba === "entradas" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Motorista</th>
                    <th className="pb-4">Tipo</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {entradas.map((e) => (
                    <tr key={e.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 font-medium">{e.motorista}</td>
                      <td className="py-4">
                        <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${e.tipo === "Saída" ? "bg-red-600" : "bg-green-600"}`}>
                          {e.tipo}
                        </span>
                      </td>
                      <td className="py-4">{e.data}</td>
                      <td className="py-4">{e.hora}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ABA 3 - MANUTENÇÕES */}
          {aba === "manutencoes" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Tipo de Manutenção</th>
                    <th className="pb-4">KM</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Responsável</th>
                  </tr>
                </thead>
                <tbody>
                  {manutencoes.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 font-medium">{m.tipo}</td>
                      <td className="py-4">{m.km.toLocaleString()} km</td>
                      <td className="py-4">{m.data}</td>
                      <td className="py-4 text-blue-600 font-medium">{m.responsavel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ABA 4 - ABASTECIMENTOS */}
          {aba === "abastecimentos" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Litros</th>
                    <th className="pb-4">KM</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">Posto</th>
                  </tr>
                </thead>
                <tbody>
                  {abastecimentos.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 font-bold text-green-700">{a.litros} L</td>
                      <td className="py-4">{a.km.toLocaleString()} km</td>
                      <td className="py-4">{a.data}</td>
                      <td className="py-4">{a.posto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ABA 5 - MOTORISTAS */}
          {aba === "motoristas" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Motorista</th>
                    <th className="pb-4">Vezes que Utilizou</th>
                    <th className="pb-4">Último Uso</th>
                  </tr>
                </thead>
                <tbody>
                  {motoristas.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 font-medium">{m.nome}</td>
                      <td className="py-4 text-center font-bold text-blue-700">{m.vezes}x</td>
                      <td className="py-4">{m.ultimoUso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}