// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      await login(email, senha);
      navigate("/");
    } catch (error) {
      setErro(error.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="bg-blue-600 p-5 rounded-full">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 11h14l-1 9H6l-1-9zm2-5.5C7 4.12 8.12 3 9.5 3h5c1.38 0 2.5 1.12 2.5 2.5V7H7V5.5z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">SIFM</h1>
        <p className="text-center text-gray-600 mb-8">Sistema Interno de Frota e Manutenção</p>

        <form onSubmit={handleSubmit}>
          <Input 
            label="E-mail" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input 
            label="Senha" 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="text-red-600 text-sm text-center mb-4">{erro}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p><strong>Credenciais de teste:</strong></p>
          <p>admin@aguas.com → 123 (Administrador)</p>
          <p>portaria@aguas.com → 123 (Operador)</p>
          <p>manutencao@aguas.com → 123 (Mantenedor)</p>
        </div>
      </div>
    </div>
  );
}