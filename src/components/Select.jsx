export default function Select({ label, value, onChange, options }) {

  console.log("SELECT DEBUG → options recebidas:", options);

  const safeOptions = Array.isArray(options) ? options : [];

  return (
    <div className="flex flex-col gap-1 mb-3">
      {label && <label className="font-medium text-gray-700">{label}</label>}

      <select
        className="border p-2 rounded"
        value={value}
        onChange={onChange}
      >
        {safeOptions.length > 0 ? (
          safeOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))
        ) : (
          <option value="">Nenhuma opção disponível</option>
        )}
      </select>
    </div>
  );
}
