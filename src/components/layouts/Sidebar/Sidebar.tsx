import { ConfigProvider, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {  FaMoneyCheckAlt, FaLongArrowAltLeft, FaUser, FaHandHoldingHeart } from "react-icons/fa";
import { PiHandDepositDuotone } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation().pathname.split("/")[1];

  const menuItems = [
    {
      key: "analytics",
      icon: <MdDashboard className="w-5 h-5" />,
      label: <Link to="/analytics">Dashboard</Link>,
    },
    {
      key: "profile",
      icon: <FaUser className="w-5 h-5" />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "donors",
      icon: <FaHandHoldingHeart className="w-5 h-5" />,
      label: <Link to="/donors">Donors</Link>,
    },
    {
      key: "deposits",
      icon: <PiHandDepositDuotone className="w-5 h-5" />,
      label: <Link to="/deposits">Deposits</Link>,
    },
 
  ];

  const bottomMenuItems = [
       {
      key: "subscription",
      icon: <FaMoneyCheckAlt className="w-5 h-5" />,
      label: <Link to="/subscription">Subscription</Link>,
    },
    {
      key: "Settings",
      icon: <IoMdSettings className="w-5 h-5" />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "logout",
      icon: <FaLongArrowAltLeft className="w-5 h-5" />,
      label: <Link to="/auth/login">Logout</Link>,
    },
  ];

  return (
    // <div className="fixed top-0 left-0 bottom-0 bg-[#f7f7f7]">
    <div className="bg-primary h-full border border-l">
      <Sider
        className="h-auto w-[300px] bg-[#f7f7f7]"
        width={250}
        collapsedWidth={80}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {/* <div className="flex items-center justify-center ">
          <img src={logo} alt="" className="my-10 " />
        </div> */}

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemBg: "rgb(47,84,235)",
                itemColor: "rgb(0, 0, 0)",
                itemHoverBg: "rgb(255, 255, 255)",
                itemSelectedBg: "rgb(255, 255, 255)",
                itemSelectedColor: "rgb(0,0,0)",
              },
            },
          }}
        >
          <Menu
            mode="inline"
            className="px-2"
            selectedKeys={[location]}
            style={{
              backgroundColor: "#f7f7f7",
              color: "black",
            }}
            items={menuItems}
          />

          <div className="mt-[400px] px-2">
            <Menu
              mode="inline"
              style={{
                backgroundColor: "#f7f7f7",
                color: "black",
              }}
              items={bottomMenuItems}
            />
          </div>
        </ConfigProvider>
      </Sider>
    </div>
  );
};

export default Sidebar;
