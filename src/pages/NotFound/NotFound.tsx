import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100 px-4">
      <h1 className="text-9xl font-extrabold text-gray-800 mb-4 animate-pulse">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Oops! Page not found.</p>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
