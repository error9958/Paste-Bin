import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";

import { AuthContext } from "../Context/AuthContextProvider";
import { db } from "../Scripts/firebase";
import { updatePaste } from "../Scripts/UtilityMethods";

function DisplayPaste() {
  const location = useLocation();
  const [data, setData] = useState(null);
  const [paste, setPaste] = useState("");
  const { user } = useContext(AuthContext);
  const show = useRef(false);
  const [menu, setMenu] = useState(true);
  const ref = useRef(null);
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "UserPastes", location.state.data.id),
      (doc) => {
        setData(doc.data());
        setPaste(doc.data().paste);
      }
    );
    return () => {
      unSub();
    };
  }, []);

  useEffect(() => {
    console.log(ref.current.scrollHeight);
    ref.current.style.height = ref.current.scrollHeight;
  }, []);

  return (
    <>
      <Navbar menu={menu} setMenu={setMenu} />
      <div
        onClick={() => {
          setMenu(true);
        }}
        className=" md:px-12 md:py-8 px-4 py-2"
      >
        <div className="md:flex items-center gap-4 mb-6">
          <h1 className=" py-2 md:mb-4 text-4xl md:text-6xl font-bold">
            {data?.title}
          </h1>
          <div className="  flex gap-4  ">
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste);
              }}
              className="px-3 font-semibold py-1   text-lg bg-green-500 hover:bg-green-600 rounded-md   flex items-center  gap-1"
            >
              Copy
            </button>
            {show.current && (
              <button
                onClick={() => {
                  updatePaste(data?.id, paste);
                  show.current = false;
                }}
                className="px-3 font-semibold py-1  text-lg bg-green-500 hover:bg-green-600 rounded-md   flex items-center  gap-1"
              >
                Save
              </button>
            )}
          </div>
        </div>
        <div>
          <textarea
            readOnly={!(user?.uid === data?.createdBy)}
            ref={ref}
            spellCheck={false}
            className={`text-blk resize-none  h-150  shadow-black w-full px-8  py-6  outline-none rounded-lg `}
            value={paste}
            onChange={(e) => {
              show.current = true;

              ref.current.style.height = ref.current.scrollHeight + "px";
              setPaste(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default DisplayPaste;
