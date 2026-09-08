import { SiHubspot, SiMailchimp } from "react-icons/si";
import { TbBrandMonday } from "react-icons/tb";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { Switch } from "antd";

const Intregation = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-10">Integration</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="border border-black/10 rounded-2xl p-5 bg-white shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-3">
            <SiHubspot className="w-7 h-7 text-[#FF7A59]" />
          </div>
          <h1 className="text-xl font-bold my-2">HubSpot</h1>
          <p className="my-4 text-gray-500 text-sm">Enable/disable email or SMS notifications to users.</p>
          <Switch></Switch>
        </div>
        <div className="border border-black/10 rounded-2xl p-5 bg-white shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-3">
            <TbBrandMonday className="w-7 h-7 text-[#FF3D57]" />
          </div>
          <h1 className="text-xl font-bold my-2">Monday.com</h1>
          <p className="my-4 text-gray-500 text-sm">Enable/disable email or SMS notifications to users.</p>
          <Switch></Switch>
        </div>
        <div className="border border-black/10 rounded-2xl p-5 bg-white shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center mb-3">
            <SiMailchimp className="w-7 h-7 text-[#FFE01B]" />
          </div>
          <h1 className="text-xl font-bold my-2">Mailchimp</h1>
          <p className="my-4 text-gray-500 text-sm">Enable/disable email or SMS notifications to users.</p>
          <Switch></Switch>
        </div>
        <div className="border border-black/10 rounded-2xl p-5 bg-white shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <PiMicrosoftOutlookLogoFill className="w-7 h-7 text-[#0078D4]" />
          </div>
          <h1 className="text-xl font-bold my-2">Outlook</h1>
          <p className="my-4 text-gray-500 text-sm">Enable/disable email or SMS notifications to users.</p>
          <Switch></Switch>
        </div>
      </div>
    </div>
  );
};

export default Intregation;
