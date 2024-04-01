import { useState } from "react";
import { useForm } from "react-hook-form";

const SaCreateUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    fetch(`${backendUrl}/users/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        alert("User created successfully");
        reset();
      } else {
        return res.json().then((data) => {
          alert("User creating unsuccessful", data.message);
        });
      }
    });
  };

  return (
    <div className="bg-white p-5 sm:p-10 drop-shadow-md rounded-md">
      <div className="mb-5">
        <h1 className="text-center text-3xl font-bold">Register New User</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center gap-5 md:gap-10">
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="email" className="font-semibold text-gray-500">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered input-accent w-full placeholder-black"
                  placeholder="Email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Write your email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-error">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="name" className="font-semibold text-gray-500">
                  Full name:
                </label>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered input-accent w-full placeholder-black"
                  placeholder="Write name"
                  {...register("name", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="font-semibold text-gray-500"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="input input-bordered input-accent w-full placeholder-black"
                  placeholder="Write username"
                  {...register("username", {
                    required: {
                      value: true,
                    },
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="font-semibold text-gray-500"
                >
                  Password:
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="input input-bordered input-accent w-full placeholder-black"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password must be 8 characters long",
                    },
                    maxLength: 20,
                  })}
                />
                <input
                  type="checkbox"
                  id="showPasswordToggle"
                  className="mt-2"
                  onChange={() => setShowPassword(!showPassword)}
                />{" "}
                <label htmlFor="showPasswordToggle">Show Password</label>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="btn btn-accent w-full max-w-[250px] text-white font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaCreateUser;
