import { ConfigProvider, Layout, Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { IoMdSettings } from "react-icons/io";
import {
  LuLayoutDashboard,
  LuUser,
  LuUsers,
  LuWallet,
  LuFileText,
  LuTicket,
  LuLogOut,
} from "react-icons/lu";
import { baseApi } from "../../../redux/api/baseApi";
import { logout as clearAuth } from "../../../redux/features/auth/authSlice";

const { Sider } = Layout;

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = () => {
  // const location = useLocation().pathname.split("/")[1];
  const pathname = useLocation().pathname;
  const selectedKey = pathname.split("/")[1] || "analytics";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("pending2FAEmail");
    dispatch(clearAuth());
    dispatch(baseApi.util.resetApiState());
    navigate("/auth/login", { replace: true });
  };
  const menuItems = [
    {
      key: "analytics",
      icon: <LuLayoutDashboard className="w-5 h-5" />,
      label: <Link to="/analytics">Dashboard</Link>,
    },
    {
      key: "profile",
      icon: <LuUser className="w-5 h-5" />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "donors",
      icon: <LuUsers className="w-5 h-5" />,
      label: <Link to="/donors">Donors</Link>,
    },
    {
      key: "deposits",
      icon: <LuWallet className="w-5 h-5" />,
      label: <Link to="/deposits">Deposits</Link>,
    },
    {
      key: "reports",
      icon: <LuFileText className="w-5 h-5" />,
      label: <Link to="/reports">Reports</Link>,
    },
  ];

  const bottomMenuItems = [
    {
      key: "subscription",
      icon: <LuTicket className="w-5 h-5" />,
      label: <Link to="/subscription">Subscription</Link>,
    },
    {
      key: "settings",
      icon: <IoMdSettings className="w-5 h-5" />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "logout",
      icon: <LuLogOut className="w-5 h-5" />,
      label: "Logout",
    },
  ];

  return (
    <div className="h-full bg-[#f7f7f7] border-r border-black/5">
      <Sider
        className="h-full w-[300px] bg-[#f7f7f7]"
        width={250}
        trigger={null}
      >
        {/* <div className="flex items-center justify-center ">
          <img src={logo} alt="" className="my-10 " />
        </div> */}

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemBg: "transparent",
                itemColor: "rgba(0,0,0,0.8)",
                itemHoverBg: "rgba(255,255,255,0.75)",
                itemSelectedBg: "#d8f77c",
                itemSelectedColor: "rgba(0,0,0,0.9)",
                itemBorderRadius: 24,
                itemHeight: 44,
                iconSize: 18,
                borderRadius: 12,
                borderRadiusLG: 12,
                fontSize: 16,
              },
            },
          }}
        >
          <div className="flex flex-col h-full">
            <Menu
              mode="inline"
              className="px-3 pt-3 font-semibold font-familjen"
              selectedKeys={[selectedKey]}
              style={{
                backgroundColor: "#f7f7f7",
                color: "black",
                borderInlineEnd: 0,
              }}
              items={menuItems}
            />

            <div className="px-3 pb-6 mt-72">
              <Menu
                mode="inline"
                className="font-semibold font-familjen"
                selectedKeys={[selectedKey]}
                style={{
                  backgroundColor: "#f7f7f7",
                  color: "black",
                  borderInlineEnd: 0,
                }}
                items={bottomMenuItems}
                onClick={({ key }) => {
                  if (key === "logout") handleLogOut();
                }}
              />
            </div>
          </div>
        </ConfigProvider>
      </Sider>
    </div>
  );
};

export default Sidebar;
