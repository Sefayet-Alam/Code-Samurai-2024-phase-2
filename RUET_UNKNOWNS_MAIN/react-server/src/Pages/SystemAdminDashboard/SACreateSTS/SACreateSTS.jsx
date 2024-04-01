import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const SACreateSTS = () => {
  const { register, handleSubmit, reset } = useForm();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Send request to server function
  const onSubmit = (data) => {
    data.site_type = "STS";

    fetch(`${backendUrl}/mswm/sites/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status === 201) {
        alert("Secondary Transfer Station created successfully");
        reset();
      } else {
        return res.json().then(() => {
          alert("STS creation unsuccessful");
        });
      }
    });
  };

  return (
    <div className="bg-white p-5 drop-shadow-md rounded-md">
      <Helmet>
        <title>Register STS</title>
      </Helmet>
      <h1 className="text-xl text-gray-600 font-semibold p-5 text-center">
        Register Secondary Transfer Station
      </h1>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-[600px]"
        >
          <div className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="ward_number"
                className="font-semibold text-gray-600"
              >
                Ward Number:
              </label>
              <input
                type="number"
                id="ward_number"
                name="ward_number"
                className="input input-accent w-full"
                placeholder="Write ward number"
                {...register("ward_number", {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="block font-semibold text-gray-600"
              >
                STS Capacity:
              </label>
              <input
                type="number"
                name="capacity"
                id="capacity"
                className="input input-accent w-full"
                {...register("capacity", {
                  required: true,
                  valueAsNumber: true,
                })}
                placeholder="Write capacity amount"
              />
            </div>
            <div>
              <label
                htmlFor="sts_location"
                className="font-semibold text-gray-600"
              >
                Location:{" "}
                <span className="text-xs text-error">
                  (Please input location as latitude and longitude coordinates,
                  E.g. - 23.795, 90.4148)
                </span>
              </label>
              <div className="flex gap-5 mt-1">
                <input
                  type="text"
                  id="latitude"
                  className="input input-accent w-full"
                  placeholder="Latitude"
                  {...register("latitude", {
                    required: true,
                  })}
                />
                <input
                  type="text"
                  id="longitude"
                  className="input input-accent w-full"
                  placeholder="Longitude"
                  {...register("longitude", {
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

export default SACreateSTS;
