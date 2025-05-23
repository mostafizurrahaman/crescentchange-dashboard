// import { useState } from "react";
// import ProfileTab from "../../components/ProfileComponents/ProfileTab";
// import AccessTab from "../../components/ProfileComponents/AccessTab";
// import Envlopes from "../../components/ProfileComponents/Envlopes";
// import PreviewTab from "../../components/ProfileComponents/PreviewTab";
import profile from "../../assets/images/profile.png";
import hfl from "../../assets/images/hfl.png";
import { FiEdit3 } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import books from "../../assets/images/books.png";
import meal from "../../assets/images/meal.png";
import dress from "../../assets/images/dress.png";
import dreams from "../../assets/images/dreams.png";

const Profile = () => {
  //   const tabs = ["profile", "access", "envlopes", "preview"];
  // const [activeTab, setActiveTab] = useState(tabs[0]);

  // const handleTabChange = (tab: string) => {
  //     setActiveTab(tab);
  // };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-lg text-gray-600 mb-4">
        See how your supporters are giving and where your impact is growing.
      </p>
      <div className="my-6">
        <img src={profile} alt="" className="w-full" />
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="flex justify-start items-center gap-5">
          <img src={hfl} alt="" />
          <h1 className="text-2xl font-bold">HFL Foundation</h1>
        </div>
        <button className="bg-btnPrimary text-white py-2 px-4 rounded-3xl flex justify-center items-center gap-2">
          <FiEdit3 className="h-5 w-5" />
          Edit
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-start items-center mt-10 mb-3">
        <div className="flex  justify-start items-center gap-5">
          <LuCalendarDays />
          <p>Date established: 01/01/2023</p>
          <p className="h-5 border-r border-dashed"></p>
        </div>
        <div className="flex  justify-start items-center gap-5">
          <IoIosLink />
          <p>www.hflfoundation.org</p>
          <p className="h-5 border-r border-dashed"></p>
        </div>
        <div className="flex  justify-start items-center gap-5">
          <AiOutlineMail />
          <p>contact@hflfoundation.org</p>
          <p className="h-5 border-r border-dashed"></p>
        </div>
        <div className="flex  justify-start items-center gap-5">
          <IoCallOutline />
          <p>+234 80 0000 0000</p>
          {/* <p className="h-5 border-r border-dashed"></p> */}
        </div>
      </div>
      <div className="flex  justify-start items-center gap-2">
        <CiLocationOn />
        <p>Darul Huda Center 45 Crescent Lane Sydney, Australia</p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        {/* <div className="flex flex-col md:flex-row justify-center items-center md:justify-between md:items-center gap-5 mb-2">
                    <button onClick={() => handleTabChange("profile")} key='profile' className={`${activeTab === "profile" ? "bg-primary text-white py-2 px-4 rounded-3xl" : "border border-primary py-2 px-4 rounded-3xl"}`}>
                        Profile
                    </button>
                    <button onClick={() => handleTabChange("access")} key="access" className={`${activeTab === "access" ? "bg-primary text-white py-2 px-4 rounded-3xl" : "border border-primary py-2 px-4 rounded-3xl"}`}>
                        Access
                    </button>
                    <button onClick={() => handleTabChange("envlopes")} key="envlopes" className={`${activeTab === "envlopes" ? "bg-primary text-white py-2 px-4 rounded-3xl" : "border border-primary py-2 px-4 rounded-3xl"}`}>
                        Envlopes
                    </button>
                </div> */}
        {/* <div className="flex justify-between items-center gap-5">
                    <button onClick={() => handleTabChange("preview")} key="preview" className={`${activeTab === "preview" ? "bg-primary text-white py-2 px-4 rounded-3xl" : "border border-primary py-2 px-4 rounded-3xl"}`}>
                        preview
                    </button>
            
                </div> */}
      </div>
      <div className="my-6 border-b"></div>
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
        <div className="w-full md:w-[70%]">
          <h1 className="text-2xl font-bold">Mission & Operations</h1>
          <p className="text-lg text-gray-600 my-4">
            Hope for Learning Foundation exists to unlock the power of education
            for underserved communities. We champion access, equity, and
            opportunity — because every child deserves a future filled with
            knowledge, growth, and hope.
          </p>
          <p className="my-5 border-b"></p>
        </div>
        <div className="w-full md:w-[30%]">
          <h1 className="text-2xl font-bold my-3">Raised Causes</h1>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={books} alt="" />
            <div>
              <h1 className="text-lg font-bold">Backpacks & Books</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={meal} alt="" />
            <div>
              <h1 className="text-lg font-bold">Every Child, Every Meal</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={dress} alt="" />
            <div>
              <h1 className="text-lg font-bold">Warmth in Winter</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={dreams} alt="" />
            <div>
              <h1 className="text-lg font-bold">Digital Dreams</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 my-5">
            <img src={meal} alt="" />
            <div>
              <h1 className="text-lg font-bold">Every Child, Every Meal</h1>
              <div className="flex justify-between items-center gap-36">
                <p className="text-green-500">Raised: $10,000</p>
                <p>July 2025-oct 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
            {
                tabs.map((tab) => (
                    <div key={tab} className={tab === activeTab ? "block" : "hidden"}>
                        {tab === "profile" && <ProfileTab />}
                        {tab === "access" && <AccessTab />}
                        {tab === "envlopes" && <Envlopes />}
                        {tab === "preview" && <PreviewTab />}
                    </div>
                ))
            } */}
    </div>
  );
};

export default Profile;
