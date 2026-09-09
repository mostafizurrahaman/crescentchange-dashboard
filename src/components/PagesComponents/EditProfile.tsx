import { message, Upload } from "antd";
import { useState } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import { LuUser, LuKey, LuHeartHandshake } from "react-icons/lu";
import { LiaStripeS } from "react-icons/lia";
import ProfileEditForm from "../EditProfileComponents/ProfileEditForm";
import AccessTab from "../ProfileComponents/AccessTab";
import EditCauses from "../EditProfileComponents/EditCauses";
import {
  useEditOrgCoverImageMutation,
  useEditOrgLogoMutation,
  useGetAllProfileQuery,
} from "../../redux/features/profileApi/profileApi";
import StripeConnect from "../ProfileComponents/StripeConnect/StripeConnect";
import placeholderCover from "../../assets/images/placeholder_cover.jpg";
import placeholderProfile from "../../assets/images/placeholder_profile.jpg";
const EditProfile = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [coverEditMode] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [coverError, setCoverError] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "access" | "causes" | "Stripe_Connect"
  >("profile");
  const { data: orgData } = useGetAllProfileQuery(null);

  console.log("orgData", orgData?.data?.coverImage);
  const [editOrgCoverImage] = useEditOrgCoverImageMutation();
  const [editOrgLogo] = useEditOrgLogoMutation();

  const handleBeforeUpload = (file: File) => {
    const isVideoFile = file.type.startsWith("video/");
    const isImageFile = file.type.startsWith("image/");

    // Check file size (15MB limit)
    const isLt15M = file.size / 1024 / 1024 < 15;
    if (!isLt15M) {
      message.error("File must be smaller than 15MB!");
      return false;
    }

    // Check file type
    if (!isVideoFile && !isImageFile) {
      message.error("You can only upload image or video files!");
      return false;
    }

    setIsVideo(isVideoFile);
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
    setCoverError(false);
    return false;
  };

  const handelEditCoverImage = async () => {
    if (!profilePic)
      return message.error("Please select an image or video first!");
    try {
      const formData = new FormData();
      formData.append("profileImage", profilePic!);
      await editOrgCoverImage(formData).unwrap();
      message.success(
        `${isVideo ? "Cover video" : "Cover image"} updated successfully`,
      );
    } catch (error) {
      message.error(
        `Failed to update ${isVideo ? "cover video" : "cover image"}`,
      );
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
    const isImageFile = file.type.startsWith("image/");

    // Check file size (15MB limit)
    const isLt15M = file.size / 1024 / 1024 < 15;
    if (!isLt15M) {
      message.error("Logo must be smaller than 15MB!");
      return false;
    }

    // Check file type (logo should only be image)
    if (!isImageFile) {
      message.error("Logo must be an image file!");
      return false;
    }

    setLogo(file);
    setPreviewLogo(URL.createObjectURL(file));

    return false;
  };
  const coverSrc = previewImage || orgData?.data?.coverImage;
  const showVideo = isVideo;

  return (
    <div className="w-full  overflow-hidden">
      <div>
        {/* header */}
        <div>
          <div className="flex justify-between items-center gap-5">
            <h1 className="font-familjen text-4xl font-semibold mb-4">
              Edit Information
            </h1>
          </div>
          <p className="text-[16px] text-gray-600 mb-6">
            Manage how your organisation appears to donors.
          </p>
        </div>

        {/* profile cover */}
        <div className="">
          <div className="my-5 w-full relative">
            {showVideo ? (
              <video
                src={coverSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-80 object-cover object-top rounded-2xl"
                onError={() => setIsVideo(false)}
              />
            ) : (previewImage || orgData?.data?.coverImage) && !coverError ? (
              <img
                src={previewImage || orgData?.data?.coverImage}
                alt="Cover"
                className="w-full h-80 object-cover rounded-2xl"
                onError={() => {
                  setCoverError(true);
                }}
              />
            ) : (
              <div className="w-full h-80 bg-[#f4f6f8] rounded-2xl flex items-center justify-center border border-gray-200/80 overflow-hidden">
                <img
                  src={placeholderCover}
                  alt="Cover placeholder"
                  className="w-32 h-32 object-contain opacity-50 mix-blend-multiply"
                />
              </div>
            )}

            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={handleBeforeUpload}
              onChange={handelEditCoverImage}
              accept="image/*,video/*"
              className="cursor-pointer absolute top-10 right-20 z-[999]"
            >
              <div className="bg-neutral-200 px-6 py-3 rounded-full flex justify-center items-center gap-2">
                {coverEditMode ? (
                  <FaCamera className="h-5 w-5 text-black" />
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <FaCamera className="h-5 w-5 text-black" />
                    <p>Change Cover</p>
                  </div>
                )}
              </div>
            </Upload>
          </div>

          <div className="relative -top-28 left-24">
            {previewLogo || orgData?.data?.logoImage ? (
              <img
                src={previewLogo || `${orgData?.data?.logoImage}`}
                alt="Logo"
                className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-md bg-white"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = placeholderProfile;
                }}
              />
            ) : (
              <img
                src={placeholderProfile}
                alt="Logo"
                className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-md bg-white"
              />
            )}

            <Upload
              showUploadList={false}
              maxCount={1}
              beforeUpload={handleBeforeUploadLogo}
              onChange={handelEditLogo}
              className="cursor-pointer"
            >
              <div className="relative -top-14 left-32 bg-neutral-800 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer shadow-md hover:bg-neutral-700 transition-colors">
                <FaPen className="h-5 w-5 text-white" />
              </div>
            </Upload>
          </div>
        </div>

        {/* outlet */}
        <div className="w-full flex justify-between items-start gap-5 border-r -mt-28">
          {/* Sidebar */}
          <div className="w-full md:w-[20%] border-r flex flex-col gap-3 px-6 min-h-screen">
            <div
              onClick={() => setActiveTab("profile")}
              className={`px-10 py-4 rounded-3xl cursor-pointer transition-colors ${
                activeTab === "profile" ? "bg-[#ebe9ec] text-black font-medium" : "bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <div className="flex justify-start items-center gap-2.5">
                <LuUser className="w-5 h-5" />
                <p>Edit Profile</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTab("access")}
              className={`px-10 py-4 rounded-3xl cursor-pointer transition-colors ${
                activeTab === "access" ? "bg-[#ebe9ec] text-black font-medium" : "bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <div className="flex justify-start items-center gap-2.5">
                <LuKey className="w-5 h-5" />
                <p>Access</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTab("causes")}
              className={`px-10 py-4 rounded-3xl cursor-pointer transition-colors ${
                activeTab === "causes" ? "bg-[#ebe9ec] text-black font-medium" : "bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <div className="flex justify-start items-center gap-2.5">
                <LuHeartHandshake className="w-5 h-5" />
                <p>Causes</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTab("Stripe_Connect")}
              className={`px-10 py-4 rounded-3xl cursor-pointer transition-colors ${
                activeTab === "Stripe_Connect"
                  ? "bg-[#ebe9ec] text-black font-medium"
                  : "bg-white text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              <div className="flex justify-start items-center gap-2.5">
                <LiaStripeS className="w-5 h-5 text-xl" />
                <p>Stripe Connect</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-[80%]">
            {activeTab === "profile" && (
              <ProfileEditForm data={orgData?.data} />
            )}
            {activeTab === "access" && <AccessTab />}
            {activeTab === "causes" && (
              <EditCauses orgId={orgData?.data?._id} />
            )}
            {activeTab === "Stripe_Connect" && <StripeConnect />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
