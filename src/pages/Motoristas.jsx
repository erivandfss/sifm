import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";

export default function Motoristas() {
  const [showModal, setShowModal] = useState(false);

  const [motoristas, setMotoristas] = useState([
    { id: 1, nome: "João Silva", cnh: "12345678", validade: "2026-05-10", telefone: "(65) 99999-1111" },
    { id: 2, nome: "Maria Souza", cnh: "87654321", validade: "2027-01-20", telefone: "(65) 98888-2222" },
  ]);

  // Campos do motorista
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
      id: motoristas.length + 1,
      nome,
      cnh,
      validade,
      telefone,
    };

    setMotoristas([...motoristas, novo]);
    setShowModal(false);

    // limpar
    setNome("");
    setCnh("");
    setValidade("");
    setTelefone("");
  };

  const excluir = (id) => {
    setMotoristas(motoristas.filter((m) => m.id !== id));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Motoristas</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Novo Motorista
          </button>
        </div>

        {/* Tabela */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Nome</th>
                <th className="pb-3">CNH</th>
                <th className="pb-3">Validade</th>
                <th className="pb-3">Telefone</th>
                <th className="pb-3 text-center">Ações</th>
              </tr>
            </thead>

            <tbody>
              {motoristas.map((m) => (
                <tr key={m.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{m.nome}</td>
                  <td className="py-2">{m.cnh}</td>
                  <td className="py-2">{m.validade}</td>
                  <td className="py-2">{m.telefone}</td>
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
                Cadastro de Motorista
              </h2>

              <Input label="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)} />

              <Input label="CNH" value={cnh} onChange={(e) => setCnh(e.target.value)} />

              <Input
                label="Validade da CNH"
                type="date"
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
              />

              <Input label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>

                <button
                  onClick={cadastrarMotorista}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}
