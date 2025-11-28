export default function Input({ label, type, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
