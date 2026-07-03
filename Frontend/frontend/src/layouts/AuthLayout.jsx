import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <h1 className="text-4xl font-bold text-blue-600">

            ResumeAI

          </h1>

          <p className="mt-2 text-gray-500">

            AI Powered Resume Analyzer

          </p>

        </div>

        <Outlet />

      </div>

    </div>
  );
};

export default AuthLayout;