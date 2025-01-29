import banner from "../../assets/images/Placeholder Image (3).png"
import logo from "../../assets/images/abbas.png"
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
const PreviewTab = () => {
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  `;

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'This is panel header 1',
            children: <p>{text}</p>,
        },
        {
            key: '2',
            label: 'This is panel header 2',
            children: <p>{text}</p>,
        },
        {
            key: '3',
            label: 'This is panel header 3',
            children: <p>{text}</p>,
        },
    ];
    const onChange = (key: string | string[]) => {
        console.log(key);
    };
    return (
        <div className="my-5 max-w-screen-lg mx-auto">
            <div className="relative">
                <img src={banner} alt="" className="h-96 w-full" />
                <div className="absolute top-96 left-20 transform -translate-x-1/2 -translate-y-1/2">
                    <img src={logo} alt="" />
                </div>
            </div>
            <div className="my-5 ml-36">
                <p className="text-sm text-neutral-600 font-semibold">131 Eldridge Rd, Condell Park NSW 2200</p>
                <h1 className="text-3xl font-bold">Abbas Foundation</h1>
                <p className="font-bold">@DIA</p>
            </div>
            <div className="my-5 flex justify-end items-end gap-5">
                <button className="bg-primary text-white py-2 px-4 rounded-3xl">Share</button>
                <button className="bg-btnPrimary text-white py-2 px-4 rounded-3xl ">Donate</button>
            </div>

            <div>
                <h1 className="text-3xl font-bold">Mission Statment</h1>
                <p className="my-5 ">Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p>
                <p>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p>
            </div>
            <div className="my-10">
                <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
            </div>
        </div>
    );
};

export default PreviewTab; 