// src/pages/Relatorios.jsx
import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Relatorios() {
  const [tipo, setTipo] = useState("manutencao");
  const [filtroDataIni, setFiltroDataIni] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");

  // Dados simulados (depois você conecta com API ou Zustand)
  const manutencoes = [
    { id: 1, veiculo: "Hilux 04", tipo: "Troca de Óleo", data: "2025-01-12", km: 87000 },
    { id: 2, veiculo: "Caminhão 01", tipo: "Revisão Geral", data: "2025-01-20", km: 152540 },
    { id: 3, veiculo: "Saveiro 03", tipo: "Alinhamento", data: "2025-01-18", km: 65200 },
  ];

  const entradas = [
    { id: 1, motorista: "Carlos Silva", veiculo: "Hilux 04", hora: "08:12", data: "2025-01-21", tipo: "Saída" },
    { id: 2, motorista: "Maria Souza", veiculo: "Saveiro 03", hora: "14:30", data: "2025-01-21", tipo: "Entrada" },
    { id: 3, motorista: "João Pereira", veiculo: "Caminhão 01", hora: "06:45", data: "2025-01-20", tipo: "Saída" },
  ];

  const veiculos = [
    { id: 1, nome: "Hilux 04", placa: "ABC-1234", km: 87400, status: "Ativo" },
    { id: 2, nome: "Saveiro 03", placa: "XYZ-8899", km: 65200, status: "Em uso" },
    { id: 3, nome: "Caminhão 01", placa: "PPP-5521", km: 152540, status: "Oficina" },
  ];

  const motoristas = [
    { id: 1, nome: "Carlos Silva", cnh: "12345678", validade: "2026-05-10", usos: 42 },
    { id: 2, nome: "Maria Souza", cnh: "87654321", validade: "2027-01-20", usos: 28 },
    { id: 3, nome: "João Pereira", cnh: "11223344", validade: "2025-12-15", usos: 35 },
  ];

  const exportarPDF = () => {
    alert("PDF gerado com sucesso! (em breve integração com jsPDF)");
  };

  const exportarExcel = () => {
    alert("Excel gerado com sucesso! (em breve integração com xlsx)");
  };

  const filtrarPorData = (lista, campoData) => {
    if (!filtroDataIni && !filtroDataFim) return lista;
    return lista.filter(item => {
      const dataItem = new Date(item[campoData]);
      const ini = filtroDataIni ? new Date(filtroDataIni) : null;
      const fim = filtroDataFim ? new Date(filtroDataFim) : null;
      if (ini && dataItem < ini) return false;
      if (fim && dataItem > fim) return false;
      return true;
    });
  };

  const dadosFiltrados = () => {
    switch (tipo) {
      case "manutencao": return filtrarPorData(manutencoes, "data");
      case "entradas": return filtrarPorData(entradas, "data");
      case "veiculos": return veiculos;
      case "motoristas": return motoristas;
      default: return [];
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* TÍTULO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Relatórios Gerenciais</h1>
        <p className="text-lg text-gray-600">Análise completa da frota com exportação para PDF e Excel</p>
      </div>

      {/* CARD DE FILTROS */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Filtros do Relatório</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Select
            label="Tipo de Relatório"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            options={[
              { label: "Manutenções Realizadas", value: "manutencao" },
              { label: "Entradas e Saídas", value: "entradas" },
              { label: "Frota de Veículos", value: "veiculos" },
              { label: "Cadastro de Motoristas", value: "motoristas" },
            ]}
          />

          <Input
            type="date"
            label="Data Inicial"
            value={filtroDataIni}
            onChange={(e) => setFiltroDataIni(e.target.value)}
          />

          <Input
            type="date"
            label="Data Final"
            value={filtroDataFim}
            onChange={(e) => setFiltroDataFim(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-8 gap-4">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105">
            Aplicar Filtros
          </button>
        </div>
      </div>

      {/* RESULTADO DO RELATÓRIO */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h2 className="text-3xl font-bold">
            {tipo === "manutencao" && "Relatório de Manutenções"}
            {tipo === "entradas" && "Relatório de Movimentações"}
            {tipo === "veiculos" && "Relatório da Frota"}
            {tipo === "motoristas" && "Relatório de Motoristas"}
          </h2>
          <p className="mt-2 opacity-90">
            Total de registros: <strong>{dadosFiltrados().length}</strong>
          </p>
        </div>

        <div className="p-8">
          {dadosFiltrados().length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-2xl">Nenhum dado encontrado para o período selecionado</p>
            </div>
          ) : (
            <>
              {/* MANUTENÇÕES */}
              {tipo === "manutencao" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-bold">
                        <th className="pb-4">Veículo</th>
                        <th className="pb-4">Tipo</th>
                        <th className="pb-4">Data</th>
                        <th className="pb-4">KM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosFiltrados().map((m) => (
                        <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                          <td className="py-5 font-medium">{m.veiculo}</td>
                          <td className="py-5">
                            <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-bold">
                              {m.tipo}
                            </span>
                          </td>
                          <td className="py-5">{new Date(m.data).toLocaleDateString("pt-BR")}</td>
                          <td className="py-5 font-mono">{m.km.toLocaleString()} km</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* ENTRADAS/SAÍDAS */}
              {tipo === "entradas" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-bold">
                        <th className="pb-4">Motorista</th>
                        <th className="pb-4">Veículo</th>
                        <th className="pb-4">Tipo</th>
                        <th className="pb-4">Horário</th>
                        <th className="pb-4">Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosFiltrados().map((e) => (
                        <tr key={e.id} className="border-b hover:bg-gray-50 transition">
                          <td className="py-5 font-medium">{e.motorista}</td>
                          <td className="py-5">{e.veiculo}</td>
                          <td className="py-5">
                            <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${e.tipo === "Saída" ? "bg-red-600" : "bg-green-600"}`}>
                              {e.tipo}
                            </span>
                          </td>
                          <td className="py-5">{e.hora}</td>
                          <td className="py-5">{new Date(e.data).toLocaleDateString("pt-BR")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* VEÍCULOS */}
              {tipo === "veiculos" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dadosFiltrados().map((v) => (
                    <div key={v.id} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-300">
                      <h3 className="text-xl font-bold text-gray-800">{v.nome}</h3>
                      <p className="text-2xl font-mono text-blue-600 mt-2">{v.placa}</p>
                      <p className="mt-3"><strong>KM:</strong> {v.km.toLocaleString()} km</p>
                      <span className={`inline-block mt-3 px-4 py-2 rounded-full text-white font-bold text-sm ${
                        v.status === "Ativo" ? "bg-green-600" :
                        v.status === "Em uso" ? "bg-blue-600" : "bg-yellow-600"
                      }`}>
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* MOTORISTAS */}
              {tipo === "motoristas" && (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-bold">
                        <th className="pb-4">Nome</th>
                        <th className="pb-4">CNH</th>
                        <th className="pb-4">Validade</th>
                        <th className="pb-4">Total de Usos</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dadosFiltrados().map((m) => (
                        <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                          <td className="py-5 font-medium">{m.nome}</td>
                          <td className="py-5 font-mono">{m.cnh}</td>
                          <td className="py-5">{new Date(m.validade).toLocaleDateString("pt-BR")}</td>
                          <td className="py-5 text-center font-bold text-blue-600">{m.usos}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* BOTÕES DE EXPORTAÇÃO */}
          <div className="flex justify-end gap-6 mt-10">
            <button
              onClick={exportarPDF}
              className="flex items-center gap-3 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Exportar como PDF
            </button>
            <button
              onClick={exportarExcel}
              className="flex items-center gap-3 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Exportar como Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}