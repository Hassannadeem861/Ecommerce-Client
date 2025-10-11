"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader.jsx";

const ProductCarousel = ({ title, categories }) => {
  const isTrending = title.toLowerCase().includes("trending");
  const carouselRef = React.useRef(null);
  const navigate = useNavigate();

  // Auto-slide
  React.useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current?.querySelector("[data-carousel-next]")?.click();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Show Loader if categories not loaded yet
  // if (!categories || categories.length === 0) {
  //   return (
  //     <section className="my-16">
  //       <h2 className="text-center font-[Montserrat,sans-serif] font-semibold text-[18px] sm:text-[20px] lg:text-[24px] leading-[34px] text-black mb-5">
  //         {title}
  //       </h2>
  //       {/* <div className="flex justify-center items-center py-10">
  //         <Loader />
  //       </div> */}
  //     </section>
  //   );
  // }

  return (
    <section className="my-12 px-6">
      <h2 className="text-center font-[Montserrat,sans-serif] font-semibold text-[18px] sm:text-[20px] lg:text-[24px] leading-[34px] text-black mb-5">
        {title}
      </h2>

      <div ref={carouselRef}>
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2">
            {categories
              ?.filter((cat) => !isTrending || cat.trending_product === 1)
              .map((cat, idx) => (
                <CarouselItem
                  key={idx}
                  className="basis-1/2 sm:basis-1/3 lg:basis-1/4 pl-2"
                >
                  {/* Product Card */}
                  <div
                    onClick={() => {
                      if (isTrending) {
                        navigate(`/product-detail/${cat.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        window.location.href = `/collection/shop-by-category/${cat.id}`;
                        // navigate(`/collection/shop-by-category/${cat.id}`);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`flex flex-col bg-white transition relative ${
                      !isTrending ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    {/* Image */}
                    <img
                      src={`${import.meta.env.VITE_API_URL}${cat.img}`}
                      alt={cat.name}
                      className="w-full h-60 sm:h-64 md:h-[520px] object-cover transition-transform duration-1500 ease-in-out hover:scale-110 cursor-pointer"
                      loading="lazy"
                    />

                    {/* Product details */}
                    {isTrending ? (
                      <div className="flex flex-col sm:flex-row justify-between items-start p-3">
                        <div className="flex-1">
                          {/* Tag */}
                          {cat.tag && (
                            <span className="text-[10px] sm:text-[10px] leading-[10px] sm:leading-[16px] bg-gray-200 text-[#222222] font-[Montserrat,sans-serif] font-semibold px-2 py-0.5 mt-1 inline-block">
                              {cat.tag.length > 10
                                ? cat.tag.slice(0, 10) + "..."
                                : cat.tag}
                              {/* {cat.tag} */}
                            </span>
                          )}

                          <p className="text-[15px] sm:text-[18px] leading-[18px] sm:leading-[30px] font-[Montserrat,sans-serif] font-normal text-[#212020] mt-1 cursor-pointer">
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
                          <p className="text-[11px] sm:text-[12px] leading-[18px] sm:leading-[25px] font-[Montserrat,sans-serif] font-semibold text-[#222222]">
                            {cat.brand.length > 10
                              ? cat.brand.slice(0, 10) + "..."
                              : cat.brand}
                          </p>
                        </div>

                        {/* Desktop Heart Icon Only */}
                        <div className="hidden sm:block p-2 cursor-pointer">
                          <FaHeart size={20} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center p-3">
                        <p className="text-lg font-semibold text-gray-800 text-center">
                          {cat.name}
                        </p>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselPrevious
            data-carousel-prev
            className="absolute -left-4 top-1/2 -translate-y-1/2 bg-transparent border-0"
          />
          <CarouselNext
            data-carousel-next
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-transparent border-0"
          />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;

{
  /* Price & Discount */
}
// {cat.discount > 0 ? (
//   <div className="flex flex-col">
//     <div className="flex items-center gap-2">
//       {/* Old Price */}
//       <span className="text-gray-500 line-through text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold">
//         Rs. {Math.round(Number(cat.price))}
//       </span>

//       {/* Discounted Price */}
//       <span className="text-[#222222] font-[Montserrat,sans-serif] font-semibold text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] text-[#ED0101]">
//         Rs.
//         {Math.round(
//           Number(cat.price) -
//             (Number(cat.price) *
//               Number(cat.discount)) /
//               100
//         )}
//       </span>
//     </div>

//     {/* Discount Label */}
//     <span
//       className="
//               inline-block mt-1 text-center
//               py-1 px-2  /* Desktop padding */
//               bg-black text-white
//               text-[8px] sm:text-[14px]  /* Mobile small, Desktop normal */
//               leading-[14px] sm:leading-[16px]
//               font-[Montserrat,sans-serif] font-semibold
//               border border-white rounded-sm
//               whitespace-nowrap
//               w-14 sm:w-auto  /* Mobile fixed, Desktop auto */
//               sm:mx-0    /* Mobile sides me gap, Desktop no gap */
//             "
//     >
//       {cat.discount}% OFF
//     </span>
//   </div>
// ) : (
//   <span className="text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold text-[#222222]">
//     Rs. {Math.round(Number(cat.price))}
//   </span>
// )}
