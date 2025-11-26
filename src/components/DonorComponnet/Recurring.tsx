/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Select, Tooltip } from "antd";

import { Table } from "antd";
import people from "../../assets/images/People Community.png";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoIosRefresh } from "react-icons/io";
import roundup from "../../assets/images/roundup.png";
import recurring from "../../assets/images/recurring.png";
import oneTime from "../../assets/images/one-time.png";
import { DownloadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetAllProfileQuery } from "../../redux/features/profileApi/profileApi";
import { useGetAllDonorsQuery } from "../../redux/features/donorApi/donorsApi";
import { useGetDonationStatsQuery } from "../../redux/features/dashboardApi/dashboardApi";
interface ITabProps {
  tab: string;
}
const Recurring = ({ tab }: ITabProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("");
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const { data: profileData } = useGetAllProfileQuery(null);
  const { data: donorData, refetch } = useGetAllDonorsQuery({
    page: currentPage,
    limit: pageSize,
    status,
    donationType: tab,
    searchTerm,
    sort,
    organizationId: profileData?.data?._id,
  });

  const { data: statsData } = useGetDonationStatsQuery({
    filter: "this_month",
    donationType: tab,
  });
  console.log("data", tab, statsData?.data);
  const handleViewClick = (record: any) => {
    setSelectedDonation(record);
    setIsOpen(true);
  };
  const { Search } = Input;
  const { Option } = Select;
  // Handle search
  const onSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset page
  };

  // Handle status change
  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1); // Reset page
  };

  // Whenever searchTerm or status changes, refetch data
  useEffect(() => {
    refetch();
  }, [searchTerm, status, currentPage]);

  const data = donorData?.data;

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
    <div className="">
      <div className="bg-white border rounded-3xl p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className=" text-xl font-medium">Total Donation</p>
            <p className="text-neutral-400">
              {" "}
              {statsData?.data?.totalDonatedAmount?.isIncrease === true
                ? "+"
                : "-"}
              ${statsData?.data?.totalDonatedAmount?.percentageChange} % from
              last month
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-between items-center gap-2">
          <div className="flex justify-start items-end gap-1 mt-10 mb-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              {" "}
              <span className="text-gray-400">$</span>{" "}
              {statsData?.data?.totalDonatedAmount?.value}
            </h1>
            <p className="text-green-500">
              {statsData?.data?.totalDonatedAmount?.percentageChange} %{" "}
              <span className="text-gray-400"> vs last month</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 ">
            <div className=" bg-gradient-to-tr from-[#e4efeb] to bg-[f8f6f8] p-6 rounded-3xl">
              <div className="flex justify-between items-center gap-2">
                <p className="text-lg font-medium">Avg Donation</p>
                <img src={roundup} alt="" />
              </div>
              <h1 className="text-2xl font-medium mt-10">
                <span className="text-gray-400">$</span>{" "}
                {statsData?.data?.averageDonationPerUser?.value}{" "}
                <span className="text-sm text-gray-400">per user</span>{" "}
              </h1>
            </div>
            <div className=" bg-gradient-to-tr from-[#e4efeb] to bg-[f8f6f8] p-6 rounded-3xl">
              <div className="flex justify-between items-center gap-2">
                <p className="text-lg font-medium">Total Donors</p>
                <img src={people} alt="" />
              </div>

              <h1 className="text-2xl text-gray-400 font-medium mt-10">
                <span className="text-black">
                  {" "}
                  {statsData?.data?.totalDonors?.value}
                </span>
                <span className="text-sm text-green-500">
                  {" "}
                  {statsData?.data?.totalDonors?.percentageChange} %
                </span>{" "}
              </h1>
            </div>
          </div>
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
                <Option value="refunded">Fefunded</Option>
                <Option value="canceled">Canceled</Option>
                <Option value="refunding">Refunding</Option>
              </Select>
            </div>

            {/* TODO */}

            {/* <div className="mt-4 md:mt-0">
              <button className="px-3 py-2 border rounded-md text-sm text-gray-700">
                Monthly
              </button>
            </div> */}

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
  );
};

export default Recurring;
