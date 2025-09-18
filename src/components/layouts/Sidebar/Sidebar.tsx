/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigProvider, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {  FaMoneyCheckAlt, FaLongArrowAltLeft, FaUser, FaHandHoldingHeart } from "react-icons/fa";
import { PiHandDepositDuotone } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import shape from "../../../assets/images/Shape.png"
import user from "../../../assets/images/Icons.png"
import donor from "../../../assets/images/donor.png"
import deposit from "../../../assets/images/deposit.png"
import logout from "../../../assets/images/Sign Out.png"
import calenderimg from "../../../assets/images/Calendar.png"

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
   onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed,onClose }) => {
  const location = useLocation().pathname.split("/")[1];

 const menuItems = [
  {
    key: "analytics",
    icon: <img src={shape} alt="Analytics" className="w-5 h-5" />, // wrap in JSX
    label: <Link to="/analytics">Dashboard</Link>,
  },
  {
    key: "profile",
    icon: <img src={user} alt="Profile" className="w-5 h-5" />,
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: "donors",
    icon: <img src={donor} alt="Donors" className="w-5 h-5" />,
    label: <Link to="/donors">Donors</Link>,
  },
  {
    key: "deposits",
    icon: <img src={deposit} alt="Deposits" className="w-5 h-5" />,
    label: <Link to="/deposits">Deposits</Link>,
  },
];


const bottomMenuItems = [
  {
    key: "subscription",
    icon: <img src={calenderimg} alt="Deposits" className="w-5 h-5"></img>, 
    label: <Link to="/subscription">Subscription</Link>,
  },
  {
    key: "Settings",
    icon: <IoMdSettings className="w-5 h-5" />,
    label: <Link to="/settings">Settings</Link>,
  },
  {
    key: "logout",
    icon: <img src={logout} alt="Logout" className="w-5 h-5" />,
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
                itemHoverBg: "#d1ff43",
                itemSelectedBg: "#d1ff43",
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
