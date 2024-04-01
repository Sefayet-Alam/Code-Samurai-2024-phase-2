import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { GiBulldozer, GiMineTruck } from "react-icons/gi";
import { FaHouseFlag, FaUsers } from "react-icons/fa6";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

const SAHome = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [sites, setSites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [sitesDataResponse, vehiclesDataResponse, userDataResponse] =
          await Promise.all([
            fetch(`${backendUrl}/mswm/sites/?format=json`, {
              method: "GET",
              headers: {
                "content-type": "application/json",
                Authorization: "Token " + localStorage.getItem("token"),
              },
            }),
            fetch(`${backendUrl}/mswm/vehicles/?format=json`, {
              method: "GET",
              headers: {
                "content-type": "application/json",
                Authorization: "Token " + localStorage.getItem("token"),
              },
            }),
            fetch(`${backendUrl}/users/?format=json`, {
              method: "GET",
              headers: {
                "content-type": "application/json",
                Authorization: "Token " + localStorage.getItem("token"),
              },
            }),
          ]);

        setSites(await sitesDataResponse.json());
        setVehicles(await vehiclesDataResponse.json());
        setUsers(await userDataResponse.json());
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [backendUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <div className="p-10 h-full w-full bg-white rounded">
        <div className="w-full text-center mb-10">
          <h1 className="text-center text-3xl font-bold">
            Welcome <span className="text-info">{user.username}</span> to your
            Dashboard
          </h1>
        </div>
        <div className="flex gap-5 justify-around">
          <div className="bg-gradient-to-r from-[#9e71ced8] to-[#9E71CE] p-10 rounded">
            <h1 className="text-2xl font-bold text-white">Total Vehicles</h1>
            <div className="flex items-center justify-around">
              <GiMineTruck className="text-white w-16 h-16" />
              <p className="text-5xl font-bold text-white">{vehicles.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-10 rounded">
            <h1 className="text-2xl font-bold text-white">Total STS Sites</h1>
            <div className="flex items-center justify-around">
              <FaHouseFlag className="text-white w-16 h-16" />
              <p className="text-5xl font-bold text-white">
                {sites.filter((site) => site.site_type === "STS").length}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded">
            <h1 className="text-2xl font-bold text-white">Landfill Sites</h1>
            <div className="flex items-center justify-around">
              <GiBulldozer className="text-white w-16 h-16" />
              <p className="text-5xl font-bold text-white">
                {sites.filter((site) => site.site_type === "Landfill").length}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-[#5dfdbd] to-[#12ffa0] p-10 rounded">
            <h1 className="text-2xl font-bold text-white">Total Users</h1>
            <div className="flex items-center justify-around">
              <FaUsers className="text-white w-16 h-16" />
              <p className="text-5xl font-bold text-white">{users.length}</p>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-around items-center">
          <div>
            <h3 className="text-center text-lg font-semibold">
              Waste Collection and Disposal
            </h3>
            <BarChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" stackId="a" fill="#8884d8" />
              <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
            </BarChart>
          </div>
          <div>
            <h3 className="text-center text-lg font-semibold -mb-16 mt-7">
              Types of waste collected
            </h3>
            <PieChart width={400} height={400}>
              <Pie
                data={data01}
                dataKey="value"
                cx={200}
                cy={200}
                outerRadius={60}
                fill="#8884d8"
              />
              <Pie
                data={data02}
                dataKey="value"
                cx={200}
                cy={200}
                innerRadius={70}
                outerRadius={90}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </div>
        </div>
      </div>
    );
  }
};

export default SAHome;
