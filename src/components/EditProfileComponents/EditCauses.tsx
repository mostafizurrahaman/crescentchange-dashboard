/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form, Input, Select } from "antd";
import books from "../../assets/images/books.png";
import dream from "../../assets/images/Phone Device.png";
import cloth from "../../assets/images/Jacket.png";
import meal from "../../assets/images/Food.png";
import cat from "../../assets/images/Animal Cat.png";
import { FaPen, FaTrash } from "react-icons/fa";

type Cause = {
  id: string;
  name: string;
  description?: string;
};


// Sample data for causes
const causesData = [
  { id: 1, name: "Backpacks & Books", image: books, color: "bg-blue-200" },
  { id: 2, name: "Digital Dreams", image: dream, color: "bg-purple-100" },
  { id: 3, name: "Warmth in Winter", image: cloth, color: "bg-yellow-200" },
  { id: 4, name: "Every Child, Every Meal", image: meal, color: "bg-red-200" },
  { id: 5, name: "Meow Care Center", image: cat, color: "bg-pink-200" },
];

const EditCauses = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCause, setSelectedCause] = useState<Cause | null>(null);
  const [form] = Form.useForm();

  // Function to handle modal toggle
  const toggleModal = (cause:any) => {
    setSelectedCause(cause || null);
    form.resetFields();
    setShowModal(!showModal);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedCause) {
      alert("Cause Updated");
    } else {
      alert("New Cause Added");
    }
    setShowModal(false);
  };

  return (
    <div className="px-6">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-medium">Causes</h1>
        <button
          onClick={() => toggleModal(null)}
          className="px-6 py-2 bg-white rounded-3xl border"
        >
          Add a new Cause
        </button>
      </div>

      {/* Displaying causes */}
      <div className="my-5">
        {causesData.map((cause) => (
          <div
            key={cause.id}
            className="flex justify-between items-center gap-5 my-5 bg-white p-4 rounded-3xl border"
          >
            <div className="flex justify-center items-center gap-2">
              <div
                className={`${cause.color} h-10 w-10 rounded-full p-1 flex justify-center items-center`}
              >
                <img src={cause.image} alt={cause.name} />
              </div>
              <h1 className="text-lg font-medium">{cause.name}</h1>
            </div>
            <div className="relative group">
              <BsThreeDotsVertical className="cursor-pointer" />
              <div className="absolute hidden group-hover:block right-0 bg-white shadow-md rounded-md border">
                <button
                  onClick={() => toggleModal(cause)}
                  className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 flex justify-center items-center gap-2"
                >
                  <FaPen></FaPen>
                  Edit
                </button>
                <button
                  onClick={() => alert(`Deleting ${cause.name}`)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 flex justify-center items-center gap-2 "
                >
                  <FaTrash></FaTrash>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ant Design Modal for Add/Edit Cause */}
      <Modal
        title={selectedCause ? "Edit Cause" : "Add Cause"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: selectedCause ? selectedCause?.name : "",
            note: selectedCause
              ? "Our students need notebooks, pencils, and basic materials for the semester"
              : "",
          }}
        >
          <Form.Item
            label="Cause Subject"
            name="name"
            rules={[
              { required: true, message: "Please select a cause subject" },
            ]}
          >
            <Select defaultValue={selectedCause ? selectedCause?.name : ""}>
              <Select.Option value="Backpacks & Books">
                Backpacks & Books
              </Select.Option>
              <Select.Option value="Digital Dreams">
                Digital Dreams
              </Select.Option>
              <Select.Option value="Warmth in Winter">
                Warmth in Winter
              </Select.Option>
              <Select.Option value="Every Child, Every Meal">
                Every Child, Every Meal
              </Select.Option>
              <Select.Option value="Meow Care Center">
                Meow Care Center
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Donation Note"
            name="note"
            rules={[
              { required: true, message: "Please enter a donation note" },
            ]}
          >
            <Input.TextArea
              rows={4}
              defaultValue={
                selectedCause
                  ? "Our students need notebooks, pencils, and basic materials for the semester"
                  : ""
              }
            />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <Button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 rounded-full"
            >
              Discard Chnages
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="px-6 py-2 bg-black rounded-full"
            >
              Save Changes
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default EditCauses;
