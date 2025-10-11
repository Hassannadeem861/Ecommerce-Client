import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "../assets/bf70bc66-2ee4-47de-8d59-7c9c459f9c78.png";
import { getAllProducts } from "../utils/product-api.js";
import { useNavigate } from "react-router-dom";
const MyCarousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const product = await getAllProducts();
      const filterData = product?.rows.filter(
        (item) => item.more_to_explore === 1
      );

      setData(filterData || []);
    } catch (error) {
      console.log("Error in fetching categories: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  const items = [
    {
      id: 1,
      title: "DS - READY TO WEAR",
      subtitle: "Men's best shades, tailored for you!",
      image: Image,
    },
    {
      id: 2,
      title: "THE JOY OF UNSCRIPTED MOMENTS",
      subtitle:
        "This season is all about returning to the essence of joy, and our Unstitched Summer '25 welcomes you into that feeling!",
      image: Image,
    },
    {
      id: 3,
      title: "FABRIC GLOSSARY",
      subtitle: "Learn more about what went in making of your favourite",
      image: Image,
    },
    {
      id: 4,
      title: "DS - READY TO WEAR",
      subtitle: "Men's best shades, tailored for you!",
      image: Image,
    },
    {
      id: 5,
      title: "THE JOY OF UNSCRIPTED MOMENTS",
      subtitle:
        "This season is all about returning to the essence of joy, and our Unstitched Summer '25 welcomes you into that feeling!",
      image: Image,
    },
    {
      id: 6,
      title: "FABRIC GLOSSARY",
      subtitle: "Learn more about what went in making of your favourite",
      image: Image,
    },
  ];

  useEffect(() => {
    fetchProduct();
  }, []); 

  useEffect(() => {
    if (data.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [data.length]);

  // Slow auto-slide
  // useEffect(() => {
  //   fetchProduct();
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % data.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, [items.length]);

  return (
    <div className="w-full py-1 px-4 overflow-hidden">
      <h2 className="text-center font-[Montserrat,sans-serif] font-extrabold text-[18px] sm:text-[20px] lg:text-[24px] leading-[34px] text-black mb-5">
        MORE TO EXPLORE
      </h2>

      <Carousel
        className="w-full"
        opts={{
          startIndex: currentSlide,
          align: "center",
          slidesToScroll: 1,
          loop: true,
          onSelect: (newSlide) => setCurrentSlide(newSlide),
        }}
      >
        <CarouselContent className="flex items-center gap-2 cursor-pointer">
          {data.map((item, index) => {
            const isActive = index === currentSlide;
            return (
              <CarouselItem
                key={item.id}
                className="basis-full sm:basis-1/2 lg:basis-1/3 flex flex-col items-center"
                onClick={() => setCurrentSlide(index)}
              >
                <div className="relative w-full flex justify-center">
                
                  <img
                    src={`${import.meta.env.VITE_API_URL}${
                      JSON.parse(item.productImg || [])[0]
                    }`}
                    alt={item.title}
                    className={`shadow-xl object-cover transition-all duration-500
                      ${
                        isActive
                          ? "w-[90%] sm:w-[100%] h-[200px] sm:h-[450px]"
                          : "w-[70%] sm:w-[70%] h-[130px] sm:h-[350px]"
                      }
                    `}
                    loading="lazy"
                    onClick={() => {
                      navigate(`product-detail/${item.id}`);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setCurrentSlide((prev) => (prev + 1) % data.length);
                    }}
                    // onTouchEnd={() => navigate(`product-detail/${item.id}`)}
                  />
                </div>
                {isActive && (
                  <div className="mt-4 text-center">
                    <h3 className="text-[15px] sm:text-[18px] leading-[18px] sm:leading-[30px] font-[Montserrat,sans-serif] font-semibold text-[#222222] mt-1 cursor-pointer">
                      <span className="block sm:hidden">
                        {item.name.length > 15
                          ? item.name.slice(0, 15) + "..."
                          : item.name}
                      </span>
                      <span className="hidden sm:block">{item.name}</span>
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + data.length) % data.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white bg-transparent border-0"
        />
        <CarouselNext
          onClick={() => setCurrentSlide((prev) => (prev + 1) % data.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white bg-transparent border-0"
        />
      </Carousel>

      {/* Indicators */}
      {/* <div className="flex justify-center mt-8 space-x-3">
        {items.map((id, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-black w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};

export default MyCarousel;
