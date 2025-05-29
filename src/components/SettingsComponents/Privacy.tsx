import { Form, Input, Switch } from "antd";

const Privacy = () => {
  return (
    <div className="w-full md:w-[70%]">
      <h1 className="text-3xl font-bold my-10">Privacy & Security</h1>
      <div className="flex justify-between items-center gap-5 mb-20">
        <div className="flex justify-start items-center gap-3">
          <div>
            <h1 className="text-xl font-bold">Two-Factor Authentication</h1>
            <p className="text-gray-500">
              Enable/disable email or SMS notifications to users.
            </p>
          </div>
        </div>
        <Switch></Switch>
      </div>
      <div className="flex justify-between items-center gap-5 mb-20">
        <div className="flex justify-start items-center gap-3">
          <div>
            <h1 className="text-xl font-bold">Change Admin Password</h1>
            <p className="text-gray-500">
              Password must be at least 8 characters, include a number and a
              symbol.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-5">
        <Form name="chnage-password" layout="vertical" style={{ width: "70%" }}>
          <Form.Item name="new-password" label={<p> Create Password</p>}>
            <Input.Password placeholder="Create Password"></Input.Password>
          </Form.Item>
          <Form.Item name="confirm-password" label={<p> Confirm Password</p>}>
            <Input.Password placeholder="Create Password"></Input.Password>
          </Form.Item>
          <Form.Item name="save">
            <button className="px-4 py-2 rounded-lg bg-btnPrimary text-white">
              Save
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-between items-center gap-5 mb-20">
        <div className="flex justify-start items-center gap-3">
          <div>
            <h1 className="text-xl font-bold">Login Activity</h1>
            <p className="text-gray-500">
              List of active sessions with location, device type, and time.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5 mb-10">
        <div>
          <h1 className=" mb-2">Sydney, Australia</h1>
          <p className="text-gray-500 border-l pl-2">Chrome (Mac)</p>
        </div>
        <p className="text-gray-500">20 min agp</p>
      </div>
      <div className="flex justify-between items-center gap-5 mb-10">
        <div>
          <h1 className=" mb-2">Sydney, Australia</h1>
          <p className="text-gray-500 border-l pl-2">Chrome (Mac)</p>
        </div>
        <p className="text-gray-500">20 min agp</p>
      </div>
    </div>
  );
};

export default Privacy;
