// src/pages/Veiculos.jsx
import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Veiculos() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const [veiculos, setVeiculos] = useState([
    { id: 1, nome: "Caminhão 01", placa: "XYZ-1234", tipo: "Caminhão", km: 152540 },
    { id: 2, nome: "Hilux 04", placa: "ABC-9090", tipo: "Pickup", km: 87400 },
    { id: 3, nome: "Saveiro 03", placa: "TYU-1122", tipo: "Pickup", km: 103400 },
    { id: 4, nome: "Moto 01", placa: "MOT-7777", tipo: "Moto", km: 28400 },
  ]);

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("Pickup");
  const [km, setKm] = useState("");

  const cadastrarVeiculo = () => {
    if (!nome || !placa || !tipo || !km) {
      alert("Preencha todos os campos!");
      return;
    }

    // Validação simples de placa (ex: ABC-1234 ou ABC1D23)
    const placaRegex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!placaRegex.test(placa.replace(/-/g, "").toUpperCase())) {
      alert("Placa inválida! Use formato: ABC-1234 ou ABC1D23");
      return;
    }

    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      placa: placa.toUpperCase(),
      tipo,
      km: Number(km),
    };

    setVeiculos([novo, ...veiculos]);
    setShowModal(false);
    limparCampos();
  };

  const limparCampos = () => {
    setNome("");
    setPlaca("");
    setTipo("Pickup");
    setKm("");
  };

  const confirmarExclusao = (id) => {
    setShowConfirmDelete(id);
  };

  const excluirVeiculo = () => {
    setVeiculos(veiculos.filter(v => v.id !== showConfirmDelete));
    setShowConfirmDelete(null);
  };

  const formatarPlaca = (valor) => {
    const limpo = valor.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    if (limpo.length <= 3) return limpo;
    if (limpo.length === 7) return limpo.replace(/(\w{3})(\w{4})/, "$1-$2");
    return limpo;
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Frota de Veículos</h1>
          <p className="text-lg text-gray-600 mt-2">Gerencie todos os veículos da empresa</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-3"
        >
          Novo Veículo
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Veículos Cadastrados</h2>

          {veiculos.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">Nenhum veículo cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Nome</th>
                    <th className="pb-4">Placa</th>
                    <th className="pb-4">Tipo</th>
                    <th className="pb-4">KM Atual</th>
                    <th className="pb-4 text-center">Status</th>
                    <th className="pb-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculos.map((v) => (
                    <tr key={v.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-5 font-medium text-gray-800">{v.nome}</td>
                      <td className="py-5">
                        <span className="font-mono text-lg font-bold text-blue-600">{v.placa}</span>
                      </td>
                      <td className="py-5">
                        <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                          v.tipo === "Caminhão" ? "bg-gray-700" :
                          v.tipo === "Pickup" ? "bg-green-600" :
                          v.tipo === "Moto" ? "bg-red-600" :
                          "bg-blue-600"
                        }`}>
                          {v.tipo}
                        </span>
                      </td>
                      <td className="py-5 font-mono text-gray-700">{v.km.toLocaleString()} km</td>
                      <td className="py-5 text-center">
                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold text-sm">
                          Ativo
                        </span>
                      </td>
                      <td className="py-5 text-center">
                        <button
                          onClick={() => confirmarExclusao(v.id)}
                          className="text-red-600 hover:text-red-800 p-3 rounded-lg hover:bg-red-50 transition"
                          title="Excluir veículo"
                        >
                          Excluir
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
                Cadastrar Novo Veículo
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome / Apelido do Veículo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Hilux 04"
                />
                <Input
                  label="Placa"
                  value={placa}
                  onChange={(e) => setPlaca(formatarPlaca(e.target.value))}
                  placeholder="ABC-1234 ou ABC1D23"
                  maxLength={8}
                />
                <Select
                  label="Tipo de Veículo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  options={["Pickup", "Caminhão", "Moto", "SUV", "Carro", "Van", "Fiorino"]}
                />
                <Input
                  label="KM Atual"
                  type="number"
                  value={km}
                  onChange={(e) => setKm(e.target.value)}
                  placeholder="87400"
                />
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button
                  onClick={() => {
                    setShowModal(false);
                    limparCampos();
                  }}
                  className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={cadastrarVeiculo}
                  className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg"
                >
                  Salvar Veículo
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
              <h3 className="text-2xl font-bold text-gray-800 mt-6">Excluir Veículo?</h3>
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
                onClick={excluirVeiculo}
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