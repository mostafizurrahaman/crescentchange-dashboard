/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Upload,
} from "antd";

import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { Steps } from "antd";
import profile from "../../assets/images/profile.png";
import hfl from "../../assets/images/hfl.png";
import { Link } from "react-router-dom";
type FieldType = {
  "organisation-name"?: string;
  "organisation-address"?: string;
  suburb?: string;
  state?: string;
  "post-code"?: string;
  country?: string;
  website?: string;
  telephone?: string;
  "email-address"?: string;
  username?: string;
  password?: string;
  remember?: string;
  name?: string;
  "abn/tfn"?: string;
  "name-on-card"?: string;
  "card-number"?: string;
  "expiry-date"?: string;
  cvv?: string;
  "mission-statement"?: string;
  "date-of-established"?: string;
  lines: number;
};
const EditProfile = () => {
  const [form] = Form.useForm();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);



  
  const onFinish = () => {};
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
      <div className=" ">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-lg text-gray-600 mb-4">
          See how your supporters are giving and where your impact is growing.
        </p>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Steps: {
                  colorPrimary: "rgb(165,94,234)",
                },
              },
            }}
          >
            <Steps
              current={1}
              items={[
                {
                  title: "Profile",
                },
                {
                  title: "Access",
                },
                {
                  title: "Envlope",
                },
              ]}
            />
          </ConfigProvider>
        </div>




        <div>
          <div className="mt-10">
            <div className="my-5  w-full relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-80 rounded-2xl"
                />
              ) : (
                <img
                  src={profile}
                  alt="Preview"
                  className="w-full h-80  rounded-2xl"
                />
              )}
              <Upload
                showUploadList={false}
                maxCount={1}
                beforeUpload={handleBeforeUpload}
                className=" cursor-pointer absolute top-10 right-20 z-[999]"
              >
                <div className="bg-neutral-200 px-6 py-3 rounded-full flex justify-center items-center gap-2">
                  <FaCamera className="h-5 w-5" />
                  <p className="text-lg ">Change Cover Photo</p>
                </div>
              </Upload>
            </div>

            <div className="my-5 flex flex-col gap-5 justify-center items-center relative">
              {previewLogo ? (
                <img
                  src={previewLogo}
                  alt="Preview"
                  className="h-28 w-28 rounded-2xl"
                />
              ) : (
                <img
                  src={hfl}
                  alt="Preview"
                  className="h-28 w-28  rounded-2xl"
                />
              )}
              <Upload
                showUploadList={false}
                maxCount={1}
                beforeUpload={handleBeforeUploadLogo}
                className=" cursor-pointer "
              >
                <div className="bg-neutral-200 px-6 py-3 rounded-full flex justify-center items-center gap-2">
                  <FaCamera className="h-5 w-5" />
                  <p className="text-lg ">Change Profile Photo</p>
                </div>
              </Upload>
            </div>
          </div>
          <div className="w-full md:w-[60%] mx-auto">
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    borderRadius: 0,
                  },
                  Input: {
                    borderRadius: 5,
                  },
                },
              }}
            >
              <Form
                name="contact"
                initialValues={{ remember: false }}
                onFinish={onFinish}
                layout="vertical"
                className="mt-10"
              >
                <Form.Item<FieldType>
                  name="organisation-name"
                  label={<p className=" text-md ">Organisation Name</p>}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Organisation Name"
                  />
                </Form.Item>
                <Form.Item<FieldType>
                  name="organisation-address"
                  label={<p className=" text-md ">Organisation address</p>}
                  style={{}}
                >
                  <Input
                    required
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Organisation address"
                  />
                </Form.Item>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                  <Form.Item<FieldType>
                    name="country"
                    label={<p className=" text-md ">Country</p>}
                    style={{ width: "100%" }}
                  >
                    <Input
                      required
                      style={{ padding: "6px" }}
                      className=" text-md"
                      placeholder="Country"
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="state"
                    label={<p className=" text-md ">State </p>}
                    style={{ width: "100%" }}
                  >
                    <Input
                      required
                      style={{ padding: "6px" }}
                      className=" text-md"
                      placeholder="State"
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="post-code"
                    label={<p className=" text-md ">Post code</p>}
                    style={{ width: "100%" }}
                  >
                    <InputNumber
                      required
                      style={{ padding: "3px", width: "100%" }}
                      className=" text-md"
                      placeholder="Post code"
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                  <Form.Item<FieldType>
                    name="date-of-established"
                    label={<p className=" text-md ">Date Of Established</p>}
                    style={{ width: "100%" }}
                  >
                    <DatePicker
                      required
                      style={{ padding: "6px", width: "100%" }}
                      className=" text-md"
                      placeholder="Date Of Established"
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="telephone"
                    label={<p className=" text-md ">Contact No</p>}
                    style={{ width: "100%" }}
                  >
                    <Input
                      required
                      style={{ padding: "6px" }}
                      className=" text-md"
                      placeholder="Contact No"
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                  <Form.Item<FieldType>
                    name="website"
                    label={<p className=" text-md ">Organization Website</p>}
                    style={{ width: "100%" }}
                  >
                    <Input
                      required
                      style={{ padding: "6px", width: "100%" }}
                      className=" text-md"
                      placeholder="Organization Website"
                    />
                  </Form.Item>
                  <Form.Item<FieldType>
                    name="email-address"
                    label={<p className=" text-md ">Email address</p>}
                    style={{ width: "100%" }}
                  >
                    <Input
                      required
                      style={{ padding: "6px" }}
                      className=" text-md"
                      placeholder="Email address"
                    />
                  </Form.Item>
                </div>

                <Form.Item<FieldType>
                  name="mission-statement"
                  label={<p className=" text-md ">Mission & Operation</p>}
                  style={{}}
                >
                  <Input.TextArea
                    required
                    rows={4}
                    style={{ padding: "6px" }}
                    className=" text-md"
                    placeholder="Type your message..."
                  />
                </Form.Item>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
                  <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
                    <button className="bg-neutral-300 text-black py-2 px-4 rounded-xl ">
                      See preview
                    </button>
                  </Form.Item>
                  <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
                    <Link to="/access">
                      <button className="bg-btnPrimary text-white py-2 px-4 rounded-xl ">
                        Save and Continue
                      </button>
                    </Link>
                  </Form.Item>
                </div>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
