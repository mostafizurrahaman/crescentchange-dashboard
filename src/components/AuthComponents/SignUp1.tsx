import { ConfigProvider, Form, Input } from "antd";
import img from "../../assets/images/signup.png";
const SignUp1 = () => {
    const onFinish = () => {

    }
    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="bg-primary h-screen w-full md:w-[50%]  px-32 py-40">
                    <div className="h-2 w-full bg-blue-50"></div>
                    <p className="text-white">Step 1/4</p>
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
                                <div className="mb-4 text-center">
                                    <h2 className="text-neutral-300  text-xl md:text-2xl  lg:text-3xl font-bold mb-6 ">
                                        Let’s start with your
                                        name & email
                                    </h2>
                                    <p className="text-neutral-400  lg:text-lg font-bold">
                                        You can always change it later
                                    </p>
                                </div>
                                <Form.Item
                                    name="name"
                                    label={<p className=" text-md">Full Name</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Your Name"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    label={<p className=" text-md">Email</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Your Email"
                                    />
                                </Form.Item>


                                <Form.Item className="text-center">
                                    <button
                                        className="text-center w-full  p-2 font-bold text-2xl bg-gradient-to-r from-red-900 to-red-700  text-white px-10 py-2 rounded-md shadow-lg"
                                        htmlType="submit"
                                    >
                                        Send
                                    </button>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
                <div className="md:full md:w-[50%] ">
                    <img src={img} alt="sign up" className="w-full  h-screen " />
                </div>

            </div>
        </div>
    );
};

export default SignUp1;