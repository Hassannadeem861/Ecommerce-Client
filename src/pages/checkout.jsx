import React, { useState } from "react";
import Footer from "../components/Footer.jsx";
import { guestCheckout } from "../utils/order-api.js";
import { useNavigate, Link } from "react-router-dom";
import { removeItem, clearCart } from "../redux/cartSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/logo.jpg";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    shipping_address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [canPlaceOrder, setCanPlaceOrder] = useState(false);
  const [canFillShipping, setCanFillShipping] = useState(false);
  const [shippingLocked, setShippingLocked] = useState(false);

  // 🔹 Loading States
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  // Step 1 → Proceed to Shipping
  const handleProceedToShipping = () => {
    setLoadingShipping(true);
    setTimeout(() => {
      if (formData.email.trim() !== "") {
        setCanFillShipping(true);
      }
      setLoadingShipping(false);
    }, 1000); // simulate delay
  };

  // REDUX ITEM REMOVE FUNCTION
  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  // Step 2 → Proceed to Delivery (Payment)
  const handleProceedToDelivery = () => {
    setLoadingDelivery(true);
    setTimeout(() => {
      if (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.shipping_address.trim() !== "" &&
        formData.phone.trim() !== ""
      ) {
        setCanPlaceOrder(true);
        setShippingLocked(true); // ✅  disable the Shipping
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        }); // ✅ scroll the payment section
      }
      setLoadingDelivery(false);
    }, 1000);
  };

  // Place order function
  const handlePlaceOrder = async () => {
    setLoadingOrder(true);
    try {
      const payload = {
        session_id: cart.session_id,
        cart_id: cart.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone,
        shipping_address: formData.shipping_address,
        payment_method: paymentMethod,
        total_amount: cart.items.reduce(
          (acc, item) => acc + parseFloat(item.price) * item.quantity,
          0
        ),
      };
      const res = await guestCheckout(payload);
      if (res.success) {
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          shipping_address: "",
          phone: "",
        });
        navigate("/order-successfully");
        localStorage.removeItem("guest_session_id");
        dispatch(clearCart());
      }
    } catch (error) {
      console.log("Error in order place: ", error.message);
    } finally {
      setLoadingOrder(false);
    }
  };

  // Total calculate price function
  const calculateTotal = () => {
    if (!cart.items || cart.items.length === 0) return 0;
    return cart.items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );
  };

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <Link to="/" className="flex justify-center items-center">
            <img
              src={Logo}
              alt="Logo"
              className="h-25 sm:h-25 w-auto object-cover"
              loading="lazy"
            />
          </Link>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 mb-6">
              <h2 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-4">
                1 Contact Information
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button
                onClick={handleProceedToShipping}
                disabled={loadingShipping}
                className="w-full bg-black text-white py-4 rounded-md font-[Montserrat,sans-serif] font-medium mb-4 flex justify-center"
              >
                {loadingShipping ? "Processing..." : "PROCEED TO SHIPPING"}
              </button>
            </div>

            <div className="bg-white p-6">
              <h2 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-4">
                2 Shipping
              </h2>

              <fieldset
                disabled={!canFillShipping || shippingLocked}
                className={
                  !canFillShipping || shippingLocked ? "opacity-50" : ""
                }
              >
                <div className="mb-4">
                  <label
                    htmlFor="firstName"
                    className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="lastName"
                    className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="shipping_address"
                    className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]"
                  >
                    Address Line *
                  </label>
                  <input
                    type="text"
                    id="shipping_address"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <button
                  onClick={handleProceedToDelivery}
                  disabled={loadingDelivery}
                  className="w-full bg-black text-white py-4 rounded-md font-[Montserrat,sans-serif] font-medium mt-6 flex justify-center"
                >
                  {loadingDelivery ? "Processing..." : "PROCEED TO DELIVERY"}
                </button>
              </fieldset>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white p-6 border border-gray-200 rounded sticky top-8">
              <h2 className="text-[20px] leading-[20px] font-[Montserrat,sans-serif] font-normal text-[#000000] mb-4">
                Order Summary
              </h2>
              <p className="text-[20px] leading-[20px] font-[Montserrat,sans-serif] font-extrabold text-[#000000] mb-6">
                Rs.{Math.round(totalPrice).toLocaleString("en-PK")}
              </p>

              {/* Items */}
              {cart.items && cart.items.length > 0 ? (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-4 mb-4"
                  >
                    <div className="flex">
                      <div className="h-35 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {(() => {
                          const images =
                            typeof item.product?.productImg === "string"
                              ? JSON.parse(item.product.productImg)
                              : item.product?.productImg;

                          return (
                            <img
                              src={
                                images?.[0]
                                  ? `${import.meta.env.VITE_API_URL}${
                                      images[0]
                                    }`
                                  : "N/A"
                              }
                              alt={item.product?.name || "Product"}
                              className="h-full w-full object-cover object-center"
                              loading="lazy"
                            />
                          );
                        })()}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529]">
                            <h3>{item.product?.name || "N/A"}</h3>
                            {/* <p className="ml-4">
                              Rs.{" "}
                              {Math.round(
                                parseFloat(item.price) * item.quantity
                              ).toLocaleString("en-PK")}
                            </p> */}
                          </div>
                          <p className="mt-1 text-[14px] font-[Montserrat,sans-serif] text-[#6B7280]">
                            {item.un_stitch === 1 ? "Unstitched" : "Stitched"}
                          </p>
                          <p className="mt-1 text-[14px] font-[Montserrat,sans-serif] text-[#6B7280]">
                            Price: Rs.{" "}
                            {Math.round(parseFloat(item.price)).toLocaleString(
                              "en-PK"
                            )}
                          </p>
                          <p className="text-[14px] font-[Montserrat,sans-serif] text-[#6B7280]">
                            Quantity: {item.quantity || "N/A"}
                          </p>
                          {console.log()}
                          <p className="text-[14px] font-[Montserrat,sans-serif] text-[#6B7280]">
                            Color: {item.color || "N/A"}
                          </p>
                          <p className="text-[14px] font-[Montserrat,sans-serif] text-[#6B7280]">
                            {item.un_stitch !== 1 && (
                              <p className="text-[14px] font-[Montserrat,sans-serif] text-[#6B7280]">
                                Size: {item.size || "N/A"}
                              </p>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[16px] font-[Montserrat,sans-serif] text-[#6B7280]">
                  No items in cart
                </p>
              )}

              <div className="border-t border-gray-200 pt-4">
                {/* <h3 className="text-[16px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-4">
                  ORDER SUMMARY
                </h3> */}
                {/* <div className="flex justify-between py-2 text-[16px] font-[Montserrat,sans-serif] text-[#212529]">
                  <span>Subtotal (inclusive of Tax)</span>
                  <span>Rs.{totalPrice.toLocaleString("en-PK")}</span>
                </div>
                <div className="flex justify-between py-2 text-[16px] font-[Montserrat,sans-serif] text-[#212529]">
                  <span>Shipping</span>
                  <span>Rs.0.00</span>
                </div>
                <div className="flex justify-between py-2 text-[16px] font-[Montserrat,sans-serif] text-[#212529]">
                  <span>FBR POS</span>
                  <span>Rs.1.00</span>
                </div> */}
                <div className="flex justify-between py-4 border-t border-gray-200 font-[Montserrat,sans-serif] font-extrabold text-[#000000]">
                  <span>Total(PKR)</span>
                  <span>
                    Rs.{Math.round(totalPrice).toLocaleString("en-PK")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white p-6 mt-8">
          <h2 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-4">
            3 Payment
          </h2>

          {/* Payment Method */}
          <div className="mb-6">
            <h2 className="text-[16px] leading-[24px] font-[Montserrat,sans-serif] font-normal text-[#212529] mb-3">
              Select Payment Method
            </h2>

            <div
              onClick={() => handlePaymentChange("cash")}
              className={`flex items-center p-4 border rounded-md mb-3 cursor-pointer ${
                paymentMethod === "cash" ? "border-black bg-gray-50" : ""
              }`}
            >
              <input
                type="radio"
                id="cash"
                name="payment-method"
                checked={paymentMethod === "cash"}
                onChange={() => handlePaymentChange("cash")}
                className="h-5 w-5 text-black focus:ring-black"
              />
              <label
                htmlFor="cash"
                className="ml-3 text-[16px] font-[Montserrat,sans-serif] font-normal text-[#212529]"
              >
                Cash On Delivery
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder || loadingOrder}
            className={`w-full py-4 rounded-md font-[Montserrat,sans-serif] font-medium transition-colors flex justify-center ${
              canPlaceOrder && !loadingOrder
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
          >
            {loadingOrder ? "Placing Order..." : "PLACE YOUR ORDER"}
          </button>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default Checkout;
