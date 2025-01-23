import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Analytics from "../pages/Analytics/Analytics";
import Donors from "../pages/Donors/Donors";
import Deposits from "../pages/Deposits/Deposits";
import MainLayout from "../components/layouts/MainLayout";
import SignUp1 from "../components/AuthComponents/SignUp1";
import SignUp2 from "../components/AuthComponents/SignUp2";
import SignUp3 from "../components/AuthComponents/SignUp3";
import SignUp4 from "../components/AuthComponents/SignUp4";
import SignUp5 from "../components/AuthComponents/SignUp5";



export const router = createBrowserRouter([
    {
        path: "/auth/signUp1",
        element: <SignUp1 />
    },
    {
        path: "/auth/signUp2",
        element: <SignUp2 />
    },
    {
        path: "/auth/signUp3",
        element: <SignUp3 />
    },
    {
        path: "/auth/signUp4",
        element: <SignUp4 />
    },
    {
        path: "/auth/signUp5",
        element: <SignUp5 />
    },
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
