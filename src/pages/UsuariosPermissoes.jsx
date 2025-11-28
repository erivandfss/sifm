import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function UsuariosPermissoes() {
  const [usuarios] = useState([
    { id: 1, nome: "Carlos Silva", email: "carlos@empresa.com", papel: "Administrador", status: "Ativo" },
    { id: 2, nome: "Fernanda Reis", email: "fernanda@empresa.com", papel: "Portaria", status: "Ativo" },
    { id: 3, nome: "João Pereira", email: "joao@empresa.com", papel: "Manutenção", status: "Inativo" },
  ]);

  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    papel: "Portaria",
    permissoes: {
      dashboard: false,
      portaria: false,
      veiculos: false,
      manutencao: false,
      motoristas: false,
      relatorios: false,
      usuarios: false,
    },
  });

  const handlePermissao = (campo) => {
    setNovoUsuario((prev) => ({
      ...prev,
      permissoes: {
        ...prev.permissoes,
        [campo]: !prev.permissoes[campo],
      },
    }));
  };

  const salvarUsuario = () => {
    alert("Usuário salvo (mock). Conecte ao backend mais tarde.");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">
        
        <h1 className="text-3xl font-bold text-gray-700 mb-8">
          Usuários & Permissões
        </h1>

        {/* Formulário */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-10">
          <h2 className="text-xl font-semibold mb-6">Cadastrar Novo Usuário</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-1 text-gray-600">Nome</label>
              <input
                className="w-full border p-2 rounded"
                value={novoUsuario.nome}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                placeholder="Nome do usuário"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">E-mail</label>
              <input
                className="w-full border p-2 rounded"
                value={novoUsuario.email}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                placeholder="email@empresa.com"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Papel</label>
              <select
                className="w-full border p-2 rounded"
                value={novoUsuario.papel}
                onChange={(e) => setNovoUsuario({ ...novoUsuario, papel: e.target.value })}
              >
                <option>Administrador</option>
                <option>Portaria</option>
                <option>Manutenção</option>
                <option>Motorista</option>
                <option>Supervisão</option>
              </select>
            </div>
          </div>

          {/* Permissões */}
          <h3 className="text-lg font-semibold mt-8 mb-4">Permissões</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(novoUsuario.permissoes).map((perm) => (
              <label key={perm} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={novoUsuario.permissoes[perm]}
                  onChange={() => handlePermissao(perm)}
                />
                {perm.charAt(0).toUpperCase() + perm.slice(1)}
              </label>
            ))}
          </div>

          <button
            onClick={salvarUsuario}
            className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800"
          >
            Salvar Usuário
          </button>
        </div>

        {/* Lista de usuários */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200">

          <h2 className="text-xl font-semibold mb-6">Usuários Cadastrados</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="pb-2">Nome</th>
                <th className="pb-2">E-mail</th>
                <th className="pb-2">Papel</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{u.nome}</td>
                  <td>{u.email}</td>
                  <td>{u.papel}</td>
                  <td>
                    <span className={`text-sm px-2 py-1 rounded-lg 
                      ${u.status === "Ativo" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {u.status}
                    </span>
                  </td>

                  <td>
                    <button className="text-blue-600">Editar</button>
                    <button className="ml-3 text-red-600">Excluir</button>
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
