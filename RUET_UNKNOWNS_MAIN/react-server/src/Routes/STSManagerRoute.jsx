import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const STSManagerRoute = ({ children }) => {
  const { isSTSManager, isLoading } = useContext(AuthContext);
  const location = useLocation();
  console.log(isSTSManager);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  } else if (!isSTSManager) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  } else if (isSTSManager) {
    return children;
  }
};

export default STSManagerRoute;
