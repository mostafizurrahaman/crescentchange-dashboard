import { useState } from "react";
import AllDonor from "../../components/DonorComponnet/AllDonor";
const Donors = () => {
  const [activeTab, setActiveTab] = useState("All Donors");
  return (
    <div>
      <div className="w-full md:w-[70%]">
        <h1 className="text-xl md:text-3xl font-semibold my-3">Donors</h1>
        <p className="text-gray-500 mb-10">
          Every name here is a story of support. See them shine.
        </p>

        <div className="flex justify-start items-center gap-5 mb-5">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "All Donors" ? "bg-btnPrimary text-white" : ""
            }`}
            onClick={() => setActiveTab("All Donors")}
          >
            All Donors
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Round Up" ? "bg-btnPrimary text-white" : ""
            }`}
            onClick={() => setActiveTab("Round Up")}
          >
            Round Up
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Recurring" ? "bg-btnPrimary text-white" : ""
            }`}
            onClick={() => setActiveTab("Recurring")}
          >
            Recurring
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "One Time" ? "bg-btnPrimary text-white" : ""
            }`}
            onClick={() => setActiveTab("One Time")}
          >
            One Time
          </button>
        </div>
      </div>

      {activeTab === "All Donors" && (
        <div>
     <AllDonor/>
        </div>
      )}
      {activeTab === "Round Up" && (
        <div>
          <h1>Round Up</h1>
        </div>
      )}
      {activeTab === "Recurring" && (
        <div>
          <h1>Recurring</h1>
        </div>
      )}
      {activeTab === "One Time" && (
        <div>
          <h1>One Time</h1>
        </div>
      )}
    </div>
  );
};

export default Donors;
