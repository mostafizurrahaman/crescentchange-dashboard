import { Modal, Switch } from "antd";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useState } from "react";
import {
  SiWebflow,
  SiSlack,
  SiGooglesheets,
  SiHubspot,
} from "react-icons/si";

const Integration = () => {
  const [isAddBankModalOpen, setIsAddBankModalOpen] = useState(false);

  const handleOk = () => setIsAddBankModalOpen(false);
  return (
    <div>
      <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-3 justify-between items-center ">
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <SiWebflow className="h-6 w-6 text-[#146EF5]" />
            </div>
            <HiOutlineArrowNarrowRight className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="my-3 border-b pb-6">
            <h1 className="text-lg font-semibold">Webflow</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2 font-medium text-sm text-neutral-700">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center">
              <SiSlack className="h-6 w-6 text-[#4A154B]" />
            </div>
            <HiOutlineArrowNarrowRight className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="my-3 border-b pb-6">
            <h1 className="text-lg font-semibold">Slack</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2 font-medium text-sm text-neutral-700">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
              <SiGooglesheets className="h-6 w-6 text-[#0F9D58]" />
            </div>
            <HiOutlineArrowNarrowRight className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="my-3 border-b pb-6">
            <h1 className="text-lg font-semibold">Google Sheets</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2 font-medium text-sm text-neutral-700">
              Connect
            </button>
            <Switch></Switch>
          </div>
        </div>
        <div className="bg-white p-6 border rounded-3xl">
          <div className="flex justify-between items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center">
              <SiHubspot className="h-6 w-6 text-[#FF7A59]" />
            </div>
            <HiOutlineArrowNarrowRight className="h-5 w-5 text-neutral-400" />
          </div>
          <div className="my-3 border-b pb-6">
            <h1 className="text-lg font-semibold">Hubspot</h1>
            <p className="text-gray-400 mt-2 text-sm">
              Contributions from automatic spare change Support our cause
              effortlessly!
            </p>
          </div>
          <div className="flex justify-between items-center gap-3">
            <button className="flex justify-center items-center gap-2 font-medium text-sm text-neutral-700">
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
