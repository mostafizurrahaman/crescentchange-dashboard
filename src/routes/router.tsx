import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Analytics from "../pages/Analytics/Analytics";
import Donors from "../pages/Donors/Donors";
import Deposits from "../pages/Deposits/Deposits";
import MainLayout from "../components/layouts/MainLayout";


export const router = createBrowserRouter([
    {
        path: "/", 
        element: <MainLayout />, 
        children: [
            { path: "/", element: <Profile />, index: true }, 
            { path: "profile", element: <Profile /> },
            { path: "analytics", element: <Analytics /> },
            { path: "donors", element: <Donors /> },
            { path: "deposits", element: <Deposits /> },
        ],
    },
]);
