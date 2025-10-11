import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  // FaXTwitter,
  FaTiktok,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(null);

  const toggleSection = (section) => {
    setIsExpanded(isExpanded === section ? null : section);
  };

  const Section = ({ title, sectionKey, children }) => (
    <div className="border-b border-gray-300 sm:border-none pb-3 sm:pb-0">
      {/* Heading with + / - button on mobile */}
      <h4
        onClick={() => toggleSection(sectionKey)}
        className="flex justify-between items-center 
             text-sm sm:text-lg    // 📱 mobile par chota font, desktop par normal
             font-light 
             mb-1 sm:mb-4          // 📱 mobile par kam margin, desktop par normal
             cursor-pointer"
      >
        {title}
        <span className="sm:hidden text-lg">
          {isExpanded === sectionKey ? "−" : "+"}
        </span>
      </h4>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 sm:max-h-full ${
          isExpanded === sectionKey ? "max-h-64" : "max-h-0 sm:max-h-full"
        }`}
      >
        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm font-light leading-relaxed sm:leading-normal">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-100 py-5 font-[Montserrat,sans-serif]">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {/* Contact Us */}
        <Section title="CONTACT US" sectionKey="contact">
          {/* <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-black-800 text-2xl" />
            Near Doctors Hospital,Swabi City kp Pakistan Stockport Road,
            Manchester M19 2TJ UK
           </p> */}

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-lg" />
            Near Doctor Hospital, Swabi City kp Pakistan
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-lg" />
            Stockport Road, Manchester M19 2TJ UK
          </p>

          {/* <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-gray-600 text-lg" />
            Stockport Road, Manchester M192TJ
          </p> */}
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-black-800 text-lg" />
            <a href="#" className="hover:underline">
              info@zaratelier.com
            </a>
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-black-800 text-lg" /> +92 - 331-9555430
          </p>
          <p className="flex items-center gap-2">
            <FaPhoneAlt className="text-text-black-800 text-lg" /> +44 -
            744-8076346
          </p>
        </Section>

        {/* Customer Care */}
        <Section title="Customer Care" sectionKey="customer">
          <a href="/privacy-policy">Privacy Policy</a>
          <br />
          <a href="/exchange-return-policy">Exchange & Return Policy</a>
          <br />
          <a href="/accessibility">Accessibility Statement</a>
          <br />
          <a href="/terms">Terms & Conditions</a>
          <br />
          <a href="/refund-policy">Refund Policy</a>
          <br />
          <a href="/shipping-policy">Shipping Policy</a>
        </Section>

        {/* Information */}
        <Section title="Information" sectionKey="info">
          <a href="/">Home</a>
          <br />
          <a href="/book-online">Book Online</a>
          <br />
          <a href="/portfolio">Portfolio</a>
          <br />
          <a href="/program-list">Program List</a>
          <br />
          <a href="/shop">Shop</a>
          <br />
          <a href="/blog">Blog</a>
          <br />
          <a href="/contact">Contact us</a>
        </Section>

        {/* Newsletter Signup */}
        {/* <Section title="NEWSLETTER SIGNUP" sectionKey="newsletter">
          <p>Subscribe to our Newsletter for Exclusive Updates</p>
          <div className="flex w-full">
            <input
              type="email"
              placeholder="Your email address"
              className="border border-gray-300 px-3 py-2 w-full rounded-l-md focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800">
              Subscribe
            </button>
          </div>

         
        </Section> */}

        {/* Visit Us */}
        <Section title="Visit Us" sectionKey="social">
          <div className="flex space-x-4 mt-0">
            <a
              href="https://www.facebook.com/zaratelierofficial?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-gray-300"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com/zaratelierofficial"
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-gray-300"
            >
              <FaInstagram size={20} />
            </a>
            {/* <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                <FaXTwitter size={20} />
              </a> */}
            <a
              href="https://www.tiktok.com/@zaratelierofficial?_t=ZS-8zpZShf4xy4&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              // className="hover:text-gray-300"
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </Section>
      </div>
      {/* Copyright Section */}
      <div className="mt-8 border-t border-gray-500 pt-4 text-center text-sm">
        © {new Date().getFullYear()} by Zar Atelier.
      </div>
    </footer>
  );
};

export default Footer;
