/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import ProductDetails from "./pages/ProductDetails";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./adminComp/ProtectedRoute";
import ChatPage from "./pages/ChatPage";
import { ChatContextProvider } from "./context/ChatContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ChatContextProvider>

            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chats" element={<ChatPage />} />
              <Route path="/cb/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              <Route path="/products/:id" element={<ProductDetails />} />
            </Routes>
          </ChatContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
