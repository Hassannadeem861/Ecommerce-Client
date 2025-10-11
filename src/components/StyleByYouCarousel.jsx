import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllProducts } from "../utils/product-api.js";
import { useNavigate } from "react-router-dom";

const StyledByYou = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const emblaRef = useRef(null); 

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const product = await getAllProducts();
      const filterData = product?.rows.filter((item) => item.style_by === 1);
      setData(filterData || []);
    } catch (error) {
      console.log("Error in fetching style by product: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (!emblaRef.current || data.length === 0) return;

    const interval = setInterval(() => {
      emblaRef.current.scrollNext(); 
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <section className="px-4 md:px-8 lg:px-12 bg-[#FEF9E8] py-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-[Montserrat,sans-serif] font-extrabold text-[18px] sm:text-[15px] lg:text-[24px] leading-[34px] text-black mb-5">
          STYLED BY
        </h2>

        <Carousel
          opts={{
            align: "start",
            // loop: true,
            skipSnaps: false,
          }}
          setApi={(api) => (emblaRef.current = api)}
        >
          <CarouselContent className="flex justify-center cursor-pointer">
            {data.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2 h-full">
                  <div className="bg-white overflow-hidden flex flex-col">
                    {/* Image */}
                    <div className="overflow-hidden relative">
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          JSON.parse(testimonial.productImg || [])[0]
                        }`}
                        alt={testimonial.outfit}
                        className="mx-auto object-cover transition-all duration-500
                         w-full h-50 sm:h-[300px] md:h-[300px] lg:h-[380px]"
                        loading="lazy"
                        onClick={() => {
                          navigate(`product-detail/${testimonial.id}`);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      />
                    </div>

                    {/* Text */}
                    <div className="p-4 flex-grow">
                      <h3 className="text-[13px] sm:text-[18px] leading-[18px] sm:leading-[30px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1 cursor-pointer">
                        <span className="block sm:hidden">
                          {testimonial.name?.length > 10
                            ? testimonial.name.slice(0, 10) + "..."
                            : testimonial.name}
                        </span>
                        <span className="hidden sm:block">
                          {testimonial.name}
                        </span>
                      </h3>
                      <p className="text-[13px] text-gray-600 mb-1">
                        @{testimonial.description}
                      </p>
                      <p className="text-[12px] sm:text-[14px] leading-[14px] sm:leading-[16px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1">
                        {testimonial.brand}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* arrows */}
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white/80 hover:bg-white p-2 shadow-md bg-transparent border-0" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white/80 hover:bg-white p-2 shadow-md bg-transparent border-0" />
        </Carousel>
      </div>
    </section>
  );
};

export default StyledByYou;
