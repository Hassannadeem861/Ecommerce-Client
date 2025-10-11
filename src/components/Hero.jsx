"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";

import { getAllBanners as getDesktopBanners } from "../utils/desktop-banner-api.js";
import { getAllBanners as getMobileBanners } from "../utils/mobile-banner-api.js";

const HeroSection = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const fetchBanners = async (isMobile) => {
    try {
      if (isMobile) {
        const res = await getMobileBanners();
        if (res?.success && res.data?.length > 0) {
          const imgs = JSON.parse(res.data[0].mobileBannerImg || "[]");
          setImages(imgs);
        }
      } else {
        const res = await getDesktopBanners();
        if (res?.success && res.data?.length > 0) {
          const imgs = JSON.parse(res.data[0].desktopBannerImg || "[]");
          setImages(imgs);
        }
      }
    } catch (err) {
      console.error("❌ Banner fetch error:", err.message);
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    fetchBanners(isMobile);

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      fetchBanners(isMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Auto Slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      const nextBtn = document.querySelector("[data-carousel-next]");
      if (nextBtn) nextBtn.click();
    }, 4000); // 4s delay
    return () => clearInterval(interval);
  }, [images]);

  return (
    <section className="mt-1 relative w-full overflow-hidden">
      <Carousel
        ref={carouselRef}
        opts={{ loop: true }}
        className="w-full h-[450px] sm:h-[400px] md:h-[500px]"
      >
        <CarouselContent>
          {images.map((src, idx) => (
            <CarouselItem key={idx} className="w-full">
              <div className="relative w-full h-[500px] sm:h-[400px] md:h-[500px]">
                <img
                  src={`${import.meta.env.VITE_API_URL}${src}`}
                  alt={`Hero ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious data-carousel-prev />
        <CarouselNext data-carousel-next />
      </Carousel>
    </section>
  );
};

export default HeroSection;
