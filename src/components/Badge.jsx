export default function Badge({ text, color }) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded-lg font-semibold text-white bg-${color}-600`}
    >
      {text}
    </span>
  );
}
