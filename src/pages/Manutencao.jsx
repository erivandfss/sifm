// src/pages/Manutencao.jsx
import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Manutencao() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null); // armazena o ID a ser excluído

  const [manutencoes, setManutencoes] = useState([
    {
      id: 1,
      veiculo: "Hilux 04",
      tipo: "Troca de Óleo",
      data: "2025-01-12",
      km: 87000,
      desc: "Troca completa + filtro",
    },
    {
      id: 2,
      veiculo: "Caminhão 01",
      tipo: "Revisão Geral",
      data: "2025-01-20",
      km: 152540,
      desc: "Revisão de 150 mil km",
    },
  ]);

  // Campos do modal de cadastro
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
      id: Date.now(),
      veiculo,
      tipo,
      data,
      km: Number(km),
      desc,
    };

    setManutencoes([novo, ...manutencoes]);
    setShowModal(false);
    setVeiculo("");
    setTipo("");
    setData("");
    setKm("");
    setDesc("");
  };

  const confirmarExclusao = (id) => {
    setShowConfirmDelete(id);
  };

  const excluir = () => {
    setManutencoes(manutencoes.filter((m) => m.id !== showConfirmDelete));
    setShowConfirmDelete(null);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Manutenção da Frota</h1>
          <p className="text-gray-600 mt-2">Gerencie todas as manutenções dos veículos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-3"
        >
          <i className="fa-solid fa-plus"></i>
          Nova Manutenção
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Histórico de Manutenções</h2>

          {manutencoes.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Nenhuma manutenção registrada ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Veículo</th>
                    <th className="pb-4">Tipo</th>
                    <th className="pb-4">Data</th>
                    <th className="pb-4">KM</th>
                    <th className="pb-4">Descrição</th>
                    <th className="pb-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {manutencoes.map((m) => (
                    <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-5 font-medium text-gray-800">{m.veiculo}</td>
                      <td className="py-5">
                        <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                          m.tipo.includes("Óleo") ? "bg-amber-600" :
                          m.tipo.includes("Revisão") ? "bg-purple-600" :
                          "bg-blue-600"
                        }`}>
                          {m.tipo}
                        </span>
                      </td>
                      <td className="py-5 text-gray-600">{m.data}</td>
                      <td className="py-5 font-mono">{m.km.toLocaleString()} km</td>
                      <td className="py-5 text-gray-700 max-w-xs">{m.desc}</td>
                      <td className="py-5 text-center">
                        <button
                          onClick={() => confirmarExclusao(m.id)}
                          className="text-red-600 hover:text-red-800 p-3 rounded-lg hover:bg-red-50 transition"
                          title="Excluir manutenção"
                        >
                          <i className="fa-solid fa-trash text-lg"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DE CADASTRO */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-200">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Registrar Nova Manutenção
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Veículo"
                  value={veiculo}
                  onChange={(e) => setVeiculo(e.target.value)}
                  options={["Hilux 04", "Saveiro 03", "Caminhão 01", "Moto 01", "Fiorino 02"]}
                  placeholder="Selecione o veículo"
                />
                <Select
                  label="Tipo de Manutenção"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  options={[
                    "Troca de Óleo",
                    "Revisão Geral",
                    "Troca de Pneus",
                    "Freios",
                    "Suspensão",
                    "Elétrica",
                    "Motor",
                    "Alinhamento",
                    "Outros",
                  ]}
                  placeholder="Selecione o tipo"
                />
                <Input label="Data da Manutenção" type="date" value={data} onChange={(e) => setData(e.target.value)} />
                <Input label="KM Atual" type="number" value={km} onChange={(e) => setKm(e.target.value)} placeholder="87400" />
              </div>

              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Descrição / Observações</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Ex: Troca de óleo 10W40, filtro de óleo novo, verificação geral..."
                />
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={cadastrar}
                  className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg"
                >
                  Salvar Manutenção
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      {showConfirmDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-triangle-exclamation text-4xl text-red-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mt-6">Excluir Manutenção?</h3>
              <p className="text-gray-600 mt-3">
                Esta ação não pode ser desfeita.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowConfirmDelete(null)}
                className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={excluir}
                className="px-10 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-lg"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}