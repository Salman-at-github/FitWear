"use client";

import {createContext, useState} from 'react';
import {toast } from "react-toastify";
import { useRouter } from 'next/navigation';

export const GlobalContext = createContext();

export const GlobalProvider = ({children})=> {

    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);

    const saveCart = (myCart) =>{
      localStorage.setItem("cart",JSON.stringify(myCart))
      let subt = 0;
      let keys = Object.keys(myCart);
      for (let i=0; i<keys.length; i++){
        subt += myCart[keys[i]].price * myCart[keys[i]].qty
      }
      setSubTotal(subt)
    }
    
    const clearCart = () =>{
      setCart({})
      saveCart({})
    }

    const addToCart = (itemCode, qty, price, name, size, variant) =>{
        let newCart = cart;
        if(itemCode in cart){
            newCart[itemCode].qty = cart[itemCode].qty + qty
        } else {
            newCart[itemCode] = {qty:1, price, name, size, variant}
        }
        setCart(newCart)
        saveCart(newCart)
        //show toast
      toast.success('Added to Cart!', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    const removeFromCart = (itemCode, qty, price, name, size, variant) =>{
        let newCart = cart;
        if(itemCode in cart){
            newCart[itemCode].qty = cart[itemCode].qty - qty
        }
        if(newCart[itemCode]["qty"]<=0){
          delete newCart[itemCode]
        }
        setCart(newCart)
        saveCart(newCart)
        //show toast
      toast.success('Item removed!', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    // navbar

    const [showCart, setShowCart] = useState(false);
    const toggleCart = () => {
      setShowCart(!showCart)
    };
    const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();
  const handleLogOut = ()=>{
    setLoggedIn(false);
    setCart({})
    saveCart({})
    localStorage.removeItem("token");
    localStorage.removeItem("cart");

    //show toast
    toast.success("Logged out successfully!", {
      position: "bottom-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      router.push("/login");
  }

    const [profileDropDown, setProfileDropDown] = useState(false)


    //login page
    
    const [user, setUser] = useState({name:"", email:"",password:"",cpassword:""});


    const handleDataChange = (e)=>{
      e.preventDefault();
      setUser({...user, [e.target.name]:e.target.value})
    }

    const handleLoginSubmit = async(e)=>{
      e.preventDefault();
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:user.email, password:user.password }),
      });
      if(response.status === 201){
        const parsedRes = await response.json();
        //show toast
        toast.success('Logged in successfully!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          localStorage.setItem("token",parsedRes.token)
          setLoggedIn(true)
          
          router.push("/")
          
      }  else if(response.status === 404){
        //show toast
        toast.warn("User not found! Please sign up!", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else if(response.status === 401){
          //show toast
        toast.error("Incorrect password!", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      } else {
          //show toast
          toast.warn("Unable to login. Please try again later.", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
      }
    }

    const [loading, setLoading] = useState(false);
    const showLoading = (time)=>{
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, time);
    }

    //signup page
  const passMatch = user.password === user.cpassword;
  const handleSignupSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:user.name, email:user.email, password:user.password }),
    });
    const fetchedRes = await response.json();
    if(response.status === 201){
      //show toast
      toast.success('Signed up successfully! Please login!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        router.push("/login");
        
    }  else if(response.status === 401){
      //show toast
      toast.error("Email taken already! Please login!", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } else {
        //show toast
      toast.warn("Unable to sign up! Please try again later!", {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
    }
  }

  //product slug page

  const [serviceable, setServiceable] = useState(false)
  const [gotProduct, setGotProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableSizes, setAvailableSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  //checkout page
  
  const [showPayment, setShowPayment] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState({locality:"", pincode:"",city:"",state:""})

  const fetchCityState = async () => {
    if (address.pincode && address.pincode.length === 6) {
      // fetch data for city and state
      const response = await fetch(`/api/getpincodes/getcitystate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({pincode:address.pincode}),
      });
      if (response.status === 200) {
        const cityStateData = await response.json();
        setAddress({...address, city: cityStateData[0], state: cityStateData[1]});
      } else if (response.status=== 404){
          //show toast
          toast.error("This pin is not serviceable!", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
      }
    } else {
      setAddress({...address, city:"", state:""});

    }
  };

  const generateOrderID = (user)=>{
     // Generate a random number (between 1000 and 9999)
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    const orderID = `${user}XYZ${randomNumber}`;
    return orderID;
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Pass checkout email as user
    const orderID = generateOrderID(email);
  
    try {
      const requestBody = {
        email: email,
        orderID: orderID,
        cart: cart,
        address: `${address.locality} ${address.city} ${address.state} ${address.pincode}`,
        subTotal: subTotal,
      };
      const response = await fetch(`/api/placeorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.status === 201) {
        // Show success toast and perform actions upon successful order placement
        toast.success('Placed order successfully!', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        clearCart();
        router.push('/myorders');
      } else if (response.status === 400) {
        // Show toast for data tampering error
        toast.error("Something went wrong! Please clear the cart and try again", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } 
      else if (response.status === 403) {
        // Show toast for data tampering error
        toast.error("Some items are out of stock. Please clear the cart and try again", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // Show toast for other errors
        toast.warn("Unable to Place order. Please try again later.", {
          position: "bottom-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  //my orders page

  const getMyOrders = async()=>{
    const response = await fetch(`/api/myorders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token:localStorage.getItem('token')}),
    });
    if(response.status === 200){
        return await response.json()
    }
  }

  const [myOrders, setMyOrders] = useState([]);

  //order page
  const getOrder = async(id) =>{
    try {
      const response = await fetch(`/api/myorders/${id}`);
      return await response.json();
    } catch (error) {
      console.log(error)
    }

  }

  //my account page
  const [editMode, setEditMode] = useState(false);

  const getUser = async()=>{
    try {
      const response = await fetch(`/api/getuser`,{
        method:"GET",
        headers:{
          'token': localStorage.getItem('token')
        },
      });
      if(response.status === 200){
        const userData = await response.json();
        return userData;
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateUser = async(name, address, phone)=>{
    if(name && address && phone){
      try {
        const response = await fetch(`/api/updateuser`,{
          method:"POST",
          headers:{
            'token': localStorage.getItem('token')
          },
          body: JSON.stringify({name:name, address: address, phone: phone})
        });
        if(response.status === 200){
          //show toast
          toast.success('Updated Sucessfully!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          setEditMode(false);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  //admin 
  //view products 
  const [selectedCard, setSelectedCard] = useState("T-Shirts");
  const [stock, setStock] = useState([0,0,0,0]);
  const [products, setProducts] = useState([]);


  const fetchStock = async()=>{
    const response = await fetch(`/api/admin/getstock`,{
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




  return (
    <GlobalContext.Provider value={({cart, setCart, subTotal,setSubTotal, saveCart, clearCart, addToCart, router,  removeFromCart, loggedIn, setLoggedIn, handleLoginSubmit,handleDataChange ,handleLogOut, passMatch, handleSignupSubmit, user, showCart, setShowCart, toggleCart, profileDropDown, setProfileDropDown, gotProduct, setGotProduct, selectedColor, setSelectedColor,availableSizes, setAvailableSizes,selectedSize, setSelectedSize, serviceable, setServiceable, showPayment, setShowPayment, name, setName, email, setEmail,  phone, setPhone,address, setAddress, handlePlaceOrder,fetchCityState, myOrders, setMyOrders, getMyOrders, loading, showLoading, getOrder, getUser,updateUser, editMode, setEditMode, selectedCard, setSelectedCard, stock, setStock, fetchStock, products, setProducts })}>{children}</GlobalContext.Provider>
  )
}

