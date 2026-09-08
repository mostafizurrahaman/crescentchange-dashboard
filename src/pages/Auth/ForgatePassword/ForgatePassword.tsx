import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FiMail } from "react-icons/fi";
import img from "../../../assets/images/Frame 2087326397.png";
import logo from "../../../assets/images/logo.svg";
import { useForgotPasswordMutation } from "../../../redux/features/auth/authApi";

interface IForgotPasswordFormValues {
  email: string;
}

const ForgatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPasswordFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: IForgotPasswordFormValues) => {
    try {
      const res = await forgotPassword({ email: values.email }).unwrap();
      const token = res?.data?.token;

      localStorage.setItem("forgotPasswordEmail", values.email);
      if (token) {
        localStorage.setItem("forgotPasswordToken", token);
      }

      message.success(res?.message ?? "OTP sent to your email");
      navigate("/auth/verifyOtp");
    } catch (err: unknown) {
      const errorMessage =
        typeof err === "object" && err !== null && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      message.error(errorMessage ?? "Failed to send OTP");
    }
  };

  return (
    <div className="flex min-h-screen p-2 bg-white md:h-screen">
      <div className="flex flex-col items-center justify-center w-full px-6 py-10 md:px-16 md:w-1/2 relative">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-5 left-6 md:left-16 cursor-pointer h-10 w-auto"
          onClick={() => navigate("/")}
        />
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold font-familjen md:text-4xl text-black">
              Reset your password
            </h2>
            <p className="mt-3 text-base text-gray-500">
              We’ll send you a code on your registered email.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 md:text-base mb-2">
                Enter your registered email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 z-10 text-neutral-500">
                  <FiMail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder="Enter Email Address"
                  className={`w-full h-14 pl-12 pr-4 bg-white border ${
                    errors.email ? "border-red-500" : "border-neutral-200"
                  } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <button
                className="w-full px-8 py-4 text-lg font-semibold text-center text-black rounded-xl bg-btnPrimary hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden w-full h-full md:block md:w-1/2 p-2">
        <img
          src={img}
          alt="reset-password-banner"
          className="object-cover w-full h-full rounded-2xl max-h-[calc(100vh-1rem)]"
        />
      </div>
    </div>
  );
};

export default ForgatePassword;
