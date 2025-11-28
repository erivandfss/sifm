// src/pages/Portaria.jsx
import { useState } from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import Registro from "../components/Registro";

export default function Portaria() {
  const [tipo, setTipo] = useState("Entrada");
  const [veiculo, setVeiculo] = useState("");
  const [motorista, setMotorista] = useState("");
  const [km, setKm] = useState("");
  const [historico, setHistorico] = useState([]);
  const [ultimoRegistro, setUltimoRegistro] = useState(null);

  const registrar = () => {
    if (!veiculo || !motorista || !km) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoRegistro = {
      id: Date.now(),
      tipo,
      veiculo,
      motorista,
      km: Number(km),
      hora: new Date().toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setHistorico([novoRegistro, ...historico]);
    setUltimoRegistro(novoRegistro);

    // Limpa os campos
    setVeiculo("");
    setMotorista("");
    setKm("");

    // Remove o alerta de sucesso após 4 segundos
    setTimeout(() => setUltimoRegistro(null), 4000);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* CABEÇALHO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Portaria — Controle de Entrada e Saída
        </h1>
        <p className="text-lg text-gray-600">
          Registre a movimentação de veículos da frota em tempo real
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* FORMULÁRIO DE REGISTRO */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Novo Registro
            </h2>

            <div className="space-y-6">
              <Select
                label="Tipo de Movimentação"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                options={["Entrada", "Saída"]}
              />

              <Select
                label="Veículo"
                value={veiculo}
                onChange={(e) => setVeiculo(e.target.value)}
                options={[
                  "Hilux 04",
                  "Saveiro 03",
                  "Caminhão 01",
                  "Caminhão 02",
                  "Moto 01",
                  "Fiorino 02",
                ]}
                placeholder="Selecione o veículo"
              />

              <Select
                label="Motorista"
                value={motorista}
                onChange={(e) => setMotorista(e.target.value)}
                options={[
                  "João Silva",
                  "Maria Souza",
                  "Carlos Andrade",
                  "Erivan Delfino",
                  "Ana Clara",
                  "Pedro Costa",
                ]}
                placeholder="Selecione o motorista"
              />

              <Input
                label="KM Atual do Veículo"
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
                placeholder="Ex: 87400"
              />

              <button
                onClick={registrar}
                className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition transform hover:scale-105 ${
                  tipo === "Entrada"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Registrar {tipo}
              </button>
            </div>
          </div>

          {/* ALERTA DE SUCESSO FLUTUANTE */}
          {ultimoRegistro && (
            <div className="fixed top-24 right-10 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 animate-pulse z-50">
              <i className="fa-solid fa-check-circle text-3xl"></i>
              <div>
                <p className="font-bold text-lg">{ultimoRegistro.tipo} Registrada!</p>
                <p className="text-sm opacity-90">
                  {ultimoRegistro.veiculo} • {ultimoRegistro.hora}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* HISTÓRICO RECENTE */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                Histórico de Movimentações
              </h2>
              <p className="text-gray-600 mt-1">
                Total hoje: <strong>{historico.length}</strong> registros
              </p>
            </div>

            <div className="p-8 max-h-screen overflow-y-auto">
              {historico.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <i className="fa-solid fa-truck-ramp-box text-6xl mb-6 opacity-20"></i>
                  <p className="text-xl">Nenhum registro realizado hoje</p>
                  <p className="text-sm mt-2">Os registros aparecerão aqui automaticamente</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historico.map((reg) => (
                    <Registro key={reg.id} data={reg} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}