import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/Placeholder Image (3).png"
import logo from "../../assets/images/abbas.png"
import { Link } from "react-router-dom";
const ProfileTab = () => {
    const onFinish = () => {

    }
    return (
        <div>
            <div className="max-w-screen-lg mx-auto my-5">
                <h1 className="text-3xl font-bold ">Daar Ibn Abaas</h1>
                <p className="my-3">Organisation Thumbnail</p>
                <img src={img} alt="" className="w-full" />
                <p className="my-5 font-bold"> Logo</p>
                <img src={logo} alt="" />
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
                            className="mt-20"
                        >

                            <Form.Item
                                name="organisation-name"
                                label={<p className=" text-md text-white">Organisation Name</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Organisation Name"
                                />
                            </Form.Item>
                            <Form.Item
                                name="organisation-address"
                                label={<p className=" text-md text-white">Organisation street address</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Organisation street address"
                                />
                            </Form.Item>
                            <div className="flex justify-between items-center">
                                <Form.Item
                                    name="suburb"
                                    label={<p className=" text-md text-white">Suburb</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Suburb"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="state"
                                    label={<p className=" text-md text-white">State </p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="State"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="post-code"
                                    label={<p className=" text-md text-white">Post code</p>}
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

                            <Form.Item
                                name="email-address"
                                label={<p className=" text-md text-white">Email address</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Email address"
                                />
                            </Form.Item>
                            <Form.Item
                                name="mission-statement"
                                label={<p className=" text-md text-white">Mission statement</p>}
                                style={{}}
                            >
                                <Input.TextArea
                                    required
                                    lines={4}
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Type your message..."
                                />
                            </Form.Item>
                            <p>263 characters left</p>

                            <Form.Item className=" flex justify-end items-center">
                                <button className="bg-primary text-white py-2 px-4 rounded-xl ">
                                    Save Seetings
                                </button>

                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;