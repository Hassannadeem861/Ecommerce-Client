import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  ShoppingBag,
  Layers,
  BarChart2,
  Settings,
  LogOut,
  Users,
} from "lucide-react";
import { useState } from "react";
import { logoutUser } from "../../utils/auth-api";
import { logout } from "../../redux/authSlice.js";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { persistor } from "../../redux/store.js";
// import Logo from "../../assets/Adobe Express - file.png";
import Logo from "../../assets/Screenshot 2025-09-18 193509.png";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutHandler = async () => {
    setLoading(true);
    try {
      dispatch(logout());
      // persist storage clear
      await persistor.purge();

      navigate("/");
      toast.success("Logout successful!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 d-none z-50 bg-gray-800 p-2 rounded-md text-white shadow-lg hover:bg-gray-700 transition-colors border border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        bg-black text-gray-200 
        w-64 min-h-screen p-6 fixed md:relative 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        z-40 flex flex-col
        shadow-xl
        border-r border-gray-800
      `}
      >
        {/* Logo/Brand */}
        <div className="mb-8 flex items-center justify-center">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-8 w-auto sm:h-12 md:h-14 lg:h-12 object-contain"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={20} className="text-gray-400" />
                <span className="text-gray-200">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/manage-products"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingBag size={20} className="text-gray-400" />
                <span className="text-gray-200">Manage Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/categories"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Layers size={20} className="text-gray-400" />
                <span className="text-gray-200">Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/orders"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Layers size={20} className="text-gray-400" />
                <span className="text-gray-200">Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/mobile-banner"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Layers size={20} className="text-gray-400" />
                <span className="text-gray-200">Mobile Banner</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/desktop-banner"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Layers size={20} className="text-gray-400" />
                <span className="text-gray-200">Desktop Banner</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/dashboard/users"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Users size={20} className="text-gray-400" />
                <span className="text-gray-200">Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/reports"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BarChart2 size={20} className="text-gray-400" />
                <span className="text-gray-200">Reports</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings size={20} className="text-gray-400" />
                <span className="text-gray-200">Settings</span>
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-4 border-t border-gray-800">
          {loading ? (
            <button
              disabled
              className="flex items-center justify-center w-full p-3 rounded-lg bg-gray-700 text-gray-400 cursor-not-allowed"
            >
              Loading...
            </button>
          ) : (
            <button
              onClick={LogoutHandler}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
            >
              <LogOut size={20} className="text-gray-400" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
