import React from "react";

function Message({ password, setPassword }) {
  return (
    <div className="md:w-2/3  flex flex-col gap-3 md:gap-4 h-auto text-lg px-8 py-6 text-black rounded-md bg-white">
      <h1 className=" md:text-left text-center border-b-4 font-bold border-green-500">
        PASTE SUCCESSFULLY CREATED !
      </h1>
      <h2 className=" font-bold ">
        PASTE ID : <i className="font-extrabold"> {password}</i>
      </h2>
      <div className=" flex-col md:flex-row gap-2  flex  sm:justify-between">
        <button
          onClick={() => {
            navigator.clipboard.writeText(password);
          }}
          className="px-6 py-4 bg-green-500 transition-all duration-500 text-white hover:bg-green-600 font-bold "
        >
          Copy Id
        </button>
        <button
          onClick={() => {
            setPassword("");
          }}
          className="px-6 py-4 bg-green-500 transition-all duration-500 text-white hover:bg-green-600 font-bold "
        >
          Create New Paste
        </button>
      </div>
    </div>
  );
}

export default Message;
