/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { BsThreeDotsVertical, BsChevronDown } from "react-icons/bs";
import { Modal, Button, Form, Input, Select, message } from "antd";
import { FaPen, FaTrash } from "react-icons/fa";
import {
  useCreateCauseMutation,
  useGetAllCausesQuery,
  useUpdateCauseMutation,
  useDeleteCauseMutation,
} from "../../redux/features/profileApi/profileApi";

const EditCauses = ({ orgId }: any) => {
  const { data: allCausedData, refetch, isLoading } = useGetAllCausesQuery(orgId);
  const [createCause] = useCreateCauseMutation();
  const [updateCause] = useUpdateCauseMutation();
  const [deleteCause] = useDeleteCauseMutation();

  const [form] = Form.useForm();
  const [selected, setSelected] = useState<any>(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [causeName, setCauseName] = useState("");

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

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    form.setFieldsValue({ category: category.value });
  };

  const handleDiscard = () => {
    form.resetFields();
    setSelectedCategory(null);
    setCauseName("");
    setShowAddModal(false);
    message.info("Changes discarded");
  };

  const resetModalState = () => {
    setSelectedCategory(null);
    setShowCategoryDropdown(false);
    setCauseName("");
  };

  const initializeModal = () => {
    const educationCategory = causeCategory.find(c => c.value === "education");
    setSelectedCategory(educationCategory);
    // form.setFieldsValue({
    //   category: educationCategory?.value,
    //   description: "Our students need notebooks, pencils, and basic materials for the semester"
    // });
    setCauseName("");
    setShowCategoryDropdown(false);
  };

  /** CREATE */
  const handleAdd = async (v: any) => {
    const data = {
      category: v.category,
      name: v.name,
      description: v.description,
      organizationId: orgId,
    };
    console.log("Creating cause with data:", data);

    try {
      await createCause(data);
      form.resetFields();
      resetModalState();
      setShowAddModal(false);
      refetch();
    } catch (error) {
      console.error( error);
    }
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
        <h1 className="text-[20px] font-semibold ">Causes</h1>
        <button
          onClick={() => {
            form.resetFields();
            initializeModal();
            setShowAddModal(true);
          }}
          className="px-4 py-1 bg-white border rounded-full text-[14px]"
        >

          Add a new Cause{" "}
        </button>
      </div>

      <div className="mt-6">
        {allCausedData?.data?.map((d: any) => {
          const match = causeCategory.find((c) => c.value === d.category);
          return (
            <div
              key={d._id}
              className="px-4 py-3 bg-white border rounded-xl flex justify-between mb-2"
            >
              <div className="flex justify-center items-center ">
                <h1 className="text-4xl">{match?.icon}</h1>
                <div>
                  <h2 className="text-[14px]">{d.name}</h2>
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
        onCancel={() => {
          setShowAddModal(false);
          resetModalState();
        }}
        footer={null}
        centered
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAdd}>
          {/* Cause Subject Section - Combined Category and Name Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cause Subject
            </label>
            <div className="relative">
              <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                {/* Icon and Category Dropdown */}
                <div
                  className="flex items-center cursor-pointer bg-gray-100 px-2 py-1 rounded"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                >
                  <span className="text-2xl mr-2">
                    {selectedCategory ? selectedCategory.icon : "📚"}
                  </span>
                  <BsChevronDown className={`text-gray-500 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </div>

                {/* Divider */}
                <div className="h-6 w-px  mx-2"></div>

                {/* Name Input */}
                <Form.Item
                  name="category"
                  rules={[{ required: true, message: "Please select a category" }]}
                  hidden
                >
                  <Input />
                </Form.Item>

                <div className="flex-1">
                  <Form.Item
                    name="name"
                    label=""
                    rules={[{ required: true, message: "Please enter cause name" }]}
                    className="mb-0"
                  >
                    <Input
                      placeholder="Enter cause name"
                      className="border-none shadow-none p-0 focus:shadow-none"
                      value={causeName}
                      onChange={(e) => setCauseName(e.target.value)}
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Custom Category Dropdown */}
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {causeCategory.map((category) => (
                    <div
                      key={category.value}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => handleCategorySelect(category)}
                    >
                      <span className="text-xl mr-3">{category.icon}</span>
                      <span className="text-gray-700">{category.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Donation Note Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Donation Note
            </label>
            <Form.Item
              name="description"
              label=""
              rules={[{ required: true, message: "Please enter donation note" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Our students need notebooks, pencils, and basic materials for the semester"
                className="border border-gray-300 rounded-lg p-3"
              />
            </Form.Item>
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 mt-6">
            <Button
              onClick={handleDiscard}
              className="py-2 px-6 rounded-full bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 font-medium"
            >
              Discard Changes
            </Button>

            <Button
              htmlType="submit"
              loading={isLoading}
              className="py-2 px-6 rounded-full bg-black text-white border border-black hover:bg-gray-800 font-medium"
            >
              Save Changes
            </Button>
          </div>
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
