import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Relatorios() {
  const [tipo, setTipo] = useState("manutencao");

  const [filtroDataIni, setFiltroDataIni] = useState("");
  const [filtroDataFim, setFiltroDataFim] = useState("");

  // Dados simulados – depois você troca pela API
  const manutencoes = [
    { id: 1, veiculo: "Hilux 04", tipo: "Troca de Óleo", data: "2025-01-12", km: 87000 },
    { id: 2, veiculo: "Caminhão 01", tipo: "Revisão", data: "2025-01-20", km: 152540 },
  ];

  const entradas = [
    { id: 1, motorista: "Carlos", veiculo: "Hilux 04", hora: "08:12", data: "2025-01-21" },
    { id: 2, motorista: "Felipe", veiculo: "Saveiro 03", hora: "09:10", data: "2025-01-21" },
  ];

  const veiculos = [
    { id: 1, nome: "Hilux 04", placa: "ABC-1234", km: 87000 },
    { id: 2, nome: "Saveiro 03", placa: "XYZ-8899", km: 65000 },
  ];

  const motoristas = [
    { id: 1, nome: "Carlos Silva", cnh: "A/B", status: "Ativo" },
    { id: 2, nome: "João Pereira", cnh: "D", status: "Férias" },
  ];

  const exportarPDF = () => {
    alert("Gerar PDF — pronto para implementar");
  };

  const exportarExcel = () => {
    alert("Gerar Excel — pronto para implementar");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-700 mb-6">Relatórios</h1>

        {/* Card de filtros */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-6">
          
          <Select
            label="Tipo de relatório"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            options={[
              { label: "Manutenções", value: "manutencao" },
              { label: "Entradas/Saídas", value: "entradas" },
              { label: "Veículos", value: "veiculos" },
              { label: "Motoristas", value: "motoristas" },
            ]}
          />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              type="date"
              label="Data inicial"
              value={filtroDataIni}
              onChange={(e) => setFiltroDataIni(e.target.value)}
            />
            <Input
              type="date"
              label="Data final"
              value={filtroDataFim}
              onChange={(e) => setFiltroDataFim(e.target.value)}
            />
          </div>

          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg">
            Aplicar Filtros
          </button>
        </div>

        {/* Área dos relatórios */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
          
          {tipo === "manutencao" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Relatório de Manutenções</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2">Veículo</th>
                    <th className="pb-2">Tipo</th>
                    <th className="pb-2">Data</th>
                    <th className="pb-2">KM</th>
                  </tr>
                </thead>
                <tbody>
                  {manutencoes.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{m.veiculo}</td>
                      <td>{m.tipo}</td>
                      <td>{m.data}</td>
                      <td>{m.km} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tipo === "entradas" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Relatório de Entradas/Saídas</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2">Motorista</th>
                    <th className="pb-2">Veículo</th>
                    <th className="pb-2">Horário</th>
                    <th className="pb-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {entradas.map((e) => (
                    <tr key={e.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{e.motorista}</td>
                      <td>{e.veiculo}</td>
                      <td>{e.hora}</td>
                      <td>{e.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tipo === "veiculos" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Relatório de Veículos</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2">Nome</th>
                    <th className="pb-2">Placa</th>
                    <th className="pb-2">KM Atual</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculos.map((v) => (
                    <tr key={v.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{v.nome}</td>
                      <td>{v.placa}</td>
                      <td>{v.km} km</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {tipo === "motoristas" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Relatório de Motoristas</h2>

              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-2">Nome</th>
                    <th className="pb-2">CNH</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {motoristas.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{m.nome}</td>
                      <td>{m.cnh}</td>
                      <td>{m.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {/* botões de exportar */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={exportarPDF}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Exportar PDF
            </button>

            <button
              onClick={exportarExcel}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Exportar Excel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
