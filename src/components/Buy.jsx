import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css&js/productList.css";
import { db, auth } from "../lib/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { Spinner } from "@material-tailwind/react";
import Card from "./Card";


const Buy = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user} = UserAuth()
  const navigate = useNavigate()

  const collectionRef = collection(db, "products");

  const getProductList = async () => {
    setLoading(true);
    try {
      let data = await getDocs(collectionRef);
      data = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      data = data.filter((doc) => doc.sellorrent === "sell");
      setAllProducts(data.reverse());
      setProducts(data.reverse());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductList();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    if(searchText.length <= 1){
      setProducts(allProducts)
    } else{
      setSearchTimeout(
        setTimeout(() => {
          const searchResults = allProducts.filter(
            (product) =>
              product.title.toLowerCase().includes(searchText.toLowerCase()) ||
              product.description.toLowerCase().includes(searchText.toLowerCase())
          );
          setProducts(searchResults);
        }, 500)
      );
    }
  };

  return (
    <>
      <div>
        <h2 className="text-xl sm:text-4xl text-center mt-4 text-white font-bold">Buying Product List</h2>
        {/* Searchbar & Categories */}
        <div className="flex flex-col items-center">
          <form className="w-[80%]">
            <div className="flex my-10">
              <select className="w-[80px] sm:w-[15%] outline-none border-gray-300 rounded-lg text-center cursor-pointer"
                name="cars"
                id="cars"
                onChange={(e) => {
                  if (e.target.value === "all") {
                    setProducts(allProducts);
                  } else {
                    setProducts(
                      allProducts.filter(
                        (product) => product.category === e.target.value
                      )
                    );
                  }
                }}
              >
                <option value="all">All</option>
                <option value="books">Books</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="others">Others</option>
              </select>

              <div className="relative w-full ml-3">
                <input
                  onChange={handleSearchChange}
                  value={searchText}
                  type="search"
                  id="search-dropdown"
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-lg"
                  placeholder="Search for products..."
                  required
                />
              </div>
            </div>
          </form>
        </div>
        {loading ? <div className="flex justify-center items-center py-60"><Spinner className="h-12 w-12" /> </div> : products.length === 0 ? (
          <>
            <div className="text-4xl text-center my-36 text-white">No products found!</div>
          </>
        ) : (
          <div className="product-list">
            {products?.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Buy;
