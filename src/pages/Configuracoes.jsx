import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";

export default function Configuracoes() {
  const [empresa, setEmpresa] = useState({
    nome: "Águas do Pantanal",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Projetada, 51 - Cáceres/MT",
    telefone: "(65) 99999-9999"
  });

  const [manutencao, setManutencao] = useState({
    trocaOleoKm: 8000,
    revisaoKm: 15000,
  });

  const [preferencias, setPreferencias] = useState({
    mostrarGrafico: true,
    modoEscuro: false,
    alertasSonoros: true
  });

  const [seguranca, setSeguranca] = useState({
    timeout: 15,
    complexidadeSenha: "Alta",
  });

  const salvarTudo = () => {
    alert("Configurações salvas com sucesso! (Mock)");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-700 mb-8">
          Configurações Gerais do Sistema
        </h1>

        {/* CARD 1 — Dados da Empresa */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Dados da Empresa</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input label="Nome da empresa" value={empresa.nome}
              onChange={(e) => setEmpresa({ ...empresa, nome: e.target.value })} />

            <Input label="CNPJ" value={empresa.cnpj}
              onChange={(e) => setEmpresa({ ...empresa, cnpj: e.target.value })} />

            <Input label="Endereço" value={empresa.endereco}
              onChange={(e) => setEmpresa({ ...empresa, endereco: e.target.value })} />

            <Input label="Telefone" value={empresa.telefone}
              onChange={(e) => setEmpresa({ ...empresa, telefone: e.target.value })} />
          </div>
        </div>

        {/* CARD 2 — Regras de manutenção */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Parâmetros de Manutenção</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Input
              type="number"
              label="KM para troca de óleo"
              value={manutencao.trocaOleoKm}
              onChange={(e) =>
                setManutencao({ ...manutencao, trocaOleoKm: e.target.value })
              }
            />

            <Input
              type="number"
              label="KM para revisão geral"
              value={manutencao.revisaoKm}
              onChange={(e) =>
                setManutencao({ ...manutencao, revisaoKm: e.target.value })
              }
            />

          </div>
        </div>

        {/* CARD 3 — Preferências */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Preferências do Sistema</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferencias.mostrarGrafico}
                onChange={() =>
                  setPreferencias({
                    ...preferencias,
                    mostrarGrafico: !preferencias.mostrarGrafico,
                  })
                }
              />
              Mostrar gráfico no dashboard
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferencias.modoEscuro}
                onChange={() =>
                  setPreferencias({
                    ...preferencias,
                    modoEscuro: !preferencias.modoEscuro,
                  })
                }
              />
              Ativar modo escuro
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferencias.alertasSonoros}
                onChange={() =>
                  setPreferencias({
                    ...preferencias,
                    alertasSonoros: !preferencias.alertasSonoros,
                  })
                }
              />
              Habilitar alertas sonoros
            </label>

          </div>
        </div>

        {/* CARD 4 — Segurança */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Segurança</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input
              type="number"
              label="Tempo máximo de sessão (minutos)"
              value={seguranca.timeout}
              onChange={(e) =>
                setSeguranca({ ...seguranca, timeout: e.target.value })
              }
            />

            <div>
              <label className="block mb-1 text-gray-600">Força da senha</label>
              <select
                className="w-full border p-2 rounded"
                value={seguranca.complexidadeSenha}
                onChange={(e) =>
                  setSeguranca({
                    ...seguranca,
                    complexidadeSenha: e.target.value,
                  })
                }
              >
                <option>Baixa</option>
                <option>Média</option>
                <option>Alta</option>
              </select>
            </div>

          </div>
        </div>

        {/* Botão FINAL */}
        <button
          onClick={salvarTudo}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 text-lg"
        >
          Salvar Configurações
        </button>

      </div>
    </div>
  );
}
