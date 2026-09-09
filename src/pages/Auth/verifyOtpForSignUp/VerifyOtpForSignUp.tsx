/* eslint-disable @typescript-eslint/no-explicit-any */
import img from "../../../assets/images/Frame 2087326397.png";
import logo from "../../../assets/images/logo.svg";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { message } from "antd";
import { useResendSignUpOtpMutation, useVerifyOtpMutation } from "../../../redux/features/auth/authApi";

const VerifyOtpForSignUp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();

  const [resendSignUpOtp, { isLoading: isResending }] =
    useResendSignUpOtpMutation();

  const organizationStr = localStorage.getItem("organization");
  const organization = organizationStr ? JSON.parse(organizationStr) : null;
  const email: string = location.state?.email || organization?.email || "";

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
    <div className="flex h-screen p-2 bg-white">
      <div className="flex flex-col items-center justify-center w-full bg-white md:w-1/2 relative px-4">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-5 left-8 cursor-pointer h-10 w-auto"
          onClick={() => navigate("/")}
        />

        <div className="w-full max-w-md">
          <h1 className="text-3xl font-familjen font-bold text-center text-black mb-3">
            Enter Verification Code
          </h1>

          <p className="text-center text-neutral-500 text-base mb-2">
            We’ve sent a verification code to your email
            {email ? (
              <>
                : <span className="font-semibold text-black underline">{email}</span>
              </>
            ) : null}
          </p>

          <p className="mt-6 mb-3 text-base font-medium text-black/80">
            Enter your verification code
          </p>

          <div className="flex items-center justify-center pt-2 pb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="w-2 md:w-3" />}
              renderInput={(props) => {
                const { style, ...rest } = props as React.InputHTMLAttributes<HTMLInputElement>;
                return (
                  <input
                    {...rest}
                    style={{
                      ...style,
                      width: "56px",
                      height: "56px",
                    }}
                    className="text-xl font-bold text-center text-neutral-800 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:border-[#a55eea] transition-colors"
                  />
                );
              }}
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={isVerifying || otp.length !== 6}
            className="w-full py-4 text-lg font-semibold text-black rounded-xl bg-btnPrimary hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60"
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>

          <p className="pt-5 text-center text-neutral-600">
            Didn’t receive the code?
            <span
              onClick={handleResendOtp}
              className={`pl-2 font-semibold text-[#a55eea] hover:underline cursor-pointer ${
                isResending ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {isResending ? "Sending..." : "Resend"}
            </span>
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-1/2 p-2">
        <img
          src={img}
          alt="sign-up"
          className="w-full h-full object-cover rounded-2xl max-h-[calc(100vh-1rem)]"
        />
      </div>
    </div>
  );
};

export default VerifyOtpForSignUp;
