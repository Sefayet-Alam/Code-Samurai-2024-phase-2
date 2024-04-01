import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const LandfillManagerRoute = ({ children }) => {
  const { isLandfillManager, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  } else if (!isLandfillManager) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  } else if (isLandfillManager) {
    return children;
  }
};

export default LandfillManagerRoute;
