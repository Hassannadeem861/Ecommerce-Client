import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Carousal from "../components/WhatsNew.jsx";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../components/loader.jsx";

const Shop = () => {
  const { list: products } = useSelector((state) => state.product);
  const [gridSize, setGridSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);

  const productsPerPage = 12;

  useEffect(() => {
    if (products && products.length > 0) {
      setLoading(false);
    }
  }, [products]);

  if (loading) return <Loader />;

  const allProducts = products;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <Navbar />
      <Carousal />

      {/* Pattern Boxes */}
      <div className="flex gap-3 p-4 mb-6 justify-end hidden sm:flex">
        {/* ✅ Hidden pattern boxes on mobile (sm: breakpoint) */}
        {[2, 3, 4].map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-3 py-2 border border-black transition-colors duration-300 ${
              gridSize === size
              // ? "bg-black text-white"
              // : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {"▮".repeat(size)}
          </button>
        ))}
      </div>

      <div className="flex gap-3 p-4 mb-6 justify-end sm:hidden">
        {/* ✅ Mobile ke liye pattern boxes */}
        {[1, 2].map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-1 py-1 border border-black transition-colors duration-300 ${
              gridSize === size
                ? "text-black"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {size === 1 ? "▮" : "▮▮"}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-5 p-4 ${
          gridSize === 1
            ? "grid-cols-1"
            : gridSize === 2
            ? "grid-cols-2 sm:grid-cols-2"
            : gridSize === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {currentProducts.map((cat) => {
          const images = JSON.parse(cat.productImg || []);
          const finalPrice =
            Number(cat.price) -
            (Number(cat.price) * Number(cat.discount || 0)) / 100;

          return (
            <Link
              to={`/product-detail/${cat.id}`}
              key={cat.id}
              // className="overflow-hidden"
            >
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
                className={`flex flex-col sm:flex-row justify-between items-start p-3 ${
                  gridSize === 2 ? "h-40 flex-col items-start max-h-40" : ""
                }`}
              >
                <div className="flex-1">
                  {/* Tag */}
                  {/* {cat.tag && ( */}
                  <span className="text-[10px] sm:text-[10px] leading-[14px] sm:leading-[20px] bg-gray-200 text-[#222222] font-[Montserrat,sans-serif] font-semibold px-2 py-0.5 mt-1 inline-block">
                    {cat.tags.length > 10
                      ? cat.tags.slice(0, 10) + "..."
                      : cat.tags}
                  </span>
                  {/* )} */}
                  <p className="text-[15px] sm:text-[18px] leading-[18px] sm:leading-[30px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1 cursor-pointer">
                    {/* Mobile par truncate, Desktop par full name */}
                    <span className="block sm:hidden">
                      {cat.name.length > 10
                        ? cat.name.slice(0, 10) + "..."
                        : cat.name}
                    </span>
                    <span className="hidden sm:block">
                      {cat.name.length > 20
                        ? cat.name.slice(0, 20) + "..."
                        : cat.name}
                    </span>
                  </p>

                  {/* Brand */}
                  <p className="text-[10px] sm:text-[12px] leading-[20px] sm:leading-[25px] font-[Montserrat,sans-serif] font-semibold text-[#222222]">
                    {cat.brand.length > 10
                      ? cat.brand.slice(0, 10) + "..."
                      : cat.brand}
                  </p>

                  {/* Price & Discount */}
                  {cat.discount > 0 ? (
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 flex-row flex-nowrap">
                        {/* Old Price */}
                        <span className="text-gray-500 line-through text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold">
                          Rs. {Math.round(Number(cat.price))}
                        </span>

                        {/* Discounted Price */}
                        <span className="text-[#222222] font-[Montserrat,sans-serif] font-semibold text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] text-[#ED0101]">
                          Rs.
                          {Math.round(
                            Number(cat.price) -
                              (Number(cat.price) * Number(cat.discount)) / 100
                          )}
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
                    <span className="text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold text-[#222222]">
                      Rs. {Math.round(Number(cat.price))}
                    </span>
                  )}
                </div>

                {/* Desktop Heart Icon Only */}
                <div className="hidden sm:block p-2 cursor-pointer">
                  <FaHeart size={20} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* pagination */}
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

      <br />
      <br />

      <Footer />
    </div>
  );
};

export default Shop;
