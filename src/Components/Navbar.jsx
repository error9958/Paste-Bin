import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";
import { auth } from "../Scripts/firebase";

function Navbar() {
  const { user } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="h-16 bg-black xl:px-72 px-4 relative  text-white flex items-center  justify-between gap-8">
        <span className="text-xl font-extrabold  tracking-widest">
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
          className="w-7 h-7   md:hidden"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>

        <div className=" hidden items-center  md:flex gap-3 ">
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
                }}
                className="px-4 hover:bg-red-500 transition-colors duration-500 hover:text-white text-black font-bold py-2 h-10 bg-white h"
              >
                LogOut
              </button>
              <div className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
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
      <div
        className={` w-full  md:hidden h-auto relative  ${
          menu ? "left-0" : "-left-full "
        } flex flex-col text-black bg-white  transition-all  duration-300
         `}
      >
        <span>User</span>
        <span>New Paste</span>
        <span>Find Paste</span>
        <span>Logout</span>
        <span>SignIn</span>
        <span>SignOut</span>
      </div>
    </>
  );
}

export default Navbar;
