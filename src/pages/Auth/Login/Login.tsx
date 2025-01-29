import { Checkbox, ConfigProvider, Form, Input } from "antd";
import img from "../../../assets/images/login.png";
import { Link } from "react-router-dom";
import { FieldNamesType } from "antd/es/cascader";
const Login = () => {
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
                                        Login
                                    </h2>
                                    <p className="text-white  lg:text-lg font-bold">
                                        please enter your Email and Passeord .
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
                                <Form.Item
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
                                </Form.Item>

                                <Form.Item<FieldNamesType> name="checked" valuePropName="checked" label={null}>
                                    <div className="flex justify-between items-center ">
                                        <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
                                        <Link to="/auth/forgate-password" className=" text-md text-white">Forgate Password</Link>
                                    </div>

                                </Form.Item>

                                <Form.Item className="">
                                    <Link to="/">
                                        <button
                                            className="text-center w-full p-2 font-bold bg-white text-black px-8 py-2 rounded-md shadow-lg"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </Link>
                                </Form.Item>
                                <p className="text-md text-white">Don't have an account ? <Link to="/auth/signUp1" className=" text-md text-white">Register Now</Link></p>
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

export default Login;