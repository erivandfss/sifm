// src/components/CardInfo.jsx
export default function CardInfo({ title, value, icon, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
    green: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-lg border-2 ${colors[color]} transition transform hover:scale-105`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 rounded-full ${colors[color].replace("100", "600").replace("700", "white")}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
}