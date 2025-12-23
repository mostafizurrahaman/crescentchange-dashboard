/* eslint-disable @typescript-eslint/no-unused-vars */
import { message, Upload } from "antd";
import { useState } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import editUser from "../../assets/images/Icons.png";
import donor from "../../assets/images/donor.png";
import deposit from "../../assets/images/deposit.png";
import ProfileEditForm from "../EditProfileComponents/ProfileEditForm";
import AccessTab from "../ProfileComponents/AccessTab";
import EditCauses from "../EditProfileComponents/EditCauses";
import {
  useEditOrgCoverImageMutation,
  useEditOrgLogoMutation,
  useGetAllProfileQuery,
} from "../../redux/features/profileApi/profileApi";

const EditProfile = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [coverEditMode] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "access" | "causes">(
    "profile"
  );
  const { data: orgData } = useGetAllProfileQuery(null);

  const [editOrgCoverImage] = useEditOrgCoverImageMutation();
  const [editOrgLogo] = useEditOrgLogoMutation();
  const handleBeforeUpload = (file: File) => {
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };
  const handelEditCoverImage = async () => {
    if (!profilePic) return message.error("Please select an image first!");
    try {
      const formData = new FormData();
      formData.append("profileImage", profilePic!);
      await editOrgCoverImage(formData).unwrap();
      message.success("Cover image updated successfully");
    } catch (error) {
      message.error("Failed to update cover image");
      console.log(error);
    }
  };
  const handelEditLogo = async () => {
    if (!logo) return message.error("Please select an image first!");
    try {
      const formData = new FormData();
      formData.append("logoImage", logo!);
      await editOrgLogo(formData).unwrap();
      message.success("Logo updated successfully");
    } catch (error) {
      message.error("Failed to update logo");
      console.log(error);
    }
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
            {/* <div className="flex justify-start items-center gap-3">
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
            </div> */}
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Manage how your organisation appears to donors.
          </p>
        </div>

        {/* profile cover */}
        <div className="mt-10">
          <div className="my-5 w-full relative">
            <img
              src={previewImage || `${orgData?.data?.coverImage}`}
              alt="Cover"
              className="w-full h-80 rounded-2xl"
            />
            {/* Edit the cober image with thge api */}

            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={handleBeforeUpload}
              onChange={handelEditCoverImage}
              className="cursor-pointer absolute top-10 right-20 z-[999]"
            >
              <div className="bg-neutral-200 px-6 py-3 rounded-full flex justify-center items-center gap-2">
                {coverEditMode ? (
                  <FaCamera className="h-5 w-5 text-black" />
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <FaCamera className="h-5 w-5 text-black" />
                    <p>Change Cover Image</p>
                  </div>
                )}
              </div>
            </Upload>
          </div>

          <div className="relative -top-28 left-24">
            <img
              src={previewLogo || `${orgData?.data?.logoImage}`}
              alt="Logo"
              className="h-40 w-40 rounded-full"
            />
            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={handleBeforeUploadLogo}
              onChange={handelEditLogo}
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
            {activeTab === "causes" && (
              <EditCauses orgId={orgData?.data?._id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
