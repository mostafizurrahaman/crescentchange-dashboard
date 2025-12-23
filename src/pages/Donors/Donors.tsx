import { useState } from "react";
import AllDonor from "../../components/DonorComponnet/AllDonor";
import RoundUp from "../../components/DonorComponnet/RoundUp";
import Recurring from "../../components/DonorComponnet/Recurring";
import OneTime from "../../components/DonorComponnet/OneTime";
const Donors = () => {
  const [activeTab, setActiveTab] = useState("All Donors");
  const tabValueMap: Record<
    string,
    "all" | "roundup" | "recurring" | "one-time"
  > = {
    "All Donors": "all",
    "Round Up": "roundup",
    Recurring: "recurring",
    "One Time": "one-time",
  };

  const tabContent: Record<string, { title: string; description: string }> = {
    "All Donors": {
      title: "Donors",
      description: "Every name here is a story of support. See them shine.",
    },
    "Round Up": {
      title: "Round Up Donations",
      description:
        "Small contributions that add up to big impacts through round up donations.",
    },
    Recurring: {
      title: "Recurring Donations",
      description:
        "Consistent support from generous donors who give on a recurring basis.",
    },
    "One Time": {
      title: "One Time Donations",
      description:
        "One-time gifts that make a meaningful difference right away.",
    },
  };

  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-xl md:text-3xl font-semibold my-3">
            {tabContent[activeTab].title}
          </h1>
          <p className="text-gray-500 mb-10">
            {tabContent[activeTab].description}
          </p>
        </div>

        <div className="flex justify-start items-center gap-5 mb-5">
          {["All Donors", "Round Up", "Recurring", "One Time"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-3xl ${
                activeTab === tab ? "bg-black text-white" : "bg-white border"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Components */}
      {activeTab === "All Donors" && <AllDonor tab={tabValueMap[activeTab]} />}
      {activeTab === "Round Up" && <RoundUp tab={tabValueMap[activeTab]} />}
      {activeTab === "Recurring" && <Recurring tab={tabValueMap[activeTab]} />}
      {activeTab === "One Time" && <OneTime tab={tabValueMap[activeTab]} />}
    </div>
  );
};

export default Donors;
