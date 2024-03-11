import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, auth } from "../lib/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Nav } from "../components/Nav";
import { Button, Spinner } from "@material-tailwind/react";
import { motion } from "framer-motion"
import Footer from "../components/Footer";
import { UserAuth } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = UserAuth();
  const { conversation, setConversation } = useContext(ChatContext);
  const navigate = useNavigate()


  // Firebase Stuff
  const collectionRef = collection(db, "products");

  useEffect(() => {
    const getProductDetails = async () => {
      setLoading(true);
      try {
        let data = await getDocs(collectionRef);
        data = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        data = data.filter((doc) => doc.id === id);
        setProduct(data[0])
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getProductDetails();
    scrollToTop();
  }, []);


  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create

    // If same user wants to talk to himself, return
    if (user.uid == product?.userId) {
      alert('Same User!')
      return;
    }
    const combinedId =
      user.uid > product?.userId
        ? user.uid + product?.userId
        : product?.userId + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        console.log((product?.userId));
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: product?.userId,
            displayName: product?.userName,
            photoURL: product?.userPhoto,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", product?.userId), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      // Setting the chatId/Conversation
      setConversation({
        user2: {
          uid: product?.userId,
          displayName: product?.userName,
          photoURL: product?.userPhoto,
        },
        chatId:
          user.uid > product?.userId
            ? user.uid + product?.userId
            : product?.userId + user.uid,
      })
      navigate('/chats');
    } catch (err) {
      console.error(err);
    }
  };


  // Scroll to top functionality
  let scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling
    });
  };


  return (
    <>
      <div className=" z-10 text-white flex-1 w-[80%] left-0 right-0 m-auto sticky top-[0px] mt-[-80px]">
        <Nav />
      </div>
      <div className="px-4 py-24 bg-gradient-to-r from-[#26a0da] to-[#314755]">

        {loading ? <div className="flex justify-center items-center py-60"><Spinner className="h-12 w-12" /> </div> :

          <motion.div whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }} className="flex flex-wrap sm:flex-nowrap my-10">
            <div className="flex justify-center items-center">
              <div className="transition duration-150 ease-in hover:opacity-90 w-[70%] md:w-[40%]">
                <img
                  src={product.picture}
                  alt="Product image"
                  className="w-[1500px] object-cover"
                />
              </div>
            </div>
            <div className="pt-8 lg:pt-0 w-[50%] text-white">
              <div className="mb-7 border-b border-gray-500 pb-7">
                <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                  {product.title}
                </h2>
                <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
                  {product.description}
                </p>
                <div className="mt-5 flex items-center ">
                  <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                    ₹{product.price}
                  </div>
                  <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">

                  </span>
                </div>
              </div>


              <div className="py-6 ">
                <ul className="space-y-5 pb-1 text-sm">
                  <li>
                    <span className="text-heading inline-block pr-2 font-semibold">
                      Name of Seller:
                    </span>
                    {product.name}
                  </li>
                  <li>
                    <span className="text-heading inline-block pr-2 font-semibold">
                      Contact:
                    </span>
                    <a
                      className="hover:text-heading transition hover:underline"
                      href="#"
                    >
                      {product.contact}
                    </a>
                  </li>
                  <li className="productTags">
                    <span className="text-heading inline-block pr-2 font-semibold">
                      Address:
                    </span>
                    <a
                      className="hover:text-heading inline-block pr-1.5 transition last:pr-0 hover:underline"
                      href="#"
                    >
                      {product.address}
                    </a>
                  </li>
                </ul>

                <Button onClick={handleSelect} color="blue" className="flex items-center gap-3 mt-8">Talk to seller</Button>
              </div>

            </div>
          </motion.div>
        }
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
