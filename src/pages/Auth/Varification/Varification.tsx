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
  const emailForUi =
    localStorage.getItem("forgotPasswordEmail") ?? "userofficialemail@gmail.com";

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
      // nevigate("/auth/forgot-password");
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
    <div className="flex min-h-screen p-2 bg-white md:h-screen">
      <div className="flex flex-col items-center mt-32 w-full px-6 py-10 md:px-16 md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 left-6 md:left-16" />

        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold font-familjen text-center text-black md:text-4xl">
            Enter Verification Code
          </h1>

          <p className="mt-2 text-center text-gray-500 text-base">
            We’ve sent a verification code to{" "}
            <span className="font-medium text-black underline">
              {emailForUi}
            </span>
          </p>

          <p className="mt-8 mb-3 font-medium text-black text-md">
            Enter your verification code
          </p>

          <div className="flex items-center justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="w-8" />}
              renderInput={(props) => {
                const { style, ...rest } =
                  props as React.InputHTMLAttributes<HTMLInputElement>;

                return (
                  <input
                    {...rest}
                    style={{
                      ...style,
                      width: "48px",
                      height: "48px",
                    }}
                    className="text-base font-medium text-center text-black border border-gray-200 rounded-xl focus:outline-none focus:border-black"
                  />
                );
              }}
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            className="w-full py-4 mt-6 text-lg font-semibold text-center text-black rounded-xl bg-btnPrimary disabled:opacity-60"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>

          <p className="pt-5 text-sm text-center text-gray-500">
            Didn’t receive the code?
            <span
              onClick={handleResendOtp}
              className={`pl-2 font-medium underline cursor-pointer text-black ${
                isResending ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              {isResending ? "Sending..." : "Resend"}
            </span>
          </p>
        </div>
      </div>

      <div className="hidden w-full h-full md:block md:w-1/2">
        <img src={img} alt="sign-up" className="object-cover w-full h-full rounded-r-3xl" />
      </div>
    </div>
  );
};

export default VerificationComponent;
