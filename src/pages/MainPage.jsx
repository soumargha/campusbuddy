import React from 'react'
import Banner from '../components/Banner'
import TabsComponent from '../components/TabsComponent'
import { Nav } from '../components/Nav'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Footer from '../components/Footer'
import { motion } from "framer-motion"

const MainPage = () => {
    return (
        <div className='bg-blue-gray-400'>
            <div className=" z-10 text-white flex-1 w-[80%] left-0 right-0 m-auto sticky top-[0px]">
                <Nav />
            </div>

            <Parallax pages={2.5} style={{ top: '0', left: '0' }} className='bg-blue-gray-800'>

                <ParallaxLayer offset={0} speed={1.3} factor={1} style={{
                    backgroundImage: `url('https://res.cloudinary.com/diyxwdtjd/image/upload/v1702463792/Project%20use/Untitled_design_cylxgw.png')`,
                    backgroundSize: 'cover',
                }} />
                <ParallaxLayer offset={0.98} speed={1.5} factor={1} style={{
                    backgroundImage: `url('https://res.cloudinary.com/diyxwdtjd/image/upload/v1701082646/Project%20use/Untitled_design_2_kimeki.png')`,
                    backgroundSize: 'cover',
                    height: '100%',
                    zIndex: '10',
                }}>
                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}>
                        <TabsComponent />
                    </motion.div>

                </ParallaxLayer>



                <ParallaxLayer offset={0} speed={0.8} factor={1} >
                    <Banner />
                </ParallaxLayer>


                <ParallaxLayer offset={1.5} speed={1.5} factor={0.2} style={{
                    height: '100%',
                    zIndex: '10',
                }} >
                    <Footer />
                </ParallaxLayer>
            </Parallax>
        </div >
    )
}

export default MainPage