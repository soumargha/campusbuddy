import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = ({isSidebarOpen,setIsSidebarOpen}) => {
  return (
    <div className="sidebar">
    <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    <Search/>
    <Chats/>
  </div>
  )
}

export default Sidebar