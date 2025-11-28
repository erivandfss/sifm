// src/pages/UsuariosPermissoes.jsx
import { useState } from "react";

export default function UsuariosPermissoes() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [editando, setEditando] = useState(null);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Carlos Silva", email: "carlos@empresa.com", papel: "Administrador", status: "Ativo" },
    { id: 2, nome: "Fernanda Reis", email: "fernanda@empresa.com", papel: "Portaria", status: "Ativo" },
    { id: 3, nome: "João Pereira", email: "joao@empresa.com", papel: "Manutenção", status: "Inativo" },
    { id: 4, nome: "Ana Costa", email: "ana@empresa.com", papel: "Supervisão", status: "Ativo" },
  ]);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    papel: "Portaria",
    permissoes: {
      dashboard: true,
      portaria: false,
      veiculos: false,
      manutencao: false,
      motoristas: false,
      relatorios: false,
      usuarios: false,
      mapa: false,
    },
  });

  const permissoesLista = [
    { chave: "dashboard", label: "Dashboard" },
    { chave: "portaria", label: "Portaria" },
    { chave: "veiculos", label: "Veículos" },
    { chave: "manutencao", label: "Manutenção" },
    { chave: "motoristas", label: "Motoristas" },
    { chave: "relatorios", label: "Relatórios" },
    { chave: "usuarios", label: "Usuários & Permissões" },
    { chave: "mapa", label: "Mapa da Frota" },
  ];

  const togglePermissao = (chave) => {
    setForm(prev => ({
      ...prev,
      permissoes: { ...prev.permissoes, [chave]: !prev.permissoes[chave] }
    }));
  };

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setEditando(usuario);
      setForm({
        nome: usuario.nome,
        email: usuario.email,
        papel: usuario.papel,
        permissoes: usuario.permissoes || form.permissoes,
      });
    } else {
      setEditando(null);
      setForm({
        nome: "",
        email: "",
        papel: "Portaria",
        permissoes: { ...form.permissoes, portaria: true },
      });
    }
    setShowModal(true);
  };

  const salvarUsuario = () => {
    if (!form.nome || !form.email) {
      alert("Preencha nome e e-mail!");
      return;
    }

    if (editando) {
      setUsuarios(prev => prev.map(u =>
        u.id === editando.id
          ? { ...u, nome: form.nome, email: form.email, papel: form.papel, permissoes: form.permissoes }
          : u
      ));
    } else {
      const novo = {
        id: Date.now(),
        nome: form.nome,
        email: form.email,
        papel: form.papel,
        status: "Ativo",
        permissoes: form.permissoes,
      };
      setUsuarios([novo, ...usuarios]);
    }

    setShowModal(false);
  };

  const excluirUsuario = () => {
    setUsuarios(prev => prev.filter(u => u.id !== showConfirmDelete));
    setShowConfirmDelete(null);
  };

  const alternarStatus = (id) => {
    setUsuarios(prev => prev.map(u =>
      u.id === id ? { ...u, status: u.status === "Ativo" ? "Inativo" : "Ativo" } : u
    ));
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Usuários & Permissões Avançadas</h1>
        <p className="text-lg text-gray-600">Controle total de acesso por módulo do sistema SIFM</p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden mb-10">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Usuários Cadastrados ({usuarios.length})</h2>
          <button
            onClick={() => abrirModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-3"
          >
            Novo Usuário
          </button>
        </div>

        <div className="p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                  <th className="pb-4">Nome</th>
                  <th className="pb-4">E-mail</th>
                  <th className="pb-4">Papel</th>
                  <th className="pb-4 text-center">Status</th>
                  <th className="pb-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-5 font-medium text-gray-800">{u.nome}</td>
                    <td className="py-5 text-gray-600">{u.email}</td>
                    <td className="py-5">
                      <span className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                        u.papel === "Administrador" ? "bg-purple-600" :
                        u.papel === "Portaria" ? "bg-blue-600" :
                        u.papel === "Manutenção" ? "bg-amber-600" :
                        u.papel === "Supervisão" ? "bg-indigo-600" :
                        "bg-green-600"
                      }`}>
                        {u.papel}
                      </span>
                    </td>
                    <td className="py-5 text-center">
                      <button
                        onClick={() => alternarStatus(u.id)}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition ${
                          u.status === "Ativo"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="py-5 text-center space-x-6">
                      <button onClick={() => abrirModal(u)} className="text-blue-600 hover:text-blue-800 font-medium">
                        Editar
                      </button>
                      <button onClick={() => setShowConfirmDelete(u.id)} className="text-red-600 hover:text-red-800 font-medium">
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DE CADASTRO/EDIÇÃO */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-screen overflow-y-auto border border-gray-200">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {editando ? "Editar Usuário" : "Cadastrar Novo Usuário"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Fernanda Lima"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">E-mail Corporativo</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="usuario@empresa.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Papel / Função</label>
                  <select
                    value={form.papel}
                    onChange={(e) => setForm({ ...form, papel: e.target.value })}
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Administrador</option>
                    <option>Portaria</option>
                    <option>Manutenção</option>
                    <option>Supervisão</option>
                    <option>Motorista</option>
                  </select>
                </div>
              </div>

              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Permissões por Módulo</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {permissoesLista.map(({ chave, label }) => (
                    <label key={chave} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.permissoes[chave]}
                        onChange={() => togglePermissao(chave)}
                        className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-10 py-4 rounded-xl bg-gray-200 hover:bg-gray-300 font-bold transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarUsuario}
                  className="px-12 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold transition shadow-lg"
                >
                  {editando ? "Salvar Alterações" : "Criar Usuário"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMAÇÃO EXCLUSÃO */}
      {showConfirmDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Excluir Usuário?</h3>
            <p className="text-gray-600 mb-8">Esta ação é permanente e não pode ser desfeita.</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowConfirmDelete(null)}
                className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
              >
                Cancelar
              </button>
              <button
                onClick={excluirUsuario}
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