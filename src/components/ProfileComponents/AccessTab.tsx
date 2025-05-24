import { ConfigProvider, Modal, Steps } from "antd";
import { useState } from "react";
import EditAccess from "../PagesComponents/EditAccess";
import { FaPen } from "react-icons/fa";
import profile from "../../assets/images/profile.png";
const AccessTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancle = () => setIsModalOpen(false);
  return (
    <div className=" my-5">
      <div>
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-lg text-gray-600 mb-4">
          See how your supporters are giving and where your impact is growing.
        </p>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Steps: {
                  colorPrimary: "rgb(165,94,234)",
                },
              },
            }}
          >
            <Steps
              current={1}
              items={[
                {
                  title: "Profile",
                },
                {
                  title: "Access",
                },
                {
                  title: "Envlope",
                },
              ]}
            />
          </ConfigProvider>
        </div>
        <div className="my-6">
          <img src={profile} alt="" className="w-full" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Daar Ibn Abaas</h1>
        <button
          onClick={handleModalOpen}
          className=" my-5 py-2 px-4 rounded-xl flex justify-center items-center  gap-2"
        >
          <FaPen />
        </button>
      </div>
      <div className=" shadow-lg p-6 rounded-lg border border-gray-200">
        <h3 className="text-2xl font-bold mt-6 text-gray-700">Login Details</h3>
        <div className="mt-4 space-y-2">
          <p className="text-md font-semibold">
            Username: <span className="font-normal">JohnDoe123</span>
          </p>
          <p className="text-md font-semibold">
            Password: <span className="font-normal">********</span>
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-6 text-gray-700">
          Tax & Card Details
        </h2>
        <div className="mt-4 space-y-2">
          <p className="text-md font-semibold">
            ABN/ TFN: <span className="font-normal">123 456 789</span>
          </p>
          <p className="text-md font-semibold">
            Name On Card: <span className="font-normal">John Doe</span>
          </p>
          <p className="text-md font-semibold">
            Card Number:{" "}
            <span className="font-normal">**** **** **** 1234</span>
          </p>
          <p className="text-md font-semibold">
            Expiry Date: <span className="font-normal">12/25</span>
          </p>
          <p className="text-md font-semibold">
            CVV: <span className="font-normal">***</span>
          </p>
        </div>
      </div>
      <Modal
        title="Edit Access"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancle}
        width={700}
      >
        <EditAccess />
      </Modal>
    </div>
  );
};

export default AccessTab;
