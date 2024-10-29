function OptionCautivaCheck({ name, type, label, value, checked, onChange }) {
  return (
    <label
      className={`flex items-center space-x-2 cursor-pointer ${
        checked ? "bg-primary-light" : "bg-gray-light"
      } p-4 rounded-md`}
    >
      <input
        name={name}
        type={type}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center border rounded-full ${
          checked ? "bg-[#D9E6F4]" : "bg-[#F5F4F7]"
        }`}
      >
        {checked && <div className="w-3 h-3 bg-[#0E4D90] rounded-full"></div>}
      </div>
      <span
        className={`${
          checked ? "text-[#0E4D90]" : "text-[#333333]"
        } font-medium`}
      >
        {label}
      </span>
    </label>
  );
}

export { OptionCautivaCheck };
