"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllCategories } from "../utils/category-api.js";
import { getAllProducts } from "../utils/product-api.js";
import { useNavigate } from "react-router-dom";

const WhatsNew = () => {
  const navigate = useNavigate();
  const [blinkIndex, setBlinkIndex] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [emblaApi, setEmblaApi] = React.useState(null);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await getAllCategories();
        const res = await getAllProducts();
        setProducts(res?.rows || []);
      } catch (err) {
        console.error("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Autoplay: runs according to products length
  React.useEffect(() => {
    if (!emblaApi || products.length === 0) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < products.length - 1) {
        emblaApi.scrollNext();
        currentIndex++;
      } else {
        // ✅ reset back to start
        emblaApi.scrollTo(0);
        currentIndex = 0;
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [emblaApi, products.length]);

  const handleClick = (idx) => {
    setBlinkIndex(idx);
    setTimeout(() => setBlinkIndex(null), 300);
  };

  return (
    <section className="my-10 px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">
        <h2 className="text-center font-montserrat-600 font-normal text-2xl sm:text-3xl lg:text-[35px] leading-[38px] text-black tracking-wide mb-6 lg:mb-0">
          WHAT&apos;S <br className="hidden sm:block" /> NEW
        </h2>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setEmblaApi}
          className="flex-1 w-full"
        >
          <CarouselContent>
            {products.length > 0 ? (
              products.map((product, idx) => (
                <CarouselItem
                  key={product.id}
                  className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/7"
                >
                  <div
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      handleClick(idx);
                      window.location.href = `/collection/shop-by-category/${product.id}`;
                    }}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}${
                        // JSON.parse(product.category_img || "[]")[0]
                        JSON.parse(product.productImg || "[]")[0]
                      }`}
                      alt={product.name}
                      className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 shadow-lg transition
                      ${blinkIndex === idx ? "animate-blink" : ""}`}
                      loading="lazy"
                    />
                    <p className="text-[15px] sm:text-[18px] leading-[18px] sm:leading-[20px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1 cursor-pointer">
                      {/* Mobile view (shortened) */}
                      <span className="block sm:hidden">
                        {product.name.length > 10
                          ? product.name.slice(0, 10) + "..."
                          : product.name}
                      </span>

                      {/* Desktop view (full name) */}
                      <span className="text-center hidden sm:block">{product.name}</span>
                    </p>
                  </div>
                </CarouselItem>
              ))
            ) : (
              <p className="text-gray-500">No new products available</p>
            )}
          </CarouselContent>

          <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 bg-transparent border-0" />
          <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 bg-transparent border-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default WhatsNew;
