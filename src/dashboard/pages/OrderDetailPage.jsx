import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../utils/order-api.js";
import Loader from "../../components/loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getAllCarts, getSingleCart } from "../../utils/cart-api.js";

const OrderDetailPage = () => {
  const cart = useSelector((state) => state.cart);
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await getSingleOrder(id);
        if (res.success) {
          setOrder(res?.order);

          if (res.order?.cart_id) {
            const cartRes = await getSingleCart(res.order.cart_id);
            if (cartRes.success) {
              setCartData(cartRes.cart);
            } else {
              setError(cartRes.message || "Failed to fetch cart");
            }
          }

        } else {
          setError(res.message || "Failed to fetch order");
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await getSingleCart(id);

  //       if (res.success) {
  //         setCartData(res.cart);
  //       } else {
  //         setError(res.message || "Failed to fetch order");
  //       }
  //     } catch (err) {
  //       setError(err.message || "Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCart();
  // }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div> */}
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No order details found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Order Header */}
      <div className="bg-white shadow rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <p>
            <span className="font-semibold">Customer:</span> {order.first_name}{" "}
            {order.last_name}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {order.phone_number}
          </p>
          <p>
            <span className="font-semibold">Shipping Address:</span>{" "}
            {order.shipping_address}
          </p>
          <p>
            <span className="font-semibold">Payment Method:</span>{" "}
            {order.payment_method.replaceAll("_", " ")}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {order.status}
            </span>
          </p>
          <p>
            <span className="font-semibold">Total:</span> Rs{" "}
            {parseFloat(order.total_amount).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
        <div className="divide-y">
          {order.items.map((item) => {
            // parse product images
            let images = [];
            try {
              images = JSON.parse(item.product.productImg);
            } catch (e) {
              images = [item.product.productImg];
            }

            // discount calculation
            const originalPrice = parseFloat(item.product.price);
            const discount = parseFloat(item.product.discount) || 0;
            const discountedPrice =
              originalPrice - (originalPrice * discount) / 100;

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${images[0]}`}
                  alt={item.product.name}
                  className="w-24 h-30 object-cover rounded-lg border"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    SKU: {item.product.sku}
                  </p>
                  <p className="text-sm text-gray-600">
                    Brand: {item.product.brand || "N/A"}
                  </p>

                  <p className="text-sm text-gray-600">
                    {cartData?.items?.map((data) => {
                      console.log(cartData)
                      return (
                        <span key={data.id} className="block">
                          Variant:{" "}
                          {data.un_stitch == 1 ? "Unstitched" : "Stitched"}
                        </span>
                      );
                    })}
                  </p>

                  {/* <p className="text-sm text-gray-600">
                    Variant:{" "}
                    {item.product.un_switch == 1 ? "Unstitched" : "Stitched"}
                  </p> */}

                  {/* Price with discount */}
                  {/* {item.product.un_switch === 1 ? (
                    // Case: un_switch = 1 → Show rounded un_switch_price
                    <p className="text-sm text-gray-600">
                      Price: Rs{" "}
                      {Math.round(parseFloat(item.product.un_switch_price))}
                    </p>
                  ) : (
                    // Case: un_switch = 0 → Apply discount normally
                    <>
                      {discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">
                            Rs {Math.round(originalPrice)}
                          </span>
                          <span className="text-black font-bold">
                            Rs {Math.round(discountedPrice)}
                          </span>
                          <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">
                            {discount}% OFF
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600">
                          Price: Rs {Math.round(originalPrice)}
                        </p>
                      )}
                    </>
                  )} */}

                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    Subtotal: Rs{" "}
                    {(discountedPrice * item.quantity).toLocaleString()}
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
