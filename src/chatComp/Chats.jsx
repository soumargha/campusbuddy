import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { UserAuth } from "../context/AuthContext";
import { db } from "../lib/firebase";

const Chats = () => {
    const [chats, setChats] = useState([]);

    const { user } = UserAuth();
    const { conversation, setConversation } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        user.uid && getChats();
    }, [user.uid]);

    const handleSelect = (u) => {
        // dispatch({ type: "CHANGE_USER", payload: u });
        setConversation({
            user2: u,
            chatId:
                user.uid > u.uid
                    ? user.uid + u.uid
                    : u.uid + user.uid,
        })
    };

    return (
        <div className="chats">
            {chats && Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div
                    className="userChat"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chats;