import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Manutencao() {
  const [showModal, setShowModal] = useState(false);

  const [manutencoes, setManutencoes] = useState([
    { 
      id: 1, 
      veiculo: "Hilux 04",
      tipo: "Troca de Óleo",
      data: "2025-01-12",
      km: 87000,
      desc: "Troca completa + filtro"
    },
    { 
      id: 2, 
      veiculo: "Caminhão 01",
      tipo: "Revisão Geral",
      data: "2025-01-20",
      km: 152540,
      desc: "Revisão de 150 mil km"
    },
  ]);

  // Campos do modal
  const [veiculo, setVeiculo] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [km, setKm] = useState("");
  const [desc, setDesc] = useState("");

  const cadastrar = () => {
    if (!veiculo || !tipo || !data || !km || !desc) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo = {
      id: manutencoes.length + 1,
      veiculo,
      tipo,
      data,
      km,
      desc,
    };

    setManutencoes([novo, ...manutencoes]);
    setShowModal(false);

    // limpando campos
    setVeiculo("");
    setTipo("");
    setData("");
    setKm("");
    setDesc("");
  };

  const excluir = (id) => {
    setManutencoes(manutencoes.filter((m) => m.id !== id));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Manutenção</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Nova Manutenção
          </button>
        </div>

        {/* Tabela */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Veículo</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">KM</th>
                <th className="pb-3">Descrição</th>
                <th className="pb-3 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {manutencoes.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{m.veiculo}</td>
                  <td className="py-2">{m.tipo}</td>
                  <td className="py-2">{m.data}</td>
                  <td className="py-2">{m.km} km</td>
                  <td className="py-2">{m.desc}</td>
                  <td className="py-2 text-center">
                    <button
                      className="text-red-600 font-semibold hover:underline"
                      onClick={() => excluir(m.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">

              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Registrar Manutenção
              </h2>

              <Select
                label="Veículo"
                value={veiculo}
                onChange={(e) => setVeiculo(e.target.value)}
                options={["Hilux 04", "Saveiro 03", "Caminhão 01", "Moto 01"]}
              />

              <Select
                label="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                options={[
                  "Troca de Óleo",
                  "Revisão Geral",
                  "Pneus",
                  "Freios",
                  "Motor",
                  "Suspensão",
                  "Elétrica",
                ]}
              />

              <Input
                label="Data"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />

              <Input
                label="KM Atual"
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Descrição</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-gray-50 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>

                <button
                  onClick={cadastrar}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Registrar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
