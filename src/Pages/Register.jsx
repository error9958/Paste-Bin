import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

import Navbar from "../Components/Navbar";
import { getError, SignUp } from "../Scripts/UtilityMethods";

function Register() {
  const [obscure, setObscure] = useState(true);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [menu, setMenu] = useState(true);
  const navigate = useNavigate();
  const submitHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    SignUp(userName, email, password, flag).then((e) => {
      if (e === true) {
        navigate("/", { replace: true });
      } else {
        setError(getError(e));
        setLoading(false);
      }
    });
  };
  return (
    <>
      <Navbar menu={menu} setMenu={setMenu} />

      <div
        onClick={() => {
          setMenu(true);
        }}
        className=" h-screen bg-whitesmoke flex items-center  shadow-2xl text-sm "
      >
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="h-auto  drop-shadow-lg hover:drop-shadow-xl lg:w-1/3 px-12 py-6  lg:px-20  lg:py-12  gap-4 flex flex-col items-start bg-white text-blkv mx-auto"
        >
          <span className="font-medium text-3xl">REGISTER</span>
          <span className="font-medium text-red-400 text-lg">{error}</span>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm">USERNAME</span>
            <input
            spellCheck={false}
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
              type="text"
              className="w-full outline-none border hover:border-green-400 border-grybor md:px-6 md:py-4 px-4 py-2"
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <span className="text-sm">EMAIL</span>
            <input
              spellCheck={false}
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              className="w-full hover:border-green-400 outline-none border border-grybor md:px-6 md:py-4 px-4 py-2"
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <span className="text-sm">PASSWORD</span>
            <div className="flex hover:border-green-400 justify-between items-center border gap-1 border-grybor md:px-6 md:py-4 px-4 py-2">
              <input
                spellCheck={false}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                className="w-full outline-none "
                type={obscure ? "password" : "text"}
              />
              {obscure ? (
                <svg
                  onClick={() => {
                    setObscure(!obscure);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setObscure(!obscure);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 h-7">
            <input
              type="checkbox"
              checked={flag}
              onChange={() => {
                setFlag(!flag);
              }}
              className=" w-6 h-6  "
            />
            <span className="text-xs ">Remember me</span>
          </div>
          <button
            type="submit"
            className="bg-blkv  text-white font-semibold  px-8 py-4"
          >
            {loading ? <SyncLoader color="white" /> : "REGISTER"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
