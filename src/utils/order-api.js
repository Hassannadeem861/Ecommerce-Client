import Api from "../services/axios.js";
import toast from "react-hot-toast";

// ✅ Get all orders (only for logged-in user)
export const getAllOrders = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-orders`);
    return response?.data;
    
  } catch (error) {   
    console.error("Get orders error:", error?.response?.data || error.message);
  }
};

// ✅ Get all getAllPayments
export const getAllPayments = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-payments`);
    return response?.data;
    
  } catch (error) {   
    console.error("Get orders error:", error?.response?.data || error.message);
  }
};

// ✅ Guest checkout
export const guestCheckout = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/guest-checkout`, itemData);
    // toast.success(response?.data?.message || "Order create ✅");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to create order ❌");
  }
};

// ✅ Authenticated checkout
export const createOrder = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-order`, itemData);
    return response?.data;
  } catch (error) {

    toast.error(error?.response?.data?.message || "Failed to create order ❌");
  }
};

// ✅ Get single cart
export const getSingleOrder = async (orderId) => {
  try {
    const response = await Api.get(`/api/v1/get-single-order/${orderId}`);
    return response?.data;
  } catch (error) {
    console.error(
      "Get single order error:",
      error?.response?.data || error.message
    );
    // toast.error(error?.response?.data?.message || "order not found ❌");
  }
};

// ✅ Update cart
export const updateCart = async (cartId, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-cart/${cartId}`, itemData);
    toast.success("Cart updated ✨");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update cart ❌");
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await Api.put(`/api/v1/orders/${orderId}/status`, { status });
    return response?.data;
  } catch (error) {
    console.error("Update order status error:", error?.response?.data || error.message);
  }
};

// ✅ Delete cart
export const deleteCart = async (cartId) => {
  try {
    const response = await Api.delete(`/api/v1/delete-cart/${cartId}`);
    toast.success("Cart deleted 🗑️");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete cart ❌");
  }
};
