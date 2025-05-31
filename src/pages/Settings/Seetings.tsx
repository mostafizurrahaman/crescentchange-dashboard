import { useState } from "react";
import Notification from "../../components/SettingsComponents/Notification";
import Privacy from "../../components/SettingsComponents/Privacy";
import Intregation from "../../components/SettingsComponents/Intregation";

const Seetings = () => {
  const [activeTab, setActiveTab] = useState("Notification");
  return (
    <div>
      <div className="w-full md:w-[70%]">
        <h1 className="text-xl md:text-3xl font-semibold my-3">Settings</h1>
        <p className="text-gray-500 mb-10">
          Every name here is a story of support. See them shine.
        </p>

        <div className="flex justify-start items-center gap-5 mb-5">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Notification" ? "bg-btnPrimary text-white" : ""
            }`}
            onClick={() => setActiveTab("Notification")}
          >
            Notification
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Privacy & Security"
                ? "bg-btnPrimary text-white"
                : ""
            }`}
            onClick={() => setActiveTab("Privacy & Security")}
          >
            Privacy & Security
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "Intregation" ? "bg-btnPrimary text-white" : ""
            }`}
            onClick={() => setActiveTab("Intregation")}
          >
            Intregation
          </button>
        </div>
      </div>

      {activeTab === "Notification" && <Notification />}
      {activeTab === "Privacy & Security" && <Privacy />}
      {activeTab === "Intregation" && <Intregation />}
    </div>
  );
};

export default Seetings;
