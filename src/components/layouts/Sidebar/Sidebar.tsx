import { Layout, Menu, } from 'antd';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { GrAnalytics } from "react-icons/gr";
import { PiHandDepositDuotone } from "react-icons/pi";
const { Sider } = Layout;

const Sidebar = ({ collapsed }) => {

    return (
        <div className='fixed top-0 left-0 bottom-0 bg-primary'>
            <Sider className='h-[100vh] w-[300px] bg-primary' width={250} collapsedWidth={80} trigger={null} collapsible collapsed={collapsed}>
                <p className={` ${collapsed ? 'text-lg' : 'text-3xl'} font-bold my-10 text-white text-center`}>Logo</p>
                <Menu
                    mode="inline"
                    className='px-2'
                    defaultSelectedKeys={['1']}
                    style={{
                        backgroundColor: '#3212eb',
                        color: 'white'
                    }}
                    items={[
                        {
                            key: '1',
                            icon: <CgProfile className=' w-5 h-5' />,
                            label: <Link className='' to={`/`}>Profile</Link>,
                        },
                        {
                            key: '2',
                            icon: <GrAnalytics className=' w-5 h-5' />,
                            label: <Link className='' to={`/analytics`}>Analytics</Link>,
                        },
                        {
                            key: '3',
                            icon: <FaUsers className=' w-5 h-5' />,
                            label: <Link className='' to={`/donors`}>Donors</Link>,
                        },
                        {
                            key: '4',
                            icon: <PiHandDepositDuotone className=' w-5 h-5' />,
                            label: <Link className='' to={`/deposits`}>Deposits</Link>,
                        }

                    ]}
                />
            </Sider>
        </div>
    );
};

export default Sidebar;