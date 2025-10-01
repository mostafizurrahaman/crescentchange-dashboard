import img from "../../../assets/images/Frame 2087326397.png";
import logo from "../../../assets/images/logo.png";
import OTPInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationComponent = () => {
  const [otp, setOtp] = useState("");
  const nevigate = useNavigate();
  const handleVerifyOtp = () => {
    console.log("Verifying OTP:", otp);
    nevigate("/auth/confirm-password");
  };

  const handleResendOtp = () => {
    console.log("Resend OTP clicked");
  };

  return (
    <div className="h-screen flex p-2">
      <div className="bg-white flex flex-col justify-center items-center w-full md:w-1/2">
        <img src={logo} alt="Logo" className="absolute top-5 right-5 left-10" />

        <div className="">
          <h1 className="text-3xl text-center font-bold py-5">
            Enter Verification Code
          </h1>
          <p className="text-center text-gray-500">
            We’ve sent a verification code to{" "}
            <span className="text-black">userofficialemail@gmail.com</span>
          </p>
          <p className="py-3 font-medium">Enter your verification code</p>
          <div className="pb-7 pt-2 flex justify-center items-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="lg:w-10"> </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="md:w-8 h-12 border border-gray-300 text-black text-xl focus:outline-none focus:border-blue-400 mx-1 rounded-md"
                />
              )}
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            className="text-center w-full p-3 font-bold text-xl bg-btnPrimary text-black rounded-md "
          >
            Verify
          </button>

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

      <div className="w-full md:w-1/2">
        <img src={img} alt="sign-up" className="w-full h-full" />
      </div>
    </div>
  );
};

export default VerificationComponent;
