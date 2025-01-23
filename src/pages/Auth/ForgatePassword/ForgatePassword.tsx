import { ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/images/Placeholder Image (2).png";
import { Link } from "react-router-dom";
const ForgatePassword = () => {
    const onFinish = () => {

    }
    return (
        <div className="h-screen">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="bg-primary h-screen w-full md:w-[50%]  px-32 py-40">

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
                                <div className="mb-4 text-center " >
                                    <h2 className="text-white   text-xl md:text-2xl  lg:text-3xl font-bold mb-6 ">
                                        Forgot Password
                                    </h2>
                                    <p className="text-white  lg:text-lg font-bold">
                                        Enter your email to reset your password
                                    </p>
                                </div>
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
                                </Form.Item>
                                {/* <Form.Item
                                    name="password"
                                    label={<p className=" text-md text-white">Enter your Password</p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Password"
                                    />
                                </Form.Item> */}



                                <Form.Item className="">

                                    <Link to="/">
                                        <button
                                            className="text-center w-full p-2 font-bold bg-btnPrimary text-black px-8 py-2 rounded-md shadow-lg"
                                            type="submit"
                                        >
                                            Send
                                        </button>
                                    </Link>


                                </Form.Item>

                            </Form>
                        </ConfigProvider>
                    </div>
                </div>
                <div className="md:full md:w-[50%] ">
                    <img src={img} alt="sign up" className="w-full  h-screen object-cover" />
                </div>

            </div>
        </div >
    );
};

export default ForgatePassword;