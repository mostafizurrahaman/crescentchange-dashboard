import profile from "../../assets/images/Shape.png";
import portfolio from "../../assets/images/Eye Tracking.png";
import warning from "../../assets/images/Error Circle.png";
import reports from "../../assets/images/Document Bullet List.png";
import intregation from "../../assets/images/Puzzle Cube.png";
import tickets from "../../assets/images/Ticket.png";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  const data = [
    {
      id: 1,
      img: profile,
      title: "Manage Profile",
      Link: "/profile",
    },
    {
      id: 2,
      img: portfolio,
      title: "View Portfolio",
      link: "/deposits",
    },
    {
      id: 3,
      img: warning,
      title: "Manage Causes",
      Link: "/profile",
    },
    {
      id: 4,
      img: reports,
      title: "View Reports",
      link: "/reports",
    },
    {
      id: 5,
      img: intregation,
      title: "Integrations",
      link: "/integrations",
    },
    {
      id: 6,
      img: tickets,
      title: "Receipts",
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-medium mb-2">Quick Links</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-3 rounded-3xl flex flex-col items-center gap-2"
          >
            {" "}
            <Link to={item?.link}>
              <img
                src={item.img}
                alt={item.title}
                className=" mb-4 font-semibold"
              />
              <p>{item.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
