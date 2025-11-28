export default function CardInfo({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 border border-gray-100">
      <div className="bg-blue-600 text-white p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
