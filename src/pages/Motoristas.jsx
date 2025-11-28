// src/pages/Motoristas.jsx
import { useState } from "react";
import Input from "../components/Input";

export default function Motoristas() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);

  const [motoristas, setMotoristas] = useState([
    { id: 1, nome: "João Silva", cnh: "12345678", validade: "2026-05-10", telefone: "(65) 99999-1111" },
    { id: 2, nome: "Maria Souza", cnh: "87654321", validade: "2027-01-20", telefone: "(65) 98888-2222" },
    { id: 3, nome: "Carlos Pereira", cnh: "11223344", validade: "2025-12-15", telefone: "(65) 97777-3333" },
  ]);

  // Campos do formulário
  const [nome, setNome] = useState("");
  const [cnh, setCnh] = useState("");
  const [validade, setValidade] = useState("");
  const [telefone, setTelefone] = useState("");

  const cadastrarMotorista = () => {
    if (!nome || !cnh || !validade || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo = {
      id: Date.now(),
      nome: nome.trim(),
      cnh: cnh.trim(),
      validade,
      telefone: telefone.trim(),
    };

    setMotoristas([...motoristas, novo]);
    setShowModal(false);
    limparCampos();
  };

  const limparCampos = () => {
    setNome("");
    setCnh("");
    setValidade("");
    setTelefone("");
  };

  const confirmarExclusao = (id) => {
    setShowConfirmDelete(id);
  };

  const excluirMotorista = () => {
    setMotoristas(motoristas.filter((m) => m.id !== showConfirmDelete));
    setShowConfirmDelete(null);
  };

  const estaVencida = (data) => {
    return new Date(data) < new Date();
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Motoristas Cadastrados</h1>
          <p className="text-lg text-gray-600 mt-2">Gerencie todos os condutores da frota</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-3"
        >
          Novo Motorista
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Lista de Motoristas</h2>

          {motoristas.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">Nenhum motorista cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Nome</th>
                    <th className="pb-4">CNH</th>
                    <th className="pb-4">Validade da CNH</th>
                    <th className="pb-4">Telefone</th>
                    <th className="pb-4 text-center">Status</th>
                    <th className="pb-4 text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {motoristas.map((m) => {
                    const vencida = estaVencida(m.validade);
                    return (
                      <tr key={m.id} className="border-b hover:bg-gray-50 transition">
                        <td className="py-5 font-medium text-gray-800">{m.nome}</td>
                        <td className="py-5 font-mono text-gray-700">{m.cnh}</td>
                        <td className="py-5">
                          <span className={vencida ? "text-red-600 font-bold" : "text-gray-700"}>
                            {new Date(m.validade).toLocaleDateString("pt-BR")}
                          </span>
                        </td>
                        <td className="py-5 text-gray-700">{m.telefone}</td>
                        <td className="py-5 text-center">
                          <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                            vencida
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {vencida ? "Vencida" : "Válida"}
                          </span>
                        </td>
                        <td className="py-5 text-center">
                          <button
                            onClick={() => confirmarExclusao(m.id)}
                            className="text-red-600 hover:text-red-800 p-3 rounded-lg hover:bg-red-50 transition"
                            title="Excluir motorista"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    );
                  })}
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
                Cadastrar Novo Motorista
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome Completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: José Carlos Oliveira"
                />
                <Input
                  label="Número da CNH"
                  value={cnh}
                  onChange={(e) => setCnh(e.target.value)}
                  placeholder="12345678900"
                />
                <Input
                  label="Validade da CNH"
                  type="date"
                  value={validade}
                  onChange={(e) => setValidade(e.target.value)}
                />
                <Input
                  label="Telefone / WhatsApp"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(65) 99999-9999"
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
                  onClick={cadastrarMotorista}
                  className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg"
                >
                  Salvar Motorista
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
                Excluir
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mt-6">Excluir Motorista?</h3>
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
                onClick={excluirMotorista}
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