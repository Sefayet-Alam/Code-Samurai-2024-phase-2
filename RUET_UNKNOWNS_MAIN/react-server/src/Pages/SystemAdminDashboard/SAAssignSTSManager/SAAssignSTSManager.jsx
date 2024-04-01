import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const SAAssignSTSManager = () => {
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
        <title>Assign STS Manager</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Assign Manager to Secondary Transfer Station
      </h1>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="truck_type"
                className="block font-semibold text-gray-600"
              >
                Select Secondary Transfer Station:
              </label>
              <select
                name="truck_type"
                id="truck_type"
                className="select select-accent w-full"
                {...register("truck_type", {
                  required: true,
                })}
              >
                <option value="">--- Select a station ---</option>
                <option value="open">Station 1</option>
                <option value="dump">Station 2</option>
                <option value="compactor">Station 3</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="truck_capacity"
                className="block font-semibold text-gray-600"
              >
                Select Manager:
              </label>
              <select
                name="truck_capacity"
                id="truck_capacity"
                className="select select-accent w-full"
                {...register("truck_capacity", {
                  required: true,
                })}
              >
                <option value="">--- Select Manager ---</option>
                <option value={3}>Manager 1</option>
                <option value={5}>Manager 2</option>
                <option value={7}>Manager 3</option>
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
};

export default SAAssignSTSManager;
