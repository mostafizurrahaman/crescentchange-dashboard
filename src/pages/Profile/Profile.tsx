import { useState } from "react";
import ProfileTab from "../../components/ProfileComponents/ProfileTab";
import AccessTab from "../../components/ProfileComponents/AccessTab";
import Envlopes from "../../components/ProfileComponents/Envlopes";
import PreviewTab from "../../components/ProfileComponents/previewTab";

const Profile = () => {
    const tabs = ["profile", "access", "envlopes", "preview"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        <div>
            <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
                <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-5 mb-2">
                    <button onClick={() => handleTabChange("profile")} key='profile' className={`${activeTab === "profile" ? "bg-btnPrimary text-black py-2 px-4 rounded-3xl" : "bg-black text-white py-2 px-4 rounded-3xl"}`}>
                        Profile
                    </button>
                    <button onClick={() => handleTabChange("access")} key="access" className={`${activeTab === "access" ? "bg-btnPrimary text-black py-2 px-4 rounded-3xl" : "bg-black text-white py-2 px-4 rounded-3xl"}`}>
                        Access
                    </button>
                    <button onClick={() => handleTabChange("envlopes")} key="envlopes" className={`${activeTab === "envlopes" ? "bg-btnPrimary text-black py-2 px-4 rounded-3xl" : "bg-black text-white py-2 px-4 rounded-3xl"}`}>
                        Envlopes
                    </button>
                </div>
                <div className="flex justify-between items-center gap-5">
                    <button onClick={() => handleTabChange("preview")} key="preview" className={`${activeTab === "preview" ? "bg-btnPrimary text-black py-2 px-4 rounded-3xl" : "bg-black text-white py-2 px-4 rounded-3xl"}`}>
                        preview
                    </button>
                    {/* <button className="bg-black text-white py-2 px-4 rounded-3xl">
                        Save Seetings
                    </button> */}

                </div>
            </div>

            {
                tabs.map((tab) => (
                    <div key={tab} className={tab === activeTab ? "block" : "hidden"}>
                        {tab === "profile" && <ProfileTab />}
                        {tab === "access" && <AccessTab />}
                        {tab === "envlopes" && <Envlopes />}
                        {tab === "preview" && <PreviewTab />}
                    </div>
                ))
            }

        </div>
    );
};

export default Profile;