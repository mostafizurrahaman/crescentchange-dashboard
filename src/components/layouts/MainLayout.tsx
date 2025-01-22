import { Layout, Menu } from 'antd';
import { router } from '../../routes/router';
import { Link, Outlet } from 'react-router-dom';
const { Header, Content, Sider } = Layout;

const MainLayout = () => {
    const rootRoute = router.routes.find((route) => route.path === '/');

    const menuItems = rootRoute?.children?.map((child) => ({
        key: `/${child.path}`,
        label: <Link to={`/${child.path}`}>{`${child.path}`.replace("/", "").toUpperCase()}</Link>,
    }));

    return (
        <Layout>
            <Sider
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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                <Header style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px', padding: 24, height: '100vh' }}>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
