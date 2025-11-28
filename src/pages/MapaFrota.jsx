// src/pages/MapaFrota.jsx
import { useState } from "react";

export default function MapaFrota() {
  const [selecionado, setSelecionado] = useState(null);

  const veiculos = [
    { id: 1, nome: "Hilux 04", placa: "ABC-1234", status: "Ativo", x: 40, y: 45, cor: "green" },
    { id: 2, nome: "Saveiro 03", placa: "XYZ-8899", status: "Em uso", x: 68, y: 60, cor: "blue" },
    { id: 3, nome: "Caminhão 01", placa: "PPP-5521", status: "Oficina", x: 22, y: 70, cor: "yellow" },
    { id: 4, nome: "Fiorino 02", placa: "QWE-9876", status: "Ativo", x: 55, y: 30, cor: "green" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Ativo": return "bg-green-600";
      case "Em uso": return "bg-blue-600";
      case "Oficina": return "bg-yellow-500 text-black";
      default: return "bg-gray-600";
    }
  };

  const getBadgeColor = (status) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Em uso": return "bg-blue-100 text-blue-800";
      case "Oficina": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* TÍTULO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Mapa da Frota em Tempo Real</h1>
        <p className="text-lg text-gray-600">Visualize a localização atual de todos os veículos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* MAPA PRINCIPAL */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <i className="fa-solid fa-map-location-dot text-blue-600"></i>
              Localização Atual dos Veículos
            </h2>

            <div className="relative w-full h-96 lg:h-full min-h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl overflow-hidden shadow-inner">
              {/* Imagem de fundo do mapa (substitua por uma imagem real depois) */}
              <div className="absolute inset-0 bg-cover bg-center opacity-30" 
                   style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-42399584709f?w=1200')" }}>
              </div>

              {/* Marcadores dos veículos */}
              {veiculos.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelecionado(v)}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 hover:z-10`}
                  style={{ top: `${v.y}%`, left: `${v.x}%` }}
                >
                  <div className={`relative group`}>
                    {/* Marcador principal */}
                    <div className={`w-12 h-12 ${getStatusColor(v.status)} rounded-full shadow-xl flex items-center justify-center text-white font-bold text-sm border-4 border-white`}>
                      <i className="fa-solid fa-truck"></i>
                    </div>
                    
                    {/* Tooltip ao passar o mouse */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                      {v.nome} • {v.placa}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-900"></div>
                    </div>

                    {/* Pulsar para veículos em uso */}
                    {v.status === "Em uso" && (
                      <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Legenda */}
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Ativo / Parado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Em uso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Em manutenção</span>
              </div>
            </div>
          </div>
        </div>

        {/* PAINEL LATERAL */}
        <div className="space-y-6">
          {/* Lista de veículos */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <i className="fa-solid fa-list-ul text-blue-600"></i>
              Veículos ({veiculos.length})
            </h2>

            <div className="space-y-4">
              {veiculos.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelecionado(v)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selecionado?.id === v.id
                      ? "border-blue-500 bg-blue-50 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-lg text-gray-800">{v.nome}</p>
                      <p className="text-sm text-gray-500">{v.placa}</p>
                    </div>
                    {selecionado?.id === v.id && (
                      <i className="fa-solid fa-check-circle text-blue-600 text-xl"></i>
                    )}
                  </div>
                  
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${getBadgeColor(v.status)}`}>
                    {v.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes do veículo selecionado */}
          {selecionado && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <i className="fa-solid fa-circle-info"></i>
                {selecionado.nome}
              </h3>
              
              <div className="space-y-4 text-lg">
                <p><strong>Placa:</strong> {selecionado.placa}</p>
                <p><strong>Status:</strong> {selecionado.status}</p>
                <p><strong>Coordenadas:</strong> X: {selecionado.x}%, Y: {selecionado.y}%</p>
              </div>

              <button className="mt-8 w-full bg-white text-blue-700 font-bold py-4 rounded-2xl hover:bg-gray-100 transition shadow-lg">
                Ver Histórico Completo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}