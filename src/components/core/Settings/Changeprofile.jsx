import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../slices/ProfileSlice"; // adjust import path

function ProfilePicture() {

  const{user}=useSelector((state)=>state.profile)

  const dispatch = useDispatch();
  const [preview, setPreview] = useState(user.image);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary preview URL
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);

      // Update redux state (you can also upload to server here)
      dispatch(setUser({ ...user, image: imageUrl }));
      localStorage.setItem("user",JSON.stringify(user));
    }
  };

  return (
    <div className="bg-slate-500 text-white flex mb-10 p-4 rounded-md">
      <img
        src={preview ?? "/default-avatar.png"}
        alt="profile"
        className="rounded-md w-[60px] h-[60px] object-cover mt-2"
      />
      <div className="flex flex-col px-8">
        <span className="font-semibold">Change Profile Picture</span>

        <div className="flex gap-x-5 items-center mt-5">
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            className="bg-yellow-500 text-black rounded-md px-4 py-2"
            onClick={() => document.getElementById("fileInput").click()}
          >
            CHANGE
          </button>

          <button
            className="bg-red-500 text-white rounded-md px-4 py-2"
            onClick={() => {
              setPreview(null);
              const updatedUser = { ...user, image: null };
              dispatch(setUser(updatedUser));
              localStorage.setItem("user", JSON.stringify(updatedUser));

            }}
          >
            REMOVE
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;
