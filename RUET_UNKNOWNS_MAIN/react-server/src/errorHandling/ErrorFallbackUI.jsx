import { useNavigate, useRouteError } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ErrorFallbackUI = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <Helmet>
        <title>Error</title>
      </Helmet>
      <h1 className="text-5xl font-black text-red-600">
        Oops! There is an error
      </h1>

      <p className="text-xl max-w-[700px] my-10">
        It looks like there is an error on this page. We are sorry for the
        inconvenience. Our engineers have been notified and are working to fix
        it. Please try again later.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 py-1 px-8 rounded-lg text-white"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorFallbackUI;
