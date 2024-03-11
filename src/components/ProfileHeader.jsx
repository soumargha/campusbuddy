import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { UserAuth } from '../context/AuthContext'


const ProfileHeader = () => {
    const { user } = UserAuth()


  return (
    <motion.div whileInView={{ opacity: [0, 1] }}
    transition={{ duration: 0.3 }} className='flex flex-col w-[90%] sm:w-[80%] md:w-[60%] text-white backdrop-blur text-xl font-medium border p-3 rounded-xl shadow-2xl shadow-cyan-500/50'>
                <div className='flex items-center justify-between flex-wrap'>
                    <div className='flex items-center gap-3'>
                        <div className='relative h-20 w-20 object-cover'>
                            <img
                                src={user?.photoURL}
                                alt='logo'
                                fill
                                className='rounded-full object-cover shadow-2xl'
                            />
                        </div>

                        <div className='flex-1'>
                            <h2 className='text-left text-heading3-bold text-light-1 text-2xl font-bold'>
                                {user?.displayName}
                            </h2>
                            <p className='text-base-medium text-gray-500'>{user?.email}</p>
                        </div>
                    </div>
                    {/* {accountId === authUserId && type !== "Community" && ( */}
                    <Link to=''>
                        <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
                            <img
                                src='https://res.cloudinary.com/diyxwdtjd/image/upload/v1701182625/Project%20use/download_1_y68msu.png'
                                alt='logout'
                                className='h-7 w-7'
                            />

                            <p className='text-light-2 max-sm:hidden'>Edit</p>
                        </div>
                    </Link>
                    {/* )} */}
                </div>

                <p className='mt-6 max-w-lg text-base-regular text-light-2 text-lg'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate impedit delectus accusantium, magnam ea doloribus. Perspiciatis, laudantium eius non fugit accusamus nemo praesentium deleniti ipsa.</p>

                <div className='mt-12 h-0.5 w-full bg-dark-3' />
            </motion.div>
  )
}

export default ProfileHeader