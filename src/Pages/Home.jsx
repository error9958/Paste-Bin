import React, { useRef, useState } from "react";
import Message from "../Components/Message";
import Navbar from "../Components/Navbar";
import PasteList from "../Components/PasteList";
import { auth } from "../Scripts/firebase";
import { createPaste } from "../Scripts/UtilityMethods";

function Home() {
  const ref = useRef(null);
  const [value, setValue] = useState("");
  const [flag, setFlag] = useState("public");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [menu, setMenu] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    createPaste(
      title,
      value,
      flag,
      auth.currentUser ? auth.currentUser.uid : null
    ).then((e) => {
      setPassword(e);
    });
    setValue("");
    setFlag("public");
    setTitle("");
    setPassword("");
  };
  return (
    <>
      <Navbar menu={menu} setMenu={setMenu} />
      <div
        onClick={() => {
          setMenu(true);
        }}
        className="xl:mx-72  md:flex items-start gap-4  mt-6  xl:px-12 px-4  py-4  bg-blk"
      >
        {password ? (
          <Message password={password} setPassword={setPassword} />
        ) : (
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className=" items-center relative md:w-2/3 flex flex-col my-4 gap-6"
          >
            <div className="text-lg  w-full">Paste Name / Title</div>

            <input
              required
              spellCheck={false}
              className="w-full outline-none px-6 py-3 text-blk"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter Name/Title "
            />
            <div className="text-lg  w-full">Public / Private Paste</div>
            <div className="flex justify-start items-center w-full gap-4">
              <div className="flex items-center gap-1">
                <input
                  onChange={() => {
                    setFlag("public");
                  }}
                  type="radio"
                  checked={flag === "public" ? true : false}
                  className=" w-5 h-5"
                />
                <span>Public</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  checked={flag === "private" ? true : false}
                  type="radio"
                  className="w-5 h-5"
                  onChange={() => {
                    setFlag("private");
                  }}
                />
                <span>Private</span>
              </div>
            </div>
            <textarea
              required
              ref={ref}
              className="font-mono text-blk resize-none   shadow-black w-full px-8 py-6 h-60 outline-none rounded-lg  "
              value={value}
              placeholder="Enter / Paste your text ......"
              onChange={(e) => {
                setValue(e.target.value);
                ref.current.style.height = "15rem";
                ref.current.style.height = ref.current.scrollHeight + "px";
              }}
            ></textarea>
            <button
              type="submit"
              className="px-4 text-black font-bold text-base py-3 bg-white"
            >
              Create Paste
            </button>
          </form>
        )}
        <PasteList />
      </div>
    </>
  );
}

export default Home;
