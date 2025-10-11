import Api from "../services/axios.js";
import toast from "react-hot-toast";

export const getAllUsers = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-users`);
    return response?.data;
  } catch (error) {
    console.log("Signup error:", error?.response?.data || error.message);
    
  }
};

export const signup = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/signup`, itemData);
    toast.success("Signup successful ✅");
    return response?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Signup failed ❌");
  }
};

export const loginUser = async (itemData) => {  
  try {
    const response = await Api.post(`/api/v1/login`, itemData);
    toast.success("Login successful 🎉");
    return response?.data;
  } catch (error) {
    console.log("Login failed ❌", error?.response?.data?.message)
    // toast.error(error?.response?.data?.message || "Login failed ❌");
    // throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await Api.post(`/api/v1/logout`);
    toast.success("Logged out 👋");
    return response?.data;
  } catch (error) {
    console.error("Logout error:", error?.response?.data || error.message);
    // toast.error(error?.response?.data?.message || "Logout failed ❌");
    // throw error;
  }
};

export const updateUser = async (id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-user/${id}`, itemData);
    toast.success("User updated successfully ✨");
    return response?.data;
  } catch (error) {
    console.error("Update error:", error?.response?.data || error.message);
    // toast.error(error?.response?.data?.message || "Update failed ❌");
    // throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-user/${id}`);
    toast.success("User deleted successfully 🗑️");
    return response?.data;
  } catch (error) {
    console.error("Delete error:", error?.response?.data || error.message);
    // toast.error(error?.response?.data?.message || "Delete failed ❌");
    // throw error;
  }
};
