import React, { useContext, useState } from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
import { Image } from 'lucide-react';
import { Paperclip } from 'lucide-react';
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { UserAuth } from "../context/AuthContext";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { user } = UserAuth();
  const { conversation } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", conversation.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", conversation.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user.uid), {
      [conversation.chatId + ".lastMessage"]: {
        text,
      },
      [conversation.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", conversation.user2.uid), {
      [conversation.chatId + ".lastMessage"]: {
        text,
      },
      [conversation.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <Paperclip />
        {/* <img src={Attach} alt="" /> */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <Image />
          {/* <img src={Img} alt="" /> */}
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;