import { ConfigProvider, Form } from "antd";
import img from "../../assets/images/signup.png";
import { Link } from "react-router-dom";
const SignUp5 = () => {
    const onFinish = () => {

    }
    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="bg-primary h-screen w-full md:w-[50%]  px-32 py-40">
                    <div className="h-2 w-full bg-blue-50"></div>
                    <p className="text-white">Step 5/5</p>
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
                                <div className="mb-4">
                                    <h2 className="text-white  text-xl md:text-2xl  lg:text-3xl font-bold mb-6 ">
                                        By Agreement to Subscribe to organisation subscription
                                    </h2>
                                    <p className="text-white  lg:text-lg font-bold">
                                        You are agreeing to our terms and conditions
                                    </p>
                                </div>
                                {/* <Form.Item
                                    name="name"
                                    label={<p className=" text-md text-white">Enter your name</p>}
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
                                    label={<p className=" text-md text-white">Enter your Email</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Your Email"
                                    />
                                </Form.Item> */}


                                <Form.Item className="">
                                    <div className="flex justify-end items-end gap-2">

                                        <button
                                            className="text-center   p-2 font-bold bg-white text-black px-10 py-2 rounded-md shadow-lg"
                                            type="submit"
                                        >
                                            Cancel
                                        </button>
                                        <Link to="/auth/login">
                                            <button
                                                className="text-center  p-2 font-bold bg-btnPrimary text-black px-8 py-2 rounded-md shadow-lg"
                                                type="submit"
                                            >
                                                Next
                                            </button>
                                        </Link>
                                    </div>

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

export default SignUp5;