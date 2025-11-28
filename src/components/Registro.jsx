export default function Registro({ data }) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm mb-3">
      <p className="text-gray-700 font-semibold">{data.tipo} - {data.veiculo}</p>
      <p className="text-sm text-gray-500">Motorista: {data.motorista}</p>
      <p className="text-sm text-gray-500">KM: {data.km}</p>
      <p className="text-xs text-gray-400 mt-2">{data.hora}</p>
    </div>
  );
}
