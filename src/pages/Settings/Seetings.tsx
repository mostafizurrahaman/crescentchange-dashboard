import { useState } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
// import { MoreVertical, Edit2, Trash2 } from "lucide-react";

const teamMembers = [
  {
    name: "John Bills",
    email: "billsjohn09@gmail.com",
    status: "Active",
    role: "Admin",
  },
  {
    name: "Billy Clark",
    email: "clark999@gmail.com",
    status: "Pending",
    role: "Editor",
  },
  {
    name: "Anna K.",
    email: "annakazama54@gmail.com",
    status: "Active",
    role: "Manager",
  },
];

export default function Settings() {
  const [members, setMembers] = useState(teamMembers);
  const [twoFA, setTwoFA] = useState(false);

  const handleRemove = (email: string) => {
    setMembers((prev) => prev.filter((m) => m.email !== email));
  };

  return (
    <div className="p-6 w-full md:w-[80%]">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-semibold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">
        Manage team access and keep your organisation account secure.
      </p>

      {/* Team Access */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold mb-3">Team Access</h2>
        <p className="text-gray-500 mb-5">
          Manage your team and assign roles to manage your organization.
        </p>

        <div className="flex flex-wrap gap-5">
          {members.map((member) => (
            <div
              key={member.email}
              className="relative bg-white shadow rounded-xl p-4 w-72"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-gray-500 text-sm">{member.email}</p>
                </div>
                <div className="relative group">
                  <CgMoreVertical className="cursor-pointer text-gray-500" />
                  <div className="absolute hidden group-hover:block right-0 mt-2 w-28 bg-white border rounded shadow">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full text-left">
                      <FaEdit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleRemove(member.email)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                    >
                      <FaTrash size={14} /> Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <p>
                  Status:{" "}
                  <span
                    className={`${
                      member.status === "Active"
                        ? "text-green-600"
                        : "text-yellow-600"
                    } font-medium`}
                  >
                    {member.status}
                  </span>
                </p>
                <p>
                  Role:{" "}
                  <span className="inline-block bg-black text-white text-xs px-2 py-1 rounded">
                    {member.role}
                  </span>
                </p>
              </div>
            </div>
          ))}
          {/* Invite new member button */}
          <button className="w-72 h-32 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:border-gray-400">
            + Invite a new member
          </button>
        </div>
      </div>

      {/* Update Password */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Update your password</h3>
          <p className="text-sm text-gray-500">
            Change or update your password. Forgot your password?{" "}
            <a href="#" className="text-blue-600 underline">
              Click here
            </a>{" "}
            to reset it.
          </p>
        </div>
        <span className="text-xl">↗</span>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium">Two-Factor Authentication</h3>
          <p className="text-sm text-gray-500">
            Two-Factor Authentication is {twoFA ? "on" : "off"}.{" "}
            {twoFA
              ? "Your account is more secure."
              : "Turn it on for stronger security."}
          </p>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={twoFA}
            onChange={() => setTwoFA(!twoFA)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
        </label>
      </div>
    </div>
  );
}
