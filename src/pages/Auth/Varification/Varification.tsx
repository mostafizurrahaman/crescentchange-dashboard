import img from "../../../assets/images/Frame 2087326397.png";
import logo from "../../../assets/images/logo.png";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useResendForgotPasswordOtpMutation,
  useVerifyForgotPasswordOtpMutation,
} from "../../../redux/features/auth/authApi";
import { message } from "antd";

const VerificationComponent = () => {
  const [otp, setOtp] = useState("");
  const nevigate = useNavigate();
  const [verifyForgotPasswordOtp, { isLoading: isVerifying }] =
    useVerifyForgotPasswordOtpMutation();
  const [resendForgotPasswordOtp, { isLoading: isResending }] =
    useResendForgotPasswordOtpMutation();

  const handleVerifyOtp = async () => {
    const email = localStorage.getItem("forgotPasswordEmail") ?? "";
    const token = localStorage.getItem("forgotPasswordToken") ?? "";

    if (!token || !email) {
      message.error("Please request OTP again");
      nevigate("/auth/forgot-password");
      return;
    }

    try {
      const res = await verifyForgotPasswordOtp({ token, otp }).unwrap();
      const resetPasswordToken = res?.data?.resetPasswordToken;

      if (resetPasswordToken) {
        localStorage.setItem("resetPasswordToken", resetPasswordToken);
      }

      message.success(res?.message ?? "OTP verified");
      nevigate("/auth/confirm-password");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      message.error(errorMessage ?? "Failed to verify OTP");
    }
  };

  const handleResendOtp = () => {
    const token = localStorage.getItem("forgotPasswordToken") ?? "";
    if (!token) {
      message.error("Please request OTP again");
      nevigate("/auth/forgot-password");
      return;
    }

    resendForgotPasswordOtp({ token })
      .unwrap()
      .then((res) => {
        message.success(res?.message ?? "OTP sent again");
      })
      .catch((err: unknown) => {
        const errorMessage =
          typeof err === "object" && err !== null && "data" in err
            ? (err as { data?: { message?: string } }).data?.message
            : undefined;
        message.error(errorMessage ?? "Failed to resend OTP");
      });
  };

  return (
    <div className="flex h-screen p-2">
      <div className="flex flex-col items-center justify-center w-full bg-white md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />

        <div className="">
          <h1 className="py-5 text-3xl font-bold text-center">
            Enter Verification Code
          </h1>
          <p className="text-center text-gray-500">
            We’ve sent a verification code to{" "}
            <span className="text-black">userofficialemail@gmail.com</span>
          </p>
          <p className="py-3 font-medium">Enter your verification code</p>
          <div className="flex items-center justify-center pt-2 pb-7">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="lg:w-10"> </span>}
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
            className="w-full p-3 text-xl font-bold text-center text-black rounded-md bg-btnPrimary disabled:opacity-60"
            disabled={isVerifying}
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

      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default VerificationComponent;
