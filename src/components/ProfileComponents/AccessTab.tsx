import { Form, Input, InputNumber } from "antd";
import { useEditTaxDetailsMutation } from "../../redux/features/profileApi/profileApi";

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

const AccessTab = () => {
  const [editTaxDetails] = useEditTaxDetailsMutation();
  const onFinish = (values: FieldType) => {
   const data={
    
   }
  };

  return (
    <div className="">
      <Form
        name="contact"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        layout="vertical"
        className="px-6"
      >
        <h1 className="text-2xl font-bold my-2">Tax Details</h1>
        <div className="flex justify-between items-center gap-5 ">
          <Form.Item<FieldType>
            name="organisation-name"
            label={<p className=" text-md ">Registered Charity Name</p>}
            style={{ width: "100%" }}
          >
            <Input
              required
              style={{ padding: "6px", width: "100%" }}
              className=" text-md"
              placeholder="hfl_foundation"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="organisation-address"
            label={<p className=" text-md ">ABN/ TFN</p>}
            style={{ width: "100%" }}
          >
            <InputNumber
              required
              style={{ padding: "3px", width: "100%" }}
              className=" text-md"
              placeholder="ABN/ TFN"
            />
          </Form.Item>
        </div>
        <h1 className="text-2xl font-bold my-2">Card Details</h1>
        <div className="flex justify-between items-center gap-5">
          <Form.Item<FieldType>
            name="organisation-name"
            label={<p className=" text-md ">Account Holder Name</p>}
            style={{ width: "100%" }}
          >
            <Input
              required
              style={{ padding: "6px", width: "100%" }}
              className=" text-md"
              placeholder="Account Holder Name"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="card-number"
            label={<p className=" text-md ">Card Number</p>}
            style={{ width: "100%" }}
          >
            <InputNumber
              required
              style={{ padding: "3px", width: "100%" }}
              className=" text-md"
              placeholder="Card Number"
            />
          </Form.Item>
        </div>
        <div className="flex justify-between items-center gap-5 ">
          <Form.Item<FieldType>
            name="expiry-date"
            label={<p className=" text-md ">Expiry Date</p>}
            style={{ width: "100%" }}
          >
            <Input
              required
              style={{ padding: "6px", width: "100%" }}
              className=" text-md"
              placeholder="04/27"
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="cvv"
            label={<p className=" text-md ">CVV</p>}
            style={{ width: "100%" }}
          >
            <InputNumber
              required
              style={{ padding: "3px", width: "100%" }}
              className=" text-md"
              placeholder="CVV"
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AccessTab;
