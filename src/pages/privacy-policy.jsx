"use client"; 
import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-[Montserrat,sans-serif]">
      <Navbar/>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb + Title */}
        <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>/</li>
            <li className="text-black font-medium">Privacy Policy</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            Last updated: September 19, 2025
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm space-y-8">
            {/* Introduction */}
            <article>
              <h2 className="text-xl font-semibold mb-2">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the
                collection, use and disclosure of Your information when You use
                the Service and tells You about Your privacy rights and how the
                law protects You. We use Your Personal data to provide and
                improve the Service. By using the Service, You agree to the
                collection and use of information in accordance with this
                Privacy Policy.
              </p>
            </article>

            {/* Interpretation and Definitions */}
            <article>
              <h2 className="text-xl font-semibold mb-2">
                Interpretation and Definitions
              </h2>
              <h3 className="text-lg font-semibold mt-4 mb-2">Definitions</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                  <strong>Account:</strong> A unique account created for You to
                  access our Service.
                </li>
                <li>
                  <strong>Affiliate:</strong> An entity that controls, is
                  controlled by or is under common control with a party.
                </li>
                <li>
                  <strong>Company:</strong> Refers to ZarAtelier Pvt. Limited.
                </li>
                <li>
                  <strong>Cookies:</strong> Small files placed on Your device by
                  a website containing browsing history.
                </li>
                <li>
                  <strong>Device:</strong> Any device that can access the
                  Service such as a computer, cellphone or tablet.
                </li>
                <li>
                  <strong>Service:</strong> Refers to the Website.
                </li>
                <li>
                  <strong>Service Provider:</strong> Third-party company or
                  individual employed to facilitate the Service.
                </li>
                <li>
                  <strong>Usage Data:</strong> Data collected automatically by
                  the use of the Service.
                </li>
                <li>
                  <strong>Website:</strong> Refers to www.zaratelier.com.
                </li>
                <li>
                  <strong>You:</strong> The individual using the Service.
                </li>
              </ul>
            </article>

            {/* Data Collection */}
            <article>
              <h2 className="text-xl font-semibold mb-2">
                Collecting and Using Your Personal Data
              </h2>
              <p className="text-gray-700 mb-3">
                While using Our Service, We may ask You to provide certain
                personally identifiable information:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Email address</li>
                <li>First and last name</li>
                <li>Phone number</li>
                <li>Address, State, Province, ZIP/Postal code, City</li>
                <li>Usage Data</li>
              </ul>
            </article>

            {/* Use of Data */}
            <article>
              <h2 className="text-xl font-semibold mb-2">
                Use of Your Personal Data
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>To provide and maintain our Service</li>
                <li>To manage Your Account</li>
                <li>To contact You by email, phone, or notifications</li>
                <li>To provide You with offers, news, and updates</li>
                <li>For business transfers or legal compliance</li>
              </ul>
            </article>

            {/* Retention */}
            <article>
              <h2 className="text-xl font-semibold mb-2">
                Retention of Your Data
              </h2>
              <p className="text-gray-700">
                The Company will retain Your Personal Data only for as long as
                necessary for legal, business, and security purposes.
              </p>
            </article>

            {/* Security */}
            <article>
              <h2 className="text-xl font-semibold mb-2">
                Security of Your Data
              </h2>
              <p className="text-gray-700">
                We take commercially acceptable measures to protect Your data,
                but no transmission or storage method is 100% secure.
              </p>
            </article>

            {/* Children */}
            <article>
              <h2 className="text-xl font-semibold mb-2">Children's Privacy</h2>
              <p className="text-gray-700">
                Our Service does not address anyone under the age of 13. We do
                not knowingly collect personal data from children.
              </p>
            </article>

            {/* Contact */}
            <article>
              <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
              <p className="text-gray-700 mb-2">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>📧 Email: info@zaratelier.com</li>
                <li>📞 Phone: +92 331 9555430</li>
              </ul>
            </article>
          </section>

          {/* Sidebar */}
          <aside className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold">Need Help?</h4>
            <p className="text-sm text-gray-600 mt-2">
              For queries related to privacy, data use, or your rights, please
              reach out to our support team.
            </p>
            <div className="mt-4 text-sm">
              <a
                href="mailto:info@zaratelier.com"
                className="block text-blue-600 hover:underline"
              >
                info@zaratelier.com
              </a>
              <a
                href="tel:+923319555430"
                className="block mt-2 text-blue-600 hover:underline"
              >
                +92 331 9555430
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-10 text-xs text-gray-500">
          Thank you for trusting ZarAtelier. Your privacy is our responsibility.
        </div>
      </div>
      <Footer/>
    </main>
  );
}
