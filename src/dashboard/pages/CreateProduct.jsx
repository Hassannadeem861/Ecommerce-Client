import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { X, ArrowLeft, Plus } from "lucide-react";
import { createProduct } from "../../utils/product-api.js";
import { getAllCategories } from "../../utils/category-api.js";
import toast from "react-hot-toast";

export default function CreateProductForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_id: [],
    name: "",
    sku: "",
    description: "",
    price: "",
    stock_quantity: "",
    discount: "",
    brand: "",
    colors: [],
    fabrics: [],
    fits: [],
    sizes: [],
    model_height: "",
    model_wears: "",
    whats_new: 0,
    is_special: 0,
    more_to_explore: 0,
    men: 0,
    women: 0,
    style_by: 0,
    tags: "",
    trending_product: 0,
    stitched: 0,
    un_switch: 0,
    un_switch_price: "",
  });

  const [productImages, setProductImages] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [newFabric, setNewFabric] = useState("");
  const [newFit, setNewFit] = useState("");
  const [newSize, setNewSize] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    setProductImages((prev) => {
      const updated = [...prev, ...files];
      return updated;
    });

    // setProductImages([...productImages, ...files]);
  };

  // Remove image
  const removeImage = (index) => {
    setProductImages(productImages.filter((_, i) => i !== index));
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle switch changes
  const handleSwitchChange = (name, checked) => {
    setForm((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  };

  // Add/remove dynamic items
  const addItem = (field, value, setter) => {
    if (value.trim() && !form[field].includes(value.trim())) {
      setForm({
        ...form,
        [field]: [...form[field], value.trim()],
      });
      setter("");
    }
  };

  const removeItem = (field, index) => {
    const updatedList = [...form[field]];
    updatedList.splice(index, 1);
    setForm({
      ...form,
      [field]: updatedList,
    });
  };

  // Submit create
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (Array.isArray(form[key])) {
          formData.append(key, JSON.stringify(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      });

      for (let img of productImages) {
        if (img.size > 500 * 1024) {
          toast.error(`${img.name} is too big (max 500KB allowed)`);
          setIsLoading(false);
          return; // yahan pura function stop ho jayega
        }
        formData.append("productImg", img);
      }

      await createProduct(formData);
      navigate("/dashboard/manage-products");
    } catch (error) {
      console.error("Create failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold">Create Product</h1>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <Label>Product Name</Label>
              <Input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* SKU */}
            <div>
              <Label>SKU</Label>
              <Input
                name="sku"
                value={form.sku || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Category */}
            <div className="md:col-span-2">
              <Label className="font-semibold text-lg">Categories</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={cat.id}
                      checked={form.category_id.includes(cat.id)}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (e.target.checked) {
                          setForm((prev) => ({
                            ...prev,
                            category_id: [...prev.category_id, value],
                          }));
                        } else {
                          setForm((prev) => ({
                            ...prev,
                            category_id: prev.category_id.filter(
                              (id) => id !== value
                            ),
                          }));
                        }
                      }}
                      // required={form.category_id.length === 0}
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
                value={form.brand || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Price, Stock, Discount */}
            <div>
              <Label>Price</Label>
              <Input
                type="number"
                name="price"
                value={form.price || ""}
                onChange={handleChange}
                // required
              />
            </div>
            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                name="stock_quantity"
                value={form.stock_quantity || ""}
                onChange={handleChange}
                // required
              />
            </div>
            <div>
              <Label>Discount</Label>
              <Input
                type="number"
                name="discount"
                value={form.discount || ""}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Model Height & Wears */}
            <div>
              <Label>Model Height</Label>
              <Input
                name="model_height"
                value={form.model_height || ""}
                onChange={handleChange}
                // required
              />
            </div>
            <div>
              <Label>Model Wears</Label>
              <Input
                name="model_wears"
                value={form.model_wears || ""}
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
                      src={URL.createObjectURL(img)}
                      className="w-24 h-24 object-cover rounded border"
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
                // required={productImages.length === 0}
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
                  // required={form.colors?.length === 0}
                />
                <Button
                  type="button"
                  onClick={() => addItem("colors", newColor, setNewColor)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.colors?.map((color, i) => (
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
                  // required={form.fabrics?.length === 0}
                />
                <Button
                  type="button"
                  onClick={() => addItem("fabrics", newFabric, setNewFabric)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.fabrics?.map((fabric, i) => (
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
                  // required={form.fits?.length === 0}
                />
                <Button
                  type="button"
                  onClick={() => addItem("fits", newFit, setNewFit)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.fits?.map((fit, i) => (
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
                  // required={form.sizes?.length === 0}
                />
                <Button
                  type="button"
                  onClick={() => addItem("sizes", newSize, setNewSize)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {form.sizes?.map((size, i) => (
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
                value={form.tags || ""}
                onChange={handleChange}
                placeholder="Enter tags (comma separated)"
                // required
              />
            </div>

            {/* Switches & Trending (no required) */}
            <div className="md:col-span-2 flex flex-wrap items-center gap-6">
              {/*MEN */}
              <div className="flex items-center gap-2">
                <Switch
                  id="men"
                  checked={form.men === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("men", checked)
                  }
                />
                <Label htmlFor="men">Men</Label>
              </div>

              {/*WOMEN */}
              <div className="flex items-center gap-2">
                <Switch
                  id="women"
                  checked={form.women === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("women", checked)
                  }
                />
                <Label htmlFor="women">Women</Label>
              </div>

              {/*STITCHED */}
              <div className="flex items-center gap-2">
                <Switch
                  id="stitched"
                  checked={form.stitched === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("stitched", checked)
                  }
                />
                <Label htmlFor="stitched">Stitched</Label>
              </div>

              {/* UN Switch + Price */}
              <div className="flex items-center gap-3">
                <Switch
                  id="un_switch"
                  checked={form.un_switch === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("un_switch", checked)
                  }
                />
                <Label htmlFor="un_switch">Enable UN Stitch</Label>

                {form.un_switch === 1 && (
                  <Input
                    type="number"
                    name="un_switch_price"
                    value={form.un_switch_price || ""}
                    onChange={handleChange}
                    placeholder="UN Stitch Price"
                    className="w-40 ml-4"
                    required
                  />
                )}
              </div>

              {/* What's New */}
              <div className="flex items-center gap-2">
                <Switch
                  id="whats_new"
                  checked={form.whats_new === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("whats_new", checked)
                  }
                />
                <Label htmlFor="whats_new">What's New</Label>
              </div>

              {/* Is Special */}
              {/* <div className="flex items-center gap-2">
                <Switch
                  id="is_special"
                  checked={form.is_special === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("is_special", checked)
                  }
                />
                <Label htmlFor="is_special">Is Special</Label>
              </div> */}

              {/* More To Explore */}
              <div className="flex items-center gap-2">
                <Switch
                  id="more_to_explore"
                  checked={form.more_to_explore === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("more_to_explore", checked)
                  }
                />
                <Label htmlFor="more_to_explore">More To Explore</Label>
              </div>

              {/* Style By */}
              <div className="flex items-center gap-2">
                <Switch
                  id="style_by"
                  checked={form.style_by === 1}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("style_by", checked)
                  }
                />
                <Label htmlFor="style_by">Style By</Label>
              </div>

              {/* Trending Product */}
              <div className="flex items-center gap-4">
                <Label>Trending Product</Label>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="trending_no"
                      name="trending_product"
                      value="0"
                      checked={form.trending_product == 0}
                      onChange={handleChange}
                    />
                    <Label htmlFor="trending_no">No</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="trending_yes"
                      name="trending_product"
                      value="1"
                      checked={form.trending_product == 1}
                      onChange={handleChange}
                    />
                    <Label htmlFor="trending_yes">Yes</Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
