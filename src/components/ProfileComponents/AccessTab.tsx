import { Button, ConfigProvider, Form, Input, message } from "antd";
import { useEditTaxDetailsMutation } from "../../redux/features/profileApi/profileApi";

type FieldType = {
  registeredCharityName: string;
  tfnOrAbnNumber: number;
};

const AccessTab = () => {
  const [editTaxDetails, { isLoading }] = useEditTaxDetailsMutation();
  const [form] = Form.useForm<FieldType>();
  const onFinish = async (values: FieldType) => {
    try {
      const data = {
        registeredCharityName: values.registeredCharityName,
        tfnOrAbnNumber: values.tfnOrAbnNumber,
      };

      console.log("Submitting:", data);

      const res = await editTaxDetails(data).unwrap();
      message.success(res?.message || "Updated Successfully");
    } catch (error: any) {
      message.error(error?.data?.message || "Update Failed");
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
            Button: {
              colorPrimary: "rgb(0,0,0)",
              colorPrimaryBorder: "rgb(0,0,0)",
              colorInfoActive: "rgb(0,0,0)",
              colorPrimaryHover: "rgb(0,0,0)",

            }
          },
        }}
      >
        <Form
          name="tax-details"
          layout="vertical"
          onFinish={onFinish}
          className="px-6"
        >
          <h1 className="text-2xl font-bold my-2">Tax Details</h1>

          <div className="flex justify-between items-center gap-5">
            <Form.Item<FieldType>
              name="registeredCharityName"
              label="Registered Charity Name"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Charity name is required" }]}
            >
              <Input placeholder="hfl_foundation" className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]" />
            </Form.Item>

            <Form.Item<FieldType>
              name="tfnOrAbnNumber"
              label="ABN / TFN"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "ABN/TFN is required" }]}
            >
              <Input placeholder="ABN/TFN" style={{ width: "100%" }} className="h-14 rounded-2xl bg-white border border-gray-200 text-[15px]" />
            </Form.Item>
          </div>

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

export default AccessTab;
