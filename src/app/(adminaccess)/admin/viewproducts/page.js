"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductList from "../dashboard/components/dashboard/ProductList";

const ViewProducts = () => {
  const [stock, setStock] = useState([0,0,0,0])
  const router = useRouter();
  useEffect(()=>{
    if(!localStorage.getItem('admin-token')){
      router.push('/admin')
    }

    const fetchStock = async()=>{
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getstock`,{
        method:"GET",
        headers:{
          "admin-token":localStorage.getItem("admin-token"),
          }
        }
      );
      if(response.status === 200){
        const parsedStock = await response.json();
        setStock(parsedStock);
      }
    }

    fetchStock();

  },[])

  const [selectedCard, setSelectedCard] = useState("T-Shirts")
  return (
    <div className="min-h-screen">
      <h1 className="text-center font-sans text-[1.5rem] font-semibold my-5">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-teal-100 text-center p-5 rounded-lg">

        <div onClick={(e)=>{setSelectedCard("T-Shirts")}} className="bg-cyan-300 cursor-pointer shadow-lg flex justify-center items-center flex-nowrap flex-col rounded-lg">
          <div className="bg-gradient-to-r from-purple-950 via-purple-700 to-purple-500 w-full h-1/3 rounded-t-lg py-2 text-white">
            <h1 className={`${selectedCard === "T-Shirts"? "underline font-bold text-yellow-200":""}`}>TShirts</h1>
          </div>
          <div className="w-full flex-1 flex justify-center items-center flex-col py-2">
            <Image src={'/shirt-svgrepo-com.svg'} alt="Shirt.svg" height={60} width={60}/>
            <h3 className="font-sans font-semibold"><span className="font-normal">Stock: </span><span className={`${stock[0] < 10 ? "text-red-600 font-bold" : null}`}>{stock[0]}</span></h3>
          </div>
        </div>
        <div onClick={(e)=>{setSelectedCard("Hoodies")}} className="bg-cyan-300 cursor-pointer shadow-lg flex justify-center items-center flex-nowrap flex-col rounded-lg">
          <div className="bg-gradient-to-r from-purple-950 via-purple-700 to-purple-500 w-full h-1/3 rounded-t-lg py-2 text-white">
            <h1 className={`${selectedCard === "Hoodies"? "underline font-bold text-yellow-200":""}`}>Hoodies</h1>
          </div>
          <div className="w-full flex-1 flex justify-center items-center flex-col py-2">
            <Image src={'/hoodie-1-svgrepo-com.svg'} alt="Shirt.svg" height={57} width={56}/>
            <h3 className="font-sans font-semibold"><span className="font-normal">Stock: </span><span className={`${stock[1] < 10 ? "text-red-600 font-bold" : null}`}>{stock[1]}</span></h3>
          </div>
        </div>
        <div onClick={(e)=>{setSelectedCard("Mugs")}} className="bg-cyan-300 cursor-pointer shadow-lg flex justify-center items-center flex-nowrap flex-col rounded-lg">
          <div className="bg-gradient-to-r from-purple-950 via-purple-700 to-purple-500 w-full h-1/3 rounded-t-lg py-2 text-white">
            <h1 className={`${selectedCard === "Mugs"? "underline font-bold text-yellow-200":""}`}>Mugs</h1>
          </div>
          <div className="w-full flex-1 flex justify-center items-center flex-col py-2">
            <Image src={'/mug-svgrepo-com.svg'} alt="Shirt.svg" height={60} width={60}/>
            <h3 className="font-sans font-semibold"><span className="font-normal">Stock: </span><span className={`${stock[2] < 10 ? "text-red-600 font-bold" : null}`}>{stock[2]}</span></h3>
          </div>
        </div>
        <div onClick={(e)=>{setSelectedCard("Stickers")}} className="bg-cyan-300 cursor-pointer shadow-lg flex justify-center items-center flex-nowrap flex-col rounded-lg">
          <div className="bg-gradient-to-r from-purple-950 via-purple-700 to-purple-500 w-full h-1/3 rounded-t-lg py-2 text-white">
            <h1 className={`${selectedCard === "Stickers"? "underline font-bold text-yellow-200":""}`}>Stickers</h1>
          </div>
          <div className="w-full flex-1 flex justify-center items-center flex-col py-2">
            <Image src={'/sticker-smile-circle-2-svgrepo-com.svg'} alt="Shirt.svg" height={60} width={60}/>
            <h3 className="font-sans font-semibold text-black"><span className="font-normal">Stock: </span><span className={`${stock[3] < 10 ? "text-red-600 font-bold" : null}`}>{stock[3]}</span></h3>
          </div>
        </div>
        
      </div>
      <ProductList category={selectedCard}/>
    </div>
  )
}

export default ViewProducts
