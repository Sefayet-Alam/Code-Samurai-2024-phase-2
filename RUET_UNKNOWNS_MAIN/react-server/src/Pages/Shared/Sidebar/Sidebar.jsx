import { Link, Outlet } from "react-router-dom";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import { GiMineTruck, GiBulldozer } from "react-icons/gi";
import { FaHouseFlag } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { GrUserManager } from "react-icons/gr";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Sidebar = () => {
  const { isSystemAdmin, isLandfillManager, isSTSManager } =
    useContext(AuthContext);
  return (
    <div className="drawer lg:drawer-open h-full">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-gray-200 p-5 overflow-auto lg:ml-[256px]">
        <Outlet />
      </div>
      <div className="drawer-side shadow-2xl h-full">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-2 w-64 text-base-content bg-white h-full mt-16 lg:mt-4 lg:fixed lg:left-0 overflow-auto">
          {/* ------- System Admin Routes ------- */}
          {isSystemAdmin && (
            <>
              <li>
                <Link
                  to="/system-admin/dashboard/profile"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <ImProfile /> View Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/create-user"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <FaRegUserCircle /> Create New User
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/users"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <FaUsers /> View All Users
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/register-truck"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GiMineTruck /> Register Truck
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/register-sts"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <FaHouseFlag /> Create STS
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/assign-sts-manager"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GrUserManager /> Assign STS Manager
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/assign-sts-truck"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GiMineTruck /> Assign STS Truck
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/create-landfill-site"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GiBulldozer /> Create Landfill Site
                </Link>
              </li>
              <li>
                <Link
                  to="/system-admin/dashboard/assign-lfs-manager"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GrUserManager /> Assign LFS Manager
                </Link>
              </li>
            </>
          )}
          {/* Landfill Site Manager Routes */}
          {isLandfillManager && (
            <>
              <li>
                <Link
                  to="/landfill-manager/dashboard/profile"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <ImProfile /> View Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/landfill-manager/dashboard/truck-entry"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GiMineTruck /> Truck Entry
                </Link>
              </li>
            </>
          )}
          {/* STS Manager Routes */}
          {isSTSManager && (
            <>
              <li>
                <Link
                  to="/sts-manager/dashboard/profile"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <ImProfile /> View Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/sts-manager/dashboard/truck-entry"
                  className="text-lg font-semibold text-gray-600 hover:text-blue-600 rounded-none"
                >
                  <GiMineTruck /> Truck Entry
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
