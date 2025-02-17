import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <div className="flex space-x-4">
      <Link to="/login">
        <button className="px-6 py-2 font-semibold text-black bg-white rounded-lg shadow-md hover:bg-gray-200 transition">
          Login
        </button>
      </Link>
      <Link to="/signup">
        <button className="px-6 py-2 font-semibold text-black bg-white rounded-lg shadow-md hover:bg-gray-200 transition">
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default AuthButtons;
