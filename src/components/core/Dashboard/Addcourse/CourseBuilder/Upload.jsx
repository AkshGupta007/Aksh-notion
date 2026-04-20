import React, { useEffect, useState } from "react";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData,
  editData,
}) => {
  const [preview, setPreview] = useState(null);
  const [replaced, setReplaced] = useState(false);

  useEffect(() => {
    register(name, {
      validate: (value) => {
        if (value instanceof File) return true;
        if (typeof value === "string" && value.trim() !== "") return true;
        return `${label} is required`;
      },
    });
  }, [register, name, label]);

  useEffect(() => {
    if (viewData || editData) {
      const existing = viewData || editData;
      setPreview(existing);
      setValue(name, existing, { shouldValidate: true });
    }
  }, [viewData, editData, setValue, name]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue(name, file, { shouldValidate: true });
    setPreview(URL.createObjectURL(file));
    setReplaced(true);
  };

  const isViewOnly = !!viewData; // ✅ view mode = no input at all

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {label} {!video && <span className="text-red-500">*</span>}
      </label>

      {/* ✅ Preview always shown when URL or blob exists */}
      {preview && (
        <div className="rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-700">
          {video ? (
            <video src={preview} controls className="w-full max-h-60" />
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-40 object-cover"
            />
          )}
        </div>
      )}

      {/* ✅ View mode — input hidden entirely */}
      {!isViewOnly && (
        <>
          {editData && !replaced ? (
            // Edit mode — "Replace" button instead of raw file input
            <label className="cursor-pointer self-start inline-flex items-center gap-2 rounded-md border border-zinc-300 dark:border-zinc-600 px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              Replace {video ? "video" : "image"}
              <input
                type="file"
                accept={video ? "video/*" : "image/*"}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            // Add mode — normal file input
            <input
              type="file"
              accept={video ? "video/*" : "image/*"}
              onChange={handleFileChange}
              className="w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300
                file:mr-3 file:rounded file:border-0 file:bg-zinc-100 dark:file:bg-zinc-700
                file:px-3 file:py-1 file:text-sm file:text-zinc-700 dark:file:text-zinc-300 cursor-pointer"
            />
          )}
        </>
      )}

      {errors[name] && (
        <span className="text-xs text-red-500">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Upload;
