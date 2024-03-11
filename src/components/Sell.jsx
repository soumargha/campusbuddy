import React, { useState } from "react";
import { db, auth } from "../lib/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import axios from 'axios';


const Sell = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [price, setPrice] = useState("");
  const [sellorrent, setSellorrent] = useState("sell");
  const [category, setCategory] = useState("books");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const { user} = UserAuth()

  const navigate = useNavigate()

  const collectionRef = collection(db, "products");

  // const handlePhotoInputChange = (event) => {
  //   const file = event.target.files[0];

  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const base64String = e.target.result;
  //     setPicture(base64String); // Update the photo state with the base64-encoded string
  //   };

  //   reader.readAsDataURL(file);
  // };


  // Upload image to cloudinary storage
  let upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
  let cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', upload_preset); // replace with your upload preset
  
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData); // replace with your Cloudinary cloud name
    return res.data.url;
  }
  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImage(file);
    console.log(url);
    setPicture(url);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if(picture){
        if (!user) {
          alert('SignIn to publish items')
        } else{
          const productDetails = {
            title,
            description,
            picture,
            price,
            sellorrent,
            category,
            name,
            contact,
            address,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL,
            status: "pending",
            date: new Date(),
            createdAt: serverTimestamp(),
          };
          await addDoc(collectionRef, productDetails);
          alert('\nPRODUCT VERIFICATION ON PROGRESS!\n\nIT WILL BE SHOWN ON YOUR PROFILE ONCE IT IS VERIFIED!');
          setTitle("");
          setDescription("");
          setPicture("");
          setPrice("");
          setSellorrent("sell");
          setCategory("books");
          setName("");
          setContact("");
          setAddress("");
          window.location.reload();
        }
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center shadow-lg shadow-cyan-500/50">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-gray-200 rounded p-4 px-4 md:p-8 mb-6 shadow-lg shadow-cyan-500/50">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">
                    Sell or Give Rent on Products
                  </p>
                  <p>Please fill out all the fields.</p>
                </div>

                <form onSubmit={handleSubmit} className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Product Title</label>
                      <input
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={title}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="email">Product Description</label>
                      <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={description}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="city">Product Photo(less than 1MB)</label>
                      <input
                        accept="image/*"
                        onChange={handlePictureChange}
                        required
                        type="file"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        // value={picture}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label htmlFor="address">Product Price in INR</label>
                      <input
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={price}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="country">Sell / Give on Rent</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select className="text-center rounded-md" onChange={(e) => setSellorrent(e.target.value)} value={sellorrent}>
                          <option value="sell">Sell</option>
                          <option value="rent">Rent</option>
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label htmlFor="state">Categories</label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select className="text-center rounded-md" onChange={(e) => setCategory(e.target.value)} value={category}>
                          <option value="books">Books</option>
                          <option value="electronics">Electronics</option>
                          <option value="clothing">Clothing</option>
                          <option value="others">Others</option>
                        </select>
                      </div>
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Name of Seller</label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        required
                        type="text"
                        id=""
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={name}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Email/Phone Number</label>
                      <input
                        onChange={(e) => setContact(e.target.value)}
                        required
                        type="text"
                        id=""
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={contact}
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Address</label>
                      <textarea
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        id=""
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={address}
                      />
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sell;
