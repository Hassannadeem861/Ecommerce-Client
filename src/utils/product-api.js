import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllProducts = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-products`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all product");
    console.error("Error fetching product:", error.message);
  }
};

export const getSingleProduct = async (id) => {
  try {
    const response = await Api.get(`/api/v1/get-single-product/${id}`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all product");
  }
};

export const createProduct = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-product`, itemData);
    toast.success("Product created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create product");
  }
};

export const updateProduct = async (id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-product/${id}`, itemData);
    toast.success("Product updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update product");
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-product/${id}`);
    toast.success("Product deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete-product");
  }
};
