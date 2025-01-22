import { Button, ConfigProvider, Layout, Menu } from 'antd';
import { router } from '../../routes/router';
import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,

} from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const rootRoute = router.routes.find((route) => route.path === '/');

    const menuItems = rootRoute?.children?.map((child) => ({
        key: `/${child.path}`,
        label: <Link to={`/${child.path}`}>{`${child.path}`.replace("/", "").toUpperCase()}</Link>,
    }));

    return (
        <ConfigProvider
            theme={{
                "components": {
                    "Layout": {
                        "siderBg": "rgb(47,84,235)",
                        "triggerBg": "rgb(250,140,22)",
                        "triggerColor": "rgb(250,140,22)"
                    },
                    "Menu": {
                        "itemBg": "rgb(47,84,235)",
                        "itemColor": "rgb(0,0,0)",
                        "itemSelectedBg": "rgb(198,248,255)",
                        "subMenuItemSelectedColor": "rgb(250,140,22)"
                    }
                }
            }}
        >
            <Layout style={{
                // backgroundColor: '#3212eb' 
            }} >
                <Sider
                    trigger={null} collapsible collapsed={collapsed}
                    breakpoint="lg"
                    collapsedWidth="0"
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,

                    }}
                >
                    <div
                        style={{
                            color: 'white',
                            height: '4rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        className="demo-logo-vertical"
                    >
                        Cresent
                    </div>
                    <Menu theme="light" mode="inline" defaultSelectedKeys={[menuItems[1]?.key]} items={menuItems} />
                </Sider>
                <Layout style={{ marginLeft: 200 }}>
                    {/* <Header style={{ padding: 0 }} /> */}
                    <Header style={{
                        padding: 0, backgroundColor: 'rgb(47,84,235)'

                    }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', padding: 24, height: '100vh' }}>
                        <div style={{ padding: 24, minHeight: 360 }}>
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};

export default MainLayout;
