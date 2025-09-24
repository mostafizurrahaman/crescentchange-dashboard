/* eslint-disable @typescript-eslint/no-unused-vars */
import { Upload } from "antd";
import { useState } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import profile from "../../assets/images/profile.png";
import hfl from "../../assets/images/Profile Logo.png";
import editUser from "../../assets/images/Icons.png";
import donor from "../../assets/images/donor.png";
import deposit from "../../assets/images/deposit.png";
import ProfileEditForm from "../EditProfileComponents/ProfileEditForm";
import AccessTab from "../ProfileComponents/AccessTab";
import EditCauses from "../EditProfileComponents/EditCauses";

const EditProfile = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [active, setActive] = useState<"discard" | "save" | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "access" | "causes">(
    "profile"
  );

  const handleBeforeUpload = (file: File) => {
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const handleBeforeUploadLogo = (file: File) => {
    setLogo(file);
    setPreviewLogo(URL.createObjectURL(file));
    return false;
  };

  return (
    <div>
      <div>
        {/* header */}
        <div>
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-4xl font-semibold mb-4">Edit Information</h1>
            <div className="flex justify-start items-center gap-3">
              <button
                onClick={() => setActive("discard")}
                className={`px-4 py-3 rounded-3xl border transition ${
                  active === "discard"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Discard Changes
              </button>

              <button
                onClick={() => setActive("save")}
                className={`px-4 py-3 rounded-3xl border transition ${
                  active === "save"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Manage how your organisation appears to donors.
          </p>
        </div>

        {/* profile cover */}
        <div className="mt-10">
          <div className="my-5 w-full relative">
            <img
              src={previewImage || profile}
              alt="Cover"
              className="w-full h-80 rounded-2xl"
            />
            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={handleBeforeUpload}
              className="cursor-pointer absolute top-10 right-20 z-[999]"
            >
              <div className="bg-neutral-200 px-6 py-3 rounded-full flex justify-center items-center gap-2">
                <FaCamera className="h-5 w-5" />
                <p className="text-lg">Change Cover Photo</p>
              </div>
            </Upload>
          </div>

          <div className="relative -top-28 left-24">
            <img
              src={previewLogo || hfl}
              alt="Logo"
              className="h-40 w-40 rounded-full"
            />
            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={handleBeforeUploadLogo}
              className="cursor-pointer"
            >
              <div className="relative -top-14 left-32 bg-neutral-800 h-10 w-10 rounded-full flex justify-center items-center">
                <FaPen className="h-5 w-5 text-white" />
              </div>
            </Upload>
          </div>
        </div>

        {/* outlet */}
        <div className="w-full flex justify-between items-start gap-5 border-r">
          {/* Sidebar */}
          <div className="w-full md:w-[20%] border-r flex flex-col gap-3 px-6 min-h-screen">
            <div
              onClick={() => setActiveTab("profile")}
              className={`px-10 py-4 rounded-3xl ${
                activeTab === "profile" ? "bg-[#ebe9ec] text-black" : "bg-white"
              }`}
            >
              <div className=" flex justify-center items-center gap-2">
                <img src={editUser} alt="" />
                <p> Edit Profile</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTab("access")}
              className={`px-10 py-4 rounded-3xl ${
                activeTab === "access" ? "bg-[#ebe9ec] text-black" : "bg-white"
              }`}
            >
              <div className=" flex justify-center items-center gap-2">
                <img src={donor} alt="" />
                <p> Access</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTab("causes")}
              className={`px-10 py-4 rounded-3xl ${
                activeTab === "causes" ? "bg-[#ebe9ec] text-black" : "bg-white"
              }`}
            >
              <div className=" flex justify-center items-center gap-2">
                <img src={deposit} alt="" />
                <p> causes</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-[80%]">
            {activeTab === "profile" && <ProfileEditForm />}
            {activeTab === "access" && <AccessTab />}
            {activeTab === "causes" && <EditCauses  />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
