/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal, Pagination, Select, Tooltip } from "antd";
import roundup from "../../assets/images/roundup.png";
import recurring from "../../assets/images/recurring.png";
import oneTime from "../../assets/images/one-time.png";
import { Table } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useGetAllDonorsQuery } from "../../redux/features/donorApi/donorsApi";
import { useGetAllProfileQuery } from "../../redux/features/profileApi/profileApi";
import { FaEye } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Donors");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const { Search } = Input;
  const { Option } = Select;
  const onSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset page
  };
  const { data: profileData } = useGetAllProfileQuery(null);
  const organizationId = profileData?.data?._id;
  const { data: donorData, refetch } = useGetAllDonorsQuery(
    {
      page: currentPage,
      limit: pageSize,
      status,
      donationType: "all",
      searchTerm,
      sort,
      organizationId,
    },
    {
      skip: !organizationId,
    }
  );
  const data = donorData?.data;
  const handleViewClick = (record: any) => {
    setSelectedDonation(record);
    setIsOpen(true);
  };
  // Handle status change
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1); // Reset page
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "donor",
      key: "name",
      render: (donor: any) => donor?.name || "-",
    },
    {
      title: "Email Address",
      dataIndex: "donor",
      key: "email",
      render: (donor: any) => donor?.auth?.email || "-",
    },
    {
      title: "Date & Time",
      dataIndex: "donationDate",
      key: "dateTime",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Donation Type",
      dataIndex: "donationType",
      key: "donationType",
      render: (donationType: string) => {
        return (
          <div className="flex justify-center items-center gap-2">
            {donationType === "round-up" && (
              <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                <img src={roundup} alt="Round Up" className="w-4 h-4" />
                <span>Round Up</span>
              </div>
            )}
            {donationType === "recurring" && (
              <div className="flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1 rounded-full">
                <img src={recurring} alt="Round Up" className="w-4 h-4" />
                <span>Recurring</span>
              </div>
            )}
            {donationType === "one-time" && (
              <div className="flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
                <img src={oneTime} alt="Round Up" className="w-4 h-4" />
                <span>One Time</span>
              </div>
            )}
          </div>
        );
      },
    },

    {
      title: "Donation Message",
      dataIndex: "specialMessage",
      key: "specialMessage",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: any) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // render: (amount: any) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => handleViewClick(record)}>
            <FaEye className="text-blue-500"></FaEye>
          </button>
          <button>
            <IoIosRefresh className="text-green-500" />
          </button>
        </div>
      ),
    },
  ];
  const exportToExcel = () => {
    const tableData = donorData?.data || [];

    // Prepare the data for export
    const formattedData = tableData.map((row: any) => ({
      Name: row.donor?.name || "-",
      "Email Address": row.donor?.auth?.email || "-",
      "Date & Time": new Date(row.donationDate).toLocaleString(),
      "Donation Type": row.donationType,
      "Donation Message": row.specialMessage || "-",
      Amount: `$${row.amount.toFixed(2)}`,
      Status: row.status,
    }));

    // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");

    // Export the file as Excel (.xlsx)
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], {
      bookType: "xlsx",
      type: "application/octet-stream",
    });
    saveAs(file, "donations.xlsx");
  };
  return (
    <div>
      <div className="flex justify-between items-center gap-5">
        <div>
          <h1 className="text-3xl font-bold mb-4">Reports</h1>
          <p className="text-lg text-gray-600 mb-4">
            Generate, track, and export your donation insights.
          </p>
        </div>
        <div className="flex justify-start items-center gap-5 mb-5">
          {["All Donors", "Export"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-3xl ${
                activeTab === tab ? "bg-black text-white" : "bg-white border"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center  items-center gap-3">
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donations</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-400">+8.2% </span>{" "}
              <span className="text-gray-400 text-sm">vs last month</span>{" "}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Total Donors</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 4000{" "}
              <span className="text-sm text-green-500">5.4%</span>{" "}
            </h1>
          </div>
          <div className="bg-white p-6 rounded-3xl border">
            <p className="text-lg font-medium">Avg. Donation</p>
            <h1 className="text-2xl font-medium mt-10">
              {" "}
              <span className="text-gray-400">$</span> 400{" "}
              <span className="text-sm text-gray-400">per user</span>{" "}
            </h1>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border my-6">
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-xl font-medium">Donation History</h1>

            <div className="flex items-center gap-3">
              <div className="mt-4 md:mt-0">
                <Search
                  placeholder="input search text"
                  onSearch={onSearch}
                  enterButton
                  allowClear
                />
              </div>

              <div className="mt-4 md:mt-0">
                <Select
                  value={status}
                  onChange={handleStatusChange}
                  placeholder={"Filter by status"}
                  style={{ width: 150 }}
                >
                  <Option value="processing">Processing</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="failed">Failed</Option>
                  <Option value="refunded">Refunded</Option>
                  <Option value="canceled">Canceled</Option>
                </Select>
              </div>

              {/* <div className="mt-4 md:mt-0">
                <button className="px-3 py-2 border rounded-md text-sm text-gray-700">
                  Monthly
                </button>
              </div> */}
              {/* export korte hobe */}
              <Tooltip title="Export to Excel" placement="bottom">
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  onClick={exportToExcel}
                  className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
                >
                  <span className="text-lg font-medium">Export</span>
                </Button>
              </Tooltip>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            style={{ marginTop: 20 }}
          />

          <div className="flex justify-end items-center my-10">
            <Pagination />
          </div>

          <Modal
            title="Donor Details"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
          >
            <div>
              <h3 className="border-b mb-2 ">Donor Info:</h3>
              <p>
                <strong>Name:</strong> {selectedDonation?.donor?.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedDonation?.donor?.auth?.email}
              </p>

              <h3 className="border-b mb-2 ">Donation Info:</h3>
              <p>
                <strong>Type:</strong> {selectedDonation?.donationType}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedDonation?.amount.toFixed(2)}
              </p>
              <p>
                <strong>Message:</strong>{" "}
                {selectedDonation?.specialMessage || "-"}
              </p>

              <h3 className="border-b mb-2 ">Cause:</h3>
              <p>
                <strong>{selectedDonation?.cause?.name || "No Cause"}</strong>
              </p>

              <h3 className="border-b mb-2 ">Receipt:</h3>
              {selectedDonation?.receiptId && (
                <div>
                  <p className="mb-5">
                    <strong>Receipt Number:</strong>{" "}
                    {selectedDonation?.receiptId.receiptNumber}
                  </p>
                  <a
                    href={selectedDonation?.receiptId.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>Download Receipt</strong>
                  </a>
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Reports;
