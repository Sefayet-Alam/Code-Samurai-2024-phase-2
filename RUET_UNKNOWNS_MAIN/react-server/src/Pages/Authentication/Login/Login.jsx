import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (data) => {
    setIsLoginLoading(true);
    fetch(`${backendUrl}/auth/login/?format=json`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((responseData) => {
        localStorage.setItem("token", responseData.key);
        window.location.reload();
      });
  };

  return (
    <div className="flex justify-center">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-full max-w-md sm:bg-base-200 sm:my-6 2xl:my-20 p-5 sm:p-10 sm:rounded-lg">
        <div>
          <h1 className="text-4xl font-extrabold cinzel-font uppercase text-center mb-10 text-success">
            Login
          </h1>
        </div>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-10">
            <div>
              <label
                htmlFor="username"
                className="text-xl font-semibold text-gray-500"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="input input-bordered input-success w-full"
                {...register("username", {
                  required: true,
                })}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xl font-semibold text-gray-500"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="input input-bordered input-success w-full"
                {...register("password", {
                  required: true,
                })}
              />
              <input
                type="checkbox"
                id="showPasswordToggle"
                className="mt-2"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPasswordToggle">Show Password</label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn btn-success w-1/2 text-white font-semibold"
              >
                Login{" "}
                {isLoginLoading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
