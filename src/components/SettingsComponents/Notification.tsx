import { Select, Switch } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";

const Notification = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold my-10">Notification</h1>
      <div className="w-full md:w-[70%]">
        <div className="flex justify-between items-center gap-5 mb-20">
          <div className="flex justify-start items-center gap-3">
            <IoMdNotificationsOutline className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold">Admin Alert</h1>
              <p className="text-gray-500">
                When new donations occur, reward thresholds met, etc.
              </p>
            </div>
          </div>
          <Switch></Switch>
        </div>
        <div className="flex justify-between items-center gap-5 mb-20">
          <div className="flex justify-start items-center gap-3">
            <IoMdNotificationsOutline className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold">Communication Settings</h1>
              <p className="text-gray-500">
                Enable/disable email or SMS notifications to users.
              </p>
            </div>
          </div>
          <Switch></Switch>
        </div>
        <div className="flex justify-between items-center gap-5 mb-20">
          <div className="flex justify-start items-center gap-3">
            <IoMdNotificationsOutline className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold">Platform Announcements</h1>
              <p className="text-gray-500">
                Receive updates about Crescent Change features, maintenance, or
                terms of use
              </p>
            </div>
          </div>
          <Switch></Switch>
        </div>
        <div className="flex justify-between items-center gap-5 mb-20">
          <div className="flex justify-start items-center gap-3">
            <IoMdNotificationsOutline className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold">Monthly Donation Summary</h1>
              <p className="text-gray-500">
                Email summary of total donations received.
              </p>
            </div>
          </div>
          <Select
            defaultValue="Monthly"
            placeholder="Select"
            className="w-[150px]"
          >
            <Select.Option value="Monthly">Monthly</Select.Option>
            <Select.Option value="Yearly">Yearly</Select.Option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Notification;
