import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { router } from "../../../routes/router";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();
    const rootRoute = router.routes.find((route) => route.path === "/");

    const items = rootRoute?.children?.map((child) => ({
        key: `/${child.path}`,
        label: <NavLink to={`/${child.path}`}>{`${child.path}`.replace("/", "").toUpperCase()}</NavLink>,
    }));

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
            }}
        >
            <div
                style={{
                    color: "white",
                    textAlign: "center",
                    height: "4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Cresent
            </div>
            <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={items} />
        </Sider>
    );
};

export default Sidebar;
