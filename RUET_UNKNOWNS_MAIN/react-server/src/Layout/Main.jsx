import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
  return (
    <div>
      <div className="flex flex-col h-16">
        <Navbar />
      </div>
      <div className="flex-grow">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Main;
