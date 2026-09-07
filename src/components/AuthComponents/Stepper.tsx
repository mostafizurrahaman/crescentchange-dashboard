import React from "react";

interface StepperProps {
  total: number;
  current: number;
}

export const Stepper: React.FC<StepperProps> = ({ total, current }) => {
  const segments = Array.from({ length: total });

  return (
    <div
      className="flex items-center gap-2 w-2/5 mx-auto my-4"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Onboarding progress: Step ${current} of ${total}`}
    >
      {segments.map((_, i) => {
        const isActive = i < current;
        return (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-200 ${
              isActive ? "bg-[#a55eea]" : "bg-neutral-200"
            }`}
          />
        );
      })}
    </div>
  );
};

export default Stepper;
