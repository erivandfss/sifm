import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Select from "../components/Select";
import Registro from "../components/Registro";

export default function Portaria() {

  const [tipo, setTipo] = useState("Entrada");
  const [veiculo, setVeiculo] = useState("");
  const [motorista, setMotorista] = useState("");
  const [km, setKm] = useState("");
  const [historico, setHistorico] = useState([]);

  const registrar = () => {
    if (!veiculo || !motorista || !km) return alert("Preencha todos os campos!");

    const novo = {
      tipo,
      veiculo,
      motorista,
      km,
      hora: new Date().toLocaleString(),
    };

    setHistorico([novo, ...historico]);

    // limpar campos
    setKm("");
    setVeiculo("");
    setMotorista("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-10">
        
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Portaria — Entrada / Saída</h1>

        {/* Formulário */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10 max-w-xl">

          <Select
            label="Tipo de Registro"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            options={["Entrada", "Saída"]}
          />

          <Select
            label="Veículo"
            value={veiculo}
            onChange={(e) => setVeiculo(e.target.value)}
            options={[
              "Caminhão 01",
              "Caminhão 02",
              "Moto 01",
              "Hilux 04",
              "Saveiro 03",
            ]}
          />

          <Select
            label="Motorista"
            value={motorista}
            onChange={(e) => setMotorista(e.target.value)}
            options={[
              "João Silva",
              "Carlos Andrade",
              "Maria Souza",
              "Erivan Delfino",
            ]}
          />

          <Input
            label="KM Atual"
            type="number"
            value={km}
            onChange={(e) => setKm(e.target.value)}
          />

          <button
            onClick={registrar}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Registrar
          </button>
        </div>

        {/* HISTÓRICO */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Histórico</h2>

        <div className="max-w-xl">
          {historico.length === 0 && (
            <p className="text-gray-500">Nenhum registro ainda.</p>
          )}

          {historico.map((reg, index) => (
            <Registro key={index} data={reg} />
          ))}
        </div>

      </div>

    </div>
  );
}
