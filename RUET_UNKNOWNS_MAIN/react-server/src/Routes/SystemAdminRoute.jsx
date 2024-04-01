import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SystemAdminRoute = ({ children }) => {
  const { isSystemAdmin, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  } else if (!isSystemAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  } else if (isSystemAdmin) {
    return children;
  }
};

export default SystemAdminRoute;
