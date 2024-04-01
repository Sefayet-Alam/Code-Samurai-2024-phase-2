import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const STSHome = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-full w-full flex justify-center items-center bg-white rounded">
      <h1 className="text-center text-5xl font-bold max-w-[700px]">
        Welcome <span className="text-info">{user.username}</span> to your
        dashboard
      </h1>
    </div>
  );
};

export default STSHome;
