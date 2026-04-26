import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../slices/ProfileSlice";

function ProfilePicture() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [preview, setPreview] = useState(user?.image || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      const updatedUser = { ...user, image: imageUrl };
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 flex items-center gap-6 shadow-md ">

      {/* Profile Image */}
      <img
        src={preview || "/default-avatar.png"}
        alt="profile"
        className="w-16 h-16 rounded-full object-cover border border-gray-600"
      />

      {/* Content */}
      <div className="flex flex-col w-full">
        <h3 className="text-white text-lg font-semibold">
          Change Profile Picture
        </h3>

        <div className="flex gap-4 mt-4">

          {/* Hidden Input */}
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Change Button */}
          <button
            onClick={() => document.getElementById("fileInput").click()}
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2 rounded-md font-medium transition"
          >
            Change
          </button>

          {/* Remove Button */}
          <button
            onClick={() => {
              setPreview(null);
              const updatedUser = { ...user, image: null };
              dispatch(setUser(updatedUser));
              localStorage.setItem("user", JSON.stringify(updatedUser));
            }}
            className="bg-red-500 hover:bg-red-400 text-white px-5 py-2 rounded-md font-medium transition"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;