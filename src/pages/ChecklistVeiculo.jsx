// src/pages/ChecklistVeiculo.jsx
import { useState } from "react";

export default function ChecklistVeiculo() {
  const [veiculoSelecionado, setVeiculoSelecionado] = useState("Hilux 04");
  const [aba, setAba] = useState("entrada");

  const checkInicial = {
    pneus: "",
    oleo: "",
    agua: "",
    freios: "",
    luzes: "",
    lataria: "",
  };

  const [entrada, setEntrada] = useState(checkInicial);
  const [saida, setSaida] = useState(checkInicial);

  const historico = [
    {
      id: 1,
      veiculo: "Hilux 04",
      motorista: "Carlos",
      data: "2025-01-20",
      tipo: "Entrada",
      status: "Aprovado",
    },
    {
      id: 2,
      veiculo: "Hilux 04",
      motorista: "Carlos",
      data: "2025-01-20",
      tipo: "Saída",
      status: "Aprovado",
    },
  ];

  const handleCheck = (setState, state, field, value) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const salvarChecklist = () => {
    alert("Checklist salvo com sucesso! (mock)");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-700 mb-8">
        Checklist de Veículo
      </h1>

      {/* SELEÇÃO DE VEÍCULO */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 border border-gray-200">
        <label className="font-semibold text-gray-600 block mb-2">
          Selecione o veículo
        </label>
        <select
          className="w-full md:w-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={veiculoSelecionado}
          onChange={(e) => setVeiculoSelecionado(e.target.value)}
        >
          <option>Hilux 04</option>
          <option>Saveiro 03</option>
          <option>Caminhão 01</option>
        </select>
      </div>

      {/* ABAS */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setAba("entrada")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            aba === "entrada"
              ? "bg-blue-700 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Checklist de Entrada
        </button>
        <button
          onClick={() => setAba("saida")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            aba === "saida"
              ? "bg-blue-700 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Checklist de Saída
        </button>
      </div>

      {/* FORMULÁRIO DO CHECKLIST */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">
          {aba === "entrada" ? "Condição Antes do Uso" : "Condição Após o Uso"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {Object.keys(checkInicial).map((item) => {
            const estadoAtual = aba === "entrada" ? entrada[item] : saida[item];
            const setEstado = aba === "entrada" ? setEntrada : setSaida;
            const estadoObj = aba === "entrada" ? entrada : saida;

            return (
              <div key={item} className="bg-gray-50 p-5 rounded-lg">
                <p className="font-semibold text-gray-800 mb-3">
                  {item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, " $1")}
                </p>
                <div className="flex gap-8">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${item}-${aba}`}
                      checked={estadoAtual === "bom"}
                      onChange={() => handleCheck(setEstado, estadoObj, item, "bom")}
                      className="w-5 h-5 text-green-600"
                    />
                    <span className="text-green-700 font-medium">Bom</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`${item}-${aba}`}
                      checked={estadoAtual === "ruim"}
                      onChange={() => handleCheck(setEstado, estadoObj, item, "ruim")}
                      className="w-5 h-5 text-red-600"
                    />
                    <span className="text-red-700 font-medium">Ruim</span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        {/* OBSERVAÇÕES */}
        <div className="mb-8">
          <label className="block font-semibold text-gray-700 mb-2">Observações</label>
          <textarea
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva qualquer irregularidade encontrada..."
            rows={4}
          />
        </div>

        {/* FOTOS (mock) */}
        <div className="mb-8">
          <p className="font-semibold text-gray-700 mb-3">Fotos do veículo</p>
          <div className="flex gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-32 h-32 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-4xl text-gray-400 hover:bg-gray-300 cursor-pointer transition"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* BOTÃO SALVAR */}
        <button
          onClick={salvarChecklist}
          className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-10 rounded-lg shadow-lg transition text-lg"
        >
          Salvar Checklist
        </button>
      </div>

      {/* HISTÓRICO */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Histórico de Checklists
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300 text-left text-gray-600">
                <th className="pb-3">Veículo</th>
                <th className="pb-3">Motorista</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((h) => (
                <tr key={h.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4">{h.veiculo}</td>
                  <td className="py-4">{h.motorista}</td>
                  <td className="py-4">{h.tipo}</td>
                  <td className="py-4">{h.data}</td>
                  <td className="py-4">
                    <span
                      className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                        h.status === "Aprovado" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}