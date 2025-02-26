import React, { useId, useState } from "react";
import Input from "../components/Input";
import Button from '../components/Button';
import authService from "../appwrite/auth";
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Link, useNavigate } from "react-router-dom";
import CircularLoader from '../components/CircularLoader';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const id1 = useId();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const session = await authService.login({ email, password });
      console.log("Login Successful");
      const acc = await authService.getCurrentUser();
      const name = acc.name;
      const userID = acc.$id;
      localStorage.setItem("authStatus", "true");
      localStorage.setItem("userData", JSON.stringify({ email, name, userID }));
      dispatch(login({ userData: { email, name, userID } }));
      navigate('/');
    } catch (error) {
      console.log("Login Unsuccessful", error);
      let message = error?.message || "Login failed. Please try again.";
      setLoader(false);
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-darkCol3">
      {loader ? (
        <CircularLoader />
      ) : (
        <div className="w-full max-w-md p-8 space-y-4 bg-darkBoxColor shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center text-white">
            Login to Your Account
          </h2>
          {errorMessage && (
            <h2 className="text-sm text-red-400">{errorMessage}</h2>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <Input 
              label="Email" 
              placeholder='Enter your email' 
              classNames="bg-[#383836] text-white border border-gray-700 focus:ring-blue-500" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              autoComplete="on" 
            />
            <div className="flex flex-col">
              <label htmlFor={id1} className="inline-block text-sm font-medium text-white mb-3 pl-1">Password</label>
              <div className="relative w-full focus-within:ring-2 focus-within:ring-blue-500 rounded-lg">
                <input
                  type={showPassword ? "text" : "password"}
                  className="px-3 py-2 focus:outline-none rounded-tl-lg rounded-bl-lg bg-[#383836] text-white border border-gray-700 duration-200 w-11/12"
                  id={id1}
                  placeholder="Enter your Password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <button 
                  onClick={handleShowPassword} 
                  type="button"
                  className="w-1/12 border-r border-t border-b border-gray-700 px-2 py-2 bg-[#383836] rounded-tr-lg rounded-br-lg absolute right-0 top-0 h-full flex justify-center items-center"
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="text-gray-400"/>
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              classNames="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </Button>
          </form>
          <p className="text-sm text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
