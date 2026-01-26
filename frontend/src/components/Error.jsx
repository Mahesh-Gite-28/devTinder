import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Error = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleReload = () => {
    if (user) {
      navigate("/feed", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <img
          src="/shark.jpg"
          alt="Unexpected error"
          className="mx-auto mb-6 w-60"
        />

        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Page not found
        </h1>

        <p className="text-gray-600 text-base mb-6">
          The page you’re trying to visit doesn’t exist.
        </p>

        <button
          onClick={handleReload}
          className="px-5 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition"
        >
          Reload
        </button>
      </div>
    </div>
  );
};

export default Error;
