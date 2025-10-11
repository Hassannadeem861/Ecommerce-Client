"use client";
import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductCategoryCarousel = ({ categories, currentProduct }) => {
  const carouselRef = React.useRef(null);
  const { list: products } = useSelector((state) => state.product);

  // ✅ Filter the brand
  const relatedByBrand = products.filter(
    (p) => p.brand === currentProduct?.brand && p.id !== currentProduct?.id
  );

  // ✅ Auto-slide every 3s
  React.useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current?.querySelector("[data-carousel-next]")?.click();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const itemsToShow = relatedByBrand?.length > 0 ? relatedByBrand : [];

  if (!itemsToShow || itemsToShow?.length === 0) return null;

  // ✅ Hover the image change for state
  const [hoveredProduct, setHoveredProduct] = React.useState(null);

  return (
    <section className="my-16 px-6">
      <h2 className="text-center font-[Montserrat,sans-serif] font-extrabold text-[18px] sm:text-[20px] lg:text-[24px] leading-[34px] text-black mb-5">
        YOU MAY ALSO LIKE
      </h2>

      <div ref={carouselRef}>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2">
            {itemsToShow.map((item) => {
              let images = [];

              try {
                if (item.productImg) {
                  if (typeof item.productImg === "string") {
                    const parsed = JSON.parse(item.productImg);
                    images = Array.isArray(parsed) ? parsed : [parsed];
                  } else if (Array.isArray(item.productImg)) {
                    images = item.productImg;
                  }
                }
              } catch {
                images = [];
              }

              return (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 sm:basis-1/3 lg:basis-1/4 pl-2"
                >
                  <Link
                    to={`/product-detail/${item.id}`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <div className="flex flex-col bg-white transition cursor-pointer">
                      {/* Product Image */}
                      {images?.length > 0 && (
                        <div className="overflow-hidden w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
                          <img
                            src={`${import.meta.env.VITE_API_URL}${
                              hoveredProduct === item.id && images[1]
                                ? images[1]
                                : images[0]
                            }`}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-1500 ease-in-out hover:scale-110"
                            loading="lazy"
                            onMouseEnter={() => setHoveredProduct(item.id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                          />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex flex-col sm:flex-row justify-between items-start p-3">
                        <div className="flex-1">
                          {/* Tag */}
                          <span className="text-[10px] sm:text-[10px] leading-[14px] sm:leading-[20px] bg-gray-200 text-[#222222] font-[Montserrat,sans-serif] font-semibold px-2 py-0.5 mt-1 inline-block">
                            {item.tags?.length > 10
                              ? item.tags.slice(0, 10) + "..."
                              : item.tags}
                          </span>

                          {/* Name */}
                          <h3 className="text-[15px] sm:text-[18px] leading-[18px] sm:leading-[30px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1 cursor-pointer">
                            <span className="block sm:hidden">
                              {item.name?.length > 10
                                ? item.name.slice(0, 10) + "..."
                                : item.name}
                            </span>
                            <span className="hidden sm:block whitespace-nowrap">
                              {item.name?.length > 20
                                ? item.name.slice(0, 20) + "..."
                                : item.name}
                            </span>
                          </h3>

                          {/* Brand */}
                          <p className="text-[10px] sm:text-[12px] leading-[20px] sm:leading-[25px] font-[Montserrat,sans-serif] font-semibold text-[#222222]">
                            {item.brand?.length > 10
                              ? item.brand.slice(0, 10) + "..."
                              : item.brand}
                          </p>

                          {/* Price & Discount */}
                          {item.discount > 0 ? (
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1 flex-wrap">
                                {/* Old Price */}
                                <span className="text-gray-500 line-through text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold">
                                  Rs. {Math.round(Number(item.price))}
                                </span>

                                {/* Discounted Price */}
                                <span className="text-[#222222] font-[Montserrat,sans-serif] font-semibold text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] text-[#ED0101]">
                                  Rs.
                                  {Math.round(
                                    Number(item.price) -
                                      (Number(item.price) *
                                        Number(item.discount)) /
                                        100
                                  )}
                                </span>
                              </div>

                              {/* Discount Label */}
                              <span
                                className="
                                        inline-block mt-1 text-center
                                        py-1 px-2  /* Desktop padding */
                                        bg-black text-white
                                        text-[10px] sm:text-[14px]  /* Mobile small, Desktop normal */
                                        leading-[14px] sm:leading-[16px]
                                        font-[Montserrat,sans-serif] font-semibold
                                        border border-white rounded-sm
                                        whitespace-nowrap
                                        w-14 sm:w-auto  /* Mobile fixed, Desktop auto */
                                        sm:mx-0    /* Mobile sides me gap, Desktop no gap */
                                      "
                              >
                                {item.discount}% OFF
                              </span>
                            </div>
                          ) : (
                            <span className="text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold text-[#222222]">
                              Rs. {Math.round(Number(item.price))}
                            </span>
                          )}
                        </div>

                        {/* Desktop Heart Icon */}
                        <div className="hidden sm:block p-2 cursor-pointer">
                          <FaHeart size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {/* Arrows */}
          <CarouselPrevious
            data-carousel-prev
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-transparent border-0 hover:bg-transparent"
          />
          <CarouselNext
            data-carousel-next
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-transparent border-0 hover:bg-transparent"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCategoryCarousel;
