import { useState } from "react";
import Sidebar from "../components/Sidebar";

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
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Checklist de Veículo
        </h1>

        {/* SELEÇÃO DE VEÍCULO */}
        <div className="bg-white p-6 rounded-xl shadow mb-6 border border-gray-200">
          <label className="font-semibold text-gray-600">Selecione o veículo</label>
          <select
            className="w-full mt-2 p-2 border rounded"
            value={veiculoSelecionado}
            onChange={(e) => setVeiculoSelecionado(e.target.value)}
          >
            <option>Hilux 04</option>
            <option>Saveiro 03</option>
            <option>Caminhão 01</option>
          </select>
        </div>

        {/* ABAS */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setAba("entrada")}
            className={`px-4 py-2 rounded-lg font-semibold 
              ${aba === "entrada" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800"}`}
          >
            Checklist de Entrada
          </button>

          <button
            onClick={() => setAba("saida")}
            className={`px-4 py-2 rounded-lg font-semibold 
              ${aba === "saida" ? "bg-blue-700 text-white" : "bg-gray-300 text-gray-800"}`}
          >
            Checklist de Saída
          </button>
        </div>

        {/* CHECKLIST */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">

          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            {aba === "entrada" ? "Condição Antes do Uso" : "Condição Após o Uso"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {Object.keys(checkInicial).map((item) => (
              <div key={item}>
                <p className="font-semibold text-gray-700 mb-1">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </p>

                {/* OPÇÕES BOM / RUIM */}
                <div className="flex gap-4">

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`${item}-${aba}`}
                      checked={(aba === "entrada" ? entrada[item] : saida[item]) === "bom"}
                      onChange={() =>
                        handleCheck(
                          aba === "entrada" ? setEntrada : setSaida,
                          aba === "entrada" ? entrada : saida,
                          item,
                          "bom"
                        )
                      }
                    />
                    Bom
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`${item}-${aba}`}
                      checked={(aba === "entrada" ? entrada[item] : saida[item]) === "ruim"}
                      onChange={() =>
                        handleCheck(
                          aba === "entrada" ? setEntrada : setSaida,
                          aba === "entrada" ? entrada : saida,
                          item,
                          "ruim"
                        )
                      }
                    />
                    Ruim
                  </label>

                </div>
              </div>
            ))}

          </div>

          {/* OBSERVAÇÕES */}
          <div className="mt-6">
            <p className="font-semibold text-gray-700">Observações</p>
            <textarea
              className="w-full mt-2 border p-3 rounded"
              placeholder="Descreva qualquer irregularidade encontrada..."
              rows={4}
            />
          </div>

          {/* FOTOS */}
          <div className="mt-6">
            <p className="font-semibold text-gray-700 mb-1">Fotos (mockup)</p>

            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">+</div>
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">+</div>
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">+</div>
            </div>
          </div>

          {/* BOTÃO */}
          <button
            onClick={salvarChecklist}
            className="mt-6 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            Salvar Checklist
          </button>
        </div>

        {/* HISTÓRICO */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Histórico de Checklists do Veículo
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="pb-2">Veículo</th>
                <th className="pb-2">Motorista</th>
                <th className="pb-2">Tipo</th>
                <th className="pb-2">Data</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {historico.map((h) => (
                <tr key={h.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{h.veiculo}</td>
                  <td>{h.motorista}</td>
                  <td>{h.tipo}</td>
                  <td>{h.data}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-lg text-white font-semibold 
                        ${h.status === "Aprovado" ? "bg-green-600" : "bg-red-600"}`}
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
