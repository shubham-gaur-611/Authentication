import React from 'react'
import { Link } from 'react-router-dom'
import { handelError, handelSuccess } from '../utils'
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handelLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(JSON.stringify(data));
    if (data.email === "" || data.password === "") {
      return handelError("All fields are required");
    }
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result.token);
      if (result.message === "Login successful") {
        handelSuccess(result.message);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", result.name);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else {
        handelError(result.message);
      }
    } catch (error) {
      handelError(error.message);
    }
  }
  return (
    <>
    <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handelLogin}>
            <div className="form-group">
                <input type="email" name="email" placeholder="Email" />
            </div>
            <div className="form-group">
                <input type="password" name="password" placeholder="Password" />
            </div>
            <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
