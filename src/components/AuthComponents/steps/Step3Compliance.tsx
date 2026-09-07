import React from "react";
import { useFormContext } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import Stepper from "../Stepper";
import { ISignUpFormValues } from "./types";

interface Step3ComplianceProps {
  totalSteps: number;
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
}

export const Step3Compliance: React.FC<Step3ComplianceProps> = ({
  totalSteps,
  currentStep,
  onNext,
  onPrev,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ISignUpFormValues>();

  return (
    <div className="w-full max-w-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-familjen font-bold mb-3 text-black">
          Verify Your Registration
        </h2>
        <p className="text-neutral-500 text-base mb-2">
          Verify your registration details for compliance.
        </p>
        <Stepper total={totalSteps} current={currentStep} />
      </div>

      <div className="space-y-5">
        {/* TFN / ABN Number */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            TFN / ABN Number
          </label>
          <input
            type="text"
            {...register("tfnOrAbnNumber", {
              required: "TFN / ABN Number is required",
            })}
            placeholder="62 123 456 789"
            className={`w-full h-14 px-4 bg-white border ${
              errors.tfnOrAbnNumber ? "border-red-500" : "border-neutral-200"
            } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
          />
          {errors.tfnOrAbnNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.tfnOrAbnNumber.message}
            </p>
          )}
        </div>

        {/* ACNC Registration Number */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            ACNC Registration Number
          </label>
          <input
            type="text"
            {...register("acncNumber", {
              required: "ACNC Registration Number is required",
            })}
            placeholder="ACNC-987654"
            className={`w-full h-14 px-4 bg-white border ${
              errors.acncNumber ? "border-red-500" : "border-neutral-200"
            } rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors`}
          />
          {errors.acncNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.acncNumber.message}</p>
          )}
        </div>

        {/* Zakat License Holder Number (Optional) */}
        <div>
          <label className="block text-base font-medium text-black/80 mb-2">
            Zakat License Holder Number{" "}
            <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            {...register("zakatLicenseHolderNumber")}
            placeholder="ZL-45678"
            className="w-full h-14 px-4 bg-white border border-neutral-200 rounded-xl text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#a55eea] transition-colors"
          />
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex gap-3">
          <button
            type="button"
            onClick={onPrev}
            className="w-1/3 py-4 border border-neutral-300 rounded-xl text-lg font-semibold text-neutral-700 hover:bg-neutral-50 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="h-5 w-5" /> Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-2/3 bg-btnPrimary py-4 rounded-xl text-lg font-semibold text-black hover:opacity-95 active:scale-[0.99] transition-all"
          >
            Save &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3Compliance;
