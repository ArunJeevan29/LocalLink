import {
  Home,
  Send,
  Briefcase,
  FolderOpen,
  Settings,
  Bell,
  Wrench,
  TrendingUp,
  Edit,
  Users,
  Database,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom"; // 🌟 ADDED: This fixes the error!
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  // 🌟 FIXED: Now it dynamically reads the role from whoever is logged in!
  const currentRole = user?.role;

  const userMenus = [
    { name: "Find Services", icon: Home, path: "/" },
    { name: "Sent Requests", icon: Send, path: "/dashboard/sent" },
    { name: "My Hired Pros", icon: Briefcase, path: "/dashboard/active" },
    { name: "Past Hires", icon: FolderOpen, path: "/dashboard/history" },
  ];

  // 2. Menus ONLY for Providers (Selling Side)
  const providerMenus = [
    { name: "Incoming Requests", icon: Bell, path: "/dashboard/requests" },
    { name: "Active Client Jobs", icon: Wrench, path: "/dashboard/active" },
    { name: "Business History", icon: TrendingUp, path: "/dashboard/history" },
    { name: "Edit My Listing", icon: Edit, path: "/dashboard/edit" },
  ];

  const adminMenus = [
    { name: "Platform Overview", icon: LayoutDashboard, path: "/admin" },
    { name: "Manage Users", icon: Users, path: "/admin" },
    { name: "Manage Listings", icon: Database, path: "/admin" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col">
      <div className="text-2xl font-bold text-blue-400 mb-8 border-b border-gray-700 pb-4">
        LocalLink 📍
      </div>
      <nav className="flex-1 space-y-2">
        {currentRole === "admin" &&
          adminMenus.map((menu, index) => (
            <Link
              key={index}
              to={menu.path}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <menu.icon size={20} className="text-gray-400" />
              <span>{menu.name}</span>
            </Link>
          ))}

        {currentRole === "provider" && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              My Business
            </p>
            {providerMenus.map((menu, index) => (
              <Link
                key={index}
                to={menu.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-900/50 text-blue-100 transition-colors"
              >
                <menu.icon size={20} className="text-blue-400" />
                <span>{menu.name}</span>
              </Link>
            ))}
          </div>
        )}

        {(currentRole === "user" || currentRole === "provider") && (
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              {currentRole === "provider" ? "Hiring Others" : "Main Menu"}
            </p>
            {userMenus.map((menu, index) => (
              <Link
                key={index}
                to={menu.path}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <menu.icon size={20} className="text-gray-400" />
                <span>{menu.name}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="border-t border-gray-700 pt-4 mt-auto">
        <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-gray-800">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="font-medium text-sm text-gray-200">
            {user?.name || "User"}
          </span>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-900/50 text-red-400 transition-colors"
        >
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
