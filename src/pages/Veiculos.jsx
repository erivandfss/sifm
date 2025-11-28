import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Veiculos() {
  const [showModal, setShowModal] = useState(false);

  const [veiculos, setVeiculos] = useState([
    { id: 1, nome: "Caminhão 01", placa: "XYZ-1234", tipo: "Caminhão", km: 152000 },
    { id: 2, nome: "Hilux 04", placa: "ABC-9090", tipo: "Pickup", km: 87000 },
    { id: 3, nome: "Saveiro 03", placa: "TYU-1122", tipo: "Pickup", km: 103400 },
  ]);

  // campos do veículo
  const [nome, setNome] = useState("");
  const [placa, setPlaca] = useState("");
  const [tipo, setTipo] = useState("");
  const [km, setKm] = useState("");

  const cadastrarVeiculo = () => {
    if (!nome || !placa || !tipo || !km) {
      alert("Preencha todos os campos!");
      return;
    }

    const novo = {
      id: veiculos.length + 1,
      nome,
      placa,
      tipo,
      km,
    };

    setVeiculos([...veiculos, novo]);
    setShowModal(false);

    setNome("");
    setPlaca("");
    setTipo("");
    setKm("");
  };

  const excluir = (id) => {
    setVeiculos(veiculos.filter((v) => v.id !== id));
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">
        
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">Veículos</h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            + Novo Veículo
          </button>
        </div>

        {/* Tabela */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3">Nome</th>
                <th className="pb-3">Placa</th>
                <th className="pb-3">Tipo</th>
                <th className="pb-3">KM Atual</th>
                <th className="pb-3 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {veiculos.map((v) => (
                <tr key={v.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{v.nome}</td>
                  <td className="py-2">{v.placa}</td>
                  <td className="py-2">{v.tipo}</td>
                  <td className="py-2">{v.km} km</td>
                  <td className="py-2 text-center">
                    <button
                      className="text-red-600 font-semibold hover:underline"
                      onClick={() => excluir(v.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Cadastro */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96 border border-gray-200">

              <h2 className="text-xl font-bold mb-4 text-gray-700">
                Cadastro de Veículo
              </h2>

              <Input label="Nome do Veículo" value={nome} onChange={(e) => setNome(e.target.value)} />

              <Input label="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} />

              <Select
                label="Tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                options={["Caminhão", "Pickup", "Moto", "SUV", "Carro"]}
              />

              <Input
                label="KM Atual"
                type="number"
                value={km}
                onChange={(e) => setKm(e.target.value)}
              />

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Cancelar
                </button>

                <button
                  onClick={cadastrarVeiculo}
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
