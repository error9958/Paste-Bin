import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { findPaste } from "../Scripts/UtilityMethods";

function Find() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const clickHandler = async () => {
    findPaste(value).then((data) => {
      navigate("/paste", { state: { data: data } });
    });
  };
  return (
    <div className="px-16 flex items-center flex-col py-8 gap-10">
      <h1 className="text-center font-extrabold  text-5xl sm:text-7xl">
        FIND PASTE
      </h1>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Enter Paste Code"
        type="text"
        className=" outline-none rounded-lg md:w-1/2  w-full text-gry text-xl px-4 py-2 sm:text-2xl sm:px-8 sm:py-6"
      />
      <button
        onClick={() => {
          clickHandler();
        }}
        className="flex gap-2 items-center bg-green-500 hover:bg-green-600 px-4 py-2 md:px-6 md:py-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 md:w-8 md:h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <span className="font-bold">SEARCH</span>
      </button>
    </div>
  );
}

export default Find;
