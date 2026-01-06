import { message, Upload } from "antd";
import { useState } from "react";
import { FaCamera, FaPen } from "react-icons/fa";
import editUser from "../../assets/images/Icons.png";
import donor from "../../assets/images/donor.png";
import { LiaStripeS } from "react-icons/lia";
import deposit from "../../assets/images/deposit.png";
import ProfileEditForm from "../EditProfileComponents/ProfileEditForm";
import AccessTab from "../ProfileComponents/AccessTab";
import EditCauses from "../EditProfileComponents/EditCauses";
import {
  useEditOrgCoverImageMutation,
  useEditOrgLogoMutation,
  useGetAllProfileQuery,
} from "../../redux/features/profileApi/profileApi";
import StripeConnect from "../ProfileComponents/StripeConnect/StripeConnect";

const EditProfile = () => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [coverEditMode] = useState(false);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "profile" | "access" | "causes" | "Stripe_Connect"
  >("profile");
  const { data: orgData } = useGetAllProfileQuery(null);

  const [editOrgCoverImage] = useEditOrgCoverImageMutation();
  const [editOrgLogo] = useEditOrgLogoMutation();

  const handleBeforeUpload = (file: File) => {
    const isVideoFile = file.type.startsWith('video/');
    const isImageFile = file.type.startsWith('image/');
    
    // Check file size (15MB limit)
    const isLt15M = file.size / 1024 / 1024 < 15;
    if (!isLt15M) {
      message.error('File must be smaller than 15MB!');
      return false;
    }
    
    // Check file type
    if (!isVideoFile && !isImageFile) {
      message.error('You can only upload image or video files!');
      return false;
    }
    
    setIsVideo(isVideoFile);
    setProfilePic(file);
    setPreviewImage(URL.createObjectURL(file));
    return false;
  };

  const handelEditCoverImage = async () => {
    if (!profilePic) return message.error("Please select an image or video first!");
    try {
      const formData = new FormData();
      formData.append("profileImage", profilePic!);
      await editOrgCoverImage(formData).unwrap();
      message.success(`${isVideo ? 'Cover video' : 'Cover image'} updated successfully`);
    } catch (error) {
      message.error(`Failed to update ${isVideo ? 'cover video' : 'cover image'}`);
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
    const isImageFile = file.type.startsWith('image/');
    
    // Check file size (15MB limit)
    const isLt15M = file.size / 1024 / 1024 < 15;
    if (!isLt15M) {
      message.error('Logo must be smaller than 15MB!');
      return false;
    }
    
    // Check file type (logo should only be image)
    if (!isImageFile) {
      message.error('Logo must be an image file!');
      return false;
    }
    
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
            <h1 className="font-familjen text-4xl font-semibold mb-4">Edit Information</h1>
          
          </div>
          <p className="text-[16px] text-gray-600 mb-6">
          Manage how your organisation appears to donors.
          </p>
        </div>

        {/* profile cover */}
        <div className="">
          <div className="my-5 w-full relative">
            {isVideo && previewImage ? (
              <video
                src={previewImage}
                controls
                autoPlay
                muted
                loop
                className="w-full h-80 object-cover object-top rounded-2xl"
              />
            ) : (
              <img
                src={previewImage || `${orgData?.data?.coverImage}`}
                alt="Cover"
                className="w-full h-80 object-cover object-top rounded-2xl"
              />
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
        <div className="w-full flex justify-between items-start gap-5 border-r -mt-28">
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
                <img src={deposit} alt="" className="" />
                <p> causes</p>
              </div>
            </div>
            <div
              onClick={() => setActiveTab("Stripe_Connect")}
              className={`px-10 py-4 rounded-3xl ${
                activeTab === "Stripe_Connect"
                  ? "bg-[#ebe9ec] text-black"
                  : "bg-white"
              }`}
            >
              <div className=" flex justify-center items-center gap-2">
                <LiaStripeS />
                <p> Stripe Connect</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-[80%]">
            {activeTab === "profile" && <ProfileEditForm data={orgData?.data}/>}
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
 