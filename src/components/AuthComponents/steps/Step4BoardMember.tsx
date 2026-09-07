import React, { useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { FiMail, FiPhone, FiUpload, FiArrowLeft, FiCheck } from "react-icons/fi";
import Stepper from "../Stepper";
import { ISignUpFormValues } from "./types";

interface Step4BoardMemberProps {
  totalSteps: number;
  currentStep: number;
  onSubmit: () => void;
  onPrev: () => void;
  isSubmitting: boolean;
}

export const Step4BoardMember: React.FC<Step4BoardMemberProps> = ({
  totalSteps,
  currentStep,
  onSubmit,
  onPrev,
  isSubmitting,
}) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ISignUpFormValues>();

  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentFile = watch("drivingLicense");

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
          Add a Board Member
        </h2>
        <p className="text-neutral-500 text-base mb-2">
          Each organization must have at least one verified member.
        </p>
        <Stepper total={totalSteps} current={currentStep} />
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register("boardMemberName", {
              required: "Full Name is required",
            })}
            placeholder="John Doe"
            className={`w-full h-14 px-4 bg-white border ${
              errors.boardMemberName ? "border-red-500" : "border-neutral-200"
            } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
          />
          {errors.boardMemberName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.boardMemberName.message}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiMail className="h-5 w-5" />
            </span>
            <input
              type="email"
              {...register("boardMemberEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email Address"
              className={`w-full h-14 pl-12 pr-4 bg-white border ${
                errors.boardMemberEmail ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
          </div>
          {errors.boardMemberEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.boardMemberEmail.message}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Phone Number
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 z-10 text-neutral-500">
              <FiPhone className="h-5 w-5" />
            </span>
            <input
              type="tel"
              {...register("boardMemberPhoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[0-9\s\-()]+$/,
                  message: "Phone number cannot contain letters or special characters",
                },
                validate: (val) => {
                  const digits = (val || "").replace(/\D/g, "");
                  if (!digits || digits.length < 7) {
                    return "Please enter a valid phone number (at least 7 digits)";
                  }
                  if (digits.length > 15) {
                    return "Phone number is too long (maximum 15 digits)";
                  }
                  return true;
                },
              })}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.value = target.value.replace(/[^0-9+\s\-()]/g, "");
              }}
              placeholder="+61 400 222 333"
              className={`w-full h-14 pl-12 pr-4 bg-white border ${
                errors.boardMemberPhoneNumber ? "border-red-500" : "border-neutral-200"
              } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
            />
          </div>
          {errors.boardMemberPhoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.boardMemberPhoneNumber.message}
            </p>
          )}
        </div>

        {/* Document Upload */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Upload Government Issued Document (Drivers License/ID)
          </label>
          <Controller
            name="drivingLicense"
            control={control}
            rules={{ required: "Please upload your document" }}
            render={({ field: { onChange } }) => (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFileName(file.name);
                      onChange(file);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-14 px-4 bg-white border ${
                    errors.drivingLicense ? "border-red-500" : "border-neutral-200"
                  } rounded-xl text-left flex items-center justify-between hover:border-[#a55eea] transition-colors`}
                >
                  <span
                    className={`truncate text-sm ${
                      selectedFileName || currentFile
                        ? "text-neutral-800 font-medium flex items-center gap-1.5"
                        : "text-neutral-400"
                    }`}
                  >
                    {selectedFileName ||
                      (currentFile instanceof File
                        ? currentFile.name
                        : "Upload Driver's License or ID (PDF, JPG, PNG)")}
                  </span>
                  {selectedFileName || currentFile ? (
                    <FiCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <FiUpload className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  )}
                </button>
              </div>
            )}
          />
          {errors.drivingLicense && (
            <p className="text-red-500 text-sm mt-1">
              {errors.drivingLicense.message as string}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onPrev}
            className="w-1/3 py-4 border border-neutral-300 rounded-xl text-lg font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FiArrowLeft className="h-5 w-5" /> Back
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onSubmit}
            className="w-2/3 bg-btnPrimary py-4 rounded-xl text-lg font-semibold text-black hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
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
                Creating Account...
              </>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4BoardMember;
