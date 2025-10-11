import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaBus,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import AuthModal from "../pages/login";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import Logo from "../assets/images-removebg-preview.png";
import Logo from "../assets/Screenshot 2025-09-18 193509.png";
// import Logo from "../assets/logo.jpg";
import Sidebar from "../components/Sidebar.jsx";
import { motion, AnimatePresence } from "framer-motion";
import WomenImage from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
import MenImage from "../assets/13TH-AUG-25-whats-new-mens-stitched.jpg";
import { getAllCategories } from "../utils/category-api.js";
import { getAllProducts } from "../utils/product-api.js";
import "../styles/global.css";
import { removeItem, updateQuantity } from "../redux/cartSlice.js";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleDarkMode } from "../redux/themeSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Mobile menu
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [authOpen, setAuthOpen] = useState(false); // Auth Sidebar
  const [isCartOpen, setIsCartOpen] = useState(false); // Cart Sidebar
  const [showSearch, setShowSearch] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const category = await getAllCategories();
      setCategories(category?.categories || []);
    } catch (error) {
      console.log("Error in fetching categories: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res?.rows || []);
    } catch (error) {
      console.log("Error in fetching products: ", error.message);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  // const handleRemoveItem = (item) => {
  //   dispatch(removeItem(item.id));
  // };

  const menuItems = [
    { name: "NEW IN" },
    {
      name: "WOMAN",
      // subItems: [],
    },
    // { name: "MENS" },
    // { name: "ME & MY" },
    // { name: "CUSTOMIZATION" },
    // {
    //   name: "ACCESSORIES",
    //   // subItems: ["Shoes", "Perfumes", "Bags", "Belts", "Fragrances", "Goggles"],
    // },
    // { name: "UP COMMING" },
    { name: "SHOP" },
  ];

  const toggleSubmenu = (itemName) => {
    setActiveSubmenu(activeSubmenu === itemName ? null : itemName);
  };

  // REDUX ITEM REMOVE FUNCTION
  const handleDelete = (id) => {
    localStorage.removeItem("guest_session_id");
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (item, change) => {
    dispatch(updateQuantity({ id: item.id, change }));
  };

  return (
    <header className="font-poppins sticky top-0 bg-white dark:bg-gray-900 z-40">
      {/* Top Navbar */}

      <div className="max-w-[1400px] mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-8 w-auto sm:h-12 md:h-14 lg:h-12 object-contain"
            loading="lazy"
          />
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim() !== "") {
              // navigate(`/search?q=${encodeURIComponent(search)}`);
              window.location.href = `/search?q=${encodeURIComponent(search)}`;
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative w-[700px] hidden lg:block"
        >
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="FIND YOUR FAVOURITES"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-sm pl-10 pr-4 py-2.5 w-full text-base focus:outline-none font-montserrat-400"
          />
        </form>

        {/* Dashboard btn */}
        <div className="flex items-center space-x-4 sm:space-x-6 text-xl sm:text-2xl">
          {/* Dashboard Button (role === 1) */}
          {loginUser?.user?.role === 1 && (
            <Link to="/dashboard" className="hidden sm:block">
              <Button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 text-base font-montserrat-400">
                DASHBOARD
              </Button>
            </Link>
          )}

          {/* Mobile Search Toggle */}
          <button
            className="lg:hidden text-lg sm:text-xl"
            onClick={() => setShowSearch(!showSearch)}
          >
            <FaSearch />
          </button>

          {/* <FaBus className="cursor-pointer hover:text-gray-600" /> */}

          <FaUser
            onClick={() => setAuthOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          {/* 
          <button onClick={() => dispatch(toggleDarkMode())} className="p-2">
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button> */}

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <FaShoppingCart className="hover:text-gray-600" />
            {cart?.items?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cart.items.length}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim() !== "") {
              // navigate(`/search?q=${encodeURIComponent(search)}`);
              window.location.href = `/search?q=${encodeURIComponent(search)}`;
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="px-4 pb-3 lg:hidden"
        >
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded pl-10 pr-4 py-2 w-full text-base focus:outline-none"
            />
          </div>
        </form>
      )}

      {/* DESKTOP*/}
      <nav className="bg-white border-t hidden lg:block relative mt-0">
        <ul className="mt-2 flex justify-center space-x-10 py-3 text-base sm:text-lg font-montserrat tracking-wide">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`cursor-pointer hover:text-gray-700 relative group ${
                item.name === "ACCESSORIES" ||
                item.name === "WOMAN" ||
                item.name === "MENS"
                  ? "text-black hover:text-gray-700"
                  : ""
              }`}
              onMouseEnter={() =>
                (item.name === "WOMAN" ||
                  item.name === "MENS" ||
                  item.name === "NEW IN" ||
                  item.name === "ACCESSORIES") &&
                setActiveSubmenu(item.name)
              }
              onMouseLeave={() =>
                (item.name === "WOMAN" ||
                  item.name === "MENS" ||
                  item.name === "NEW IN" ||
                  item.name === "ACCESSORIES") &&
                setActiveSubmenu(null)
              }
            >
              {/* <li
                key={index}
                className="cursor-pointer hover:text-gray-700 relative group"
                onClick={() => {
                  if (item.name === "SHOP") {
                    navigate("/shop");
                  }
                }}
              >
                <div className="flex items-center">
                  {item.name}
                  {item.subItems && (
                    <span className="ml-1">
                      {activeSubmenu === item.name ? (
                        <FaChevronUp size={14} />
                      ) : (
                        <FaChevronDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </li> */}

              <li
                key={index}
                className="cursor-pointer text-black hover:text-gray-700 relative group"
                onClick={() => {
                  if (item.name === "SHOP") {
                    // navigate("/shop");
                    window.location.href = `/shop`;
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                <div className="flex items-center">
                  {item.name}
                  {item.subItems && (
                    <span className="ml-1">
                      {activeSubmenu === item.name ? (
                        <FaChevronUp size={14} />
                      ) : (
                        <FaChevronDown size={14} />
                      )}
                    </span>
                  )}
                </div>
              </li>

              {/* ✅ WOMAN mega menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("WOMAN")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {item.name === "WOMAN" && activeSubmenu === "WOMAN" && (
                  <div className="absolute left-[-685px] mt-1 w-[1580px] bg-white rounded-md py-6 z-50 flex">
                    {/* Left: Static Women Image */}
                    <div className="w-1/2 p-3 text-center">
                      {products?.filter((p) => p.women === 1).length > 0 ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            JSON.parse(
                              products.find(
                                (p) =>
                                  p.women === 1 &&
                                  p.productImg &&
                                  JSON.parse(p.productImg)?.length > 0
                              ).productImg
                            )[0]
                          }`}
                          // alt={products[0].name}
                          className="w-[300px] h-[450px] object-cover mx-auto"
                          loading="lazy"
                        />
                      ) : (
                        <p>No product found</p>
                      )}
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-1 gap-10 -ms-50">
                      {/* UNSTITCHED */}
                      <div>
                        <h2 className="text-lg font-bold mb-1 border-b pb-1">
                          UNSTITCHED
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                          {products
                            ?.filter((p) => p.un_switch === 1 && p.women === 1)
                            .slice(0, 10)
                            .map((p) => (
                              <div
                                key={p.id}
                                className="text-gray-800 cursor-pointer"
                                onClick={() =>
                                  (window.location.href = `/product-detail/${p.id}`)
                                }
                              >
                                {p.name || "Not product avaiable......."}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* READY TO WEAR */}
                      <div>
                        <h2 className="text-lg font-bold mb-1 border-b pb-1">
                          READY TO WEAR
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                          {products
                            ?.filter((p) => p.un_switch === 0 && p.women === 1)
                            .slice(0, 10)
                            .map((p) => (
                              <div
                                key={p.id}
                                className="text-gray-800 cursor-pointer"
                                onClick={() =>
                                  (window.location.href = `/product-detail/${p.id}`)
                                }
                              >
                                {p.name || "Not product avaiable......."}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* WEST */}
                      {/* <div>
                      <h2 className="text-lg font-bold mb-1 border-b pb-1">
                        WEST
                      </h2>
                      <div className="grid grid-cols-1 gap-3">
                        {products
                          // ?.filter((p) =>
                          //   p.categories?.some((c) =>
                          //     c.name.toLowerCase().includes("woman")
                          //   )
                          // )
                          .slice(0, 10)
                          .map((p) => (
                            <div
                              key={p.id}
                              className="text-gray-800 cursor-pointer"
                              onClick={() =>
                                (window.location.href = `/collection/shop-by-category/${p.id}`)
                              }
                            >
                              {p.name || "Not product avaiable......."}
                            </div>
                          ))}
                      </div>
                    </div> */}
                    </div>
                  </div>
                )}
              </div>

              {/* ✅ MENS mega menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("MENS")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {item.name === "MENS" && activeSubmenu === "MENS" && (
                  <div className="absolute left-[-795px] mt-1 w-[1580px] bg-white rounded-md py-6 z-50 flex">
                    {/* Left: Static Men Image */}
                    <div className="w-1/2 p-3 text-center">
                      {products?.filter((p) => p.men === 1).length > 0 ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            JSON.parse(
                              products.find(
                                (p) =>
                                  p.men === 1 &&
                                  p.productImg &&
                                  JSON.parse(p.productImg)?.length > 0
                              ).productImg
                            )[0]
                          }`}
                          // alt={products[0].name}
                          className="w-[300px] h-[450px] object-cover mx-auto"
                          loading="lazy"
                        />
                      ) : (
                        <p>No product found</p>
                      )}
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-1 gap-10 -ms-50">
                      {/* UNSTITCHED */}
                      <div>
                        <h2 className="text-lg font-bold mb-1 border-b pb-1">
                          UNSTITCHED
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                          {products
                            ?.filter((p) => p.un_switch === 1 && p.men === 1)
                            .slice(0, 10)
                            .map((p) => (
                              <div
                                key={p.id}
                                className="text-gray-800 cursor-pointer"
                                onClick={() =>
                                  (window.location.href = `/product-detail/${p.id}`)
                                }
                              >
                                {p.name || "Not product avaiable......."}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* READY TO WEAR */}
                      <div>
                        <h2 className="text-lg font-bold mb-1 border-b pb-1">
                          READY TO WEAR
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                          {products
                            ?.filter((p) => p.un_switch === 0 && p.men === 1)
                            .slice(0, 10)
                            .map((p) => (
                              <div
                                key={p.id}
                                className="text-gray-800 cursor-pointer"
                                onClick={() =>
                                  (window.location.href = `/product-detail/${p.id}`)
                                }
                              >
                                {p.name || "Not product available......."}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* {NEW IN mega menu} */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("NEW IN")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {/* <button className="px-4 py-2 font-semibold hover:text-blue-600">
                  NEW IN
                </button> */}

                {item.name === "NEW IN" && activeSubmenu === "NEW IN" && (
                  <div className="absolute left-[-585px] mt-1 w-[1580px] bg-white rounded-md py-6 z-50 flex">
                    {/* Left: Latest Product Image */}
                    <div className="w-1/2 p-3 text-center">
                      {products.length > 0 ? (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            JSON.parse(products[0].productImg)[0]
                          }`}
                          alt={products[0].name}
                          className="w-[300px] h-[450px] object-cover mx-auto"
                          loading="lazy"
                        />
                      ) : (
                        <p className="text-gray-500">No Product Found</p>
                      )}
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-1 gap-10 -ms-50">
                      <div>
                        <h2 className="text-lg font-bold mb-1 border-b pb-1">
                          BY CATEGORY
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                          {categories?.slice(0, 10).map((cat, index) => (
                            <div key={index}>
                              <h3
                                className="font-semibold text-gray-800 cursor-pointer"
                                onClick={() => {
                                  window.location.href = `/collection/shop-by-category/${cat.id}`;

                                  // navigate(
                                  //   `/collection/shop-by-category/${cat.id}`
                                  // );
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {cat.name}
                              </h3>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Products Section */}
                      <div>
                        <h2 className="text-lg font-bold mb-1 border-b pb-1">
                          BY COLLECTION
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                          {products
                            ?.slice(0, 10)
                            .filter((data) => data.un_switch === 0)
                            .map((prod, i) => (
                              <div
                                key={i}
                                className="text-gray-700 cursor-pointer"
                                onClick={() => {
                                  // navigate(`/product-detail/${prod.id}`);
                                  window.location.href = `/product-detail/${prod.id}`;
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {prod.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ✅ ACCESSORIES submenu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("ACCESSORIES")}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                {/* Dropdown */}
                {item.name === "ACCESSORIES" &&
                  activeSubmenu === "ACCESSORIES" && (
                    <div className="absolute left-[-795px] mt-1 w-[1600px] bg-white rounded-md py-6 z-50 flex">
                      <div className="flex flex-1 gap-10 -ms-50 text-center">
                        <h2 className="text-2xl font-bold text-gray-600 tracking-wide w-full">
                          COMING SOON
                        </h2>
                      </div>
                    </div>
                  )}
              </div>

              {/* ✅ Other dropdowns (normal) */}
              {item.subItems &&
                item.name !== "WOMAN" &&
                item.name !== "MENS" &&
                activeSubmenu === item.name && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-10">
                    {item.subItems.map((subItem, subIndex) => (
                      <div
                        key={subIndex}
                        className="px-4 py-2 hover:bg-gray-100 text-gray-800 font-montserrat text-sm"
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
            </li>
          ))}
        </ul>
      </nav>

      {/* {  MOBILE } */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed left-0 top-0 h-full w-full bg-white p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="flex items-center">
                <img
                  src={Logo}
                  alt="Logo"
                  className="h-16 sm:h-20 w-auto object-contain"
                  loading="lazy"
                />
              </Link>
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            {/* Collapse Menu like Footer */}
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b border-gray-300 pb-3">
                  {/* Heading with + / - */}
                  <h4
                    onClick={() => {
                      if (item.name === "SHOP") {
                        setIsOpen(false);
                        // navigate("/shop");
                        window.location.href = `/shop`;
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        toggleSubmenu(item.name);
                      }
                    }}
                    className="flex justify-between items-center text-lg font-medium cursor-pointer"
                  >
                    {item.name}
                    {item.subItems ||
                    item.name === "NEW IN" ||
                    item.name === "WOMAN" ||
                    item.name === "MENS" ||
                    item.name === "ACCESSORIES" ? (
                      <span className="text-xl">
                        {activeSubmenu === item.name ? "−" : "+"}
                      </span>
                    ) : null}
                  </h4>

                  {/* Submenu content */}
                  {activeSubmenu === item.name && (
                    <div className="mt-3 space-y-4 pl-2">
                      {/* WOMAN */}
                      {item.name === "WOMAN" && (
                        <div className="p-0">
                          {/* Women Image */}
                          {/* <div className="mb-3">
                            {products && products.length > 0 ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL}${
                                  JSON.parse(products[0].productImg)[0]
                                }`}
                                alt="Woman Collection"
                                className="w-full h-48 object-cover rounded"
                                loading="lazy"
                              />
                            ) : (
                              <p>No product found</p>
                            )}
                          </div> */}

                          {/* UNSTITCHED */}
                          <h3 className="font-bold">UNSTITCHED</h3>
                          <ul className="mt-1 space-y-1 text-gray-600">
                            {products
                              ?.filter(
                                (p) => p.un_switch === 1 && p.women === 1
                              )
                              .map((p) => (
                                <li
                                  key={p.id}
                                  onClick={() =>
                                    // navigate(`/product-detail/${p.id}`)
                                    (window.location.href = `/product-detail/${p.id}`)
                                  }
                                  className="cursor-pointer hover:text-black"
                                >
                                  {p.name}
                                </li>
                              ))}
                          </ul>

                          {/* READY TO WEAR */}
                          <h3 className="font-bold mt-3">READY TO WEAR</h3>
                          <ul className="mt-1 space-y-1 text-gray-600">
                            {products
                              ?.filter(
                                (p) => p.un_switch === 0 && p.women === 1
                              )
                              .slice(0, 10)
                              .map((p) => (
                                <li
                                  key={p.id}
                                  onClick={() =>
                                    // navigate(`/product-detail/${p.id}`)
                                    (window.location.href = `/product-detail/${p.id}`)
                                  }
                                  className="cursor-pointer hover:text-black"
                                >
                                  {p.name}
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}

                      {/* MENS */}
                      {item.name === "MENS" && (
                        <div>
                          {/* <img
                            src={MenImage}
                            alt="Men Collection"
                            className="w-full h-48 object-cover rounded mb-3"
                          /> */}
                          <div className="grid grid-cols-1 gap-3">
                            {/* UNSTITCHED */}
                            <div>
                              <h2 className="text-lg font-bold mb-1 border-b pb-1">
                                UNSTITCHED
                              </h2>
                              <div className="grid grid-cols-1 gap-3">
                                {products
                                  ?.filter(
                                    (p) => p.un_switch === 1 && p.men === 1
                                  )
                                  .slice(0, 10)
                                  .map((p) => (
                                    <div
                                      key={p.id}
                                      className="text-gray-800 cursor-pointer"
                                      onClick={() =>
                                        (window.location.href = `/product-detail/${p.id}`)
                                      }
                                    >
                                      {p.name || "Not product avaiable......."}
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <h2 className="text-lg font-bold mb-1 border-b pb-1">
                              READY TO WEAR
                            </h2>
                            {products
                              ?.filter((p) => p.un_switch === 0 && p.men === 1)
                              .slice(0, 10)
                              .map((p) => (
                                <div
                                  key={p.id}
                                  className="text-gray-800 cursor-pointer"
                                  onClick={() =>
                                    (window.location.href = `/product-detail/${p.id}`)
                                  }
                                >
                                  {p.name || "Not product available......."}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* NEW IN */}
                      {item.name === "NEW IN" && (
                        <div>
                          {/* Left: Latest Product Image */}
                          <div className="mb-0">
                            {/* {products.length > 0 ? (
                              <img
                                src={`${import.meta.env.VITE_API_URL}${
                                  JSON.parse(products[0].productImg)[0]
                                }`}
                                alt={products[0].name}
                                className="w-full h-60 object-cover rounded"
                                loading="lazy"
                              />
                            ) : (
                              <p className="text-gray-500">No Product Found</p>
                            )} */}
                          </div>

                          {/* By Category */}
                          <div className="mb-6">
                            <h2 className="text-lg font-bold mb-2 border-b pb-1">
                              BY CATEGORY
                            </h2>
                            {loading ? (
                              <p>Loading categories...</p>
                            ) : (
                              categories?.slice(0, 10).map((cat, i) => (
                                <div
                                  key={i}
                                  className="text-gray-700 cursor-pointer hover:text-blue-600 mb-2"
                                  onClick={() => {
                                    setIsOpen(false);

                                    window.location.href = `/collection/shop-by-category/${cat.id}`;

                                    // navigate(
                                    //   `/collection/shop-by-category/${cat.id}`
                                    // );
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                >
                                  {/* <h3 className="font-semibold hover:text-blue-600"> */}
                                  {cat.name}
                                  {/* </h3> */}
                                </div>
                              ))
                            )}
                          </div>

                          {/* By Collection */}
                          <div>
                            <h2 className="text-lg font-bold mb-2 border-b pb-1">
                              BY COLLECTION
                            </h2>
                            {products
                              ?.slice(0, 10)
                              .filter((data) => data.un_switch === 0)
                              .map((prod, i) => (
                                <div
                                  key={i}
                                  className="text-gray-700 cursor-pointer hover:text-blue-600 mb-2"
                                  onClick={() => {
                                    setIsOpen(false);
                                    // navigate(`/product-detail/${prod.id}`);
                                    window.location.href = `/product-detail/${prod.id}`;
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                >
                                  {prod.name}
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* ACCESSORIES */}
                      {item.name === "ACCESSORIES" && (
                        <div className="text-center py-1">
                          <h2 className="text-2xl font-bold text-gray-600 tracking-wide">
                            COMING SOON
                          </h2>
                        </div>
                      )}

                      {/* Normal SubItems */}
                      {item.subItems && (
                        <ul className="mt-2 pl-2 space-y-2 text-gray-700 text-base">
                          {item.subItems.map((subItem, subIndex) => (
                            <li
                              key={subIndex}
                              className="cursor-pointer"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50"
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar
                title="SHOPPING CART"
                onClose={() => setIsCartOpen(false)}
              >
                <div className="p-4 space-y-6">
                  {cart?.items?.length > 0 && (
                    <p className="text-sm bg-blue-100 text-blue-600 px-3 py-2 rounded">
                      🎉 Congratulations! You get free shipping!
                    </p>
                  )}

                  {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-start">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            item.product?.productImg
                              ? JSON.parse(item.product.productImg)[0]
                              : "/fallback.jpg"
                          }`}
                          alt={item.product?.name}
                          className="w-24 h-28 object-cover rounded"
                          loading="lazy"
                        />

                        <div className="flex-1">
                          <p className="font-semibold">{item.product?.name}</p>
                          {/* <p className="text-green-600 text-sm">
                            {item.product?.stock_quantity ? "In Stock" : "N/A"}
                          </p> */}

                          <p className="text-sm text-gray-600">
                            {item.un_stitch === 1 ? "Unstitched" : "Stitched"}
                          </p>

                          <p className="text-sm text-black-900">
                            Rs.{Math.round(Number(item.price))}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>

                          {/* Add todo quantity control code */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleUpdateQuantity(item, -1)}
                              className="px-2 py-1 border rounded hover:bg-gray-200"
                            >
                              −
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item, 1)}
                              className="px-2 py-1 border rounded hover:bg-gray-200"
                            >
                              +
                            </button>
                            {/* Delete */}{" "}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 ml-4"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Your Cart is Empty 🛒
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Looks like you haven’t added anything yet.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate("/");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}

                  {cart?.items?.length > 0 && (
                    <div className="space-y-3 mt-6">
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Subtotal:</span>
                          <span>
                            Rs.
                            {Math.round(
                              cart?.items?.reduce(
                                (sum, item) =>
                                  sum + item.quantity * Number(item.price),
                                0
                              )
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/cart");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        VIEW CART
                      </button>
                      <button
                        onClick={() => {
                          // navigate("/checkout");
                          window.location.href = `/checkout`;
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        CHECKOUT
                      </button>
                      <button
                        onClick={() => {
                          navigate("/");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  )}
                </div>
              </Sidebar>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Sidebar */}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </header>
  );
};

export default Navbar;
