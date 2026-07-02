import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("token");
  // console.log("user from PrivateRoute:", user);
  if (!user) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
};

export default PrivateRoute;
