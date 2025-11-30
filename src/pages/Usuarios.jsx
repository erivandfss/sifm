// src/pages/Usuarios.jsx
import { useState, useEffect } from "react";
import { usuariosService } from '../services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Usuarios() {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(null);
  const [editando, setEditando] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Campos do modal
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("Portaria");
  const [senha, setSenha] = useState("");

  // Carregar usuários
  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const data = await usuariosService.getAll();
        setUsuarios(data);
      } catch (err) {
        console.error('Erro ao carregar usuários:', err);
        setError('Erro ao carregar usuários. Tente novamente mais tarde.');
        toast.error('Erro ao carregar usuários');
      } finally {
        setLoading(false);
      }
    };

    carregarUsuarios();
  }, []);

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setEditando(usuario);
      setNome(usuario.nome);
      setEmail(usuario.email);
      setPerfil(usuario.perfil);
      setSenha("");
    } else {
      setEditando(null);
      setNome("");
      setEmail("");
      setPerfil("Portaria");
      setSenha("");
    }
    setShowModal(true);
  };

  const salvarUsuario = async () => {
    if (!nome || !email || (!editando && !senha)) {
      toast.warning('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      const usuarioData = { 
        nome: nome.trim(), 
        email: email.trim(), 
        perfil,
        ...(senha && { senha })
      };

      if (editando) {
        const usuarioAtualizado = await usuariosService.update(editando.id, usuarioData);
        setUsuarios(usuarios.map(u => 
          u.id === editando.id ? usuarioAtualizado : u
        ));
        toast.success('Usuário atualizado com sucesso!');
      } else {
        const novoUsuario = await usuariosService.create(usuarioData);
        setUsuarios([novoUsuario, ...usuarios]);
        toast.success('Usuário criado com sucesso!');
      }

      setShowModal(false);
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      toast.error(error.message || 'Erro ao salvar usuário');
    }
  };

  const excluirUsuario = async () => {
    try {
      await usuariosService.delete(showConfirmDelete);
      setUsuarios(usuarios.filter(u => u.id !== showConfirmDelete));
      setShowConfirmDelete(null);
      toast.success('Usuário excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      toast.error('Erro ao excluir usuário');
    }
  };

  const alternarStatus = async (id, statusAtual) => {
    try {
      const novoStatus = statusAtual === "Ativo" ? "Inativo" : "Ativo";
      await usuariosService.updateStatus(id, novoStatus);
      setUsuarios(usuarios.map(u => 
        u.id === id ? { ...u, status: novoStatus } : u
      ));
      toast.success(`Status atualizado para ${novoStatus}`);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast.error('Erro ao atualizar status do usuário');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Usuários & Permissões
        </h1>
        <p className="text-lg text-gray-600">
          Gerencie acesso e permissões dos usuários do sistema SIFM
        </p>
      </div>

      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Lista de Usuários ({usuarios.length})
          </h2>
          <button
            onClick={() => abrirModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-3"
          >
            Novo Usuário
          </button>
        </div>

        <div className="p-8">
          {usuarios.length === 0 ? (
            <p className="text-center text-gray-500 py-12 text-lg">Nenhum usuário cadastrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-left text-gray-700 font-semibold">
                    <th className="pb-4">Nome</th>
                    <th className="pb-4">E-mail</th>
                    <th className="pb-4">Perfil</th>
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
                          u.perfil === "Administrador" ? "bg-purple-600" :
                          u.perfil === "Portaria" ? "bg-blue-600" :
                          u.perfil === "Manutenção" ? "bg-amber-600" :
                          "bg-green-600"
                        }`}>
                          {u.perfil}
                        </span>
                      </td>
                      <td className="py-5 text-center">
                        <button
                          onClick={() => alternarStatus(u.id, u.status)}
                          className={`px-6 py-2 rounded-full font-bold text-sm transition ${
                            u.status === "Ativo"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>
                      <td className="py-5 text-center space-x-4">
                        <button
                          onClick={() => abrirModal(u)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setShowConfirmDelete(u.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
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

      {/* MODAL CADASTRO/EDIÇÃO */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl border border-gray-200">
            <div className="p-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {editando ? "Editar Usuário" : "Novo Usuário"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Ana Clara"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="usuario@empresa.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Perfil de Acesso</label>
                  <select
                    value={perfil}
                    onChange={(e) => setPerfil(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Portaria">Portaria</option>
                    <option value="Manutenção">Manutenção</option>
                    <option value="Relatórios">Relatórios</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>

                {!editando && (
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Senha Inicial</label>
                    <input
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Mínimo 6 caracteres"
                      minLength="6"
                      required={!editando}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-10">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 font-semibold transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarUsuario}
                  className="px-10 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg"
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
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200 text-center">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-triangle-exclamation text-4xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Excluir Usuário?</h3>
            <p className="text-gray-600 mb-8">Esta ação não pode ser desfeita.</p>
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