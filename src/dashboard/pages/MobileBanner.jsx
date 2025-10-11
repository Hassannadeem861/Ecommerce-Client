import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  createBanner,
  updateBanner,
  getAllBanners,
  deleteBanner,
} from "../../utils/mobile-banner-api.js";
import Loader from "../../components/loader.jsx";
import toast from "react-hot-toast";
export default function MobileBanner() {
  const [banners, setBanners] = useState([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [newBannerImages, setNewBannerImages] = useState([]);
  const [editBannerImages, setEditBannerImages] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [currentBannerImages, setCurrentBannerImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const res = await getAllBanners();
      setBanners(Array.isArray(res?.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching mobile: ", error.message);
      setBanners([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // 🔹 Create Banner
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      // newBannerImages.forEach((file) => formData.append("bannerImg", file));

      for (let img of newBannerImages) {
        if (img.size > 500 * 1024) {
          toast.error(`${img.name} is too big (max 500KB allowed)`);
          setIsLoading(false);
          return; // yahan pura function stop ho jayega
        }
        formData.append("bannerImg", img);
      }

      const res = await createBanner(formData);
      // localStorage.setItem("mobile_banner_image", JSON.stringify(res));
      if (res?.newBanner) setBanners([...banners, res.newBanner]);

      fetchBanners();
      setNewBannerImages([]);
      setIsCreateDialogOpen(false);
    } catch (error) {
      console.error("Error in creating banner: ", error.message);
    }
  };

  // 🔹 Edit Banner
  const handleEditClick = (banner) => {
    setCurrentBanner(banner);

    // DB se string ya array dono handle karo
    const imgs =
      typeof banner.mobileBannerImg === "string"
        ? JSON.parse(banner.mobileBannerImg)
        : Array.isArray(banner.mobileBannerImg)
        ? banner.mobileBannerImg
        : [];

    setCurrentBannerImages(imgs); // purani images
    setEditBannerImages([]); // nayi images reset
    setIsEditDialogOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // ✅ Purani images jo remove nahi ki gayi
      const existingImgs = currentBannerImages.filter(
        (img) => typeof img === "string"
      );
      formData.append("existing_images", JSON.stringify(existingImgs));

      // ✅ New banner images
      for (let file of editBannerImages) {
        if (file.size > 800 * 1024) {
          toast.error(`${file.name} is too big (max 800KB allowed)`);
          setIsLoading(false);
          return;
        }
        formData.append("bannerImg", file);
      }

      // ✅ New images
      // editBannerImages.forEach((file) => formData.append("bannerImg", file));

      const res = await updateBanner(currentBanner.id, formData);

      if (res?.updatedBanner) {
        setBanners((prev) =>
          prev.map((b) =>
            b.id === res.updatedBanner.id ? res.updatedBanner : b
          )
        );
      }

      setEditBannerImages([]);
      setCurrentBannerImages([]);
      setIsEditDialogOpen(false);
      setCurrentBanner(null);
    } catch (error) {
      console.error("❌ Error updating banner:", error.message);
    }
  };

  // 🔹 Delete Banner
  const handleDeleteClick = (banner) => {
    setCurrentBanner(banner);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteBanner(currentBanner.id);
      setBanners(banners.filter((b) => b.id !== currentBanner.id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteAlertOpen(false);
      setCurrentBanner(null);
    }
  };

  // 🔹 Preview
  const handlePreviewClick = (img) => {
    setPreviewImage(img);
    setIsPreviewOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Mobile Banners</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2"
              disabled={banners.length > 0} // ✅ ek bar create hone ke baad disable
            >
              <Plus className="w-4 h-4" /> Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Banner</DialogTitle>
              <DialogDescription>
                Upload one or more mobile banner images
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="images" className="text-right">
                    Images
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setNewBannerImages(Array.from(e.target.files))
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Banner Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Mobile Banners</CardTitle>
        </CardHeader>
        <CardContent>
          {banners.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No banners found.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Images</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner) => {
                  const imgs =
                    typeof banner.mobileBannerImg === "string"
                      ? JSON.parse(banner.mobileBannerImg)
                      : banner.mobileBannerImg;

                  return (
                    <TableRow key={banner.id}>
                      <TableCell>{banner.id}</TableCell>
                      <TableCell className="flex gap-2 flex-wrap">
                        {imgs?.map((img, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <img
                              src={`${import.meta.env.VITE_API_URL}${img}`}
                              alt={`banner-${idx}`}
                              className="w-16 h-16 object-cover rounded"
                              loading="lazy"
                            />
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() =>
                                handlePreviewClick(
                                  `${import.meta.env.VITE_API_URL}${img}`
                                )
                              }
                            >
                              Preview
                            </Button>
                          </div>
                        ))}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditClick(banner)}
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </Button>
                          {/* <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteClick(banner)}
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </Button> */}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
            <DialogDescription>Update banner images</DialogDescription>
          </DialogHeader>
          {currentBanner && (
            <form onSubmit={handleEditSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-images" className="text-right">
                    Images
                  </Label>
                  <Input
                    id="edit-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setEditBannerImages(Array.from(e.target.files))
                    }
                    className="col-span-3"
                  />
                  {/* ✅ Purani images with remove option */}
                  <div className="flex gap-2 mt-2 col-span-4 flex-wrap">
                    {currentBannerImages.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${img}`}
                          alt={`img-${idx}`}
                          className="w-16 h-16 object-cover rounded"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1 rounded"
                          onClick={() =>
                            setCurrentBannerImages((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      {/* <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Banner?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteConfirm}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md p-0">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto object-contain rounded"
              loading="lazy"
            />
          )}
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
