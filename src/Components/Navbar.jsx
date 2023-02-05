import { signOut } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { auth } from "../Scripts/firebase";

function Navbar({ menu, setMenu }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="h-16 w-full bg-black xl:px-72  relative  overflow-y-visible overflow-x-clip  text-white flex items-center  justify-between gap-8 ">
      <div
        className={` md:hidden w-full bg-white flex flex-col overflow-hidden text-black absolute top-16  z-10  transition-all duration-200 ${
          menu ? "-right-full" : "right-0"
        }`}
      >
        <button
          onClick={() => {
            navigate("/");
          }}
          className="w-full px-5 py-3 bg-green-500 text-white font-bold hover:bg-green-600"
        >
          ADD PASTE
        </button>
        <button
          onClick={() => {
            navigate("/find");
          }}
          className="w-full px-5 py-3 bg-green-500 text-white font-bold hover:bg-green-600"
        >
          FIND PASTE
        </button>
        {user ? (
          <button
            onClick={() => {
              signOut(auth);
              navigate("/", { replace: true });
            }}
            className="w-full px-5 py-3  bg-green-500 text-white font-bold hover:bg-green-600"
          >
            LOGOUT
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="w-full px-5 py-3 bg-green-500 text-white font-bold hover:bg-green-600"
            >
              SIGN IN
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="w-full px-5 py-3 bg-green-500 text-white font-bold hover:bg-green-600"
            >
              SIGN UP
            </button>
          </>
        )}
      </div>

      <span className="text-xl px-4 font-extrabold  tracking-widest">
        PASTEBIN
      </span>

      <svg
        onClick={() => {
          setMenu(!menu);
        }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-12 h-12 px-2   md:hidden"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>

      <div className=" hidden items-center  px-4 md:flex gap-3 ">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-4 flex items-center gap-2 text-white font-bold py-2 h-10 bg-green-500 h"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add
        </button>
        <button
          onClick={() => {
            navigate("/find");
          }}
          className="px-4 flex items-center gap-2 text-white font-bold py-2 h-10 bg-green-500 h"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          Find
        </button>
        {user ? (
          <div className="flex items-center gap-2 ">
            <button
              onClick={() => {
                signOut(auth);
                navigate("/", { replace: true });
              }}
              className="px-4 hover:bg-red-500 transition-colors duration-500 hover:text-white text-black font-bold py-2 h-10 bg-white h"
            >
              LogOut
            </button>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>

              <div className=" flex flex-col items-start  text-sm font-bold text-white">
                <span>{user?.displayName}</span>
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-4 text-black font-bold py-2 h-10 bg-white h"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="px-4 py-2 h-10 box-border border-2  border-white"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
