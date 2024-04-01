import Navbar from "./../Pages/Shared/Navbar/Navbar";
import Sidebar from "../Pages/Shared/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none h-16">
        <Navbar />
      </div>
      <div className="grow">
        <Sidebar />
      </div>
    </div>
  );
};

export default DashboardLayout;
