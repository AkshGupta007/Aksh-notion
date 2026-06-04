import React, { useState, useEffect } from "react";

const Requirementlist = ({
  name,
  setValue,
  getValues,
  label,
  errors,
  register,
}) => {
  const [requirement, setrequirement] = useState("");
  const [requirementlist, setrequirementlist] = useState([]);

  // Add requirement
  const addrequirement = () => {
    const trimmed = requirement.trim();
    if (!trimmed) return;
    setrequirementlist((prev) => [...prev, trimmed]);
    setrequirement("");
  };

  // Remove requirement
  const removerequirement = (index) => {
    setrequirementlist((prev) => prev.filter((_, i) => i !== index));
  };

  // Sync with react-hook-form
  useEffect(() => {
    setValue(name, requirementlist);
  }, [requirementlist, name, setValue]);

  // Register field
  useEffect(() => {
    register(name, { required: true });
  }, [name, register]);

  // ✅ Load existing data (edit case) — safe array check prevents crash
  useEffect(() => {
    const data = getValues(name);
    if (data && Array.isArray(data) && data.length > 0) {
      setrequirementlist(data);
    }
  }, [getValues, name]);

  return (
    <div className="text-white">
      <label htmlFor={name} className="block mb-2 font-medium">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          id={name}
          value={requirement}
          placeholder="Enter requirement"
          onChange={(e) => setrequirement(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addrequirement())
          }
          className="flex-1 px-3 py-2 text-black rounded-md"
        />

        <button
          type="button"
          onClick={addrequirement}
          className="bg-yellow-400 text-black px-3 py-2 rounded-md hover:bg-yellow-300 transition"
        >
          Add
        </button>
      </div>

      {/* List */}
      <ul className="mt-3 space-y-2">
        {requirementlist.map((req, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded-md"
          >
            <span>{req}</span>
            <button
              type="button"
              onClick={() => removerequirement(index)}
              className="text-red-400 text-sm hover:text-red-300"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Error */}
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-2">{label} is required</p>
      )}
    </div>
  );
};

export default Requirementlist;
