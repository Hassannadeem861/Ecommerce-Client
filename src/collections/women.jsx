import React, { useState } from "react";
import WhatsNew from "../components/WhatsNew";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";

const Women = () => {
  const { list: products } = useSelector((state) => state.product);
  const [gridSize, setGridSize] = useState(4);

  // ✅ Sirf Women category ke products filter karo
  const womenProducts = products.filter((p) =>
    p.categories?.some((cat) => cat.name?.toLowerCase() === "women")
  );

  return (
    <div className="p-4">
      {/* <WhatsNew /> */}

      {/* Pattern Boxes */}
      <div className="flex gap-3 mb-6 justify-end">
        {[2, 3, 4].map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-3 py-2 border-2 border-black rounded transition-colors duration-300 ${
              gridSize === size
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            {"▮".repeat(size)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-5 ${
          gridSize === 2
            ? "grid-cols-2"
            : gridSize === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        }`}
      >
        {womenProducts.map((cat) => {
          const images = JSON.parse(cat.productImg || "[]"); // string ko array banane ke liye
          const finalPrice =
            Number(cat.price) -
            (Number(cat.price) * Number(cat.discount || 0)) / 100;

          return (
            <div
              key={cat.id}
              className="rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Product Image */}
              {images.length > 0 && (
                <img
                  src={`${import.meta.env.VITE_API_URL}${images[0]}`}
                  alt={cat.name}
                  className="w-full h-100 object-cover"
                  loading="lazy"
                />
              )}

              {/* Product Info */}
              <div className="flex justify-between items-center p-3">
                <div>
                  {cat.tag && (
                    <span className="text-xs bg-gray-200 text-black font-bold px-2 py-0.5 mt-1 inline-block">
                      {cat.tag}
                    </span>
                  )}

                  <p className="text-lg font-bold text-gray-800">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.brand}</p>

                  <p className="text-sm font-medium text-gray-600 mt-1">
                    {cat.discount > 0 ? (
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500 line-through text-sm">
                            Rs. {Number(cat.price).toFixed(2)}
                          </span>
                          <span className="text-black font-bold">
                            Rs. {finalPrice.toFixed(2)}
                          </span>
                        </div>
                        <span className="inline-block mt-1 px-1 py-2 bg-[#F7663A] text-white text-sm font-bold border border-white rounded-sm">
                          {cat.discount}% OFF
                        </span>
                      </div>
                    ) : (
                      <>Rs. {Number(cat.price).toFixed(2)}</>
                    )}
                  </p>
                </div>

                <div className="p-2 cursor-pointer">
                  <FaHeart size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Women;
