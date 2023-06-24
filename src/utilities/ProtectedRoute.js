import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isLoogedIn, children }) => {
  if (isLoogedIn === false)return <Navigate to="/login" replace />;
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
