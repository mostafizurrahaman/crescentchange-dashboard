import { ConfigProvider, Form, Input, Modal } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";


type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    name: string;
    subject: string;
    "abn/tfn"?: string;
    "name-on-card"?: string;
    "card-number"?: string;
    "expiry-date"?: string;
    "cvv"?: string;

};
const Envlopes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancle = () => setIsModalOpen(false)
    const onFinish = () => { };
    return (
        <div>
            <div className=" my-5">
                <div className="my-5 flex justify-between items-center">
                    <h1 className="text-3xl font-bold ">Daar Ibn Abaas</h1>
                    <button onClick={handleModalOpen} className="bg-primary text-white  py-2 px-4 rounded-xl flex justify-center items-center  gap-2">
                        <FaPlus />    Add Envelop
                    </button>
                </div>
                <div className="my-5 grid grid-cols-1 md:grid-cols-4 justify-between items-center gap-4">
                    <div className="h-40 border bg-neutral-200 py-4 px-6 rounded-xl text-center ">
                        <h1 className="text-xl font-bold ">New Envelope</h1>
                        <p className="text-sm  text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque fugit vero iste maiores, ex corporis dolore, blanditiis vitae sunt commodi hic praesentium omnis deserunt. Aut adipisci fuga ex alias nesciunt.</p>
                    </div>
                    <div className="h-40 border bg-neutral-200 py-4 px-6 rounded-xl text-center ">
                        <h1 className="text-xl font-bold ">New Envelope</h1>
                        <p className="text-sm  text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque fugit vero iste maiores, ex corporis dolore, blanditiis vitae sunt commodi hic praesentium omnis deserunt. Aut adipisci fuga ex alias nesciunt.</p>
                    </div>
                    <div className="h-40 border bg-neutral-200 py-4 px-6 rounded-xl text-center ">
                        <h1 className="text-xl font-bold ">New Envelope</h1>
                        <p className="text-sm  text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque fugit vero iste maiores, ex corporis dolore, blanditiis vitae sunt commodi hic praesentium omnis deserunt. Aut adipisci fuga ex alias nesciunt.</p>
                    </div>
                    <div className="h-40 border bg-neutral-200 py-4 px-6 rounded-xl text-center ">
                        <h1 className="text-xl font-bold ">New Envelope</h1>
                        <p className="text-sm  text-neutral-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque fugit vero iste maiores, ex corporis dolore, blanditiis vitae sunt commodi hic praesentium omnis deserunt. Aut adipisci fuga ex alias nesciunt.</p>
                    </div>

                </div>
                <Modal title="Add Envelop" open={isModalOpen} onOk={handleOk} onCancel={handleCancle}>
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
                                    name={"description" as keyof FieldType}
                                    label={<p className=" text-md ">Envelop Description </p>}
                                    style={{}}
                                >
                                    <Input.TextArea
                                        required
                                        rows={4}
                                        style={{ padding: "6px" }}
                                        className=" text-md"
                                        placeholder="Envelop Description"
                                    />
                                </Form.Item>
                            </Form>
                        </ConfigProvider>
                    </div>
                </Modal>



            </div>
        </div>
    );
};

export default Envlopes;