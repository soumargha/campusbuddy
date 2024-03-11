import React from 'react'
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
import { Trash2, Check, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';


const CardComp = ({ product, getProductList }) => {

// Create an async function to delete the document
const deleteDocument = async (productId) => {
    try {
        const docRef = doc(db, 'products', productId);
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
        getProductList();
    } catch (error) {
        console.error("Error removing document: ", error);
    }
};

// Create an async function to verify the document
const verifyDocument = async (productId) => {
    try {
        const docRef = doc(db, 'products', productId);
        await updateDoc(docRef, {
            status: "verified"
        });
        console.log("Document successfully updated!");
        getProductList();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

// Create an async function to not verify the document
const notverifyDocument = async (productId) => {
    try {
        const docRef = doc(db, 'products', productId);
        await updateDoc(docRef, {
            status: "not-verified"
        });
        console.log("Document successfully updated!");
        getProductList();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}



    return (
        <tr key={product.id}>
            <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={product.picture}
                        alt={product.name}
                        size="md"
                        className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                    />
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                    >
                        {product.name}
                    </Typography>
                </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {product.price}
                </Typography>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    {product.createdAt.toDate().toDateString()  }
                </Typography>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <div className="w-max">
                    <Chip
                        size="sm"
                        variant="ghost"
                        value={product.status}
                        color={
                            product.status === "verified"
                                ? "green"
                                : product.status === "pending"
                                    ? "amber"
                                    : "red"
                        }
                    />
                </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <Avatar
                            src={product.userPhoto}
                            size="sm"
                            alt={product.userName}
                            variant="square"
                            className="h-full w-full object-contain p-1"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal capitalize"
                        >
                            {product.userName}
                        </Typography>
                        <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                        >
                            {product.userEmail}
                        </Typography>
                    </div>
                </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
                <Tooltip content="Verified">
                    <IconButton variant="text" onClick={()=> verifyDocument(product.id)}>
                        <Check className="h-5 w-5" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Not Verified">
                    <IconButton variant="text" onClick={()=> notverifyDocument(product.id)}>
                        <X className="h-4 w-4" />
                    </IconButton>
                </Tooltip>
                <Tooltip content="Delete">
                    <IconButton variant="text" >
                        <Trash2 className="h-4 w-4" onClick={()=> deleteDocument(product.id)}/>
                    </IconButton>
                </Tooltip>
            </td>
        </tr>
    )
}

export default CardComp