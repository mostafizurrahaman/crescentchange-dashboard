import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import building from "../../../assets/images/Building.png";
import Stepper from "../Stepper";
import { ISignUpFormValues } from "./types";

interface Step1AccountProps {
  totalSteps: number;
  currentStep: number;
  onNext: () => void;
}

export const Step1Account: React.FC<Step1AccountProps> = ({
  totalSteps,
  currentStep,
  onNext,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISignUpFormValues>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
          Let's Setup Your Account
        </h2>
        <p className="text-neutral-500 text-base mb-2">
          Start your journey. Empower your cause. Accept donations easily.
        </p>
        <Stepper total={totalSteps} current={currentStep} />
      </div>

      <div className="space-y-5">
        {/* Organization Name */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Organization Name
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10">
              <img src={building} alt="" className="h-5 w-5 opacity-70" />
            </span>
            <input
              type="text"
              {...register("name", {
                required: "Organization Name is required",
              })}
              placeholder="Enter Name"
              className={`w-full h-14 pl-12 pr-4 bg-white border ${
                errors.name ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Email
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-400">
              <AiOutlineMail className="h-5 w-5" />
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-400">
              <MdLockOutline className="h-5 w-5" />
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
              placeholder="************"
              className={`w-full h-14 pl-12 pr-12 bg-white border ${
                errors.password ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-neutral-400 hover:text-neutral-600 focus:outline-none"
            >
              {showPassword ? (
                <FiEyeOff className="h-5 w-5" />
              ) : (
                <FiEye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit / Continue Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onNext}
            className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black hover:opacity-95 active:scale-[0.99] transition-all"
          >
            Continue
          </button>
        </div>

        {/* Link to Login */}
        <p className="text-center text-sm text-neutral-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-[#a55eea] font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Step1Account;
