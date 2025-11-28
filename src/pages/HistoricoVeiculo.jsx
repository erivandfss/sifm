import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function HistoricoVeiculo() {
  const [aba, setAba] = useState("informacoes");

  const veiculo = {
    nome: "Hilux 04",
    placa: "ABC-1234",
    ano: 2020,
    kmAtual: 87400,
    status: "Ativo"
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
    { id: "motoristas", label: "Motoristas" }
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      {/* Conteúdo */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Histórico do Veículo — {veiculo.nome}
        </h1>

        {/* Abas */}
        <div className="flex gap-4 mb-6">
          {Abas.map((item) => (
            <button
              key={item.id}
              onClick={() => setAba(item.id)}
              className={`px-4 py-2 rounded-lg font-semibold 
               ${aba === item.id ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">

          {/* ABA 1 INFORMACOES */}
          {aba === "informacoes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500">Nome</p>
                <p className="text-xl font-semibold">{veiculo.nome}</p>
              </div>

              <div>
                <p className="text-gray-500">Placa</p>
                <p className="text-xl font-semibold">{veiculo.placa}</p>
              </div>

              <div>
                <p className="text-gray-500">Ano</p>
                <p className="text-xl font-semibold">{veiculo.ano}</p>
              </div>

              <div>
                <p className="text-gray-500">KM Atual</p>
                <p className="text-xl font-semibold">{veiculo.kmAtual} km</p>
              </div>

              <div>
                <p className="text-gray-500">Status</p>
                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-lg font-semibold">
                  {veiculo.status}
                </span>
              </div>

            </div>
          )}

          {/* ABA 2 ENTRADAS */}
          {aba === "entradas" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="pb-2">Motorista</th>
                  <th className="pb-2">Tipo</th>
                  <th className="pb-2">Data</th>
                  <th className="pb-2">Hora</th>
                </tr>
              </thead>
              <tbody>
                {entradas.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{e.motorista}</td>
                    <td>{e.tipo}</td>
                    <td>{e.data}</td>
                    <td>{e.hora}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ABA 3 MANUTENÇÕES */}
          {aba === "manutencoes" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="pb-2">Tipo</th>
                  <th className="pb-2">KM</th>
                  <th className="pb-2">Data</th>
                  <th className="pb-2">Responsável</th>
                </tr>
              </thead>
              <tbody>
                {manutencoes.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{m.tipo}</td>
                    <td>{m.km}</td>
                    <td>{m.data}</td>
                    <td>{m.responsavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ABA 4 ABASTECIMENTOS */}
          {aba === "abastecimentos" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="pb-2">Litros</th>
                  <th className="pb-2">KM</th>
                  <th className="pb-2">Data</th>
                  <th className="pb-2">Posto</th>
                </tr>
              </thead>
              <tbody>
                {abastecimentos.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{a.litros}</td>
                    <td>{a.km}</td>
                    <td>{a.data}</td>
                    <td>{a.posto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* ABA 5 MOTORISTAS */}
          {aba === "motoristas" && (
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-gray-600">
                  <th className="pb-2">Motorista</th>
                  <th className="pb-2">Vezes que utilizou</th>
                  <th className="pb-2">Último uso</th>
                </tr>
              </thead>
              <tbody>
                {motoristas.map((m) => (
                  <tr key={m.id} className="border-b hover:bg-gray-50">
                    <td className="py-2">{m.nome}</td>
                    <td>{m.vezes}</td>
                    <td>{m.ultimoUso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}
