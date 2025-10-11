import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getSingleProduct } from "../../utils/product-api.js";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  // const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await getSingleProduct(id);
      if (res?.success) {
        const p = res.data;

        const parseSafe = (val) => {
          if (!val) return [];
          try {
            let parsed = typeof val === "string" ? JSON.parse(val) : val;
            if (typeof parsed === "string") parsed = JSON.parse(parsed);
            return parsed;
          } catch {
            return [];
          }
        };

        setProduct({
          ...p,
          productImg: Array.isArray(p.productImg)
            ? p.productImg
            : JSON.parse(p.productImg || "[]"),
          colors: parseSafe(p.colors),
          sizes: parseSafe(p.sizes),
          fabrics: parseSafe(p.fabrics),
          fits: parseSafe(p.fits),
        });
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  const trendingCategories = [
    {
      name: "Women Fashion",
      brand: "RTW Pehchan Edit",
      price: "Rs. 5,490.00",
      tag: "NEW IN",
      img: "https://media.istockphoto.com/id/505534803/photo/young-beautiful-women-shopping-at-the-weekly-cloth-market.jpg?s=612x612&w=0&k=20&c=cedc1imhUYnc6hw7tgd0pHXA_gMe2-cNmpTRJ_63g7w=",
    },
    {
      name: "Men Fashion",
      brand: "RTW Classic Edition",
      price: "Rs. 8,990.00",
      tag: "TRENDING",
      img: "https://scontent.fkhi2-2.fna.fbcdn.net/v/t39.30808-6/482962273_660301246378121_288575350348661627_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=B0gOYzA4ZZAQ7kNvwEt1BZ8&_nc_oc=AdndFYWUhahCLgdiVRum7ETxsUIP1muRoXP-p202OXQZ7_69vSiBJ_dnjfB7G092c4o&_nc_zt=23&_nc_ht=scontent.fkhi2-2.fna&_nc_gid=wMUaZ1ZDNGVHJgyRS79rFQ&oh=00_AfUYP5i8uJs_racazCq6BP-xN-yp5wCEGzQ31Pba1lpTzA&oe=68A37437",
    },
    {
      name: "Accessories",
      brand: "Luxury Accents",
      price: "Rs. 5,990.00",
      tag: "BEST SELLER",
      img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1920&auto=format&fit=crop",
    },
    {
      name: "Jewelry",
      brand: "Royal Elegance",
      price: "Rs. 5,990.00",
      tag: "HOT",
      img: "https://plus.unsplash.com/premium_photo-1681276170092-446cd1b5b32d?w=800&auto=format&fit=crop&q=60",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Green", "Yellow", "Black", "White"];

  const productImages = [
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  ];

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);
  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  // const increaseQuantity = () => setQuantity((prev) => prev + 1);
  // const decreaseQuantity = () =>
  //   quantity > 1 && setQuantity((prev) => prev - 1);

  const handleSizeSelect = (size) => setSelectedSize(size);
  const handleColorSelect = (color) => setSelectedColor(color);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Product Images */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(product?.productImg) &&
            product?.productImg.length > 0 ? (
              product.productImg.slice(0, 5).map((img, index) => (
                <div
                  key={index}
                  className="overflow-hidden"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${img}`}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="w-full md:w-1/2">
          <div className="mb-6">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {product.tags || "N/A"}
            </span>

            <div className="flex items-baseline gap-2 mt-2 mb-1">
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="text-xl text-gray-500"
              >
                {isWishlisted ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
            </div>

            <p className="text-1xl font-bold text-black">
              Rs.{Number(product.price).toFixed(2)}
            </p>
            {/* <br /> */}
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              SKU.{product.sku}
            </p>
          </div>

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">SIZE</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">COLOR</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector and Add to Cart */}
          {/* <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                className="px-3 py-2 text-lg font-medium hover:bg-gray-100"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                className="px-3 py-2 text-lg font-medium hover:bg-gray-100"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>

          </div> */}

          {/* Toggleable Product Details Section */}
          <div className="border-t border-b border-gray-200 py-4 mt-8">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleDetails}
            >
              <h2 className="text-lg font-semibold">PRODUCT DETAILS</h2>
              <span className="text-xl">{isDetailsOpen ? "−" : "+"}</span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isDetailsOpen ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="pt-4 space-y-4 text-gray-700">
                {/* Description */}
                <p>{product.description || "N/A"}</p>

                {/* Brand */}
                {product.brand && (
                  <p>
                    <span className="font-semibold">Brand:</span>{" "}
                    {product.brand || "N/A"}
                  </p>
                )}

                {/* Colors */}
                {/* {product.colors?.length > 0 && (
                  <p>
                    <span className="font-semibold">Colors:</span>{" "}
                    {product.colors.join(", ") || "N/A"}
                  </p>
                )} */}

                {/* Fabrics */}
                {product.fabrics?.length > 0 && (
                  <p>
                    <span className="font-semibold">Fabrics:</span>{" "}
                    {product.fabrics.join(", ") || "N/A"}
                  </p>
                )}

                {/* Fits */}
                {product.fits?.length > 0 && (
                  <p>
                    <span className="font-semibold">Fits:</span>{" "}
                    {product.fits.join(", ") || "N/A"}
                  </p>
                )}

                {/* Sizes */}
                {/* {product.sizes?.length > 0 && (
                  <p>
                    <span className="font-semibold">Available Sizes:</span>{" "}
                    {product.sizes.join(", ") || "N/A"}
                  </p>
                )} */}

                {/* Model Info */}
                {(product.model_height || product.model_wears) && (
                  <p>
                    <span className="font-semibold">Model Info:</span> Height –{" "}
                    {product.model_height}, Wearing –{" "}
                    {product.model_wears || "N/A"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
