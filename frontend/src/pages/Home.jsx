import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handelSuccess } from '../utils.js';
import { ToastContainer } from "react-toastify"; 

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("user"));
  })

  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    handelSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  }

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const url = "http://localhost:3000/products";
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        //console.error("API response is not an array");
        setProducts([]); // Set empty array to avoid breaking `map`
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchProducts();
  })
  return (
    <div>
      {loggedInUser}
      <button style={{ margin: "10px", padding: "10px", borderRadius: "5px", backgroundColor: "green", color: "white", border: "none" }} type="button" onClick={handelLogout}>Logout</button>
      <div>
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index}>
              <p>
                {product.name} : {product.price}
              </p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
