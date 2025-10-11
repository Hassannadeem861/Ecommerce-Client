import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

export const getAllCategories = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-categories`);
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in get all categories");
  }
};

export const createCategory = async (itemData) => {
  try {
    const response = await Api.post(`/api/v1/create-category`, itemData);
    toast.success("Category created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in create category");
  }
};

export const updateCategory = async (id, itemData) => {
  try {
    const response = await Api.put(`/api/v1/update-category/${id}`, itemData);
    toast.success("Category updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in update category");
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-category/${id}`);
    toast.success("Category deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response.data.message || "Error in delete-category");
  }
};
