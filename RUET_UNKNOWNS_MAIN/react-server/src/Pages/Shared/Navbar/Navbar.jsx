import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { user, isSystemAdmin, isLandfillManager, isSTSManager } =
    useContext(AuthContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let location = useLocation();

  const handleLogOut = () => {
    fetch(`${backendUrl}/auth/logout/`, {
      method: "POST",
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        window.location.reload();
      }
    });
  };

  return (
    <div className="navbar fixed z-10 bg-white drop-shadow-md md:px-3">
      <div className="flex-1">
        <label
          htmlFor="my-drawer-2"
          className={`drawer-button lg:hidden btn btn-ghost p-2 ${
            location.pathname === "/" || location.pathname === "/home"
              ? "hidden"
              : ""
          }`}
        >
          <AiOutlineMenu className="text-2xl" />
        </label>
        <Link to="/" className="btn btn-ghost normal-case hidden sm:flex px-1">
          <div>
            <img src={logo} alt="" className="max-w-[170px]" />
          </div>
        </Link>
        {/* Logo for small devices */}
        <Link
          to="/"
          className="btn btn-ghost normal-case text-3xl font-black tracking-wider cinzel-font flex sm:hidden"
        >
          <div>
            <img src={logo} alt="" className="w-32 md:w-[170px]" />
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <div className="mx-3">
          {isSystemAdmin && (
            <Link
              to="/system-admin/dashboard"
              className="btn btn-primary border-0 bg-[#4F65F1] text-white font-normal min-h-0 h-9 rounded-full text"
            >
              Dashboard
            </Link>
          )}
          {isSTSManager && (
            <Link
              to="/sts-manager/dashboard"
              className="btn btn-primary border-0 bg-[#4F65F1] text-white font-normal min-h-0 h-9 rounded-full text"
            >
              Dashboard
            </Link>
          )}
          {isLandfillManager && (
            <Link
              to="/landfill-manager/dashboard"
              className="btn btn-primary border-0 bg-[#4F65F1] text-white font-normal min-h-0 h-9 rounded-full text"
            >
              Dashboard
            </Link>
          )}
        </div>
        {user?.username ? (
          <div>
            <button
              className="btn btn-error border-0 min-h-0 h-9 rounded-full"
              onClick={() => handleLogOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-info border-0 min-h-0 h-9 rounded-full"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
