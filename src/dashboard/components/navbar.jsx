import { useState } from "react";
import { Menu, X, Bell, User } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow px-4 py-3 flex justify-between items-center sticky top-0 z-20">
      {/* Mobile menu button */}
      <button 
        className="md:hidden text-gray-700"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button className="p-1 text-gray-600 hover:text-gray-900">
          <Bell size={20} />
        </button>
        
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm">Admin User</span>
          <img 
            src="https://www.nicepng.com/png/detail/263-2635963_admin-png.png" 
            alt="avatar" 
            className="rounded-full w-8 h-8"
            loading="lazy"
          />
        </div>

        {/* Mobile profile dropdown */}
        <div className="md:hidden relative">
          <button className="p-1">
            <User size={20} />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <div className="px-4 py-2 text-sm text-gray-700 flex items-center gap-2">
                <img 
                  src="https://www.nicepng.com/png/detail/263-2635963_admin-png.png" 
                  alt="avatar" 
                  className="rounded-full w-6 h-6"
                  loading="lazy"
                />
                <span>Admin User</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}