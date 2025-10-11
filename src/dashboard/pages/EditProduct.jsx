import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X, ArrowLeft, Plus } from "lucide-react";
import { updateProduct, getSingleProduct } from "../../utils/product-api.js";
import { getAllCategories } from "../../utils/category-api.js";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const [newColor, setNewColor] = useState("");
  const [newFabric, setNewFabric] = useState("");
  const [newFit, setNewFit] = useState("");
  const [newSize, setNewSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // 🔹 Parse helper (always return array)
  const parseField = (field, fallback = []) => {
    try {
      if (!field) return fallback;
      let parsed = JSON.parse(field);
      if (typeof parsed === "string") parsed = JSON.parse(parsed);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return Array.isArray(field) ? field : fallback;
    }
  };

  // 🔹 Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProduct(id);

        if (res?.data) {
          const p = res.data;
          setProduct({
            ...p,
            colors: parseField(p.colors, []),
            fabrics: parseField(p.fabrics, []),
            fits: parseField(p.fits, []),
            sizes: parseField(p.sizes, []),
            tags: p.tags || "",
            discount: p.discount || "",
            model_wears: p.model_wears || "",
            model_height: p.model_height || "",
            category_id: p.categories ? p.categories.map((c) => c.id) : [],
            men: p.men || 0,
            women: p.women || 0,
            whats_new: p.whats_new || 0,
            is_special: p.is_special || 0,
            more_to_explore: p.more_to_explore || 0,
            style_by: p.style_by || 0,
            trending_product: p.trending_product || 0,
          });

          // Product images (existing URLs from server)
          setProductImages(parseField(p.productImg, []));
        }
      } catch (error) {
        console.error("Failed to load product:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCategories();
        if (res?.success) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error("Failed to load categories:", error.message);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImages([...productImages, ...files]); // store File objects
  };

  // 🔹 Remove image
  const removeImage = (index) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  // 🔹 Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔹 Add/remove dynamic items
  const addItem = (field, value, setter) => {
    if (value.trim() && !product[field].includes(value.trim())) {
      setProduct({
        ...product,
        [field]: [...product[field], value.trim()],
      });
      setter("");
    }
  };

  const removeItem = (field, index) => {
    const updatedList = [...product[field]];
    updatedList.splice(index, 1);
    setProduct({
      ...product,
      [field]: updatedList,
    });
  };

  // Handle switch changes
  const handleSwitchChange = (field, checked) => {
    setProduct((prev) => ({
      ...prev,
      [field]: checked ? 1 : 0,
    }));
  };

  // 🔹 Submit update (send as FormData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("sku", product.sku);
      formData.append("brand", product.brand);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock_quantity", product.stock_quantity);
      formData.append("tags", product.tags);
      formData.append("discount", product.discount);
      formData.append("model_height", product.model_height);
      formData.append("model_wears", product.model_wears);
      formData.append("category_id", JSON.stringify(product.category_id || []));
      formData.append("whats_new", product.whats_new);
      formData.append("men", product.men);
      formData.append("women", product.women);
      formData.append("is_special", product.is_special);
      formData.append("more_to_explore", product.more_to_explore);
      formData.append("style_by", product.style_by);
      formData.append("trending_product", product.trending_product);

      formData.append("colors", JSON.stringify(product.colors || []));
      formData.append("fabrics", JSON.stringify(product.fabrics || []));
      formData.append("fits", JSON.stringify(product.fits || []));
      formData.append("sizes", JSON.stringify(product.sizes || []));

      // Images (if File object → append, if string → keep as existing)
      // const existingImages = [];
      // productImages.forEach((img) => {
      //   if (img instanceof File) {
      //     formData.append("productImg", img);
      //   } else {
      //     existingImages.push(img);
      //   }
      // });

      const existingImages = [];

      for (let img of productImages) {
        if (img instanceof File) {
          if (img.size > 500 * 1024) {
            toast.error(`${img.name} is too big (max 500KB allowed)`);
            setIsLoading(false);
            return; // pura function stop
          }
          formData.append("productImg", img); // nayi image file bhejo
        } else {
          existingImages.push(img); // purani wali string images safe rakh lo
        }
      }
      
      // purani images ko alag append karo
      formData.append("existing_images", JSON.stringify(existingImages));

      await updateProduct(id, formData);
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Update failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <p className="text-center py-8">Loading product...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard/manage-products")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard/manage-products")}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <Label>Product Name</Label>
              <Input
                name="name"
                value={product.name || ""}
                onChange={handleChange}
              />
            </div>

            {/* SKU */}
            <div>
              <Label>SKU</Label>
              <Input
                name="sku"
                value={product.sku || ""}
                onChange={handleChange}
              />
            </div>

            {/* Categories */}
            <div className="md:col-span-2">
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={product.category_id?.includes(cat.id)} // ✅ default selected
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (e.target.checked) {
                          // Add category
                          setProduct((prev) => ({
                            ...prev,
                            category_id: [...(prev.category_id || []), value],
                          }));
                        } else {
                          // Remove category
                          setProduct((prev) => ({
                            ...prev,
                            category_id: prev.category_id.filter(
                              (id) => id !== value
                            ),
                          }));
                        }
                      }}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div>
              <Label>Brand</Label>
              <Input
                name="brand"
                value={product.brand || ""}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={product.description || ""}
                onChange={handleChange}
              />
            </div>

            {/* Price & Stock */}
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={product.price || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock_quantity"
                value={product.stock_quantity || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Discount</Label>
              <Input
                type="number"
                name="discount"
                value={product.discount || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Model Height & Wears */}
            <div>
              <Label>Model Height</Label>
              <Input
                name="model_height"
                value={product.model_height || ""}
                onChange={handleChange}
                // required
              />
            </div>
            <div>
              <Label>Model Wears</Label>
              <Input
                name="model_wears"
                value={product.model_wears || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Images */}
            <div className="md:col-span-2">
              <Label>Product Images</Label>
              <div className="flex gap-4 mt-2 flex-wrap">
                {productImages?.map((img, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={
                        img instanceof File
                          ? URL.createObjectURL(img)
                          : `${import.meta.env.VITE_API_URL}${img}`
                      }
                      className="w-24 h-24 object-cover rounded border"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="mt-3"
              />
            </div>

            {/* Colors */}
            <div>
              <Label>Colors</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add color"
                />
                <Button
                  type="button"
                  onClick={() => addItem("colors", newColor, setNewColor)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.colors?.map((color, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 rounded flex items-center gap-1"
                  >
                    {color}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem("colors", i)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Fabrics */}
            <div>
              <Label>Fabrics</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  placeholder="Add fabric"
                />
                <Button
                  type="button"
                  onClick={() => addItem("fabrics", newFabric, setNewFabric)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.fabrics?.map((fabric, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 rounded flex items-center gap-1"
                  >
                    {fabric}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem("fabrics", i)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Fits */}
            <div>
              <Label>Fits</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newFit}
                  onChange={(e) => setNewFit(e.target.value)}
                  placeholder="Add fit"
                />
                <Button
                  type="button"
                  onClick={() => addItem("fits", newFit, setNewFit)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.fits?.map((fit, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 rounded flex items-center gap-1"
                  >
                    {fit}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem("fits", i)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Label>Sizes</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Add size"
                />
                <Button
                  type="button"
                  onClick={() => addItem("sizes", newSize, setNewSize)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.sizes?.map((size, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 rounded flex items-center gap-1"
                  >
                    {size}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeItem("sizes", i)}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="md:col-span-2">
              <Label>Tags</Label>
              <Input
                name="tags"
                value={product.tags || ""}
                onChange={handleChange}
                placeholder="Enter tags (comma separated)"
              />
            </div>

            <div className="md:col-span-2 flex flex-wrap items-center gap-6">
              {/* Men */}
              <Switch
                id="men"
                checked={product.men === 1}
                onCheckedChange={(checked) =>
                  handleSwitchChange("men", checked)
                }
              />
              <Label htmlFor="men">Men</Label>

              {/* Women */}
              <Switch
                id="women"
                checked={product.women === 1}
                onCheckedChange={(checked) =>
                  handleSwitchChange("women", checked)
                }
              />
              <Label htmlFor="women">Women</Label>

              <Switch
                id="whats_new"
                checked={product.whats_new === 1}
                onCheckedChange={(checked) =>
                  handleSwitchChange("whats_new", checked)
                }
              />
              <Label htmlFor="whats_new">What's New</Label>

              {/* <div className="flex items-center gap-4"> */}
              <Label>Trending Product</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="trending_no"
                    name="trending_product"
                    value="0"
                    checked={product.trending_product == 0}
                    onChange={handleChange}
                  />
                  <Label htmlFor="trending_no">No</Label>
                  {/* </div> */}

                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="trending_yes"
                      name="trending_product"
                      value="1"
                      checked={product.trending_product == 1}
                      onChange={handleChange}
                    />
                    <Label htmlFor="trending_yes">Yes</Label>
                  </div>
                </div>
              </div>

              {/* <div className="flex items-center gap-2"> */}
              <Switch
                id="is_special"
                checked={product.is_special === 1}
                onCheckedChange={(checked) =>
                  handleSwitchChange("is_special", checked)
                }
              />
              <Label htmlFor="is_special">Is Special</Label>
              {/* </div> */}

              {/* <div className="flex items-center gap-2"> */}
              <Switch
                id="more_to_explore"
                checked={product.more_to_explore === 1}
                onCheckedChange={(checked) =>
                  handleSwitchChange("more_to_explore", checked)
                }
              />
              <Label htmlFor="more_to_explore">More To Explore</Label>
              {/* </div> */}

              {/* <div className="flex items-center gap-2"> */}
              <Switch
                id="style_by"
                checked={product.style_by === 1}
                onCheckedChange={(checked) =>
                  handleSwitchChange("style_by", checked)
                }
              />
              <Label htmlFor="style_by">Style By</Label>
              {/* </div> */}
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
