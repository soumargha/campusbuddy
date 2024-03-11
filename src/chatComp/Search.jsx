import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../lib/firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user2, setUser2] = useState(null);
  const [err, setErr] = useState(false);

  const { user } = UserAuth();
  const { conversation, setConversation } = useContext(ChatContext);


  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser2(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create

    // If same user wants to talk to himself, return
    if(user.uid == user2.uid){
      alert('Same User!')
      return ;
    }
    const combinedId =
      user.uid > user2.uid
        ? user.uid + user2.uid
        : user2.uid + user.uid;
        console.log(user2);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //update userChats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user2.uid,
            displayName: user2.displayName,
            photoURL: user2.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user2.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      // Setting the chatId/Conversation
      setConversation({
        user2: {
          uid: user2.uid,
          displayName: user2.displayName,
          photoURL: user2.photoURL,
        },
        chatId:
          user.uid > user2.uid
            ? user.uid + user2.uid
            : user2.uid + user.uid,
      })
    } catch (err) { }



    setUser2(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user2 && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user2.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user2.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;