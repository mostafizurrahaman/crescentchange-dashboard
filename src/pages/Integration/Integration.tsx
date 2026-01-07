/* eslint-disable @typescript-eslint/no-unused-vars */
import img1 from "../../assets/images/image 415.png";
import img2 from "../../assets/images/slack.png";
import img3 from "../../assets/images/image 417.png";
import img4 from "../../assets/images/Logo (1).png";

import { Modal, Switch } from "antd";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";
// import {
//   useGetStripeAccountStatusQuery,
// } from "../../redux/features/integrationApi/integrationApi";

const Integration = () => {
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);
  // const { data: bankData } = useGetStripeAccountStatusQuery(null);
  // console.log(bankData?.data);


  const handleOk = () => setIsAddBankModalOpen(false);
  return (
    <div>
      {/* <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Integrations</h1>
          <p className="text-lg text-gray-600 mb-4">
            Each name represents a journey of support. Watch them glow.
          </p>
        </div>
        <button
          onClick={handleAddBankModal}
          className=" bg-slate-200 p-3 rounded-md"
        >
          Add Bank
        </button>
      </div> */}
      {/* <div className="w-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-3xl border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img
              src={img5}
              alt="Stripe Logo"
              className="h-8 w-8 object-contain"
            />
            <h2 className="text-lg font-semibold">Stripe Connect</h2>
          </div>
    
        </div>

   
        <div className="border-y py-5">
          <div className="flex flex-col gap-3">
        
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border">
              <span className="text-gray-600 font-medium">Has Account</span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold 
        ${
          bankData?.data?.hasAccount
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
              >
                {bankData?.data?.hasAccount ? "True" : "False"}
              </span>
            </div>

         
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border">
              <span className="text-gray-600 font-medium">isActive</span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold
        ${
          bankData?.data?.isActive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
              >
                {bankData?.data?.isActive ? "True" : "False"}
              </span>
            </div>

       
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border">
              <span className="text-gray-600 font-medium">
                detailsSubmitted
              </span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold 
        ${
          bankData?.data?.detailsSubmitted
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
              >
                {bankData?.data?.detailsSubmitted ? "True" : "False"}
              </span>
            </div>

          
            <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border">
              <span className="text-gray-600 font-medium">payoutsEnabled</span>
              <span
                className={`px-3 py-1 rounded-lg text-sm font-semibold 
        ${
          bankData?.data?.payoutsEnabled
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
              >
                {bankData?.data?.payoutsEnabled ? "True" : "False"}
              </span>
            </div>
          </div>
        </div>

      
      </div> */}

      {/* Add Bank Section End */}
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3 justify-between items-center">
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <img src={img1} alt="" />
            <HiOutlineArrowNarrowRight className="h-5 w-5 " />
          </div>
          <div className="my-3 border-b pb-6">
            <h1>Webflow</h1>
            <p className="text-gray-400 mt-2">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <img src={img2} alt="" />
            <HiOutlineArrowNarrowRight className="h-5 w-5 " />
          </div>
          <div className="my-3 border-b pb-6">
            <h1>Slack</h1>
            <p className="text-gray-400 mt-2">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <img src={img3} alt="" />
            <HiOutlineArrowNarrowRight className="h-5 w-5 " />
          </div>
          <div className="my-3 border-b pb-6">
            <h1>Google Sheets</h1>
            <p className="text-gray-400 mt-2">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <img src={img4} alt="" />
            <HiOutlineArrowNarrowRight className="h-5 w-5 " />
          </div>
          <div className="my-3 border-b pb-6">
            <h1>Hubspot</h1>
            <p className="text-gray-400 mt-2">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
      </div>

      {/* Add Bank Modal */}
      <Modal title="Add Bank" open={isAddBankModalOpen} onOk={handleOk}>
        <div></div>
      </Modal>
    </div>
  );
};

export default Integration;
