import { useState, useEffect } from "react";
import { getAllProducts } from "../utils/product-api.js";
import { getAllCategories } from "../utils/category-api.js";
import ProductCarousel from "@/components/ProductCarousel";
import HeroSection from "../components/Hero";
import WhatsNew from "../components/WhatsNew";
import MoreToExploreCarousel from "../components/MoreToExploreCarousel";
import StyleByYouCarousel from "../components/StyleByYouCarousel.jsx";
import Navbar from "../components/Navbar.jsx";
import FooterSection from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import Loader from "../components/loader.jsx";

export default function Home() {
  const loginUser = useSelector((state) => state?.auth);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛒 Products fetch
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getAllProducts();
        if (res.success) {
          const formatted = res?.rows?.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category?.name,
            trending_product: p.trending_product,
            description: p.description,
            sku: p.sku,
            stock_quantity: p.stock_quantity,
            discount: p.discount,
            brand: p.brand,
            tag: p.tags,
            model_wears: p.model_wears,
            whats_new: p.whats_new,
            is_special: p.is_special,
            colors: p.colors ? JSON.parse(p.colors) : [],
            fabrics: p.fabrics ? JSON.parse(p.fabrics) : [],
            fits: p.fits ? JSON.parse(p.fits) : [],
            img: JSON.parse(p.productImg)[0],
            sizes: p.sizes ? JSON.parse(p.sizes) : [],
          }));
          setProducts(formatted);
        }
      } catch (error) {
        console.error("Products fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 📂 Categories fetch
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        if (res.success) {
          const formattedCats = res?.categories?.map((c) => ({
            id: c.id,
            name: c.name,
            img: JSON.parse(c.category_img)[0],
          }));
          setCategories(formattedCats);
        }
      } catch (error) {
        console.error("Categories fetch error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <HeroSection />
      <WhatsNew />

      <ProductCarousel title="SHOP BY CATEGORY" categories={categories} />
      <ProductCarousel title="TRENDING" categories={products} />

      <MoreToExploreCarousel />
      <br />
      <StyleByYouCarousel />
      <FooterSection />
    </>
  );
}
