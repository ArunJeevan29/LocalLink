import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProviderProfile from "./pages/ProviderProfile";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ManageService from "./pages/ManageService";
import ActiveJobs from "./pages/ActiveJobs";
import JobHistory from "./pages/JobHistory";
import AdminDashboard from "./pages/AdminDashboard";
import SentRequests from "./pages/SentRequests";
import ManageUsers from "./pages/ManageUsers";
import ManageListing from "./pages/ManageListing";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {user && <Sidebar />}

      <div className="flex-1 w-full overflow-y-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/provider/:id" element={<ProviderProfile />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/requests"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/active"
            element={
              <ProtectedRoute>
                <ActiveJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/history"
            element={
              <ProtectedRoute>
                <JobHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/edit"
            element={
              <ProtectedRoute>
                <ManageService />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/sent"
            element={
              <ProtectedRoute>
                <SentRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/listings" element={<ManageListing />} />

          <Route
            path="*"
            element={
              <div className="p-10">
                <h1 className="text-3xl font-bold text-red-600">
                  404 - Page Not Found
                </h1>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
