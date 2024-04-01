import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./../../../context/AuthContext";

const SAProfile = () => {
  const { user, authToken } = useContext(AuthContext);
  const [roleData, setRoleData] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/rbac/roles/${user.role}/`, {
      method: "GET",
      headers: {
        Authorization: "Token " + authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoleData(data));
  }, [backendUrl, authToken, user.role]);

  console.log(roleData);

  return (
    <div className="bg-white p-5 sm:p-10 drop-shadow-md rounded-md">
      <Helmet>
        <title> User Profile</title>
      </Helmet>
      <div className="max-w-[500px] mx-auto flex flex-col justify-center items-center">
        <div className="w-full text-center">
          <div className=" bg-cyan-100 p-5 rounded-lg">
            <div className="">
              <h3 className="text-2xl font-semibold text-gray-600">
                {user.username}
              </h3>
              <h3>
                <span className="font-semibold">Email:</span> {user.email}
              </h3>
            </div>
          </div>
          <div className="mt-5 bg-cyan-100 p-5 rounded-lg">
            <h3 className="text-xl">
              <span className="font-bold">Role:</span> {roleData.name}
            </h3>
            <div>
              <h3 className="font-bold text-xl mt-5">User Permissions</h3>
              <ul>
                {roleData.permissions &&
                  roleData.permissions.map((item, index) => (
                    <li key={index}>
                      {item === 1 && "Update STS Capacity"}
                      {item === 2 && "List Track Incoming Time"}
                      {item === 3 && "Update Landfill Data"}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 bg-cyan-100 p-5 rounded-lg">
            <div>
              <h1 className="text-xl font-bold">Update Password</h1>
            </div>
            <div className="flex flex-col gap-2 ">
              <h3 className="mt-5">
                <Link
                  to="/system-admin/dashboard/update-password"
                  className="btn btn-primary min-h-0 h-9 text-white font-bold"
                >
                  Change Password
                </Link>
              </h3>
            </div>
          </div>
          <div className="mt-5 bg-cyan-100 p-5 rounded-lg">
            <div>
              <h1 className="text-xl font-bold">Update Profile</h1>
            </div>
            <div className="flex flex-col gap-2 ">
              <h3 className="mt-5">
                <Link
                  to={`/system-admin/dashboard/update-user?id=${user.pk}`}
                  className="btn btn-primary min-h-0 h-9 text-white font-bold"
                >
                  Update Profile
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAProfile;
