"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductCarousel from "../components/ProductCarousel.jsx";
import { getSingleProduct } from "../utils/product-api.js";
import {
  createCart,
  getSingleCart,
  getAllCarts,
  updateCart,
} from "../utils/cart-api.js";
import Navbar from "../components/Navbar.jsx";
import FooterSection from "../components/Footer.jsx";
import ProductCategoryCarousel from "../components/ProductCategoryCarousel.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Loader from "../components/loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice.js";
import { motion, AnimatePresence } from "framer-motion";
import { removeItem, updateQuantity } from "../redux/cartSlice.js";

const ProductDetailPage = () => {
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUnstitched, setIsUnstitched] = useState(false);

  // Get single product
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

        // ✅ Default Unstitched check
        if (p.un_switch === 1) {
          setIsUnstitched(true);
        }
      }
    };
    fetchProduct();
  }, [id]);

  // ✅ LocalStorage helper functions
  const getGuestSession = () => {
    const session = localStorage.getItem("guest_session_id");
    return session ? JSON.parse(session) : null;
  };

  // REDUX ITEM REMOVE FUNCTION
  const handleDelete = (id) => {
    localStorage.removeItem("guest_session_id");
    dispatch(removeItem(id));
  };

  // const handleUpdateQuantity = (item, change) => {
  //   dispatch(updateQuantity({ id: item.id, change }));
  // };

  const handleUpdateQuantity = async (item, change) => {
    const newQty = Math.max(1, item.quantity + change);

    // 1) Optimistic update (frontend pe turant reflect ho)
    dispatch(updateQuantity({ id: item.id, change }));

    try {
      // 2) Backend update
      const res = await updateCart(cart.id, {
        user_id: user?.id || null,
        session_id: user?.id ? null : cart.session_id,
        items: [
          {
            product_id: item.product_id,
            quantity: newQty,
            un_stitch: item.un_stitch || 0,
            // size: item.size,
            // color: item.color,
          },
        ],
      });

      if (res?.success) {
        // 3) Fresh backend cart Redux me save
        dispatch(setCart(res.cart));
      }
    } catch (error) {
      console.error("Update quantity failed:", error.message);

      // // Optional: rollback / refresh from backend
      // const fresh = await getCart(cart.id);
      // dispatch(setCart(fresh));
    }
  };

  const setGuestSession = (id) => {
    localStorage.setItem("guest_session_id", JSON.stringify(id));
  };

  // ADD TO CART FUNCTION
  const handleAddToCart = async () => {
    // ✅ maintain cart guest session
    const sessionId = user?.id ? null : getGuestSession();
    try {
      // 🟢 Calculate the discount price
      const finalPrice = isUnstitched
        ? Number(product.un_switch_price).toFixed(2)
        : product.discount > 0
        ? (
            Number(product.price) -
            (Number(product.price) * Number(product.discount)) / 100
          ).toFixed(2)
        : Number(product.price).toFixed(2);

      const payload = {
        user_id: user?.id ? user.id : null, // login user for user_id
        session_id: user?.id ? null : sessionId, // guest for session_id
        // color: selectedColor || null,
        // size: isUnstitched ? null : selectedSize || null, //  null the unstitched case
        items: [
          {
            product_id: product.id || null,
            quantity: quantity || 1,
            price: finalPrice,
            original_price: Number(product.price).toFixed(2),
            color: selectedColor || null,
            size: isUnstitched ? null : selectedSize || null, //  null the unstitched case
            un_stitch: isUnstitched ? 1 : 0,
          },
        ],
      };

      const res = await createCart(payload);

      if (res?.success) {
        // ✅ If backend send the session_id save the local storage
        if (!user?.id && res.session_id) {
          setGuestSession(res.session_id);
        }

        // ✅ Save the cart state in redux
        dispatch(setCart(res.cart));

        // ✅ Open the cart sidebar
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error("Add to Cart Error:", error.message);
    }
  };

  const toggleDetails = () => setIsDetailsOpen(!isDetailsOpen);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Product Images */}
          <div className="w-full md:w-1/2">
            {/* ✅ Adjusted grid gap for mobile responsiveness and increased image size */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {product.productImg.length > 0 ? (
                product.productImg.slice(0, 5).map((img, index) => (
                  <div
                    key={index}
                    className="overflow-hidden"
                    onClick={() =>
                      setSelectedImage(`${import.meta.env.VITE_API_URL}${img}`)
                    }
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

          {/* ✅ Image Preview Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setSelectedImage(null)}
            >
              <img
                src={selectedImage}
                alt="Preview"
                className="max-w-[90%] max-h-[90%] object-contain rounded-lg shadow-lg"
                loading="lazy"
              />
            </div>
          )}

          {/* Right Column - Product Details */}
          <div className="w-full md:w-1/2">
            <div className="mb-6">
              <span className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-semibold text-black uppercase tracking-wider">
                {product.tags || "N/A"}
              </span>

              <div className="flex items-baseline gap-2 mt-2 mb-1">
                <h1 className="text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] font-[Montserrat,sans-serif] font-bold text-black">
                  {product.name}
                </h1>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="text-[16px] sm:text-[20px] text-gray-500"
                >
                  {/* {isWishlisted ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )} */}
                </button>
              </div>

              {/* Price Section */}
              {isUnstitched ? (
                <p className="text-[14px] sm:text-[18px] leading-[18px] sm:leading-[22px] font-[Montserrat,sans-serif] font-bold black-[#ED0101]">
                  Rs.{Math.round(Number(product.un_switch_price))}
                </p>
              ) : product.discount > 0 ? (
                // existing the discount code
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2">
                    {/* Old Price */}
                    <span className="text-[12px] sm:text-[16px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black line-through">
                      Rs.{Math.round(Number(product.price))}
                    </span>

                    {/* Discounted Price */}
                    <span className="text-[14px] sm:text-[18px] leading-[18px] sm:leading-[22px] font-[Montserrat,sans-serif] font-bold text-[#ED0101]">
                      Rs.
                      {Math.round(
                        Number(product.price) -
                          (Number(product.price) * Number(product.discount)) /
                            100
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] sm:text-[18px] font-bold text-black mt-2">
                  Rs.{Math.round(Number(product.price))}
                </p>
              )}

              {/* {product.discount > 0 ? (
                <div className="flex flex-col mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] sm:text-[16px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black line-through">
                      Rs.{Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-[14px] sm:text-[18px] leading-[18px] sm:leading-[22px] font-[Montserrat,sans-serif] font-bold text-[#ED0101]">
                      Rs.
                      {(
                        Number(product.price) -
                        (Number(product.price) * Number(product.discount)) / 100
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-[14px] sm:text-[18px] leading-[18px] sm:leading-[22px] font-[Montserrat,sans-serif] font-bold text-black mt-2">
                  Rs.{Number(product.price).toFixed(2)}
                </p>
              )} */}

              <p className="text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-semibold text-black uppercase tracking-wider">
                SKU.{product.sku}
              </p>
            </div>

            {product.un_switch === 1 && (
              <div className="mb-4">
                <button
                  className={`px-4 py-2 border rounded-md font-bold ${
                    isUnstitched ? "bg-black text-white" : "border-gray-300"
                  }`}
                  onClick={() => {
                    setIsUnstitched(!isUnstitched);
                    setSelectedSize(null); // size reset
                  }}
                >
                  {isUnstitched ? "Unstitched Selected" : "Select Unstitched"}
                </button>
              </div>
            )}

            {/* Size Selection */}
            {!isUnstitched && product.sizes?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-[14px] sm:text-[18px] font-bold mb-2">
                  SIZE
                </h3>
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

            {/* {product.sizes?.length > 0 && (
              <div className="mb-4">
                <h3 className="text-[14px] sm:text-[18px] leading-[18px] sm:leading-[22px] font-[Montserrat,sans-serif] font-bold text-black mb-2">
                  SIZE
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 border rounded-md text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black ${
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
            )} */}

            {/* Color Selection */}
            {product.colors?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-[14px] sm:text-[18px] leading-[18px] sm:leading-[22px] font-[Montserrat,sans-serif] font-bold text-black mb-2">
                  COLOR
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`px-4 py-2 border rounded-md text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black ${
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
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-3 py-2 text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] font-[Montserrat,sans-serif] font-medium text-black hover:bg-gray-100"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2 text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] font-[Montserrat,sans-serif] font-medium text-black hover:bg-gray-100"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`w-auto bg-black text-[14px] sm:text-[16px] leading-[18px] sm:leading-[20px] font-[Montserrat,sans-serif] font-bold text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors 
                `}
                // ${
                //   !selectedSize || !selectedColor
                //     ? "opacity-50 cursor-not-allowed"
                //     : ""
                // }
                // disabled={!selectedSize || !selectedColor}
              >
                ADD TO BAG
              </button>
            </div>

            {/* Toggleable Product Details Section */}
            <div className="border-t border-b border-gray-200 py-4 mt-8">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={toggleDetails}
              >
                <h2 className="text-[12px] sm:text-[18px] leading-[20px] sm:leading-[24px] font-[Montserrat,sans-serif] font-bold text-black uppercase">
                  PRODUCT DETAILS
                </h2>
                <span className="text-[12px] sm:text-[14px] leading-[20px] sm:leading-[24px] font-[Montserrat,sans-serif] font-bold text-black cursor-pointer">
                  {isDetailsOpen ? "−" : "+"}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isDetailsOpen ? "max-h-[600px]" : "max-h-0"
                }`}
              >
                <div className="pt-4 space-y-4">
                  {/* Description */}
                  <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                    {product.description || "N/A"}
                  </p>

                  {/* Brand */}
                  {product.brand && (
                    <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                      <span className="font-bold text-[10px] sm:text-[14px]">
                        Brand:
                      </span>{" "}
                      {product.brand || "N/A"}
                    </p>
                  )}

                  {/* Colors */}
                  {product.colors?.length > 0 && (
                    <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                      <span className="font-bold text-[10px] sm:text-[14px]">
                        Colors:
                      </span>{" "}
                      {product.colors.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Fabrics */}
                  {product.fabrics?.length > 0 && (
                    <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                      <span className="font-bold text-[10px] sm:text-[14px]">
                        Fabrics:
                      </span>{" "}
                      {product.fabrics.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Fits */}
                  {product.fits?.length > 0 && (
                    <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                      <span className="font-bold text-[10px] sm:text-[14px]">
                        Fits:
                      </span>{" "}
                      {product.fits.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Sizes */}
                  {product.sizes?.length > 0 && (
                    <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                      <span className="font-bold text-[10px] sm:text-[14px]">
                        Available Sizes:
                      </span>{" "}
                      {product.sizes.join(", ") || "N/A"}
                    </p>
                  )}

                  {/* Model Info */}
                  {(product.model_height || product.model_wears) && (
                    <p className="text-[10px] sm:text-[12px] leading-[16px] sm:leading-[20px] font-[Montserrat,sans-serif] font-normal text-black">
                      <span className="font-bold text-[10px] sm:text-[14px]">
                        Model Info:
                      </span>{" "}
                      Height – {product.model_height}, Wearing –{" "}
                      {product.model_wears || "N/A"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Category Carousel */}
        <ProductCategoryCarousel
          currentProduct={product}
          categories={product?.categories}
        />
      </div>
      <FooterSection />

      {/* ✅ Sidebar for Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-50"
            onClick={() => setIsCartOpen(false)}
          >
            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg overflow-y-auto"
              onClick={(e) => e.stopPropagation()} // stop click from closing
            >
              <Sidebar
                title="SHOPPING CART"
                onClose={() => setIsCartOpen(false)}
              >
                <div className="p-4 space-y-6">
                  {/* Free Shipping Msg */}
                  {cart?.items?.length > 0 && (
                    <p className="text-sm bg-blue-100 text-blue-600 px-3 py-2 rounded">
                      🎉 Congratulations! You get free shipping!
                    </p>
                  )}

                  {/* Cart Items */}
                  {cart?.items?.length > 0 ? (
                    cart.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-start">
                        {/* Product Image */}
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            item.product?.productImg
                              ? JSON.parse(item.product.productImg)[0]
                              : "N/A"
                          }`}
                          alt={item.product?.name}
                          className="w-24 h-28 object-cover rounded"
                          loading="lazy"
                        />

                        {/* Product Details */}
                        <div className="flex-1">
                          <p className="font-semibold">{item.product?.name}</p>

                          {/* <p className="text-green-600 text-sm">
                            {item.product?.stock_quantity ? "In Stock" : "N/A"}
                          </p> */}

                          {/* Stitching Status */}
                          <p className="text-sm text-gray-600">
                            {item.un_stitch === 1 ? "Unstitched" : "Stitched"}
                          </p>

                          {/* Discount && Price */}
                          {item.discount > 0 ? (
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500 line-through text-sm">
                                  Rs. {Math.round(Number(item.price))}
                                </span>
                                <span className="text-black font-bold">
                                  Rs.
                                  {Math.round(
                                    Number(item.price) -
                                      (Number(item.price) *
                                        Number(item.discount)) /
                                        100
                                  )}
                                </span>
                              </div>
                              <span className="inline-block mt-1 px-1 py-2 bg-[#F7663A] text-white text-sm font-bold border border-white rounded-sm">
                                {item.discount}% OFF
                              </span>
                            </div>
                          ) : (
                            <>Rs. {Math.round(Number(item.price))}</>
                          )}

                          {/* Discount && Price */}
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>

                          {/* Add todo quantity control code */}
                          <div className="flex items-center gap-3 mt-2">
                            <button
                              onClick={() => handleUpdateQuantity(item, -1)}
                              className="px-2 py-1 border rounded hover:bg-gray-200"
                            >
                              −
                            </button>
                            <span className="px-3">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item, 1)}
                              className="px-2 py-1 border rounded hover:bg-gray-200"
                            >
                              +
                            </button>
                            {/* Delete */}{" "}
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-500 ml-4"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    // ✅ Empty Cart Design
                    <div className="flex flex-col items-center justify-center text-center py-12">
                      <h2 className="text-lg font-semibold text-gray-700">
                        Your Cart is Empty 🛒
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        Looks like you haven’t added anything yet.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          navigate("/");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}

                  {/* ✅ Buttons only when cart has items */}
                  {cart?.items?.length > 0 && (
                    <div className="space-y-3 mt-6">
                      {/* Subtotal */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Subtotal:</span>
                          <span>
                            Rs.
                            {Math.round(
                              cart?.items?.reduce((sum, item) => {
                                const finalPrice =
                                  item.discount > 0
                                    ? Number(item.price) -
                                      (Number(item.price) *
                                        Number(item.discount)) /
                                        100
                                    : Number(item.price);
                                return sum + item.quantity * finalPrice;
                              }, 0)
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigate("/cart");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        VIEW CART
                      </button>
                      <button
                        onClick={() => {
                          navigate("/checkout");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        CHECKOUT
                      </button>
                      <button
                        onClick={() => {
                          navigate("/");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-black text-white py-3 rounded-md"
                      >
                        CONTINUE SHOPPING
                      </button>
                    </div>
                  )}
                </div>
              </Sidebar>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductDetailPage;
