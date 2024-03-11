import React, { useState } from 'react'
import Table from '../adminComp/Table'
import AdminMenu from '../adminComp/Menu'

const AdminPage = () => {
  const [showStatus, setShowStatus] = useState("pending");

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='my-5'>
        <AdminMenu showStatus={showStatus} setShowStatus={setShowStatus} />
      </div>
      <div className='w-[90%]'>
        <Table showStatus={showStatus} setShowStatus={setShowStatus}/>
      </div>
    </div>
  )
}

export default AdminPage