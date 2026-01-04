
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";
import MainHeader from "./MainHeader/MainHeader";

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
      <div className="flex flex-col min-h-screen bg-red-200">
        {/* Header */}
        <header className="w-full h-20 bg-green-200">
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
            <Sidebar />
          </aside>

          {/* Content */}
          <main className="flex-1 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
