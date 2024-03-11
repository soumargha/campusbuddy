import React from 'react'
import { Typography } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import TabsComponent from './TabsComponent'

const Banner = () => {
    return (
        <div className='text-white'>
            <div className="relative h-[110vh] w-full">
                {/* <img src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1700890488/Personal/Firefly_a_digital_art_of_all_the_educational_things_like_books_pens_pencils_calculator_etc_scatt_wz8xhn.jpg" alt="Background Image" className="absolute inset-0 w-full h-full object-cover filter" />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center sm:text-start">
                    <div className='shadow-lg shadow-cyan-500/50'>
                        <h1 className="text-4xl text-white font-bold">Buy Products! <br /> Sell Products! Rent Products!
                            <p className="text-xl text-white mt-4 font-thin">A Student Marketplace for the campus!</p>
                        </h1>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <img className='w-[20%] white' src="https://res.cloudinary.com/diyxwdtjd/image/upload/v1702460622/Project%20use/cVyOwt06sf-unscreen_qmx6qv.gif" alt="scroll" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner


// background-image: linear-gradient( 111.4deg,  rgba(7,7,9,1) 6.5%, rgba(27,24,113,1) 93.2% );