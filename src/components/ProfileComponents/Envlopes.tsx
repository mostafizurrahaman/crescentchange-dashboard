import { ConfigProvider, DatePicker, Form, Input } from "antd";
import { FaPlus } from "react-icons/fa6";


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
const Envlopes = () => {
    const onFinish = () => { };
    return (
        <div>
            <div className="max-w-screen-lg mx-auto my-5">
                <h1 className="text-3xl font-bold ">Daar Ibn Abaas</h1>
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
                                name="subject"
                                label={<p className=" text-md ">Envelop Subject</p>}
                                style={{}}
                            >
                                <Input
                                    required
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Envelop Subject"
                                />
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="description"
                                label={<p className=" text-md ">Envelop Description </p>}
                                style={{}}
                            >
                                <Input.TextArea
                                    required
                                    lines={4}
                                    style={{ padding: "6px" }}
                                    className=" text-md"
                                    placeholder="Envelop Description"
                                />
                            </Form.Item>




                            <Form.Item<FieldType> className=" flex justify-center items-center">
                                <button className="bg-primary text-white  py-2 px-4 rounded-xl flex justify-center items-center  gap-2">
                                    <FaPlus />    Add Envelop
                                </button>

                            </Form.Item>
                        </Form>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
};

export default Envlopes;