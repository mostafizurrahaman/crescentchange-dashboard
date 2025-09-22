import { useState } from "react";

const Reports = () => {
  const [activeTab, setActiveTab] = useState("All Donors");
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Reports</h1>
          <p className="text-lg text-gray-600 mb-4">
            Generate, track, and export your donation insights.
          </p>
        </div>
        <div className="flex justify-start items-center gap-5 mb-5">
          {["All Donors", "Export"].map((tab) => (
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
      {activeTab === "All Donors" && "All Donor"}
    </div>
  );
};

export default Reports;
