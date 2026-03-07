import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Briefcase, Mail, Lock, UserPlus } from "lucide-react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.conformPassword) {
      alert("Password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },
      );

      console.log("Saved to the Database", response.data);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Server connection error";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 flex justify-center items-center gap-2">
            <UserPlus className="text-blue-600" size={32} />
            Join LocalLink
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your account to get started.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setFormData({ ...formData, role: "user" })}
                className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  formData.role === "user"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:border-blue-200"
                }`}
              >
                <User
                  size={24}
                  className={
                    formData.role === "user" ? "text-blue-600" : "text-gray-400"
                  }
                />
                <span className="font-semibold text-sm">Hire a Pro</span>
              </div>

              <div
                onClick={() => setFormData({ ...formData, role: "provider" })}
                className={`cursor-pointer p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                  formData.role === "provider"
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-500 hover:border-blue-200"
                }`}
              >
                <Briefcase
                  size={24}
                  className={
                    formData.role === "provider"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }
                />
                <span className="font-semibold text-sm">Work as a Pro</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Email Address"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="conformPassword"
                required
                className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                placeholder="Conform Password"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
