import React, { useState } from "react";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", senha);

    // Aqui você coloca a validação exata:
    // Se quiser, posso criar tela de carregamento, animação, etc.
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        
        {/* Logo do Sistema */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#fff"
              viewBox="0 0 24 24"
              className="w-10 h-10"
            >
              <path d="M5 11h14l-1 9H6l-1-9zm2-5.5C7 4.12 8.12 3 9.5 3h5c1.38 0 2.5 1.12 2.5 2.5V7H7V5.5z" />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          SIFM
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8">
          Sistema de Informação de Frotas e Manutenção
        </p>

        {/* Inputs */}
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        {/* Botão */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 hover:bg-blue-700 transition-all shadow-md"
          onClick={handleLogin}
        >
          Entrar
        </button>

        {/* Link */}
        <p className="text-center text-sm mt-4 text-gray-500 hover:underline cursor-pointer">
          Esqueci minha senha
        </p>

        {/* Rodapé */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Águas do Pantanal — Sistema Interno
        </p>
      </div>
    </div>
  );
}
