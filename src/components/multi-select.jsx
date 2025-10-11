import React from "react";

export const MultiSelect = ({ options = [], selected = [], onChange, placeholder = "Select options" }) => {
  const handleToggle = (value) => {
    if (selected?.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="border rounded p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {selected?.map((val) => {
          const label = options.find((opt) => opt.value === val)?.label || val;
          return (
            <span
              key={val}
              className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full"
            >
              {label}
            </span>
          );
        })}
      </div>
      <select
        onChange={(e) => handleToggle(e.target.value)}
        value=""
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
