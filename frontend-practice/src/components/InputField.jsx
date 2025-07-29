export default function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block mb-2 border p-2 rounded w-full"
      required
    />
  );
}
