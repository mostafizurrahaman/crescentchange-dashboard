/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { Modal, Input, Select, Button, message } from "antd";

import {
  useBoardMessageApiQuery,
  useChnageBoardMemebrStatusApiMutation,
  useChnagePasswordMutation,
} from "../../redux/features/auth/authApi";
import {
  useSetUpTwoFAMutation,
  useVerifyCodeAndEnavble2FAMutation,
} from "../../redux/features/twoFA/twoFA";

type Role = "Admin" | "Editor" | "Manager";

export default function Settings() {
  const { data: boardMemberData, refetch } = useBoardMessageApiQuery(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [invite, setInvite] = useState({ email: "", role: "Manager" as Role });
  const [editingMember, setEditingMember] = useState<any>(null);

  const [chnagePassword] = useChnagePasswordMutation();
  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    const data = {
      oldPassword: passwords.current,
      newPassword: passwords.new,
    };
    const res = await chnagePassword(data).unwrap();
    message.success(res?.message);
    console.log("Submit new password:", passwords);
    setShowPasswordModal(false);
  };

  const handleInvite = () => {
    console.log("Invite sent:", invite);
    setShowInviteModal(false);
  };

  const [chnageBoardMemebrStatusApi] = useChnageBoardMemebrStatusApiMutation();
  const handleUpdateStatus = async (id: string) => {
    try {
      const member = boardMemberData?.data?.find(
        (item: any) => item._id === id
      );

      if (!member) {
        console.error("Member not found!");
        return;
      }

      const updatedStatus = member.status === "active" ? "inactive" : "active";

      const res = await chnageBoardMemebrStatusApi({
        _id: id,
        data: { status: updatedStatus },
      }).unwrap();
      message.success(res?.message);
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };
  // 2 factor Auth:
  const [twoFA, setTwoFA] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [twoFASecret, setTwoFASecret] = useState<string | null>(null);
const [twoFACode, setTwoFACode] = useState("");

  const [setUpTwoFA] = useSetUpTwoFAMutation();
  const [verifyCodeAndEnavble2FA] = useVerifyCodeAndEnavble2FAMutation();

  const handleSetUpTwoFA = async () => {
    try {
      const res = await setUpTwoFA({}).unwrap();

      setQrCodeUrl(res?.data?.qrCodeUrl);
      setTwoFASecret(res?.data?.secret);

      setShow2FAModal(true);
      setTwoFA(true);

      message.success(res?.message || "2FA setup initiated");
    } catch (error) {
      console.error("2FA setup failed:", error);
      message.error("Failed to setup 2FA");
    }
  };
const handleVerifyCodeAndEnable2FA = async (token: string) => {
  try {
    const res = await verifyCodeAndEnavble2FA({ token }).unwrap();
    message.success(res?.message || "2FA enabled successfully");
    setShow2FAModal(false);
    setTwoFA(true);
  } catch (error) {
    console.error("2FA verification failed:", error);
    message.error("Invalid or expired 2FA code");
  }
};


  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">
        Manage team access and keep your organisation account secure.
      </p>
      {/* Team Access */}
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-3">Team Access</h2>
          {/* <button
            onClick={() => setShowInviteModal(true)}
            className="bg-white px-3 py-1 rounded-3xl border"
          >
            Invite a new member
          </button> */}
        </div>
        <p className="text-gray-500 mb-5">
          Manage your team and assign roles to manage your organization.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {boardMemberData?.data?.map((member: any) => (
            <div
              key={member._id}
              className="bg-white p-6 rounded-3xl border relative"
            >
              <div className="flex justify-between items-center gap-2 border-b pb-6">
                <div>
                  <p className="font-semibold text-lg mb-2">
                    {member.boardMemberName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Email: {member.boardMemberEmail}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Phone No: {member.boardMemberPhoneNumber}
                  </p>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(
                        openMenu === member.email ? null : member.email
                      )
                    }
                  >
                    {/* <CgMoreVertical className="cursor-pointer text-gray-500" /> */}
                  </button>

                  {/* {openMenu === member.email && (
                    <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                      <button
                        onClick={() => {
                          setEditingMember({ ...member });
                          setShowEditModal(true);
                          setOpenMenu(null);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        <FaEdit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          handleRemove(member.email);
                          setOpenMenu(null);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                      >
                        <FaTrash size={14} /> Remove
                      </button>
                    </div>
                  )} */}
                </div>
              </div>
              <div className="flex justify-between items-center gap-3 mt-3">
                <p>Status: </p>
                <button
                  onClick={() => handleUpdateStatus(member._id)}
                  className={`${
                    member.status === "active"
                      ? "text-green-600"
                      : "text-yellow-600"
                  } font-medium px-2 py-1 rounded-md bg-neutral-300`}
                >
                  {member.status}
                </button>
              </div>
              {/* <div className="flex justify-between items-center gap-3 mt-3">
                <p>Role: </p>
                <p className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                  {member.role}
                </p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      {/* Edit Modal */}
      <Modal
        title="Edit Member"
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
      >
        {editingMember && (
          <>
            <div className="mb-4">
              <label className="block text-sm mb-1">Name</label>
              <Input
                value={editingMember.name}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <Input
                value={editingMember.email}
                disabled // usually email is fixed
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Role</label>
              <Select
                value={editingMember.role}
                onChange={(val) =>
                  setEditingMember({ ...editingMember, role: val })
                }
                className="w-full"
              >
                <Select.Option value="Admin">Admin</Select.Option>
                <Select.Option value="Editor">Editor</Select.Option>
                <Select.Option value="Manager">Manager</Select.Option>
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-1">Status</label>
              <Select
                value={editingMember.status}
                onChange={(val) =>
                  setEditingMember({ ...editingMember, status: val })
                }
                className="w-full"
              >
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Pending">Pending</Select.Option>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={() => setShowEditModal(false)}>Cancel</Button>
              {/* <Button type="primary" onClick={handleEditSave}>
                Save Changes
              </Button> */}
            </div>
          </>
        )}
      </Modal>
      {/* Update Password */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Update your password</h3>
          <p className="text-sm text-gray-500">
            Change or update your password. Forgot your password?
            <a href="#" className="text-blue-600 underline">
              Click here
            </a>
            to reset it.
          </p>
        </div>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="text-xl cursor-pointer"
        >
          ↗
        </button>
      </div>
      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500">
            Two-Factor Authentication is {twoFA ? "on" : "off"}.
            {twoFA
              ? "Your account is more secure."
              : "Turn it on for stronger security."}
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={twoFA}
            onChange={(e) => {
              const checked = e.target.checked;

              if (checked && !twoFA) {
                handleSetUpTwoFA(); // 🔥 start setup
              } else {
                setTwoFA(false); // optional: disable flow later
              }
            }}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>
      {/* Password Modal  */}
      <Modal
        title="Update your Password"
        open={showPasswordModal}
        onCancel={() => setShowPasswordModal(false)}
        footer={null}
      >
        {["current", "new", "confirm"].map((field) => (
          <div className="mb-4 relative" key={field}>
            <label className="block text-sm mb-1">
              {field === "current"
                ? "Enter Current Password"
                : field === "new"
                ? "Enter New Password"
                : "Confirm New Password"}
            </label>
            <Input
              type={showPw[field as keyof typeof showPw] ? "text" : "password"}
              value={passwords[field as keyof typeof passwords]}
              onChange={(e) =>
                setPasswords((p) => ({ ...p, [field]: e.target.value }))
              }
              suffix={
                showPw[field as keyof typeof showPw] ? (
                  <AiOutlineEyeInvisible
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPw((p) => ({
                        ...p,
                        [field]: !p[field as keyof typeof p],
                      }))
                    }
                  />
                ) : (
                  <AiOutlineEye
                    className="cursor-pointer"
                    onClick={() =>
                      setShowPw((p) => ({
                        ...p,
                        [field]: !p[field as keyof typeof p],
                      }))
                    }
                  />
                )
              }
            />
          </div>
        ))}
        <p className="text-xs text-gray-500 mb-4">
          Your Password must contain at least 8 characters, 1 uppercase letter,
          1 number, and 1 special character.
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setShowPasswordModal(false)}>
            Discard Changes
          </Button>
          <Button type="primary" onClick={handlePasswordChange}>
            Save Changes
          </Button>
        </div>
      </Modal>
      {/* Invite Modal */}
      <Modal
        title="Invite Your Team Member"
        open={showInviteModal}
        onCancel={() => setShowInviteModal(false)}
        footer={null}
      >
        <div className="mb-4 relative">
          <label className="block text-sm mb-1">Email</label>
          <Input
            type="email"
            value={invite.email}
            onChange={(e) =>
              setInvite((i) => ({ ...i, email: e.target.value }))
            }
            prefix={<AiOutlineMail />}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm mb-1">Role</label>
          <Select
            value={invite.role}
            onChange={(value) =>
              setInvite((i) => ({ ...i, role: value as Role }))
            }
            className="w-full"
          >
            <Select.Option value="Admin">Admin</Select.Option>
            <Select.Option value="Editor">Editor</Select.Option>
            <Select.Option value="Manager">Manager</Select.Option>
          </Select>
        </div>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setShowInviteModal(false)}>Cancel</Button>
          <Button type="primary" onClick={handleInvite}>
            Invite
          </Button>
        </div>
      </Modal>

      {/* Show QR Code for 2FA */}
   <Modal
  title="Set up Two-Factor Authentication"
  open={show2FAModal}
  onCancel={() => setShow2FAModal(false)}
  footer={[
    <button
      key="submit"
      className="text-xl px-4 py-2 border cursor-pointer"
      disabled={!twoFACode}
      onClick={() => handleVerifyCodeAndEnable2FA(twoFACode)}
    >
      Verify & Enable
    </button>,
  ]}
>
  <div className="text-center">
    <p className="mb-4 text-gray-600">
      Scan this QR code using Google Authenticator or any 2FA app.
    </p>

    {qrCodeUrl && (
      <img
        src={qrCodeUrl}
        alt="2FA QR Code"
        className="mx-auto mb-4 w-48 h-48"
      />
    )}

    {twoFASecret && (
      <div className="bg-gray-100 p-3 rounded-md text-sm mb-4">
        <p className="font-medium mb-1">Manual setup key:</p>
        <p className="break-all font-mono">{twoFASecret}</p>
      </div>
    )}

    {/* 2FA Code Input */}
    <input
      type="text"
      placeholder="Enter 6-digit code"
      value={twoFACode}
      onChange={(e) => setTwoFACode(e.target.value)}
      className="w-full border px-3 py-2 rounded-md text-center tracking-widest"
      maxLength={6}
    />
  </div>
</Modal>

    </div>
  );
}
