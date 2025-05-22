/* eslint-disable @typescript-eslint/no-unused-vars */

import { Outlet } from "react-router-dom";
import { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from "./Sidebar/Sidebar";
// import MainHeader from "./MainHeader/MainHeader";


const { Content } = Layout;
const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);


    return (
        <div className="">
            <Layout >
                <Sidebar collapsed={collapsed} ></Sidebar>
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 250,
                        transition: 'margin-left 0.2s ease',
                    }}
                    className={``}>
                    {/* my header */}
                    {/* <MainHeader setCollapsed={setCollapsed} collapsed={collapsed}></MainHeader> */}
                    <Content
                        className="p-5 bg-white"
                        style={{}}
                    >
                        {/* my content */}
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default MainLayout;