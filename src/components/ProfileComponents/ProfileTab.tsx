import { Modal } from "antd";
import img from "../../assets/images/Placeholder Image (3).png"
import logo from "../../assets/images/abbas.png"
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import EditProfile from "../PagesComponents/EditProfile";





const ProfileTab = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancle = () => setIsModalOpen(false)


    return (
        <div>
            <div className="max-w-screen-md mx-auto my-5 shadow-lg p-5 bg-white rounded-md">
                <img src={img} alt="Profile" className="w-full rounded-t-lg" />
                <div className="my-3 flex justify-between items-center">
                    <div className="flex justify-start items-center gap-2">
                        <img src={logo} alt="Logo" className="w-20 h-20" />
                        <h1 className="text-3xl font-bold">{["organisation-name"]}</h1>
                    </div>
                    <div>
                        <FaPen onClick={handleModalOpen} />
                    </div>
                </div>
                <p className="text-lg font-semibold my-10">Organisation Address</p>
                <p className="my-2 text-lg"><strong>Suburb:</strong> suburb</p>
                <p className="my-2 text-lg"><strong>State:</strong> state</p>
                <p className="my-2 text-lg"><strong>Post Code:</strong> post-code</p>
                <p className="my-2 text-lg"><strong>Email:</strong> email-address</p>
                <p className="my-2 text-lg"><strong>Mission Statement:</strong> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam necessitatibus praesentium, assumenda nesciunt laborum expedita ipsam minus incidunt ad distinctio quo recusandae culpa dolorem, at eaque autem fugit accusamus hic?</p>
            </div>

            <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancle} width={600}>
                <EditProfile />
            </Modal>

        </div>
    );
};

export default ProfileTab;