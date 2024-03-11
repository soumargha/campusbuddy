import React, { useState } from 'react'
import "../chatComp/style.scss";
import Sidebar from '../chatComp/Sidebar';
import Chat from '../chatComp/Chat';
import { Nav } from '../components/Nav'

const ChatPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className='bg-teal-400 relative'>
      <div className='absolute left-[7%]'>
      <Nav />
      </div>
      <div className='home'>
        <div className="container">
        {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>}
          <Chat isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        </div>
      </div>
    </div>
  )
}

export default ChatPage