"use client";
import { useState } from "react";
import { FaLockOpen } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { Link } from "react-router-dom";


const ConfirmPassword = () => {


    const [showpassword, setShowpassword] = useState(false);
    const [showConfirmpassword, setShowConfirmPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    };
    const toggoleConfirmPasswordVisible = () => {
        setShowConfirmPassword(!showConfirmpassword);
    };
    return (
        <div className="bg-primary py-16 md:py-0 h-[100vh] w-full flex items-center justify-center text-white">
            <div className="container mx-auto">
                <div className="flex justify-center items-center p-2">
                    <div className="border rounded-lg text-white text-center p-5 lg:px-20 lg:py-20">
                        <p className="text-3xl pb-10">Confirm Password</p>
                        <div className="flex justify-between items-center border-b-2 mb-10 ">
                            <input
                                type={showpassword ? "password" : "text"}
                                placeholder="Password"
                                className="bg-transparent text-white p-2 focus:outline-none"
                            />

                            <div className="flex items-center">
                                <button onClick={togglePasswordVisibility} type="button">
                                    {showpassword ? (
                                        <IoIosLock className="text-white" />
                                    ) : (
                                        <FaLockOpen className="text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-b-2 mb-10">
                            <input
                                type={showConfirmpassword ? "password" : "text"}
                                placeholder="Confirm Password"
                                className="bg-transparent text-white p-2 focus:outline-none md:w-96 lg:w-96"
                            />
                            <div className="flex items-center">
                                <button onClick={toggoleConfirmPasswordVisible} type="button">
                                    {showConfirmpassword ? (
                                        <IoIosLock className="text-white" />
                                    ) : (
                                        <FaLockOpen className="text-white" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Link to="/auth/login">
                            <button className="text-center w-full p-3 font-bold text-xl bg-btnPrimary text-black rounded-md shadow-lg">
                                Send
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPassword;
