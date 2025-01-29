import { Button, Layout, theme } from 'antd';
import { RxHamburgerMenu } from "react-icons/rx";
import img from "../../../assets/images/user.png";
import { Link } from 'react-router-dom';

const { Header } = Layout;

interface MainHeaderProps {
    setCollapsed: (collapsed: boolean) => void;
    collapsed: boolean;
}
const MainHeader: React.FC<MainHeaderProps> = ({ setCollapsed, collapsed }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div >
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <div className=' flex justify-between pr-4 bg-primary'>
                    <Button
                        type="text"
                        icon={collapsed ? <RxHamburgerMenu className=' text-white -ml-8 w-8 h-8 ' /> : <RxHamburgerMenu className=' text-white -ml-8 w-8 h-8 ' />}
                        onClick={() => setCollapsed(!collapsed)}
                        className=' text-white '
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className=' '>
                        <Link to="/profile">
                            <img src={img} alt="user" className=' w-10 h-10 my-3' />
                        </Link>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default MainHeader;