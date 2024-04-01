import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const SARegisterTruck = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [truckTypes, setTruckTypes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Get all truck types
  useEffect(() => {
    setIsLoading(true);
    fetch(`${backendUrl}/mswm/vehicle-types/`, {
      method: "GET",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTruckTypes(data);
        setIsLoading(false);
      });
  }, [backendUrl]);

  // Send request to server function
  const onSubmit = (data) => {
    console.log(data);
    fetch(`${backendUrl}/mswm/vehicles/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        alert("Truck created successfully");
        reset();
      } else {
        return res.json().then(() => {
          alert("Truck creation unsuccessful");
        });
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
      <div className="bg-white p-5 drop-shadow-md rounded-md">
        <Helmet>
          <title>Register Truck</title>
        </Helmet>
        <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
          Register New Truck
        </h1>
        <div className="w-full flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[600px]"
          >
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="registration_number"
                  className="font-semibold text-gray-600"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registration_number"
                  className="input input-accent w-full"
                  placeholder="Write number plate number"
                  {...register("registration_number", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <label
                  htmlFor="vehicle_type"
                  className="block font-semibold text-gray-600"
                >
                  Truck Type:
                </label>
                <select
                  name="vehicle_type"
                  id="vehicle_type"
                  className="select select-accent w-full"
                  {...register("vehicle_type", {
                    required: true,
                  })}
                >
                  <option value="">--- Select a type ---</option>
                  {truckTypes.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-accent w-1/2 text-white font-semibold"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default SARegisterTruck;
