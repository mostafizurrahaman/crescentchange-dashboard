/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Form, Input, Upload } from "antd";

import { useState } from "react";
import { FaCamera } from "react-icons/fa";
type FieldType = {
    "organisation-name"?: string;
    "organisation-address"?: string;
    "suburb"?: string;
    "state"?: string;
    "post-code"?: string;
    "country"?: string;
    "website"?: string;
    "telephone"?: string;
    "email-address"?: string;
    "username"?: string;
    "password"?: string;
    "remember"?: string;
    "name"?: string;
    "abn/tfn"?: string;
    "name-on-card"?: string;
    "card-number"?: string;
    "expiry-date"?: string;
    "cvv"?: string;
    "mission-statement"?: string;
    lines: number


};
const EditProfile = () => {
    const [form] = Form.useForm();

    const [profilePic] = useState(null);


    const onFinish = () => { };
    return (
        <div>
            <div className=" ">
                <div className="mt-10">
                    <h1 className="text-lg font-bold ">Uplpoad Banner</h1>
                    <div className="my-5 border-2 border-dashed p-2 flex flex-col justify-center items-center w-full">
                        <Upload
                            showUploadList={false}
                            maxCount={1}
                            beforeUpload={(file) => {
                                form.setFieldsValue({ img: [file] });
                                // setProfilePic();
                                return false;
                            }}
                            className="bg-btnPrimary px-2 py-1 rounded-full cursor-pointer"
                        >
                            <FaCamera className="text-white" />
                        </Upload>
                        <p className="mt-2 text-sm text-gray-700">
                            {profilePic ? profilePic : 'No file uploaded'}
                        </p>
                    </div>
                    <h1 className="text-lg font-bold ">Uplpoad Logo</h1>
                    <div className="my-5 border-2 border-dashed p-2 flex flex-col justify-center items-center w-full">
                        <Upload

                            showUploadList={false}
                            maxCount={1}
                            beforeUpload={(file) => {
                                form.setFieldsValue({ img: [file] });
                                // setProfilePic(file.name);
                                return false;
                            }}
                            className="bg-btnPrimary px-2 py-1 rounded-full cursor-pointer"
                        >
                            <FaCamera className="text-white" />
                        </Upload>
                        <p className="mt-2 text-sm text-gray-700">
                            {profilePic ? profilePic : 'No file uploaded'}
                        </p>
                    </div>
                </div>
                <div>
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
                            //   style={{ maxWidth: 800 }}
                            onFinish={onFinish}
                            layout="vertical"
                            className="mt-10"
                        >

                            <Form.Item<FieldType>
                                name="organisation-name"
                                label={<p className=" text-md ">Organisation Name</p>}
                                style={{}}
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
                                label={<p className=" text-md ">Organisation street address</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Organisation street address"
                                />
                            </Form.Item>
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                <Form.Item<FieldType>
                                    name="suburb"
                                    label={<p className=" text-md ">Suburb</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Suburb"
                                    />
                                </Form.Item>
                                <Form.Item<FieldType>
                                    name="state"
                                    label={<p className=" text-md ">State </p>}
                                    style={{}}
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
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Post code"
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item<FieldType>
                                name="email-address"
                                label={<p className=" text-md ">Email address</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Email address"
                                />
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="mission-statement"
                                label={<p className=" text-md ">Mission statement</p>}
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
                            <p>263 characters left</p>

                            {/* <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
                                <button className="bg-primary text-white py-2 px-4 rounded-xl ">
                                    Save Seetings
                                </button>

                            </Form.Item> */}
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;