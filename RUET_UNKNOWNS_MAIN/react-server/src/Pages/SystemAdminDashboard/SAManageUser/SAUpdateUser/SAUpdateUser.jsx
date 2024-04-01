import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

const SAUpdateUser = () => {
  const { handleSubmit, register } = useForm();
  const [userData, setUserData] = useState({});
  const [roleData, setRoleData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [userDataResponse, rolesDataResponse] = await Promise.all([
          fetch(`${backendUrl}/users/${id}`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Token " + localStorage.getItem("token"),
            },
          }),
          fetch(`${backendUrl}/users/roles/?format=json`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: "Token " + localStorage.getItem("token"),
            },
          }),
        ]);

        setUserData(await userDataResponse.json());
        setRoleData(await rolesDataResponse.json());
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendUrl, id]);

  const handleUserUpdate = (data) => {
    fetch(`${backendUrl}/users/${userData.id}/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        alert("Update Successful");
        window.location.reload();
      } else {
        alert("Update Unsuccessful");
      }
    });
  };

  const handleRoleUpdate = (data) => {
    console.log(data);
    fetch(`${backendUrl}/users/${userData.id}/roles/`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 200) {
        alert("Update Successful");
      } else {
        alert("Update Unsuccessful");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div className="bg-white p-10 drop-shadow-md rounded-md">
        <Helmet>
          <title> Update User Details</title>
        </Helmet>
        <div className="mb-3 text-center">
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>
        <form onSubmit={handleSubmit(handleUserUpdate)}>
          <div className="max-w-[400px] mx-auto">
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block font-semibold">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="input input-info w-full"
                  defaultValue={userData.name}
                  {...register("name", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="Username" className="block font-semibold">
                  Username
                </label>
                <input
                  id="Username"
                  type="text"
                  className="input input-info w-full"
                  defaultValue={userData.username}
                  {...register("username", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="email" className="block font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input input-info w-full"
                  defaultValue={userData.email}
                  {...register("email", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <input
              type="submit"
              value="Update Profile"
              className="btn btn-success"
            />
          </div>
        </form>
        <form onSubmit={handleSubmit(handleRoleUpdate)}>
          <div className="max-w-[400px] mx-auto">
            <label htmlFor="role" className="block font-semibold">
              Update Role
            </label>
            <select
              name="role"
              id="role"
              className="select select-info w-full"
              {...register("role")}
              defaultValue={userData.role}
            >
              <option value="">--- Select a role ---</option>
              {roleData &&
                roleData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <div className="flex justify-center mt-5">
              <input
                type="submit"
                value="Update Role"
                className="btn btn-success"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
};

export default SAUpdateUser;
