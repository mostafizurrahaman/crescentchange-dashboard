import { Link } from "react-router-dom";
import {
  LuUser,
  LuWallet,
  LuHeartHandshake,
  LuFileText,
  LuPuzzle,
  LuReceipt,
} from "react-icons/lu";

const QuickLinks = () => {
  const data = [
    {
      id: 1,
      icon: <LuUser className="w-7 h-7 text-neutral-700" />,
      title: "Manage Profile",
      link: "/edit-profile",
    },
    {
      id: 2,
      icon: <LuWallet className="w-7 h-7 text-neutral-700" />,
      title: "View Portfolio",
      link: "/deposits",
    },
    {
      id: 3,
      icon: <LuHeartHandshake className="w-7 h-7 text-neutral-700" />,
      title: "Manage Causes",
      link: "/edit-profile",
    },
    {
      id: 4,
      icon: <LuFileText className="w-7 h-7 text-neutral-700" />,
      title: "View Reports",
      link: "/reports",
    },
    {
      id: 5,
      icon: <LuPuzzle className="w-7 h-7 text-neutral-700" />,
      title: "Integrations",
      link: "/integrations",
    },
    {
      id: 6,
      icon: <LuReceipt className="w-7 h-7 text-neutral-700" />,
      title: "Receipts",
      link: "/reports",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium mb-2">Quick Links</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-3xl flex flex-col items-center justify-center gap-2 border border-black/5 hover:border-black/10 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
          >
            <Link to={item?.link || ""} className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-neutral-100/80 flex items-center justify-center mb-3 group-hover:bg-black/5 group-hover:scale-105 transition-all">
                {item.icon}
              </div>
              <p className="text-center font-semibold text-neutral-800">{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
