import { useState } from "react";
import Sidebar from "../components/Sidebar";

export default function MapaFrota() {
  const [selecionado, setSelecionado] = useState(null);

  const veiculos = [
    { id: 1, nome: "Hilux 04", placa: "ABC-1234", status: "Ativo", x: 40, y: 45 },
    { id: 2, nome: "Saveiro 03", placa: "XYZ-8899", status: "Em uso", x: 68, y: 60 },
    { id: 3, nome: "Caminhão 01", placa: "PPP-5521", status: "Oficina", x: 22, y: 70 },
  ];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      {/* Conteúdo */}
      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold text-gray-700 mb-6">
          Mapa da Frota (Mockup)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* MAPA */}
          <div className="col-span-3 bg-white rounded-xl shadow p-4 border border-gray-200 relative">

            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Localização dos Veículos
            </h2>

            <div className="relative w-full h-[500px] bg-gray-200 rounded-lg overflow-hidden">

              {/* imagem de mapa */}
              <img
                src="/mapa-mock.png"
                alt="mapa"
                className="w-full h-full object-cover opacity-90"
              />

              {/* marcadores */}
              {veiculos.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelecionado(v)}
                  style={{
                    position: "absolute",
                    top: `${v.y}%`,
                    left: `${v.x}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-full text-xs font-bold
                    ${v.status === "Ativo" ? "bg-green-600 text-white" : ""}
                    ${v.status === "Em uso" ? "bg-blue-600 text-white" : ""}
                    ${v.status === "Oficina" ? "bg-yellow-500 text-black" : ""}
                  `}
                >
                  {v.nome}
                </div>
              ))}

            </div>
          </div>

          {/* LISTA LATERAL */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Veículos
            </h2>

            <div className="space-y-4">

              {veiculos.map((v) => (
                <div
                  key={v.id}
                  className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelecionado(v)}
                >
                  <p className="font-semibold">{v.nome}</p>
                  <p className="text-sm text-gray-500">{v.placa}</p>

                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs rounded-lg font-semibold
                    ${v.status === "Ativo" ? "bg-green-200 text-green-800" : ""}
                    ${v.status === "Em uso" ? "bg-blue-200 text-blue-800" : ""}
                    ${v.status === "Oficina" ? "bg-yellow-200 text-yellow-800" : ""}
                    `}
                  >
                    {v.status}
                  </span>
                </div>
              ))}

            </div>

            {/* Detalhes do veículo selecionado */}
            {selecionado && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-blue-700 text-lg mb-2">
                  {selecionado.nome}
                </h3>

                <p><strong>Placa:</strong> {selecionado.placa}</p>
                <p><strong>Status:</strong> {selecionado.status}</p>

                <button
                  className="mt-3 bg-blue-700 text-white w-full py-2 rounded-lg hover:bg-blue-800"
                >
                  Ver histórico completo
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
