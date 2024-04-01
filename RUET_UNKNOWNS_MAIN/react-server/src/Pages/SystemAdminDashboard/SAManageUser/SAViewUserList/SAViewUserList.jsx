import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const SAViewUserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Get all users data
  useEffect(() => {
    setIsLoading(true);
    try {
      fetch(`${backendUrl}/users/?format=json`, {
        method: "GET",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data);
          setItemCount(data.length);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [backendUrl]);

  // Get all roles data
  useEffect(() => {
    fetch(`${backendUrl}/users/roles/?format=json`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRoleData(data);
      });
  }, [backendUrl]);

  // Delete user button handler function
  const handleDeleteUserButton = (id) => {
    alert("Are you sure you want to delete this account?");
    if (alert) {
      fetch(`${backendUrl}/users/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.status === 204) {
          alert("Account deleted successfully");
          window.location.reload();
        } else {
          return res.json().then(() => {
            alert("Account deletion unsuccessful");
          });
        }
      });
    }
  };

  const roleMap = {};
  roleData.forEach((role) => {
    roleMap[role.id] = role.name;
  });

  console.log(users);
  console.log(roleMap);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div className="w-screen md:w-full h-full">
        <div className="bg-white p-5 drop-shadow-md rounded-md">
          <Helmet>
            <title> Manage Users</title>
          </Helmet>
          <div className="flex justify-between items-center flex-wrap">
            <h1 className="text-xl text-gray-600 font-bold ml-3 raleway-font">
              User List
            </h1>
            <h2 className="text-gray-600 font-bold">
              Total users: {itemCount}
            </h2>
          </div>
          <div>
            <div className="overflow-x-auto">
              <table className="table table-sm md:table-md table-zebra">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-sm">Name</th>
                    <th className="text-sm">Email</th>
                    <th className="text-sm">ID</th>
                    <th className="text-sm">Role</th>
                    <th className="text-sm">Update</th>
                    <th className="text-sm">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <th>{index + 1}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.id}</td>
                      <td>{roleMap[user.role] || "Role not found"}</td>
                      <td>
                        <Link
                          to={`/system-admin/dashboard/update-user?id=${user.id}`}
                          className="btn btn-info text-xs min-h-0 h-6 font-bold"
                        >
                          Update
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteUserButton(user.id)}
                          className="btn btn-error text-xs min-h-0 h-6 font-bold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SAViewUserList;
