import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import Card from '../components/Card'
import { Nav } from '../components/Nav'
import { UserAuth } from '../context/AuthContext'
import { db } from '../lib/firebase'
import { collection, where, query, getDocs } from 'firebase/firestore'

const ProfilePage = () => {
  // let products = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
  const [products, setProducts] = useState([]);
  const { user } = UserAuth()


  const getProductList = async () => {
    const collectionRef = collection(db, "products");
    const data = query(collectionRef, where("userId", "==", user.uid), where("status", "==", "verified"));
    const querySnapshot = await getDocs(data);

    let tempProducts = [...products];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tempProducts.push({ ...doc.data(), id: doc.id });
    });

    // Took a temp array for storing the products(since setState takes a little time for every setting)
    setProducts(tempProducts);
  }

  // Scroll to top functionality
  let scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling
    });
  };

  useEffect(() => {

    getProductList();
    scrollToTop();
  }, [user])


  return (
    <div
      className="bg-cover bg-center w-full z-[-10] py-20"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/diyxwdtjd/image/upload/v1701178774/Project%20use/Untitled_design_2_ooklyo.png')",
          height: products.length==0 && '100vh',
      }}
    >

      <div className=" z-10 text-white flex-1 w-[80%] left-0 right-0 m-auto sticky top-[0px] mt-[-80px]">
        <Nav />
      </div>
      <div className='flex justify-center items-center pt-14 pb-24'>
        <ProfileHeader />
      </div>

      <div className="flex justify-center items-center">
        <h2 className="text-xl sm:text-4xl text-center mt-4 text-white">Your Posted Products</h2>
      </div>

      <div className="product-list">
        {products?.map((product) => (
          <Card product={product} key={product.userId} />
        ))}
      </div>
    </div>
  )
}

export default ProfilePage