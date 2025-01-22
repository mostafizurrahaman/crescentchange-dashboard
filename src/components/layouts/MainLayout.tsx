import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
const MainLayout = () => {
    const items = [
        {
            label: 'Profile',
            key: 'profile',
        },
        {
            label: 'Analytics',
            key: 'analytics',
        },
        {
            label: 'Donors',
            key: 'donors',
        },
        {
            label: 'Deposits',
            key: 'deposits',
        },

    ]

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
                <div style={{
                    color: 'white',
                    height: '4rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }} className="demo-logo-vertical" >Cresent</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, }} />
                <Content style={{
                    margin: '24px 16px',
                    padding: 24,
                    height: '100vh',
                }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,

                        }}
                    >
                        content
                    </div>
                </Content>

            </Layout>
        </Layout>
    );
};

export default MainLayout;
