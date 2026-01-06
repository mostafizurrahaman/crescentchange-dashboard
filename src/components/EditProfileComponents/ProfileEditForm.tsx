/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Button,
  message,
  Switch,
} from "antd";
import {
  FiCalendar,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import { useEditOrgDetailsMutation } from "../../redux/features/profileApi/profileApi";
import dayjs from "dayjs";
import { useEffect } from "react";

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

const ProfileEditForm = ({data}: {data: any}) => {
  const [editOrgDetails, { isLoading }] = useEditOrgDetailsMutation();
  const [form] = Form.useForm<FieldType>();
  console.log(data);  

  // Prefill form with organization data
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data.name || "",
        "organisation-address": data.address || "",
        country: data.country || "",
        state: data.state || "",
        "post-code": data.postalCode || "",
        website: data.website || "",
        telephone: data.phoneNumber || "",
        "email-address": data.auth?.email || "",
        about: data.aboutUs || "",
        "date-of-established": data.dateOfEstablishment ? dayjs(data.dateOfEstablishment) : null,
      });
    }
  }, [data, form]);  

  const handleProfileVisibilityChange = (checked: boolean) => {
    // Handle profile visibility change
    console.log("Profile visibility changed to:", checked);
  };  
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
    } catch (error: any) {
      message.error(error?.data?.message || "Failed to update profile");
      console.error(error);
    }
  };

  const handleDiscard = () => {
    form.resetFields();
    message.info("Changes discarded");
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Form: { borderRadius: 0 },
            Input: { borderRadius: 12 },
            Switch: {
              colorPrimary: "rgb(0,0,0)",
              colorPrimaryBorder: "rgb(0,0,0)",
              colorPrimaryHover: "rgb(0,0,0)",
            },
            Button:{
              colorPrimary: "rgb(0,0,0)",
              colorPrimaryBorder: "rgb(0,0,0)",
              colorInfoActive: "rgb(0,0,0)",
              colorPrimaryHover: "rgb(0,0,0)",
              
            }
          },
        }}
      >
        <div className="flex justify-end pr-10">
          <h1 className="text-end">
            Profile visiblity:{" "}
            <span className="pl-2">
              {" "}
              <Switch 
                checked={data?.isProfileVisible || false}
                onChange={handleProfileVisibilityChange}
              />
            </span>
          </h1>
        </div>

        <Form
          form={form}
          name="contact"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          layout="vertical"
          className="px-6 space-y-4"
        >
          {/* Organisation Name and Date */}
          <div className="flex flex-col md:flex-row gap-4">
            <Form.Item<FieldType>
              name="name"
              label="Organisation Name"
              rules={[
                { required: true, message: "Please enter organisation name" },
              ]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="HFL Foundation"
                prefix={<FiUser className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="date-of-established"
              label="Date Established"
              rules={[
                {
                  required: true,
                  message: "Please select date of establishment",
                },
              ]}
              style={{ flex: 1 }}
            >
              <DatePicker
                style={{
                  width: "100%",
                  height: 56,
                  borderRadius: 14,
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                }}
                placeholder="01 July 2018"
                suffixIcon={<FiCalendar className="text-black/60" />}
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
            <Input
              placeholder="57 Donut Road, Crescent Lane, Sydney, Australia"
              prefix={<FiMapPin className="mr-2 text-black/60" />}
              className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
            />
          </Form.Item>

          {/* Country, State, Post Code */}
          <div className="flex flex-col md:flex-row gap-5">
            <Form.Item<FieldType>
              name="country"
              label="Country"
              rules={[{ required: true, message: "Please enter country" }]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="Australia"
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="state"
              label="State"
              rules={[{ required: true, message: "Please enter state" }]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="New South Wales"
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="post-code"
              label="Post code"
              rules={[{ required: true, message: "Please enter post code" }]}
            >
              <Input
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
                placeholder="5000"
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
              <Input
                placeholder="+61 470 292 023"
                prefix={<FiPhone className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
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
              <Input
                placeholder="contact@hfl-foundation.org"
                prefix={<FiMail className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="website"
              label="Website"
              rules={[{ required: true, message: "Please enter website" }]}
              style={{ flex: 1 }}
            >
              <Input
                placeholder="www.hfl-foundation.org"
                prefix={<FiGlobe className="mr-2 text-black/60" />}
                className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]"
              />
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
              placeholder="Hope for Learning Foundation exists to unlock the power of education for underserved communities..."
              className="rounded-2xl bg-white border border-gray-200 text-[15px]"
            />
          </Form.Item>

          {/* Buttons */}
          <div className="flex justify-start items-center gap-3 mt-4">
            <Button
              onClick={handleDiscard}
              type="default"
              className="py-6 px-5 rounded-full bg-white border border-gray-300 text-[15px] font-medium "
            >
              Discard Changes
            </Button>

            <Button
              htmlType="submit"
              type="default"
              loading={isLoading}
              className="py-6 px-5 rounded-full bg-neutral-900  text-white border border-gray-300 text-[15px] font-semibold "
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default ProfileEditForm;
