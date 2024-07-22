import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import {FaEye} from "react-icons/fa"
import { Link } from "react-router-dom";

const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [data,setData]=useState({
        email:"",
        password:""
    })

    // important handlers
    const handleOnChange=(e)=>{
        const {name,value}=e.target;

        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    // console.log("data",data);
    const handleSubmit=(e)=>{
        e.preventDefault();
    }

    const togglePasswordVisibility=()=>{
        setShowPassword(!showPassword)
    }
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup"
                href="#"
                title=""
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={handleSubmit} action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                {/* for email */}
                <div>
                  <label for="" className="text-base font-medium text-gray-900">
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      onChange={handleOnChange}
                    />
                  </div>
                </div>
                {/* for password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label for="" className="text-base font-medium text-gray-900">
                      {" "}
                      Password{" "}
                    </label>
                    <Link to="/forgot-password"
                      href="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {" "}
                      Forgot password?{" "}
                    </Link>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div classNameName="relative w-full">
                      <input
                        classNameName="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                      value={data.password}
                      onChange={handleOnChange}
                      />
                      <span
                        classNameName="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  {/* get started button */}
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Get started{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full rounded-md object-cover"
            src="https://image.lexica.art/full_webp/2b15b13b-91a0-411f-9662-5e083a9bc2a0"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
