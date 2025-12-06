import { Button, Form, Input, InputNumber, message } from "antd";
import { useEditTaxDetailsMutation } from "../../redux/features/profileApi/profileApi";

type FieldType = {
  registeredCharityName: string;
  tfnOrAbnNumber: number;
};

const AccessTab = () => {
  const [editTaxDetails] = useEditTaxDetailsMutation();

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

  return (
    <div>
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
            <Input placeholder="hfl_foundation" style={{ padding: 6 }} />
          </Form.Item>

          <Form.Item<FieldType>
            name="tfnOrAbnNumber"
            label="ABN / TFN"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "ABN/TFN is required" }]}
          >
            <Input placeholder="ABN/TFN" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Button type="primary" htmlType="submit" className="mt-3">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AccessTab;
