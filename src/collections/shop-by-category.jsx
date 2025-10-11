import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Carousal from "../components/WhatsNew.jsx";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader.jsx";

const ShopByCategory = () => {
  const { list: products } = useSelector((state) => state.product);
  const [gridSize, setGridSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const productsPerPage = 12;

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  // ✅ Scroll top jab bhi category change ho
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params.categoryId]);

  if (loading) return <Loader />;

  // ✅ Filter products by category
  const categoryId = params.categoryId ? parseInt(params.categoryId) : null;
  const filteredProducts = categoryId
    ? products.filter(
        (product) =>
          product.categories &&
          product.categories.some((cat) => cat.id === categoryId)
      )
    : [];

  // ✅ Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-4">
      {/* <Carousal/> */}

      {/* Pattern Boxes (Desktop) */}
      <div className="flex gap-3 mb-6 justify-end hidden sm:flex">
        {[2, 3, 4].map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-3 py-2 border border-black transition-colors duration-300 ${
              gridSize === size ? "bg-white text-black" : "bg-white text-black"
            }`}
          >
            {"▮".repeat(size)}
          </button>
        ))}
      </div>

      {/* Pattern Boxes (Mobile) */}
      <div className="flex gap-3 mb-6 justify-end sm:hidden">
        {[1, 2].map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-1 py-1 border border-black transition-colors duration-300 ${
              gridSize === size ? "text-black" : "bg-white text-black"
            }`}
          >
            {size === 1 ? "▮" : "▮▮"}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-5 ${
          gridSize === 1
            ? "grid-cols-1"
            : gridSize === 2
            ? "grid-cols-2 sm:grid-cols-2"
            : gridSize === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {currentProducts?.length > 0 ? (
          currentProducts.map((cat) => {
            const images = JSON.parse(cat.productImg || "[]");
            const finalPrice =
              Number(cat.price) -
              (Number(cat.price) * Number(cat.discount || 0)) / 100;

            return (
              <Link to={`/product-detail/${cat.id}`} key={cat.id}>
                {/* Product Image */}
                {images.length > 0 && (
                  <>
                    {/* ✅ Mobile Image Box */}
                    <div
                      className={`overflow-hidden w-full sm:hidden ${
                        gridSize === 1
                          ? "h-130"
                          : gridSize === 2
                          ? "h-60"
                          : "h-130"
                      }`}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          images[selectedImage === cat.id ? 1 : 0] || images[0]
                        }`}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-3000 ease-in-out hover:scale-120"
                        loading="lazy"
                        onMouseEnter={() => {
                          if (images.length > 1) setSelectedImage(cat.id);
                        }}
                        onMouseLeave={() => setSelectedImage(0)}
                      />
                    </div>

                    {/* ✅ Desktop Image Box */}
                    <div
                      className="overflow-hidden w-full hidden sm:block"
                      style={{
                        height:
                          gridSize === 1
                            ? "1200px"
                            : gridSize === 2
                            ? "1200px"
                            : "550px",
                      }}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          images[selectedImage === cat.id ? 1 : 0] || images[0]
                        }`}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-3000 ease-in-out hover:scale-120"
                        loading="lazy"
                        onMouseEnter={() => {
                          if (images.length > 1) setSelectedImage(cat.id);
                        }}
                        onMouseLeave={() => setSelectedImage(0)}
                      />
                    </div>
                  </>
                )}

                {/* Product Info */}
                <div
                  className={`flex flex-col sm:flex-row justify-between items-start ${
                    gridSize === 2 ? "h-40 flex-col items-start max-h-40" : ""
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-[10px] bg-gray-200 text-[#222222] font-semibold px-2 py-0.5 mt-1 inline-block">
                      {cat.tags?.length > 10
                        ? cat.tags.slice(0, 10) + "..."
                        : cat.tags}
                    </span>
                    <p className="text-[15px] sm:text-[18px] leading-[18px] sm:leading-[30px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1 cursor-pointer">
                      {/* Mobile par truncate, Desktop par full name */}
                      <span className="block sm:hidden">
                        {cat.name?.length > 10
                          ? cat.name.slice(0, 10) + "..."
                          : cat.name}
                      </span>
                      <span className="hidden sm:block">
                        {cat.name?.length > 20
                          ? cat.name.slice(0, 20) + "..."
                          : cat.name}
                      </span>
                    </p>
                    <p className="text-[12px] font-semibold text-[#222222]">
                      {cat.brand?.length > 10
                        ? cat.brand.slice(0, 10) + "..."
                        : cat.brand}
                    </p>

                    {cat.discount > 0 ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          {/* Old Price */}
                          <span className="line-through text-gray-500 text-[12px]">
                            Rs. {Math.round(Number(cat.price))}
                          </span>

                          {/* Discounted Price */}
                          <span className="text-[#ED0101] font-semibold text-[12px]">
                            Rs. {Math.round(finalPrice)}
                          </span>
                        </div>

                        {/* Discount Label */}
                        <span
                          className="
                                        inline-block mt-1 text-center
                                        py-1 px-2  /* Desktop padding */
                                        bg-black text-white
                                        text-[8px] sm:text-[14px]  /* Mobile small, Desktop normal */
                                        leading-[14px] sm:leading-[16px]
                                        font-[Montserrat,sans-serif] font-semibold
                                        border border-white rounded-sm
                                        whitespace-nowrap
                                        w-14 sm:w-auto  /* Mobile fixed, Desktop auto */
                                         sm:mx-0    /* Mobile sides me gap, Desktop no gap */
                                      "
                        >
                          {cat.discount}% OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-[12px] font-semibold text-[#222222]">
                        Rs. {Math.round(Number(cat.price))}
                      </span>
                    )}
                  </div>

                  <div className="hidden sm:block p-2 cursor-pointer">
                    <FaHeart size={20} />
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-center col-span-full">No product found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={handlePrevPage}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => {
              handlePageChange(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 ${
              currentPage === page ? "bg-black text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-200 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopByCategory;
