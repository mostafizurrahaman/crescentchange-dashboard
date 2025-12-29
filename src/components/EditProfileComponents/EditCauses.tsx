/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Modal, Button, Form, Input, Select } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";

// import water from "../../assets/images/water.png";
// import food from "../../assets/images/🍽️.png";
// import education from "../../assets/images/📚 (1).png";
// import youth from "../../assets/images/🧑_🤝_🧑.png";
// import orphans from "../../assets/images/🧸.png";
// import Quran from "../../assets/images/📖.png";
// import health from "../../assets/images/🏥.png";
// import emergency from "../../assets/images/🚨.png";
// import shelter from "../../assets/images/🏠.png";
// import mosque from "../../assets/images/🕌.png";
// import zakat from "../../assets/images/💰.png";
// import sadaqah from "../../assets/images/🤲.png";
// import ramadan from "../../assets/images/🌙.png";
// import fitrah from "../../assets/images/🥖.png";
// import admin from "../../assets/images/🗂️.png";
// import refugee from "../../assets/images/🧳.png";
// import digital from "../../assets/images/💻.png";
// import mental from "../../assets/images/🧠.png";
// import qurban from "../../assets/images/🐑.png";
// import women from "../../assets/images/👩_👧.png";

import {
  useCreateCauseMutation,
  useGetAllCausesQuery,
  useUpdateCauseMutation,
  useDeleteCauseMutation,
} from "../../redux/features/profileApi/profileApi";

const EditCauses = ({ orgId }: any) => {
  const { data: allCausedData, refetch } = useGetAllCausesQuery(orgId);

  const [createCause] = useCreateCauseMutation();
  const [updateCause] = useUpdateCauseMutation();
  const [deleteCause] = useDeleteCauseMutation();

  const [form] = Form.useForm();
  const [selected, setSelected] = useState<any>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /** CATEGORY OPTIONS */
  const causeCategory = [
    { value: "water", label: "Water", icon: "💧" },
    { value: "education", label: "Education", icon: "📚" },
    { value: "food", label: "Food", icon: "🍽️" },
    { value: "youth", label: "Youth", icon: "🧑‍🤝‍🧑" },
    { value: "orphans", label: "Orphans", icon: "🧸" },
    { value: "quran_education", label: "Quran Education", icon: "📖" },
    { value: "health_medical", label: "Health Medical", icon: "🏥" },
    { value: "emergency_relief", label: "Emergency Relief", icon: "🚨" },
    { value: "shelter_housing", label: "Shelter Housing", icon: "🏠" },
    { value: "mosque_utilities", label: "Mosque Utilities", icon: "🕌" },
    { value: "zakat", label: "Zakat", icon: "💰" },
    { value: "sadaqah", label: "Sadaqah", icon: "🤲" },
    { value: "ramadan", label: "Ramadan", icon: "🌙" },
    { value: "qurban", label: "Qurban", icon: "🐑" },
    { value: "fitrah", label: "Fitrah", icon: "🥖" },
    { value: "admin_operational", label: "Admin Operational", icon: "🗂️" },
    { value: "refugees", label: "Refugees", icon: "🧳" },
    { value: "digital_dawah", label: "Digital Dawah", icon: "💻" },
    { value: "women_families", label: "Women Families", icon: "👩‍👧" },
    { value: "mental_health", label: "Mental Health", icon: "🧠" },
  ];

  /** CREATE */
  const handleAdd = async (v: any) => {
    await createCause({
      category: v.category,
      name: v.name,
      description: v.description,
      organizationId: orgId,
    });
    form.resetFields();
    setShowAddModal(false);
    refetch();
  };

  /** UPDATE */
  const handleUpdate = async (v: any) => {
    const data = {
      category: v.category,
      name: v.name,
      description: v.description,
    };
    await updateCause({ _id: selected._id, data });
    form.resetFields();
    setShowUpdateModal(false);
    refetch();
  };

  /** DELETE */
  const handleDelete = async () => {
    await deleteCause(selected._id);
    setShowDeleteModal(false);
    refetch();
  };

  return (
    <div className="px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Causes</h1>
        <button
          onClick={() => {
            form.resetFields();
            setShowAddModal(true);
          }}
          className="px-6 py-2 bg-white border rounded-3xl"
        >
          {" "}
          Add a new Cause{" "}
        </button>
      </div>

      <div className="mt-6">
        {allCausedData?.data?.map((d: any) => {
          const match = causeCategory.find((c) => c.value === d.category);
          return (
            <div
              key={d._id}
              className="p-4 bg-white border rounded-3xl flex justify-between mb-2"
            >
              <div className="flex gap-3">
                {/* <img src={match?.icon} className="h-12 w-12 rounded-full" /> */}
                <h1 className="text-4xl">{match?.icon}</h1>
                <div>
                  <h2 className="font-semibold">{d.name}</h2>
                  <p className="text-gray-500 text-sm">{d.description}</p>
                </div>
              </div>

              <div className="relative group">
                <BsThreeDotsVertical size={20} />
                <div className="absolute hidden group-hover:block right-0 bg-white border rounded shadow-md">
                  <button
                    className="px-4 py-2 flex gap-2 text-blue-600 hover:bg-blue-50"
                    onClick={() => {
                      setSelected(d);
                      form.setFieldsValue(d);
                      setShowUpdateModal(true);
                    }}
                  >
                    <FaPen /> Edit
                  </button>
                  <button
                    className="px-4 py-2 flex gap-2 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setSelected(d);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        title="Add Cause"
        open={showAddModal}
        onCancel={() => setShowAddModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Category">
              {causeCategory.map((c) => (
                <Select.Option key={c.value} value={c.value}>
                  <div className="flex items-center gap-2">
                    {/* <img src={c.icon} className="h-5" /> {c.label} */}
                    <p>{c.icon}</p>
                    {c.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Cause Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter cause title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Button htmlType="submit" type="primary" className="w-full bg-black">
            Add Cause
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Update Cause"
        open={showUpdateModal}
        onCancel={() => setShowUpdateModal(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {causeCategory.map((c) => (
                <Select.Option key={c.value} value={c.value}>
                  <div className="flex items-center gap-2">
                    <img src={c.icon} className="h-5" /> {c.label}
                  </div>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="name"
            label="Cause Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Button htmlType="submit" type="primary" className="w-full bg-black">
            Update Cause
          </Button>
        </Form>
      </Modal>

      <Modal
        open={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        footer={null}
        title="Delete Cause?"
      >
        <p className="text-center text-gray-600 mb-4">{selected?.name}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button danger onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditCauses;
