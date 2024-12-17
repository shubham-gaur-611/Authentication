import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import { handelError, handelSuccess } from "../utils.js";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
      const data = Object.fromEntries(formData);
      if (data.name === "" || data.email === "" || data.password === "") {
        return handelError("All fields are required");
      }
      try {
          const url = "http://localhost:3000/auth/signup";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
          const result = await response.json();
           
        if (result.message === "User created successfully") {
            handelSuccess(result.message);
            setTimeout(() => {
                navigate("/login");
            },3000)
        } else {
          handelError(result.message);
        }    
      } catch (error) {
        handelError(error.message);
      }
  };
  return (
      <>
      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handelSubmit}>
          <div className="form-group">
            <input name="name" type="text" placeholder="Full Name"   />
          </div>
          <div className="form-group">
            <input name="email" type="email" placeholder="Email"  />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <div className="footer">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Signup;
