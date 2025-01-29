import { ConfigProvider, DatePicker, Form, Input } from "antd";

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    name?: string;
    "abn/tfn"?: string;
    "name-on-card"?: string;
    "card-number"?: string;
    "expiry-date"?: string;
    "cvv"?: string;

};

const EditAccess = () => {
    const onFinish = () => { };
    return (
        <div className="max-w-screen-lg mx-auto my-5">
            <h3 className="text-2xl font-bold mt-10">Login Details</h3>
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
                            name="name"
                            label={<p className=" text-md ">Username</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="password"
                            label={<p className=" text-md ">New Password</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="password"
                            label={<p className=" text-md ">Confirm Password</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <h2 className="text-2xl font-bold mt-10 mb-5">Tax & Crad Details</h2>
                        <Form.Item<FieldType>
                            name="abn/tfn"
                            label={<p className=" text-md ">ABN/ TFN</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="ABN/ TFN"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="name-on-card"
                            label={<p className=" text-md ">Name On Card</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="Name On Card"
                            />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="card-number"
                            label={<p className=" text-md ">Card Number</p>}
                            style={{}}
                        >
                            <Input
                                required
                                style={{ padding: "6px" }}
                                className=" text-md"
                                placeholder="Card Number"
                            />
                        </Form.Item>

                        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="w-full md:w-[50%]">
                                <Form.Item<FieldType>
                                    name="expiry-date"
                                    label={<p className=" text-md ">Expiry Date</p>}
                                    style={{}}
                                >
                                    <DatePicker
                                        style={{ padding: "6px", }}
                                        className=" text-md"
                                        placeholder="Expiry Date"
                                    />
                                </Form.Item>
                            </div>

                            <div className="w-full md:w-[50%]">
                                <Form.Item<FieldType>
                                    name="cvv"
                                    label={<p className=" text-md ">CVV </p>}
                                    style={{}}
                                >
                                    <Input
                                        required
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="CVV"
                                    />
                                </Form.Item>
                            </div>


                        </div>



                        {/* <Form.Item<FieldType> className="mt-5 flex md:justify-end md:items-center">
                            <button className="bg-primary text-white  py-2 px-4 rounded-xl ">
                                Save Seetings
                            </button>

                        </Form.Item> */}
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    );
};

export default EditAccess;