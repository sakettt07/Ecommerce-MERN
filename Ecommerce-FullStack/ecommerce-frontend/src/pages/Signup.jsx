import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import imageTobase64 from "../utils/imageConvert";
import AllApi from "../common";
import {toast} from "react-toastify"

const Signup = () => {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmpass, setShowConfirmpass] = useState(false);
  // const [base64,setBase64]=useState('');
  const [data, setData] = useState({
    email: "",
    password: "",
    fullname: "",
    profilePic: "",
    confirmPass: "",
  });

  // important handlers
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // console.log("data",data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPass) {
      try {
        const dataResponse = await fetch(AllApi.signUp.url, {
          method: AllApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataApi = await dataResponse.json();
        
        if (dataApi.success) {
          toast.success(dataApi.message || "Signup successful!");
          navigate("/login"); // Redirect to login page after successful signup
        } else {
          toast.error(dataApi.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred during signup. Please try again.");
      }
    } else {
      toast.error("Please check the password and confirm password.");
    }
  };
  const handleProfilePic = async(e) => {
    const file = e.target.files[0];

    if(file){
        try {
            const image=await imageTobase64(file);
            setData((prev)=>{
                return{
                    ...prev,
                    profilePic:image
                }
            })
        } catch (error) {
            console.error("Error converting image to Base64:", error);
        }
    }
    // console.log("file", file);
  };
  // console.log(data.profilePic);

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full w-full">
          <img
            className="mx-auto h-full w-full  object-cover"
            src="https://image.lexica.art/full_webp/f1f134c9-c1d0-45c8-9276-3c78b3d2868b"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign up
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                title="Go to login page"
                className="font-medium text-black transition-all duration-200 hover:underline"
              >
                Log In
              </Link>
            </p>
            <div className="w-20 mt-5 md:mt-3 h-20 mx-auto relative overflow-hidden rounded-full">
              <div>
                <img
                  src={data.profilePic ||"https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"}
                  alt="login icons"
                />
              </div>
              {
                data.profilePic ? null :<form>
                <label>
                  <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                    Upload Photo
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="hidden"
                  />
                </label>
              </form>
              }
            </div>
            <form onSubmit={handleSubmit} action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label for="name" className="text-base font-medium text-gray-900">
                    {" "}
                    Full Name{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      value={data.fullname}
                      onChange={handleOnChange}
                      name="fullname"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                  <div className="mt-2">
                    <input
                      value={data.email}
                      onChange={handleOnChange}
                      name="email"
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                    />
                  </div>
                </div>
                {/* password wala */}
                <div>
                  <div className="flex items-center justify-between">
                    <label for="" className="text-base font-medium text-gray-900">
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="relative w-full">
                      <input
                        className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                      />
                      <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                </div>
                {/* confrim password wala */}
                <div>
                  <div className="flex items-center justify-between">
                    <label for="" className="text-base font-medium text-gray-900">
                      {" "}
                      Confirm Password{" "}
                    </label>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="relative w-full">
                      <input
                        className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type={showConfirmpass ? "text" : "password"}
                        placeholder="Password"
                        name="confirmPass"
                        value={data.confirmPass}
                        onChange={handleOnChange}
                      />
                      <span
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                        onClick={() => setShowConfirmpass((prev) => !prev)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  >
                    Create Account{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
      </div>
    </section>
  );
};

export default Signup;
