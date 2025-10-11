import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "../src/components/pritate-route.jsx";
import AppInit from "../src/components/AppInit.jsx";
import Loader from "./components/loader.jsx";
import { useSelector } from "react-redux";

// import Home from "./pages/home.jsx";
// import ProductDetailPage from "./pages/product-detail-page.jsx";
// import Cart from "./pages/cart.jsx";
// import CheckOut from "./pages/checkout.jsx";
// import Payment from "./pages/payment.jsx";
// import Shop from "./pages/shop.jsx";
// import Login from "./pages/login.jsx";
// import Registered from "./pages/signup.jsx";
// import PageNotFound from "./pages/page-not-found.jsx";

// Public Pages
const Home = lazy(() => import("./pages/home.jsx"));
const ProductDetailPage = lazy(() => import("./pages/product-detail-page.jsx"));
const Cart = lazy(() => import("./pages/cart.jsx"));
const CheckOut = lazy(() => import("./pages/checkout.jsx"));
const Payment = lazy(() => import("./pages/payment.jsx"));
const Shop = lazy(() => import("./pages/shop.jsx"));
const Login = lazy(() => import("./pages/login.jsx"));
const Registered = lazy(() => import("./pages/signup.jsx"));
const PageNotFound = lazy(() => import("./pages/page-not-found.jsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy.jsx"));
const ExchangeReturnPolicy = lazy(() =>
  import("./pages/exchange-privacy-policy.jsx")
);

// Public Pages
// import DashboardLayout from "./dashboard/DashboardLayout";
// import DashboardHome from "./dashboard/pages/DashboardHome";
// import Settings from "./dashboard/pages/Settings";
// import ManageProducts from "./dashboard/pages/ManageProducts.jsx";
// import CreateProduct from "./dashboard/pages/CreateProduct.jsx";
// import ProductDetail from "./dashboard/pages/ProductDetail.jsx";
// import OrdersDetailPage from "./dashboard/pages/OrderDetailPage.jsx";
// import EditProduct from "./dashboard/pages/EditProduct.jsx";
// import Categories from "./dashboard/pages/Categories.jsx";
// import ManageUsers from "./dashboard/pages/Users.jsx";
// import Orders from "./dashboard/pages/Orders.jsx";
// import SearchPage from "./pages/SearchPage.jsx";

// Dashboard
const DashboardLayout = lazy(() => import("./dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("./dashboard/pages/DashboardHome"));
const Settings = lazy(() => import("./dashboard/pages/Settings"));
const ManageProducts = lazy(() =>
  import("./dashboard/pages/ManageProducts.jsx")
);
const CreateProduct = lazy(() => import("./dashboard/pages/CreateProduct.jsx"));
const ProductDetail = lazy(() => import("./dashboard/pages/ProductDetail.jsx"));
const OrdersDetailPage = lazy(() =>
  import("./dashboard/pages/OrderDetailPage.jsx")
);
const EditProduct = lazy(() => import("./dashboard/pages/EditProduct.jsx"));
const Categories = lazy(() => import("./dashboard/pages/Categories.jsx"));
const Orders = lazy(() => import("./dashboard/pages/Orders.jsx"));
const ManageUsers = lazy(() => import("./dashboard/pages/Users.jsx"));
const MobileBanner = lazy(() => import("./dashboard/pages/MobileBanner.jsx"));
const DesktopBanner = lazy(() => import("./dashboard/pages/DesktopBanner.jsx"));

// COLLECTION ROUTES
// import CollectionLayout from "./dashboard/CollectionLayout.jsx";
// import Men from "./collections/men.jsx";
// import Women from "./collections/women.jsx";
// import Category from "./collections/shop-by-category.jsx";

const CollectionLayout = lazy(() => import("./dashboard/CollectionLayout.jsx"));
const Men = lazy(() => import("./collections/men.jsx"));
const Women = lazy(() => import("./collections/women.jsx"));
const Category = lazy(() => import("./collections/shop-by-category.jsx"));

// PROTECTED ROUTE

export default function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const minTime = setTimeout(() => {
      setLoading(false);
    }, 300); // minimum visible 300ms

    return () => clearTimeout(minTime);
  }, [location]);

  return (
    // <div className={darkMode ? "dark" : ""}>
    // {loading && <Loader />}
    <>
      <AppInit>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Registered />} />
            <Route path="/product-detail/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order-successfully" element={<Payment />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/search" element={<SearchPage />} />
            <Route
              path="/exchange-return-policy"
              element={<ExchangeReturnPolicy />}
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* COLLCTION LAYOUT  */}
            <Route path="/collection" element={<CollectionLayout />}>
              <Route path="men" element={<Men />} />
              <Route path="women" element={<Women />} />
              <Route
                path="shop-by-category/:categoryId"
                element={<Category />}
              />
            </Route>

            {/* ✅ Protected Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={[1]} />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="orders" element={<Orders />} />
                <Route path="order/:id" element={<OrdersDetailPage />} />
                <Route path="settings" element={<Settings />} />
                <Route path="manage-products" element={<ManageProducts />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route path="mobile-banner" element={<MobileBanner />} />
                <Route path="desktop-banner" element={<DesktopBanner />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="edit-product/:id" element={<EditProduct />} />
                <Route path="categories" element={<Categories />} />
                <Route path="users" element={<ManageUsers />} />
              </Route>
            </Route>
            {/* 🚨 Page Not Found (404) Route - Always Last */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </AppInit>
    </>
  );
}
