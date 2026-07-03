import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Resume
import UploadResume from "../pages/resume/UploadResume";
import ResumeHistory from "../pages/resume/ResumeHistory";
import ResumeDetails from "../pages/resume/ResumeDetails";

// Profile
import Profile from "../pages/profile/Profile";
import AuthLayout from "../layouts/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Default */}

      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public */}
      <Route element={<AuthLayout/>}>


      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

       </Route>
      {/* Protected */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/resume/upload"
            element={<UploadResume />}
          />

          <Route
            path="/resume/history"
            element={<ResumeHistory />}
          />

          <Route
            path="/resume/:id"
            element={<ResumeDetails />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

        </Route>

      </Route>

      {/* 404 */}

      <Route
        path="*"
        element={
          <h1 className="mt-10 text-center text-3xl">
            Page Not Found
          </h1>
        }
      />

    </Routes>
  );
};

export default AppRoutes;