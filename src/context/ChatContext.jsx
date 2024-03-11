import {
    createContext,
    useContext,
    useReducer,
    useState,
  } from "react";
  import { UserAuth } from "./AuthContext";
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const { user } = UserAuth();

    const [conversation, setConversation] = useState({chatId: "null",user2: {}});


    // const INITIAL_STATE = {
    //   chatId: "null",
    //   user: {},
    // };
  
    // const chatReducer = (state, action) => {
    //   switch (action.type) {
    //     case "CHANGE_USER":
    //       return {
    //         user: action.payload,
    //         chatId:
    //           currentUser.uid > action.payload.uid
    //             ? currentUser.uid + action.payload.uid
    //             : action.payload.uid + currentUser.uid,
    //       };
  
    //     default:
    //       return state;
    //   }
    // };
  
    // const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      <ChatContext.Provider value={{ conversation, setConversation }}>
        {children}
      </ChatContext.Provider>
    );
  };