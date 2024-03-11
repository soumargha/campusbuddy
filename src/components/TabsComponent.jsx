import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Buy from './Buy';
import Rent from './Rent';
import Sell from './Sell';
import { motion } from "framer-motion"


const TabsComponent = () => {

    return (
        <div className='w-[80%] mx-auto pt-[4%]'>
            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}>

                <Tabs value="BUY">
                    <TabsHeader>
                        {["BUY", "RENT", "SELL/RENT"].map((elem) => (
                            <Tab key={elem} value={elem}>
                                {elem}
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        {["BUY", "RENT", "SELL/RENT"].map((elem) => (
                            <TabPanel key={elem} value={elem}>
                                {elem === "BUY" ? <Buy /> : elem === "RENT" ? <Rent /> : <Sell />}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </motion.div>

        </div>
    )
}

export default TabsComponent