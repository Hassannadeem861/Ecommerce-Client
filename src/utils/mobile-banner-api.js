import Api from "../services/axios.js";
import { toast } from "react-hot-toast";

// Get all banners
export const getAllBanners = async () => {
  try {
    const response = await Api.get(`/api/v1/get-all-mobile-banners`);
    return response?.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error in get all banners");
  }
};

// Get single banner
export const getSingleBanner = async (id) => {
  try {
    const response = await Api.get(`/api/v1/get-single-banner/${id}`);
    return response?.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error in get single banner");
  }
};

// Create banner
export const createBanner = async (formData) => {
  try {
    const response = await Api.post(`/api/v1/create-mobile-banner`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Banner created successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error in create banner");
  }
};

// Update banner
export const updateBanner = async (id, formData) => {
  try {
    const response = await Api.put(
      `/api/v1/update-mobile-banner/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    toast.success("Banner updated successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error in update banner");
  }
};

// Delete banner
export const deleteBanner = async (id) => {
  try {
    const response = await Api.delete(`/api/v1/delete-banner/${id}`);
    toast.success("Banner deleted successfully!");
    return response?.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Error in delete banner");
  }
};
