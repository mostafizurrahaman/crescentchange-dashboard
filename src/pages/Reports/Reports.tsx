
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal, Select, Tooltip } from "antd";
import roundup from "../../assets/images/roundup.png";
import recurring from "../../assets/images/recurring.png";
import oneTime from "../../assets/images/one-time.png";
import { Table } from "antd";
import { DownloadOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useGetAllDonorsQuery } from "../../redux/features/donorApi/donorsApi";
import { useGetAllProfileQuery } from "../../redux/features/profileApi/profileApi";
import { FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetDonationStatsQuery, useResendReceiptMutation } from "../../redux/features/dashboardApi/dashboardApi";
import { FiChevronDown } from "react-icons/fi";
import { HiFunnel } from "react-icons/hi2";
import { HiCalendarDays } from "react-icons/hi2";
import { IoIosRefresh } from "react-icons/io";

import level from "../../assets/images/Layer_1.png"

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort] = useState("");
  const [status, setStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const { Option } = Select;
  const onSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const { data: statsData } = useGetDonationStatsQuery({
    filter: "this_month",
    donationType: "all",
  });
  const { data: profileData } = useGetAllProfileQuery(null);
  const organizationId = profileData?.data?._id;
  const { data: donorData } = useGetAllDonorsQuery(
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
  const [resendReceipt] = useResendReceiptMutation();
  const handleResendRecipt = async (record: any) => {
    const selectedId = record?._id;
    if (selectedId) {
      await resendReceipt(selectedId).unwrap();
    }

    console.log("Receipt resent for donation:", selectedId);
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "donor",
      key: "name",
      render: (donor: any, record: any) => {
        return <div className="flex justify-start items-center gap-2">
          <img src={donor?.image || ""} alt="Donor" className="w-8 h-8 rounded-full object-cover" />
          <div>
            <p className="font-medium">{donor?.name || "-"}</p>
            <p className="text-gray-500">Since {record?.donationDate ? new Date(record.donationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "-"}</p>
          </div>
        </div>;
      },
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
      key: "donationDate",
      render: (donationDate: string) => {
        const date = new Date(donationDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });
        return (
          <div>
            <div>{formattedDate}</div>
            <div className="text-gray-500">{formattedTime}</div>
          </div>
        );
      },
    },
    {
      title: "Donation Type",
      dataIndex: "donationType",
      key: "donationType",
      render: (donationType: string) => {
        return (
          <div className="flex items-center justify-center gap-2">
            {donationType === "round-up" && (
              <div className="flex items-center gap-2 px-3 py-1 text-blue-600 bg-blue-100 rounded-full">
                <img src={roundup} alt="Round Up" className="w-4 h-4" />
                <span>Round Up</span>
              </div>
            )}
            {donationType === "recurring" && (
              <div className="flex items-center gap-2 px-3 py-1 text-green-600 bg-green-100 rounded-full">
                <img src={recurring} alt="Round Up" className="w-4 h-4" />
                <span>Recurring</span>
              </div>
            )}
            {donationType === "one-time" && (
              <div className="flex items-center gap-2 px-3 py-1 text-pink-600 bg-pink-100 rounded-full">
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
      render: (specialMessage: string) => specialMessage || "-",
    },
    {
      title: "Donated Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: any) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (netAmount: any) => `$${netAmount.toFixed(2)}`,
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
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => handleViewClick(record)}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f6f6] text-black/70 transition hover:bg-black/5"
            aria-label="View"
          >
            <FaEye className="w-5 h-5" />
          </button>
          <button onClick={() => handleResendRecipt(record)} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f6f6f6] text-black/70 transition hover:bg-black/5">
            <IoIosRefresh className="text-nutral-500" />
          </button>
        </div>
      ),
    },
  ];
  const allDataExport = () => {
    console.log(statsData?.data);
    const formattedData = [
      {
        "Total Donation": statsData?.data?.totalDonatedAmount?.percentageChange,
        "Total Donors": statsData?.data?.totalDonors?.percentageChange,
        "Avg Donation": statsData?.data?.averageDonationPerUser?.value,
      },
    ];
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donations");

    // Export the file as Excel (.xlsx)
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], {
      // bookType: "xlsx",
      // type: "application/octet-stream",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "Reports.xlsx");
  };

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
      // bookType: "xlsx",
      // type: "application/octet-stream",
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "Report table.xlsx");
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div>
          <h1 className="font-familjen mb-4 text-4xl font-bold">Reports</h1>
          <p className="mb-4 text-lg text-gray-600">
            Generate, track, and export your donation insights.
          </p>
        </div>
        {/* <div className="flex items-center justify-start gap-5 mb-5">
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
        </div> */}
        <Tooltip title="Export to Excel" placement="bottom">
          <Button
            type="text"
            icon={<DownloadOutlined />}
            onClick={allDataExport}
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-black transition duration-200 hover:bg-black/5 focus:outline-none"
          >
            <span className="text-[15px] font-medium">Export</span>
            <FiChevronDown className="h-4 w-4 text-black/70" />
          </Button>
        </Tooltip>
      </div>

      <div>
        <div className="grid items-center justify-center grid-cols-1 gap-3 md:grid-cols-3">
          <div className="p-6 bg-white border rounded-3xl h-[192px]">
            <p className="text-lg font-medium">Total Donations</p>
            <div className="flex items-end justify-start gap-1 mt-10 mb-6">
              <h1 className="text-3xl font-bold md:text-5xl">
                {" "}
                <span className="text-gray-400">$</span>{" "}
                {statsData?.data?.totalDonatedAmount?.value}
              </h1>
              <p className="text-green-500">
                {statsData?.data?.totalDonatedAmount?.isIncrease === true
                  ? "+"
                  : "-"}
                {statsData?.data?.totalDonatedAmount?.percentageChange}%{" "}
                <span className="text-gray-400"> vs last month</span>
              </p>
            </div>
          </div>
          <div className="p-6 bg-white border rounded-3xl h-[192px]">
            <p className="text-lg font-medium">Total Donors</p>
            <div className="flex items-end justify-start gap-1 mt-10 mb-6">
              <h1 className="text-3xl font-bold md:text-5xl text-gray-400">
                {" "}
                <span className="text-black">
                  {statsData?.data?.totalDonors?.value}
                </span>
                <span className="ml-1 text-sm text-green-500">
                  {" "}
                  {statsData?.data?.totalDonors?.isIncrease === true
                    ? "+"
                    : "-"}
                  {statsData?.data?.totalDonors?.percentageChange} %
                </span>{" "}
              </h1>
            </div>
          </div>
          <div className="p-6 bg-white border rounded-3xl h-[192px]">
            <p className="text-lg font-medium">Avg. Donation</p>
            <div className="flex items-end justify-start gap-1 mt-10 mb-6">
              <h1 className="text-3xl font-bold md:text-5xl">
                {" "}
                <span className="text-gray-400">$</span>{" "}
                {statsData?.data?.averageDonationPerUser?.value}
                <span className="ml-1 text-sm text-gray-400"> per user</span>{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="p-6 my-6 bg-white border rounded-3xl">
          <div className="flex items-center justify-between gap-5">
            <h1 className="text-xl font-medium">Report History</h1>

            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              <div className="w-full md:w-[260px]">
                <Input
                  placeholder="Search"
                  allowClear
                  size="large"
                  prefix={<SearchOutlined className="text-black/50" />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onPressEnter={(e) =>
                    onSearch((e.target as HTMLInputElement).value)
                  }
                  className="h-10 rounded-full border border-black/10 bg-[#f6f6f6] px-3 [&_.ant-input]:!bg-transparent [&_.ant-input]:!text-[15px] [&_.ant-input-affix-wrapper]:!bg-transparent [&_.ant-input-affix-wrapper]:!border-0 [&_.ant-input-affix-wrapper]:!shadow-none [&_.ant-input-search-icon]:!text-black/60"
                />
              </div>

              <div className="w-full md:w-auto">
                <div className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4">
                  <HiFunnel className="h-4 w-4 text-black/60" />
                  <Select
                    value={status}
                    onChange={handleStatusChange}
                    placeholder={"Filter"}
                    variant="borderless"
                    size="large"
                    className="min-w-[130px] [&_.ant-select-selector]:!p-0"
                  >
                    <Option value="processing">Processing</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="failed">Failed</Option>
                    <Option value="refunded">Refunded</Option>
                    <Option value="canceled">Canceled</Option>
                  </Select>
                </div>
              </div>

              <div className="w-full md:w-auto">
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-[15px] font-medium text-black transition duration-200 hover:bg-black/5 md:w-auto"
                >
                  <HiCalendarDays className="h-4 w-4 text-black/60" />
                  Monthly
                </button>
              </div>

              {/* <div className="mt-4 md:mt-0">
                <button className="px-3 py-2 text-sm text-gray-700 border rounded-md">
                  Monthly
                </button>
              </div> */}
              {/* export korte hobe */}
              <Tooltip title="Export to Excel" placement="bottom">
                <Button
                  type="text"
                  icon={<DownloadOutlined />}
                  onClick={exportToExcel}
                  className="flex h-10 items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-5 text-black transition duration-200 hover:bg-black/5 focus:outline-none"
                >
                  <span className="text-[15px] font-medium">Export</span>
                  <FiChevronDown className="h-4 w-4 text-black/70" />
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
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
            centered
            width={520}
       
          >
            <div className="flex flex-col items-center text-center">
              {/* Success Icon */}
              <div className="mb-4">
               <img src={level} alt="" />
              </div>

              {/* Title */}
              <h2 className="text-xl font-semibold mb-6">Summary</h2>

              {/* Summary Rows */}
              <div className="w-full text-sm space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount donated:</span>
                  <span className="font-medium">
                    ${selectedDonation?.amount?.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Organization:</span>
                  <span className="font-medium">
                    {selectedDonation?.cause?.name || "No Cause"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Donation Type:</span>
                  <span className="font-medium">
                    {selectedDonation?.donationType}
                  </span>
                </div>

                <div className="pt-2">
                  <p className="text-gray-500 mb-1">Special message:</p>
                  <p className="italic text-gray-800">
                    "{selectedDonation?.specialMessage || "-"}"
                  </p>
                </div>

                <div className="border-t pt-3 flex justify-between">
                  <span className="text-gray-500">Timestamp:</span>
                  <span className="font-medium">
                    {new Date(selectedDonation?.donationDate).toLocaleString()}
                  </span>
                </div>

                {selectedDonation?.receiptId && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Transaction ID:</span>
                    <span className="font-medium">
                      {selectedDonation?.receiptId.receiptNumber}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8 w-full">
                <button
                  onClick={() => handleResendRecipt(selectedDonation)}
                  className="flex-1 border rounded-lg py-2 text-sm font-medium hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  <ReloadOutlined />
                  Resend Receipt
                </button>

                <a
                  href={selectedDonation?.receiptId?.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-1 bg-black text-white rounded-lg py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <DownloadOutlined />
                  Save receipt
                </a>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Reports;
