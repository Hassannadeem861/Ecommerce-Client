import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
