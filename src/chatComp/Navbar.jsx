import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { ArrowLeftToLine } from 'lucide-react';

const Navbar = ({isSidebarOpen,setIsSidebarOpen}) => {
  const {user, logOut} = UserAuth();

  return (
    <div className='navbar'>
    <span className="logo">Chats</span>
    <div className="user">
      <img src={user.photoURL} alt="" />
      <span>{user.displayName}</span>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}><ArrowLeftToLine /></button>
    </div>
  </div>
  )
}

export default Navbar