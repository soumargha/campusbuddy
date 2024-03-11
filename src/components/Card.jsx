import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"


const Card = ({ product }) => {

    return (
        <div>
            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}>

                <Link to={`/products/${product.id}`} key={product.id} className="product-item rounded-xl transform transition duration-500 hover:scale-105 cursor-pointer bg-blue-gray-50 shadow-lg shadow-cyan-500/50">
                    <img
                        src={product.picture}
                        alt={product.title}
                        className="product-image"
                    />
                    <div className="product-details">
                        <h3>{product.title}</h3>
                        <p>₹{product.price}</p>
                        <button onClick={() => {
                            if (!user) {
                                alert('SignIn to view details')
                            } else {
                                navigate(`/products/${product.id}`)
                            }
                        }}>View Details</button>
                    </div>
                </Link>
            </motion.div>
        </div>
    )
}

export default Card