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

      {activeTab === "All Donors" && (
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  items-center gap-3">
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donations</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-400">+8.2% </span>{" "}
              <span className="text-gray-400 text-sm">vs last month</span>{" "}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donors</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-500">5.4%</span>{" "}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Avg. Donation</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 400{" "}
              <span className="text-sm text-gray-400">per user</span>{" "}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
