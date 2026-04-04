import React from "react";

const ConfirmationModal = ({ modaldata }) => {
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-slate-800 w-96 h-60 flex flex-col items-center rounded-lg shadow-lg">
        <h1 className="text-3xl mt-4 text-white">{modaldata.text1}</h1>

        <p className="text-xl mt-6 text-gray-200">{modaldata.text2}</p>

        <div className="flex mt-8 items-center gap-8">
          <button
            onClick={modaldata.btn1handler}
            className="bg-yellow-500 text-black rounded-md px-4 py-2 font-semibold hover:bg-yellow-400 transition"
          >
            {modaldata.btn1text}
          </button>

          <button
            onClick={modaldata.btn2handler}
            className="bg-white text-red-600 rounded-md px-4 py-2 font-semibold hover:bg-gray-200 transition"
          >
            {modaldata.btn2text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
