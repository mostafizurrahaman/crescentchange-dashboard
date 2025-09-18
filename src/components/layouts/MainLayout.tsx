/* eslint-disable @typescript-eslint/no-unused-vars */

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar/Sidebar";
import MainHeader from "./MainHeader/MainHeader";

const { Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="">
      {/* <Layout>
        <Sidebar collapsed={collapsed}></Sidebar>
        <Layout
          style={{
            marginLeft: collapsed ? 80 : 250,
            transition: "margin-left 0.2s ease",
          }}
          className={``}
        >
          <MainHeader
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          ></MainHeader>

          <Content className="p-5 bg-white" style={{}}>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout> */}
     <div className="min-h-screen bg-red-200 flex flex-col">
  {/* Header */}
  <header className="h-20 bg-green-200 w-full">
    <MainHeader setCollapsed={setCollapsed} collapsed={collapsed} />
  </header>

  {/* Sidebar + Content (under header) */}
  <div className="flex flex-1">
    {/* Sidebar */}
    <aside
      className={`${
        collapsed ? "w-20" : "w-[250px]"
      } bg-yellow-500 transition-all duration-200`}
    >
      <Sidebar collapsed={collapsed} />
    </aside>

    {/* Content */}
    <main className="flex-1 bg-gray-50 p-5">
      <Outlet />
    </main>
  </div>
</div>

    </div>
  );
};

export default MainLayout;
