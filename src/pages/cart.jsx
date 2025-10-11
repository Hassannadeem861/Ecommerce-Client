import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity } from "../redux/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate subtotal from redux cart
  const subtotal = cart.items.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handleDelete = (id) => {
    localStorage.removeItem("guest_session_id");
    dispatch(removeItem(id));
  };

  const handleUpdateQuantity = (item, change) => {
    dispatch(updateQuantity({ id: item.id, change }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-center bg-[#F8F8F8] text-[20px] leading-[20px] font-[Montserrat,sans-serif] font-extrabold text-[#000000] mb-8 py-2 sm:py-4">
          SHOPPING CART
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                  PRODUCT ({cart.items.length})
                </h2>
              </div>

              {/* Table headers */}
              <div className="hidden md:grid grid-cols-12 gap-2 sm:gap-4 border-b pb-2 sm:pb-4 mb-2 sm:mb-4 text-base">
                <div className="col-span-5 font-medium text-gray-500">
                  <span className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                    PRODUCT
                  </span>
                </div>
                <div className="col-span-2 font-medium text-gray-500">
                  <span className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                    PRICE
                  </span>
                </div>
                <div className="col-span-3 font-medium text-gray-500 text-center">
                  <span className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                    QUANTITY
                  </span>
                </div>
                <div className="col-span-2 font-medium text-gray-500 text-right">
                  <span className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                    TOTAL
                  </span>
                </div>
              </div>

              {/* Cart items */}
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 sm:gap-4 py-4 sm:py-3 border-b text-base"
                >
                  {/* Product name and image */}
                  <div className="md:col-span-5 flex items-start">
                    <div className="h-25 w-20 sm:h-20 sm:w-20 lg:h-32 lg:w-32 flex-shrink-0 overflow-hidden mr-2 sm:mr-4">
                      <img
                        src={
                          item.product?.productImg
                            ? `${import.meta.env.VITE_API_URL}${
                                JSON.parse(item.product.productImg)[0]
                              }`
                            : "N/A"
                        }
                        alt={item.product?.name}
                        className="h-full w-full object-contain object-center"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h3 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                        {item.product?.name}
                      </h3>
                      <span className="text-green-600 text-sm block">
                        {item.product?.stock_quantity ? "In Stock" : null}
                      </span>
                      <span className="text-gray-800 text-sm block">
                        {item.un_stitch === 1 ? "Unstitched" : "Stitched"}
                      </span>

                      {/* Delete Icon under stock */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1 text-sm"
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                  {/* Price */}
                  <div className="md:col-span-2 flex items-center">
                    <p className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                      Rs.{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                  {/* Quantity */}
                  {/* <div className="md:col-span-3 text-center flex items-center justify-center">
                    <span className="bg-gray-100 px-2 sm:px-4 py-1 sm:py-2 rounded text-base text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                      {item.quantity}
                    </span>
                  </div> */}

                  <div className="md:col-span-3 text-center flex items-center justify-center">
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
                  </div>

                  {/* Total */}
                  <div className="md:col-span-2 text-right flex items-center justify-end">
                    <p className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                      Rs.
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order note section */}
            <div className="bg-white p-4 sm:p-6 mt-4 sm:mt-6">
              <h2 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-2 sm:mb-4">
                Add Order Note
              </h2>
              <p className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-2">
                How can we help you?
              </p>
              <textarea
                className="w-full border rounded-md p-2 sm:p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                rows="4"
                placeholder="Any special instructions or notes for your order..."
              ></textarea>
            </div>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-4 sm:p-6 sticky top-4">
              <h2 className="text-[20px] leading-[20px] font-[Montserrat,sans-serif] font-normal text-[#000000] mb-2 sm:mb-4">
                ORDER SUMMARY
              </h2>

              <div className="flex justify-between mb-2 sm:mb-4 text-base">
                <span className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                  Subtotal
                </span>
                <span className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                  Rs.{Math.round(subtotal).toLocaleString("en-IN")}
                </span>
              </div>

              <button
                onClick={() => {
                  navigate("/checkout");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full bg-[#000000] text-white py-2 sm:py-4 rounded-md font-medium text-base"
              >
                CHECKOUT
              </button>

              <div className="mt-2 sm:mt-6 text-center">
                <a href="/" className="text-blue-600 hover:underline text-sm">
                  Return to shopping
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
