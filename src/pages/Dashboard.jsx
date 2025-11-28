// src/pages/Dashboard.jsx
import CardInfo from "../components/CardInfo";

export default function Dashboard() {
  const movimentacaoSemana = [12, 19, 9, 16, 20, 14, 18];
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* TÍTULO */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Dashboard — Visão Geral
        </h1>
        <p className="text-gray-600 text-lg">Bem-vindo ao SIFM • Sistema Interno de Frota e Manutenção</p>
      </div>

      {/* CARDS PRINCIPAIS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <CardInfo
          title="Veículos Ativos"
          value="18"
          icon={<i className="fa-solid fa-truck text-3xl" />}
          color="blue"
        />
        <CardInfo
          title="Manutenções Pendentes"
          value="4"
          icon={<i className="fa-solid fa-screwdriver-wrench text-3xl" />}
          color="yellow"
        />
        <CardInfo
          title="Entradas/Saídas Hoje"
          value="27"
          icon={<i className="fa-solid fa-door-open text-3xl" />}
          color="green"
        />
      </div>

      {/* GRÁFICO DE MOVIMENTAÇÃO */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Movimentação da Frota • Últimos 7 dias
        </h2>

        <div className="flex items-end justify-between h-64 px-4">
          {movimentacaoSemana.map((valor, index) => (
            <div key={index} className="flex flex-col items-center gap-3 flex-1">
              {/* Barra */}
              <div className="relative w-full bg-gray-200 rounded-t-lg overflow-hidden group">
                <div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-500 transition-all duration-500 hover:from-blue-700 hover:to-blue-600"
                  style={{ height: `${valor * 8}px` }}
                  title={`${valor} movimentações`}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {valor}
                  </span>
                </div>
              </div>
              {/* Dia da semana */}
              <span className="text-sm font-medium text-gray-600">{dias[index]}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Total de movimentações na semana: <strong>{movimentacaoSemana.reduce((a, b) => a + b, 0)}</strong>
        </div>
      </div>

      {/* RODAPÉ DECORATIVO */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        Sistema em operação • Última atualização: {new Date().toLocaleString("pt-BR")}
      </div>
    </div>
  );
}