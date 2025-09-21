import { ConfigProvider, DatePicker, Form, Input, InputNumber } from "antd";
import { Link } from "react-router-dom";
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
const ProfileEditForm = () => {
  const onFinish = () => {};
  return (
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
            name="organisation-name"
            label={<p className=" text-md ">Organisation Name</p>}
          >
            <Input
              required
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder="Organisation Name"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="organisation-address"
            label={<p className=" text-md ">Organisation address</p>}
            style={{}}
          >
            <Input
              required
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder="Organisation address"
            />
          </Form.Item>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <Form.Item<FieldType>
              name="country"
              label={<p className=" text-md ">Country</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Country"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="state"
              label={<p className=" text-md ">State </p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="State"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="post-code"
              label={<p className=" text-md ">Post code</p>}
              style={{ width: "100%" }}
            >
              <InputNumber
                required
                style={{ padding: "3px", width: "100%" }}
                className=" text-md"
                placeholder="Post code"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <Form.Item<FieldType>
              name="date-of-established"
              label={<p className=" text-md ">Date Of Established</p>}
              style={{ width: "100%" }}
            >
              <DatePicker
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder="Date Of Established"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="telephone"
              label={<p className=" text-md ">Contact No</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Contact No"
              />
            </Form.Item>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <Form.Item<FieldType>
              name="website"
              label={<p className=" text-md ">Organization Website</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder="Organization Website"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="email-address"
              label={<p className=" text-md ">Email address</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Email address"
              />
            </Form.Item>
          </div>

          <Form.Item<FieldType>
            name="mission-statement"
            label={<p className=" text-md ">Mission & Operation</p>}
            style={{}}
          >
            <Input.TextArea
              required
              rows={4}
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder="Type your message..."
            />
          </Form.Item>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5">
            <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
              <button className="bg-neutral-300 text-black py-2 px-4 rounded-xl ">
                See preview
              </button>
            </Form.Item>
            <Form.Item<FieldType> className=" mt-5 flex md:justify-end md:items-center">
              <Link to="/access">
                <button className="bg-btnPrimary text-white py-2 px-4 rounded-xl ">
                  Save and Continue
                </button>
              </Link>
            </Form.Item>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ProfileEditForm;
