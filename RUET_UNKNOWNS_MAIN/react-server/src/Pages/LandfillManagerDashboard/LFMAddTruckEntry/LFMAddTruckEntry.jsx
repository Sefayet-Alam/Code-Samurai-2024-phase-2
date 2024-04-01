import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import TimePicker from "react-time-picker";

const LFMAddTruckEntry = () => {
  const { register, handleSubmit, reset } = useForm();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Send request to server function
  const onSubmit = (data) => {
    console.log(data);

    // fetch(`${backendUrl}/vehicles/`, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // }).then((res) => {
    //   if (res.status === 201) {
    //     setIsAddVehicleSuccessful(true);
    //     document.getElementById("adminAddVehicleActionModal").showModal();
    //   } else {
    //     return res.json().then((data) => {
    //       setErrorMessage(data.message);
    //       document.getElementById("adminAddVehicleActionModal").showModal();
    //     });
    //   }
    // });
  };

  return (
    <div className="bg-white p-5 drop-shadow-md rounded-md">
      <Helmet>
        <title>Truck Entry</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Add Truck Entry
      </h1>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="landfill_id"
                className="font-semibold text-gray-600"
              >
                Landfill Site ID:
              </label>
              <input
                type="text"
                id="landfill_id"
                name="landfill_id"
                className="input input-accent w-full"
                placeholder="Write Landfill Identification number"
                {...register("landfill_id", {
                  required: true,
                })}
              />
            </div>
            <div>
              <label
                htmlFor="truck_number"
                className="block font-semibold text-gray-600"
              >
                Truck Number:
              </label>
              <input
                type="text"
                name="truck_number"
                id="truck_number"
                className="input input-accent w-full"
                {...register("truck_number", {
                  required: true,
                })}
                placeholder="Write truck number"
              />
            </div>
            <div>
              <label
                htmlFor="waste_weight"
                className="font-semibold text-gray-600"
              >
                Weight of waste:
              </label>
              <input
                type="number"
                id="waste_weight"
                name="waste_weight"
                className="input input-accent w-full"
                placeholder="Write weight of waste"
                {...register("waste_weight", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className="flex gap-5">
              <div className="w-full">
                <label
                  htmlFor="arrival_time"
                  className="font-semibold text-gray-600"
                >
                  Time of arrival:
                </label>
                <input
                  type="time"
                  name="arrival_time"
                  className="block p-2 border border-accent rounded w-full"
                  {...register("arrival_time", {
                    required: true,
                  })}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="departure_time"
                  className="font-semibold text-gray-600"
                >
                  Time of departure:
                </label>
                <input
                  type="time"
                  name="departure_time"
                  className="block p-2 border border-accent rounded w-full"
                  {...register("departure_time", {
                    required: true,
                  })}
                />
              </div>
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
};

export default LFMAddTruckEntry;
