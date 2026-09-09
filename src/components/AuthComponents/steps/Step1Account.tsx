/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import Stepper from "../Stepper";
import { ISignUpFormValues } from "./types";
import { useCheckEmailStatusMutation } from "../../../redux/features/auth/authApi";

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
    setError,
    clearErrors,
    getValues,
    trigger,
  } = useFormContext<ISignUpFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [emailStatusMessage, setEmailStatusMessage] = useState<string | null>(null);
  const [isEmailAvailable, setIsEmailAvailable] = useState<boolean | null>(null);
  const [checkEmailStatus, { isLoading: isCheckingEmail }] = useCheckEmailStatusMutation();

  const handleEmailValidation = async (emailValue?: string) => {
    const email = (emailValue ?? getValues("email"))?.trim();
    if (!email) {
      setIsEmailAvailable(null);
      setEmailStatusMessage(null);
      return false;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setIsEmailAvailable(null);
      setEmailStatusMessage(null);
      return false;
    }

    try {
      const res: any = await checkEmailStatus({ email }).unwrap();
      if (res?.data?.alreadyInUse || res?.data?.alreadyInUse === true) {
        const msg =
          res?.data?.message ||
          res?.message ||
          "This email address is already in use.";
        setError("email", {
          type: "manual",
          message: msg,
        });
        setIsEmailAvailable(false);
        setEmailStatusMessage(null);
        return false;
      } else {
        clearErrors("email");
        setIsEmailAvailable(true);
        setEmailStatusMessage(
          res?.data?.message || res?.message || "This email address is available."
        );
        return true;
      }
    } catch (err: any) {
      const msg =
        err?.data?.data?.message ||
        err?.data?.message ||
        err?.message ||
        "This email address is already in use.";
      setError("email", {
        type: "manual",
        message: msg,
      });
      setIsEmailAvailable(false);
      setEmailStatusMessage(null);
      return false;
    }
  };

  const handleContinue = async () => {
    const isValid = await trigger(["name", "email", "password"]);
    if (!isValid) return;

    if (isEmailAvailable !== true) {
      const isEmailValid = await handleEmailValidation();
      if (!isEmailValid) return;
    }

    onNext();
  };

  const emailField = register("email", {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  });

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
            <span className="absolute left-4 z-10 text-neutral-500">
              <HiOutlineBuildingOffice2 className="h-5 w-5" />
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
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiMail className="h-5 w-5" />
            </span>
            <input
              type="email"
              {...emailField}
              onChange={(e) => {
                emailField.onChange(e);
                if (isEmailAvailable !== null || emailStatusMessage !== null) {
                  setIsEmailAvailable(null);
                  setEmailStatusMessage(null);
                }
              }}
              onBlur={async (e) => {
                await emailField.onBlur(e);
                handleEmailValidation(e.target.value);
              }}
              placeholder="Enter Email Address"
              className={`w-full h-14 pl-12 pr-10 bg-white border ${
                errors.email
                  ? "border-red-500"
                  : isEmailAvailable
                  ? "border-emerald-500"
                  : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none ${
                errors.email
                  ? "focus:border-red-500"
                  : isEmailAvailable
                  ? "focus:border-emerald-500"
                  : "focus:border-[#a55eea]"
              } transition-colors`}
            />
            {isCheckingEmail && (
              <span className="absolute right-4 text-neutral-400">
                <svg
                  className="animate-spin h-5 w-5"
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
              </span>
            )}
            {!isCheckingEmail && isEmailAvailable && !errors.email && (
              <span className="absolute right-4 text-emerald-600">
                <FiCheck className="h-5 w-5" />
              </span>
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          {!errors.email && isEmailAvailable && emailStatusMessage && (
            <p className="text-emerald-600 text-sm mt-1">{emailStatusMessage}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Password
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiLock className="h-5 w-5" />
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
              className="absolute right-4 text-neutral-500 hover:text-neutral-700 focus:outline-none"
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
            disabled={isCheckingEmail || isEmailAvailable === false}
            onClick={handleContinue}
            className="bg-btnPrimary w-full py-4 rounded-xl text-lg font-semibold text-black hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
