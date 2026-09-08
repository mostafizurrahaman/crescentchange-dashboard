/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import img from "../../../assets/images/login.png";
import logo from "../../../assets/images/logo.svg";
import { useLoginApiMutation } from "../../../redux/features/auth/authApi";
import { baseApi } from "../../../redux/api/baseApi";

interface ILoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rememberPassword, setRememberPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loginApi, { isLoading }] = useLoginApiMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginFormValues>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: ILoginFormValues) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await loginApi(data).unwrap();

      // Check if 2FA is required
      if (res?.data?.twoFactorRequired) {
        message.info(
          res?.data?.message || "Two-factor authentication required"
        );
        localStorage.setItem("pending2FAEmail", res?.data.email);
        navigate("/auth/verify2FA");
        return;
      }

      // If 2FA not required, store token and redirect
      if (res?.data?.accessToken) {
        localStorage.setItem("token", res?.data.accessToken);
        dispatch(baseApi.util.resetApiState());
        message.success(res?.message || "Login successful");

        navigate("/", { replace: true });
      } else {
        message.error("No access token returned from server");
      }

      reset();
    } catch (error: any) {
      message.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex h-screen p-2 bg-white">
      {/* Left section - Form */}
      <div className="flex flex-col items-center justify-center w-full bg-white md:w-1/2 relative px-4">
        <img
          src={logo}
          alt="Logo"
          className="absolute top-5 left-8 cursor-pointer h-10 w-auto"
          onClick={() => navigate("/")}
        />

        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h2 className="mb-2 font-familjen text-2xl md:text-3xl font-bold text-black">
              Welcome Back!
            </h2>
            <p className="text-neutral-400 text-base">
              Sign in to manage everything.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-base font-medium text-black/80 mb-2">
                Email
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

            {/* Password Field */}
            <div>
              <label className="block text-base font-medium text-black/80 mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 z-10 text-neutral-500">
                  <FiLock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    validate: (v: string) => {
                      if (!v || v.length < 8) {
                        return "Password must be at least 8 characters long!";
                      }
                      if (!/[A-Z]/.test(v)) {
                        return "Password must contain at least one uppercase letter!";
                      }
                      if (!/[a-z]/.test(v)) {
                        return "Password must contain at least one lowercase letter!";
                      }
                      if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/'`~;]/.test(v)) {
                        return "Password must contain at least one special character!";
                      }
                      return true;
                    },
                  })}
                  placeholder="**********"
                  className={`w-full h-14 pl-12 pr-12 bg-white border ${
                    errors.password ? "border-red-500" : "border-neutral-200"
                  } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-neutral-500 hover:text-neutral-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot password & Remember password */}
            <div className="flex items-center justify-between gap-2 pt-1 font-semibold text-md">
              <label
                className="inline-flex items-center gap-3 text-sm md:text-base text-black cursor-pointer"
                onClick={() => setRememberPassword((prev) => !prev)}
              >
                <input
                  type="checkbox"
                  checked={rememberPassword}
                  onChange={() => setRememberPassword((prev) => !prev)}
                  className="sr-only"
                />
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-[4px] border-2 border-[#d1ff43] ${
                    rememberPassword ? "bg-[#d1ff43]" : "bg-white"
                  }`}
                >
                  {rememberPassword && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="w-3 h-3 text-black"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                Remember Password
              </label>
              <Link
                to="/auth/forgate-password"
                className="underline text-sm md:text-base text-neutral-600 hover:text-black"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="text-center text-lg font-bold bg-[#d1ff43] w-full py-4 rounded-xl text-black hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
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
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Sign-up redirect */}
            <p className="mt-6 text-base font-semibold text-center text-neutral-700">
              Don't have an account?{" "}
              <Link to="/auth/signup" className="text-[#a55eea] hover:underline font-bold">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="hidden md:block md:w-1/2 p-2">
        <img
          src={img}
          alt="login banner"
          className="w-full h-full object-cover rounded-2xl max-h-[calc(100vh-1rem)]"
        />
      </div>
    </div>
  );
};

export default Login;
