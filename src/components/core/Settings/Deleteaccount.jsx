import { useState } from "react";
import { Deleteprofileaccount } from "../../../Services/authApi"; 
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

export default function DeleteAccount() {
  const [confirm, setConfirm] = useState(false);

  const navigate=useNavigate()
const dispatch=useDispatch();
  const handleDelete = () => {
    if (!confirm) {
      alert("Please check the confirmation box first.");
      return;
    }
    // Call your backend API here
    console.log("Account deletion confirmed!");
    dispatch(Deleteprofileaccount(navigate))
  };

  return (
    <div className="min-h-screen mt-8">
      <div className="w-[28rem] p-6 bg-[#3a0a0a] rounded-lg shadow-lg text-white">
        {/* Icon + Title */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-600">
            <span className="text-white text-xl">🗑️</span>
          </div>
          <h2 className="ml-3 text-xl font-semibold">Delete Account</h2>
        </div>

        {/* Warning text */}
        <p className="text-gray-300 mb-2">Would you like to delete account?</p>
        <p className="text-gray-400 mb-4 text-sm">
          This account contains Paid Courses. Deleting your account will remove
          all the content associated with it.
        </p>

        {/* Confirmation checkbox */}
        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span>I want to delete my account.</span>
        </label>

        {/* Delete button */}
        <button
          onClick={handleDelete}
          className={`w-full py-2 rounded ${
            confirm
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
          disabled={!confirm}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
