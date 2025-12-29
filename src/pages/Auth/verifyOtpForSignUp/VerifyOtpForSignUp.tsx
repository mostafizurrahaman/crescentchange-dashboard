/* eslint-disable @typescript-eslint/no-explicit-any */
import img from "../../../assets/images/Frame 2087326397.png";
import logo from "../../../assets/images/logo.png";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { message } from "antd";
import { useResendSignUpOtpMutation, useVerifyOtpMutation } from "../../../redux/features/auth/authApi";

const VerifyOtpForSignUp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();


  const [verifyOtp ,{ isLoading: isVerifying }] = useVerifyOtpMutation();

  const [resendSignUpOtp, { isLoading: isResending }] =
    useResendSignUpOtpMutation();

  const organizationStr = localStorage.getItem("organization");
  const organization = organizationStr ? JSON.parse(organizationStr) : null;
  const email: string = organization?.email ?? "";

  const handleVerifyOtp = async () => {

    const data = {
      email,
      otp,
    };
    if (otp.length !== 6) {
      message.error("Please enter a valid OTP");
      return;
    }

    try {
      const res = await verifyOtp(data).unwrap();

      message.success(res?.message ?? "OTP verified");
      navigate("/");
    } catch (err: any) {
      message.error(err?.data?.message ?? "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      message.error("Email not found");
      return;
    }

    try {
      const res = await resendSignUpOtp({ email }).unwrap();
      message.success(res?.message ?? "OTP sent again");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;

      message.error(errorMessage ?? "Failed to resend OTP");
    }
  };

  return (
    <div className="flex h-screen p-2">
      <div className="flex flex-col items-center justify-center w-full bg-white md:w-1/2 relative">
        <img src={logo} alt="Logo" className="absolute top-5 left-10" />

        <div>
          <h1 className="py-5 text-3xl font-bold text-center">
            Enter Verification Code
          </h1>

          <p className="text-center text-gray-500">
            We’ve sent a verification code to your email
          </p>

          <p className="py-3 font-medium">Enter your verification code</p>

          <div className="flex items-center justify-center pt-2 pb-7">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="lg:w-10" />}
              renderInput={(props) => (
                <input
                  {...props}
                  className="h-12 mx-1 text-xl text-black border border-gray-300 rounded-md md:w-8 focus:outline-none focus:border-blue-400"
                />
              )}
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={isVerifying || otp.length !== 6}
            className="w-full p-3 text-xl font-bold text-black rounded-md bg-btnPrimary disabled:opacity-60"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>

          <p className="pt-5 text-center">
            Didn’t receive the code?
            <span
              onClick={handleResendOtp}
              className={`pl-2 underline cursor-pointer ${
                isResending ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {isResending ? "Sending..." : "Resend"}
            </span>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default VerifyOtpForSignUp;
