import { PencilIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { Trash2, Check } from 'lucide-react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import CardComp from "./Card";

const TABLE_HEAD = ["Transaction", "Amount", "Date", "Status", "Account", "Actions"];


export default function Table({ showStatus, setShowStatus }) {
  const [products, setProducts] = useState([]);
  const { user } = UserAuth()

  console.log(showStatus);

  const getProductList = async () => {
    setProducts([]);
    const collectionRef = collection(db, "products");
    const data = query(collectionRef, where("status", "==", showStatus));
    const querySnapshot = await getDocs(data);

    let tempProducts = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      tempProducts.push({ ...doc.data(), id: doc.id });
    });

    tempProducts = tempProducts.sort((a, b) => {
      return b.createdAt.toDate() - a.createdAt.toDate();
    })

    // Took a temp array for storing the products(since setState takes a little time for every setting)
    console.log(showStatus,tempProducts);
    setProducts(tempProducts);
  }

  // Scroll to top functionality
  let scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: adds smooth scrolling
    });
  };

  // when user gets updated
  useEffect(() => {
    getProductList();
    scrollToTop();
  }, [user])

  // when showStatus gets updated
  useEffect(() => {
    getProductList();
    scrollToTop();
  }, [showStatus])

  return (
    <Card className="h-[100vh] w-full ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product List
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {console.log(products)}
            {products?.map((product, index,) => (
                <CardComp product={product} getProductList={getProductList} />
              )
            )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}