import { useState } from "react";
import AllDonor from "../../components/DonorComponnet/AllDonor";
import RoundUp from "../../components/DonorComponnet/RoundUp";
import Recurring from "../../components/DonorComponnet/Recurring";
import OneTime from "../../components/DonorComponnet/OneTime";
const Donors = () => {
  const [activeTab, setActiveTab] = useState("All Donors");
  return (
    <div>
      <div className="flex justify-between items-centergap-2">
        <div>
          <h1 className="text-xl md:text-3xl font-semibold my-3">Donors</h1>
          <p className="text-gray-500 mb-10">
          Every name here is a story of support. See them shine.
          </p>
        </div>

        <div className="flex justify-start items-center gap-5 mb-5">
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === "All Donors" ? "bg-black text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("All Donors")}
          >
            All Donors
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === "Round Up" ? "bg-black text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("Round Up")}
          >
            Round Up
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === "Recurring" ? "bg-black text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("Recurring")}
          >
            Recurring
          </button>
          <button
            className={`px-4 py-2 rounded-3xl ${
              activeTab === "One Time" ? "bg-black text-white" : "bg-white border"
            }`}
            onClick={() => setActiveTab("One Time")}
          >
            One Time
          </button>
        </div>
      </div>

      {activeTab === "All Donors" && (
        <div>
          <AllDonor />
        </div>
      )}
      {activeTab === "Round Up" && (
        <div>
          <RoundUp />
        </div>
      )}
      {activeTab === "Recurring" && (
        <div>
          <Recurring />
        </div>
      )}
      {activeTab === "One Time" && (
        <div>
          <OneTime />
        </div>
      )}
    </div>
  );
};

export default Donors;
