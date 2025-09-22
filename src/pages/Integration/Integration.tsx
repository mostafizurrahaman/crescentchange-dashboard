import img1 from "../../assets/images/image 415.png";
import img2 from "../../assets/images/slack.png";
import img3 from "../../assets/images/image 417.png";
import img4 from "../../assets/images/Logo (1).png";
import { Switch } from "antd";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const Integration = () => {
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Integrations</h1>
          <p className="text-lg text-gray-600 mb-4">
            Each name represents a journey of support. Watch them glow.
          </p>
        </div>
      </div>

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
    </div>
  );
};

export default Integration;
