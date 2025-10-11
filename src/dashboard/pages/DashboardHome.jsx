import { useState, useEffect } from "react";
import { Package, ShoppingCart, Users, Layers } from "lucide-react";
import { getAllUsers } from "../../utils/auth-api.js";
import { getAllOrders, getAllPayments } from "../../utils/order-api.js";
import { getAllProducts } from "../../utils/product-api.js";
import { getAllCategories } from "../../utils/category-api.js";

export default function DashboardHome() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await getAllProducts();
        setProductsCount(productsRes?.rows.length || 0);

        const ordersRes = await getAllOrders();
        setOrdersCount(ordersRes?.data?.length || 0);

        const paymentRes = await getAllPayments();
        setPaymentCount(Math.round(paymentRes?.totalAmount || 0));
        
        const usersRes = await getAllUsers();
        setUsersCount(usersRes?.users?.length || 0);

        const CategoryRes = await getAllCategories();
        setCategoryCount(CategoryRes?.totalCategories || 0);
      } catch (error) {
        console.error("Dashboard fetch error:", error.message);
      }
    };
    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: productsCount,
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Orders",
      value: ordersCount,
      icon: <ShoppingCart className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Total Users",
      value: usersCount,
      icon: <Users className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      title: "Total Categories",
      value: categoryCount,
      icon: <Layers className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100",
    },
    {
      title: "Total Payments",
      value: paymentCount,
      icon: <ShoppingCart className="w-6 h-6 text-pink-600" />,
      bg: "bg-pink-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          <div>
            <h2 className="text-gray-500 text-sm font-medium">{stat.title}</h2>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <span className="text-xs text-gray-400">+5% this week</span>
          </div>
          <div className={`${stat.bg} p-3 rounded-full`}>{stat.icon}</div>
        </div>
      ))}
    </div>
  );
}
