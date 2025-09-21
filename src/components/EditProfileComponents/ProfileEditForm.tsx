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
    <div className="">
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
          className="px-6"
        >
          <div className="flex justify-between items-start gap-2">
            <Form.Item<FieldType>
              name="organisation-name"
              style={{ width: "50%" }}
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
              name="date-of-established"
              label={<p className=" text-md ">Date Of Established</p>}
              style={{ width: "50%" }}
            >
              <DatePicker
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder="Date Of Established"
              />
            </Form.Item>
          </div>

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
              name="telephone"
              label={<p className=" text-md ">Mobile</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Mobile"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="email-address"
              label={<p className=" text-md ">Email </p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px" }}
                className=" text-md"
                placeholder="Email "
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="website"
              label={<p className=" text-md "> Website</p>}
              style={{ width: "100%" }}
            >
              <Input
                required
                style={{ padding: "6px", width: "100%" }}
                className=" text-md"
                placeholder=" Website"
              />
            </Form.Item>
          </div>

          <Form.Item<FieldType>
            name="about"
            label={<p className=" text-md ">About</p>}
            style={{}}
          >
            <Input.TextArea
              required
              rows={4}
              style={{ padding: "6px" }}
              className=" text-md"
              placeholder="Hope for Learning Foundation exists to unlock the power of education for underserved communities. We champion access, equity, and opportunity — because every child deserves a future filled with knowledge, growth, and hope."
            />
          </Form.Item>
    
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ProfileEditForm;
