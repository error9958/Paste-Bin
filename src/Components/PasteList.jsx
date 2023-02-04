import { onSnapshot, query, collection, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../Scripts/firebase";

import ListItem from "./ListItem";
import { AuthContext } from "../Context/AuthContextProvider";

function RecentPasteList() {
  const [recentPasteList, setRecentPasteList] = useState([]);
  const [myPasteList, setMyPasteList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "UserPastes"),
        where("createdBy", "==", user?.uid)
      );
      const unSub = onSnapshot(q, (docs) => {
        var list = [];
        docs.forEach((doc) => {
          list = [...list, doc.data()];
        });
        list.sort((a, b) => {
          return b.createdOn.seconds - a.createdOn.seconds;
        });
        setMyPasteList(list);
      });
      return () => {
        unSub();
      };
    }
  }, [user]);

  useEffect(() => {
    const q = query(
      collection(db, "UserPastes"),
      where("flag", "==", "public")
    );

    const unSub = onSnapshot(q, (docs) => {
      var list = [];
      docs.forEach((doc) => {
        list = [...list, doc.data()];
      });
      list.sort((a, b) => {
        return b.createdOn.seconds - a.createdOn.seconds;
      });
      setRecentPasteList(list);
    });
    return () => {
      unSub();
    };
  }, []);
  return (
    <div className="flex flex-col md:w-1/3  gap-4">
      <div
        className={`relative bg-gryNav border-t-2 gap-2   md:border-l-4 md:border-t-0 px-4 py-3 border-gry flex flex-col ${
          user ? "h-64" : "h-100"
        } `}
      >
        <span className=" text-lg mb-1 sticky top-0 bg-green-500 px-4 py-2 w-full font-bold border-b-2">
          Recent Public Paste
        </span>

        <div className="flex flex-col overflow-y-auto gap-2">
          {recentPasteList.map((doc) => {
            return (
              <ListItem isOwner={false} doc={doc} key={doc.createdOn.seconds} />
            );
          })}
        </div>
      </div>
      {user && (
        <div
          className={`relative bg-gryNav border-t-2 gap-2   md:border-l-4 md:border-t-0 px-4 py-3 border-gry flex flex-col h-64
       
        } `}
        >
          <span className=" text-lg mb-1 sticky top-0 bg-green-500 px-4 py-2 w-full font-bold border-b-2">
            My Paste
          </span>

          <div className="flex flex-col overflow-y-auto gap-2">
            {myPasteList.map((doc) => {
              return (
                <ListItem
                  isOwner={true}
                  doc={doc}
                  key={doc.createdOn.seconds}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentPasteList;
