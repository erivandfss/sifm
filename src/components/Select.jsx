// src/components/Select.jsx
export default function Select({ label, value, onChange, options = [], placeholder = "Selecione..." }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-gray-700 font-medium mb-1">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => {
          const val = typeof option === "object" ? option.value : option;
          const lab = typeof option === "object" ? option.label : option;
          return (
            <option key={val} value={val}>
              {lab}
            </option>
          );
        })}
      </select>
    </div>
  );
}