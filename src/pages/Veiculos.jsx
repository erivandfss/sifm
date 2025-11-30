// src/pages/Veiculos.jsx
import { useState, useEffect } from "react";
import { veiculosService } from "../services/api";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Veiculos() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [kmAtual, setKmAtual] = useState("");
  const [status, setStatus] = useState("ATIVO");

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      setLoading(true);
      const data = await veiculosService.getAll();
      setVeiculos(data);
    } catch (error) {
      setError("Erro ao carregar veículos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cadastrarVeiculo = async () => {
    try {
      if (!nome || !placa || !tipo || !kmAtual) {
        alert("Preencha todos os campos!");
        return;
      }

      await veiculosService.create({
        nome,
        placa,
        tipo,
        kmAtual: Number(kmAtual),
        status
      });

      setShowModal(false);
      limparCampos();
      carregarVeiculos();
    } catch (error) {
      alert(error.message || "Erro ao criar veículo");
    }
  };

  const excluirVeiculo = async () => {
    try {
      await veiculosService.delete(showConfirmDelete);
      setShowConfirmDelete(null);
      carregarVeiculos();
    } catch (error) {
      alert(error.message || "Erro ao excluir veículo");
    }
  };

  const limparCampos = () => {
    setNome("");
    setPlaca("");
    setTipo("");
    setKmAtual("");
    setStatus("ATIVO");
  };

  const tiposVeiculos = [
    "Caminhonete",
    "Caminhão", 
    "Utilitário",
    "Moto",
    "Carro de Passeio",
    "Ônibus",
    "Van"
  ];

  const statusOptions = [
    { label: "Ativo", value: "ATIVO" },
    { label: "Manutenção", value: "MANUTENCAO" },
    { label: "Inativo", value: "INATIVO" }
  ];

  if (loading) {
    return (
      <div className="p-10 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Carregando veículos...</div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Frota de Veículos</h1>
          <p className="text-lg text-gray-600 mt-2">Gerencie todos os veículos da frota</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-3"
        >
          Novo Veículo
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Veículos ({veiculos.length})</h2>

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
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {veiculos.map((veiculo) => (
                    <tr key={veiculo.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-5 font-medium text-gray-800">{veiculo.nome}</td>
                      <td className="py-5 font-mono text-gray-700">{veiculo.placa}</td>
                      <td className="py-5 text-gray-600">{veiculo.tipo}</td>
                      <td className="py-5 font-mono">{veiculo.kmAtual.toLocaleString()} km</td>
                      <td className="py-5">
                        <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                          veiculo.status === "ATIVO" ? "bg-green-600" :
                          veiculo.status === "MANUTENCAO" ? "bg-yellow-600" :
                          "bg-red-600"
                        }`}>
                          {veiculo.status === "ATIVO" ? "Ativo" :
                           veiculo.status === "MANUTENCAO" ? "Manutenção" : "Inativo"}
                        </span>
                      </td>
                      <td className="py-5 text-center">
                        <button
                          onClick={() => setShowConfirmDelete(veiculo.id)}
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
                  label="Nome do Veículo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: Hilux 04"
                />
                <Input
                  label="Placa"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  placeholder="ABC-1234"
                />
                <Select
                  label="Tipo de Veículo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  options={tiposVeiculos}
                  placeholder="Selecione o tipo"
                />
                <Input
                  label="KM Atual"
                  type="number"
                  value={kmAtual}
                  onChange={(e) => setKmAtual(e.target.value)}
                  placeholder="87400"
                />
                <Select
                  label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  options={statusOptions}
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