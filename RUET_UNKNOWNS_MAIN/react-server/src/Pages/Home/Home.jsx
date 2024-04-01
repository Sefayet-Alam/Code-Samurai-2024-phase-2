import { Helmet } from "react-helmet-async";
import banner from "../../assets/banner.jpg";

const Home = () => {
  return (
    <div
      className="h-screen relative"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="absolute top-44 right-28">
        <div className="max-w-[500px] mx-auto">
          <h1 className="text-5xl font-bold text-center mb-10 text-info">
            Streamlining Waste Management
          </h1>
          <p className="text-center text-xl font-semibold text-primary">
            Efficiently coordinating landfill operations and transfer stations
            for a cleaner tomorrow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
