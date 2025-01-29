
import { Modal } from "antd";
import { useState } from "react";
import EditAccess from "../PagesComponents/EditAccess";
import { FaPen } from "react-icons/fa";


const AccessTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancle = () => setIsModalOpen(false)
    return (
        <div className="max-w-screen-lg mx-auto my-5">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Daar Ibn Abaas</h1>
                <button onClick={handleModalOpen} className=" my-5 py-2 px-4 rounded-xl flex justify-center items-center  gap-2">
                    <FaPen />

                </button>
            </div>
            <div className=" shadow-lg p-6 rounded-lg border border-gray-200">


                <h3 className="text-2xl font-bold mt-6 text-gray-700">Login Details</h3>
                <div className="mt-4 space-y-2">
                    <p className="text-md font-semibold">Username: <span className="font-normal">JohnDoe123</span></p>
                    <p className="text-md font-semibold">Password: <span className="font-normal">********</span></p>
                </div>

                <h2 className="text-2xl font-bold mt-6 text-gray-700">Tax & Card Details</h2>
                <div className="mt-4 space-y-2">
                    <p className="text-md font-semibold">ABN/ TFN: <span className="font-normal">123 456 789</span></p>
                    <p className="text-md font-semibold">Name On Card: <span className="font-normal">John Doe</span></p>
                    <p className="text-md font-semibold">Card Number: <span className="font-normal">**** **** **** 1234</span></p>
                    <p className="text-md font-semibold">Expiry Date: <span className="font-normal">12/25</span></p>
                    <p className="text-md font-semibold">CVV: <span className="font-normal">***</span></p>
                </div>
            </div>
            <Modal title="Edit Access" open={isModalOpen} onOk={handleOk} onCancel={handleCancle} width={700}>
                <EditAccess />
            </Modal>
        </div>
    );
};

export default AccessTab;