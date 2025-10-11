import React, { useState } from "react";
import Footer from "../components/Footer.jsx";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
import {
  guestCheckout,
  getAllOrders,
  createOrder,
  getSingleCart,
} from "../utils/order-api.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("contact"); // contact, shipping, payment
  const cart = useSelector((state) => state.cart);
  console.log("cart: ", cart);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    shipping_address: "",
    country: "Pakistan",
    province: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [paymentData, setPaymentData] = useState({
    paymentMethod: "cash",
    billingSameAsShipping: true,
    promoCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (name, value) => {
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleApplyPromo = () => {
  //   alert(`Promo code "${paymentData.promoCode}" applied!`);
  //   setPaymentData((prev) => ({ ...prev, promoCode: "" }));
  // };

  const handlePlaceOrder = async () => {
    // Merge all form data into one address string
    const shippingAddress = `
      ${formData.shipping_address},
    `
      .replace(/\s+/g, " ")
      .trim();

    // Example payload for backend
    const payload = {
      session_id: cart.session_id, // guest session
      cart_id: cart.id,
      payment_method: "cash_on_delivery",
      shipping_address: shippingAddress,
    };

    const res = await guestCheckout(payload);
    if (res.success) {
      setFormData("");
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!cart.items || cart.items.length === 0) return 0;
    return cart.items.reduce((total, item) => {
      return total + parseFloat(item.price) * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotal();

  return (
    <div className="min-h-screen bg-[#FFFFFF] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">SAPPHIRE</h1>
        </header>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeSection === "contact"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveSection("contact")}
            >
              1
            </div>
            <div
              className={`ml-2 ${
                activeSection === "contact" ? "font-medium" : "text-gray-500"
              }`}
            >
              Contact
            </div>
          </div>

          <div className="w-16 h-0.5 bg-gray-300 mx-2"></div>

          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeSection === "shipping"
                  ? "bg-black text-white"
                  : activeSection === "payment"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveSection("shipping")}
            >
              2
            </div>
            <div
              className={`ml-2 ${
                activeSection !== "contact" ? "font-medium" : "text-gray-500"
              }`}
            >
              Shipping
            </div>
          </div>

          <div className="w-16 h-0.5 bg-gray-300 mx-2"></div>

          <div className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                activeSection === "payment"
                  ? "bg-black text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setActiveSection("payment")}
            >
              3
            </div>
            <div
              className={`ml-2 ${
                activeSection === "payment" ? "font-medium" : "text-gray-500"
              }`}
            >
              Payment
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Contact, Shipping, and Payment */}
          <div className="w-full lg:w-7/12">
            {/* Contact Information */}
            {activeSection === "contact" && (
              <div className="bg-white p-6 mb-6 border border-gray-200 rounded">
                <h2 className="text-xl font-semibold mb-4">
                  1 Contact Information
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:border-black text-base"
                    required
                  />
                </div>

                <button
                  onClick={() => setActiveSection("shipping")}
                  className="w-full bg-black text-white py-4 rounded-md font-medium mb-4 text-base hover:bg-gray-800 transition-colors"
                >
                  PROCEED TO SHIPPING
                </button>

                <div className="text-center mb-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <span className="font-semibold cursor-pointer underline">
                      Sign in
                    </span>
                  </p>
                </div>

                <div className="relative flex items-center mb-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600 text-sm">
                    OR SIGN IN WITH
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="flex justify-center gap-4">
                  {/* <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                    </svg>
                    Google
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                    Facebook
                  </button> */}
                </div>
              </div>
            )}

            {/* Shipping Information */}
            {activeSection === "shipping" && (
              <div className="bg-white p-6 border border-gray-200 rounded">
                <h2 className="text-xl font-semibold mb-4">2 Shipping</h2>

                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="shipping_address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="shipping_address"
                      name="shipping_address"
                      value={formData.shipping_address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-black focus:border-black text-base"
                      required
                    />
                  </div>

                  <button
                    onClick={() => setActiveSection("payment")}
                    className="w-full bg-black text-white py-4 rounded-md font-medium mt-6 hover:bg-gray-800 transition-colors"
                  >
                    PROCEED TO PAYMENT
                  </button>
                </form>
              </div>
            )}

            {/* Payment Information */}
            {activeSection === "payment" && (
              <div className="bg-white p-6 border border-gray-200 rounded">
                <h2 className="text-xl font-semibold mb-4">Payment</h2>

                {/* Promo Code Section */}
                {/* <div className="mb-6">
                  <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-1">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="promo-code"
                      value={paymentData.promoCode}
                      onChange={(e) => handlePaymentChange('promoCode', e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
                    >
                      APPLY
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h2 className="text-sm font-medium text-gray-700 mb-3">
                    Select Payment Method
                  </h2>

                  {/* Cash on Delivery */}
                  <div
                    className={`flex items-center p-4 border rounded-md mb-3 cursor-pointer ${
                      paymentData.paymentMethod === "cash"
                        ? "border-black bg-gray-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => handlePaymentChange("paymentMethod", "cash")}
                  >
                    <input
                      type="radio"
                      id="cash"
                      name="payment-method"
                      checked={paymentData.paymentMethod === "cash"}
                      onChange={() =>
                        handlePaymentChange("paymentMethod", "cash")
                      }
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <label
                      htmlFor="cash"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Cash On Delivery
                    </label>
                  </div>

                  {/* Debit/Credit Card */}
                  {/* <div 
                    className={`flex items-center p-4 border rounded-md cursor-pointer ${paymentData.paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-300'}`}
                    onClick={() => handlePaymentChange('paymentMethod', 'card')}
                  >
                    <input
                      type="radio"
                      id="card"
                      name="payment-method"
                      checked={paymentData.paymentMethod === 'card'}
                      onChange={() => handlePaymentChange('paymentMethod', 'card')}
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <label htmlFor="card" className="ml-3 block text-sm font-medium text-gray-700">
                      Debit / Credit Card
                    </label>
                  </div> */}
                </div>

                {/* Billing Address */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="billing-address"
                      checked={paymentData.billingSameAsShipping}
                      onChange={() =>
                        handlePaymentChange(
                          "billingSameAsShipping",
                          !paymentData.billingSameAsShipping
                        )
                      }
                      className="h-4 w-4 text-black focus:ring-black"
                    />
                    <label
                      htmlFor="billing-address"
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      Billing Address Same as shipping
                    </label>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-3 px-4 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
                >
                  PLACE YOUR ORDER
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white p-6 border border-gray-200 rounded sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <p className="text-2xl font-bold mb-6">
                Rs.{totalPrice.toLocaleString("en-PK")}
              </p>

              {/* Product Items */}
              {cart.items && cart.items.length > 0 ? (
                cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="border-b border-gray-200 pb-4 mb-4"
                  >
                    <div className="flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={
                            item.product?.image
                              ? `${import.meta.env.VITE_API_URL}/${
                                  item.product.image
                                }`
                              : Image ||
                                "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGluayUyMGRyZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                          }
                          alt={item.product?.name || "Product"}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.product?.name || "Product"}</h3>
                            <p className="ml-4">
                              Rs.
                              {(
                                parseFloat(item.price) * item.quantity
                              ).toLocaleString("en-PK")}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            Price: Rs.
                            {parseFloat(item.price).toLocaleString("en-PK")}
                          </p>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in cart</p>
              )}

              {/* Order Summary Details */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-4">ORDER SUMMARY</h3>
                <div className="flex justify-between py-2 text-base">
                  <span>Subtotal (inclusive of Tax)</span>
                  <span>Rs.{totalPrice.toLocaleString("en-PK")}</span>
                </div>
                <div className="flex justify-between py-2 text-base">
                  <span>Shipping</span>
                  <span>Rs.0.00</span>
                </div>
                <div className="flex justify-between py-2 text-base">
                  <span>FBR POS</span>
                  <span>Rs.1.00</span>
                </div>
                <div className="flex justify-between py-4 border-t border-gray-200 font-bold text-base">
                  <span>Total(PKR)</span>
                  <span>Rs.{totalPrice.toLocaleString("en-PK")}</span>
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  You may receive multiple packages for one order. Discounted
                  items are non-exchangeable & non-returnable. Nationwide orders
                  will be delivered within 5-7 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Checkout;
