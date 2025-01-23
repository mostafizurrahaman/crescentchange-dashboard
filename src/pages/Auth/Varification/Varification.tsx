"use client";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { Link } from "react-router-dom";


const VarificationComponent = () => {
    const [otp, setOtp] = useState("");

    const handleVerifyOtp = async () => { };

    const handleResendOtp = async () => { };

    return (
        <div className="bg-primary py-16 md:py-0 h-[100vh] w-full flex items-center justify-center text-white">
            <div className="mx-4 md:mx-0 w-auto md:w-[600px]">
                <div className=" border-2 py-10 px-5 md:px-14">
                    <h1 className="text-3xl text-center font-bold py-5">
                        Check your email
                    </h1>
                    <p className="text-center">
                        We sent a reset link. Please enter the 6-digit code mentioned in the
                        email.
                    </p>
                    <div className="py-7 flex justify-center items-center">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span className="lg:w-10"> </span>}
                            renderInput={(props) => (
                                <input
                                    {...props}
                                    className="md:w-8 h-12 bg-transparent border-b-2 border-white text-white  text-xl focus:outline-none focus:border-blue-400 mx-1"
                                />
                            )}
                        />
                    </div>
                    <Link to="/auth/confirm-password">
                        <button
                            onClick={handleVerifyOtp}
                            className="text-center w-full p-3 font-bold text-xl bg-btnPrimary text-black rounded-md shadow-lg"
                        >
                            Verify
                        </button>
                    </Link>
                    <p className="text-center pt-5">
                        Didn’t receive the code?
                        <span
                            onClick={handleResendOtp}
                            className="pl-2 underline cursor-pointer"
                        >
                            Resend
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VarificationComponent;