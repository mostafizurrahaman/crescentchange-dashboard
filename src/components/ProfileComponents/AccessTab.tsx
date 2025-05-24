import { ConfigProvider, Form, Input, InputNumber, Modal, Steps } from "antd";
import { useState } from "react";
import EditAccess from "../PagesComponents/EditAccess";
import profile from "../../assets/images/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

type FieldType = {
  "organisation-name"?: string;
  "organisation-address"?: string;
  suburb?: string;
  state?: string;
  "post-code"?: string;
  country?: string;
  website?: string;
  telephone?: string;
  "email-address"?: string;
  username?: string;
  password?: string;
  remember?: string;
  name?: string;
  "abn/tfn"?: string;
  "name-on-card"?: string;
  "card-number"?: string;
  "expiry-date"?: string;
  cvv?: string;
  "mission-statement"?: string;
  "date-of-established"?: string;
  lines: number;
};

const AccessTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => setIsModalOpen(false);
  const handleCancle = () => setIsModalOpen(false);

const navigate= useNavigate();


  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
  };

const handleBack = () => {
  navigate(-1);
};

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
      <div className="w-full md:w-[60%] mx-auto">
        <Form
          name="contact"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
          className="mt-10"
        >
          <h1 className="text-2xl font-bold my-2">Tax Details</h1>
          <div className="flex justify-between items-center gap-5 border-b pb-5">
            <Form.Item<FieldType>
              name="organisation-name"
              label={<p className=" text-md ">Registered Charity Name</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder="Registered Charity Name"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="organisation-address"
              label={<p className=" text-md ">ABN/ TFN</p>}
              style={{ width: "100%" }}
            >
              <InputNumber
                required
                style={{ padding: "3px", width: "100%" }}
                className=" text-md"
                placeholder="ABN/ TFN"
              />
            </Form.Item>
          </div>
          <h1 className="text-2xl font-bold my-2">Card Details</h1>
          <div className="flex justify-between items-center gap-5">
            <Form.Item<FieldType>
              name="organisation-name"
              label={<p className=" text-md ">Account Holder Name</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder="Account Holder Name"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="card-number"
              label={<p className=" text-md ">Card Number</p>}
              style={{ width: "100%" }}
            >
              <InputNumber
                required
                style={{ padding: "3px", width: "100%" }}
                className=" text-md"
                placeholder="Card Number"
              />
            </Form.Item>
          </div>
          <div className="flex justify-between items-center gap-5 border-b pb-5">
            <Form.Item<FieldType>
              name="expiry-date"
              label={<p className=" text-md ">Expiry Date</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder="04/27"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="cvv"
              label={<p className=" text-md ">CVV</p>}
              style={{ width: "100%" }}
            >
              <InputNumber
                required
                style={{ padding: "3px", width: "100%" }}
                className=" text-md"
                placeholder="CVV"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
              <button onClick={handleBack} className=" text-black py-2 px-4 rounded-xl flex justify-center items-center gap-2 text-lg">
                <FaArrowLeft />
                previous
              </button>
            </Form.Item>
            <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
              <Link to="/envlope">
                <button className="bg-btnPrimary text-white py-2 px-4 rounded-xl ">
                  Save and Continue
                </button>
              </Link>
            </Form.Item>
          </div>
        </Form>
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
