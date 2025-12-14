import { createBrowserRouter } from "react-router-dom";
import Profile from "../pages/Profile/Profile";
import Analytics from "../pages/Analytics/Analytics";
import Donors from "../pages/Donors/Donors";
import Deposits from "../pages/Deposits/Deposits";
// import MainLayout from "../components/layouts/MainLayout";
import SignUp1 from "../components/AuthComponents/SignUp1";
import SignUp2 from "../components/AuthComponents/SignUp2";
import SignUp3 from "../components/AuthComponents/SignUp3";
import SignUp4 from "../components/AuthComponents/SignUp4";
import SignUp5 from "../components/AuthComponents/SignUp5";
import Login from "../pages/Auth/Login/Login";
import ForgatePassword from "../pages/Auth/ForgatePassword/ForgatePassword";
import VarificationComponent from "../pages/Auth/Varification/Varification";
import ConfirmPassword from "../pages/Auth/ConfirmPassword/ConfirmPassword";
import Subscriptions from "../pages/Subscriptions/Subscriptions";
import EditProfile from "../components/PagesComponents/EditProfile";
import AccessTab from "../components/ProfileComponents/AccessTab";
import Envlopes from "../components/ProfileComponents/Envlopes";
import Seetings from "../pages/Settings/Seetings";
import RootLayout from "../components/layouts/RootLayout";
import Integration from "../pages/Integration/Integration";
import Reports from "../pages/Reports/Reports";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/auth/signUp1",
    element: <SignUp1 />,
  },
  {
    path: "/auth/signUp2",
    element: <SignUp2 />,
  },
  {
    path: "/auth/signUp3",
    element: <SignUp3 />,
  },
  {
    path: "/auth/signUp4",
    element: <SignUp4 />,
  },
  {
    path: "/auth/signUp5",
    element: <SignUp5 />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/forgate-password",
    element: <ForgatePassword />,
  },
  {
    path: "/auth/verifyOtp",
    element: <VarificationComponent />,
  },
  {
    path: "/auth/confirm-password",
    element: <ConfirmPassword />,
  },

  // private routes
  {
    element: <PrivateRoute></PrivateRoute>,
    children: [
      {
        path: "/",
        element: <RootLayout />,
        children: [
          { path: "/", element: <Analytics />, index: true },
          { path: "/analytics", element: <Analytics /> },
          { path: "donors", element: <Donors /> },
          { path: "deposits", element: <Deposits /> },
          { path: "integrations", element: <Integration /> },
          { path: "reports", element: <Reports /> },
          { path: "deposits", element: <Deposits /> },
          { path: "subscription", element: <Subscriptions /> },
          { path: "profile", element: <Profile /> },
          { path: "edit-profile", element: <EditProfile /> },
          { path: "access", element: <AccessTab /> },
          { path: "causes", element: <Envlopes /> },
          { path: "settings", element: <Seetings /> },
        ],
      },
    ],
  },
]);
