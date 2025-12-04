/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { useState } from "react";
import { useEditOrgDetailsMutation } from "../../redux/features/profileApi/profileApi";
import dayjs from "dayjs";

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
  "date-of-established"?: any;
  lines?: number;
  about?: string;
};

const ProfileEditForm = () => {
  const [editOrgDetails, { isLoading }] = useEditOrgDetailsMutation();
  const [form] = Form.useForm<FieldType>();
  const [active, setActive] = useState<"save" | "discard" | null>(null);

  const onFinish = async (values: FieldType) => {
    try {
      const payload = {
        name: values.name,
        aboutUs: values.about,
        country: values.country,
        website: values.website,
        phoneNumber: values.telephone,
        state: values.state,
        postalCode: values["post-code"],
        isProfileVisible: true,
        dateOfEstablishment: values["date-of-established"]
          ? dayjs(values["date-of-established"]).format("YYYY-MM-DD")
          : null,
        address: values["organisation-address"],
      };

      const response = await editOrgDetails(payload).unwrap();
      message.success("Profile updated successfully!");
      console.log("Updated data:", response);
      form.resetFields();
      setActive("save");
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update profile");
      console.error(error);
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    setActive("discard");
    message.info("Changes discarded");
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Form: { borderRadius: 0 },
            Input: { borderRadius: 5 },
          },
        }}
      >
        <Form
          form={form}
          name="contact"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
          className="px-6"
        >
          {/* Organisation Name and Date */}
          <div className="flex flex-col md:flex-row gap-2">
            <Form.Item<FieldType>
              name="name"
              label="Organisation Name"
              rules={[
                { required: true, message: "Please enter organisation name" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Organisation Name" />
            </Form.Item>

            <Form.Item<FieldType>
              name="date-of-established"
              label="Date Of Established"
              rules={[
                {
                  required: true,
                  message: "Please select date of establishment",
                },
              ]}
              style={{ flex: 1 }}
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Date Of Established"
              />
            </Form.Item>
          </div>

          {/* Organisation Address */}
          <Form.Item<FieldType>
            name="organisation-address"
            label="Organisation Address"
            rules={[
              { required: true, message: "Please enter organisation address" },
            ]}
          >
            <Input placeholder="Organisation Address" />
          </Form.Item>

          {/* Country, State, Post Code */}
          <div className="flex flex-col md:flex-row gap-5">
            <Form.Item<FieldType>
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please enter country" }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Country" />
            </Form.Item>

            <Form.Item<FieldType>
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter state" }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="State" />
            </Form.Item>

            <Form.Item<FieldType>
              name="post-code"
              label="Post code"
              rules={[{ required: true, message: "Please enter post code" }]}
           
            >
              <Input
                style={{ padding: "6px" }}
                className="text-md"
                placeholder="Post code"
              />
            </Form.Item>
          </div>

          {/* Contact info */}
          <div className="flex flex-col md:flex-row gap-5">
            <Form.Item<FieldType>
              name="telephone"
              label="Mobile"
              rules={[
                { required: true, message: "Please enter mobile number" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Mobile" />
            </Form.Item>

            <Form.Item<FieldType>
              name="email-address"
              label="Email"
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item<FieldType>
              name="website"
              label="Website"
              rules={[{ required: true, message: "Please enter website" }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Website" />
            </Form.Item>
          </div>

          {/* About */}
          <Form.Item<FieldType>
            name="about"
            label="About"
            rules={[
              { required: true, message: "Please enter about information" },
            ]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Write about your organisation..."
            />
          </Form.Item>

          {/* Buttons */}
          <div className="flex justify-start items-center gap-3 mt-4">
            <Button
              onClick={handleDiscard}
              type={active === "discard" ? "primary" : "default"}
            >
              Discard Changes
            </Button>

            <Button htmlType="submit" type="primary" loading={isLoading}>
              Save Changes
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ProfileEditForm;
