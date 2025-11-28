import Sidebar from "../components/Sidebar";
import CardInfo from "../components/CardInfo";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* Menu lateral */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div className="flex-1 p-10">
        
        {/* Título */}
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          Dashboard — Visão Geral
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <CardInfo 
            title="Veículos Ativos"
            value="18"
            icon={<i className="fa-solid fa-truck" />}
          />

          <CardInfo 
            title="Manutenções Pendentes"
            value="4"
            icon={<i className="fa-solid fa-screwdriver-wrench" />}
          />

          <CardInfo 
            title="Entradas/Saídas Hoje"
            value="27"
            icon={<i className="fa-solid fa-door-open" />}
          />
        </div>

        {/* Gráfico simples */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Movimentação da Frota (Últimos 7 dias)
          </h2>

          <div className="flex items-end h-40 gap-3">

            {/* Barras simples (sem libs externas) */}
            {[12, 19, 9, 16, 20, 14, 18].map((v, i) => (
              <div
                key={i}
                className="bg-blue-600 w-8 rounded"
                style={{ height: `${v * 5}px` }}
                title={`${v} movimentações`}
              ></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
