import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function ExchangeReturnPolicy() {
  const [open, setOpen] = useState({});
  const toggle = (key) => setOpen((s) => ({ ...s, [key]: !s[key] }));

  const contactEmail = "info@zaratelier.com";
  const contactPhonePK = "+92 331 9555430";
  const contactPhoneUK = "+44 744 8076346";
  
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
            <li className="text-black font-medium">Exchange & Return Policy</li>
          </ol>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Exchange & Return Policy
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            At ZarAtelier, your satisfaction is our top priority. If you're not
            completely happy with your purchase, we're here to help with an easy
            and transparent exchange and return process. Below you will find
            eligibility rules, step-by-step instructions and contact details.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            {/* Exchange Policy */}
            <article className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Exchange Policy</h2>
                <div className="text-sm text-gray-500">Eligibility & Conditions</div>
              </div>

              <div className="mt-4 text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  <strong>Eligibility:</strong> Items can be exchanged within
                  <span className="font-semibold"> 14 days</span> of delivery.
                </p>

                <div className="bg-gray-50 border border-gray-100 rounded-md p-4">
                  <p className="font-semibold mb-2">Not eligible for exchange</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Fragrances</li>
                    <li>Items purchased on sale or discount</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Conditions for Exchange:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Unworn and unused</li>
                    <li>With original tags and packaging intact</li>
                    <li>Accompanied by the original invoice or proof of purchase</li>
                    <li>Products delivered in boxes (e.g., luxury unstitched) must be returned in their original box</li>
                    <li>If defective/wrong-sized/incorrect item received, please provide supporting evidence (photos)</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">How to Exchange Online</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Contact our Customer Care team by email or phone listed on the right.</li>
                    <li>Share order details, photos (if applicable) and reason for exchange.</li>
                    <li>Once approved, we’ll arrange a pickup from your doorstep.</li>
                    <li>The exchange process typically takes <strong>7–10 working days</strong> after verification.</li>
                  </ol>
                </div>

                <div>
                  <p className="font-semibold">In-Store Exchange</p>
                  <p className="text-gray-600">Visit any ZarAtelier store with your item, original invoice, and intact tags and packaging to process your exchange on the spot.</p>
                </div>
              </div>
            </article>

            {/* Return Policy */}
            <article>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Return Policy</h2>
                <div className="text-sm text-gray-500">Eligibility & Refunds</div>
              </div>

              <div className="mt-4 text-gray-700 space-y-4">
                <p className="leading-relaxed">
                  <strong>Eligibility:</strong> Return requests must be made within
                  <span className="font-semibold"> 30 days</span> of receiving your order.
                </p>

                <div className="bg-gray-50 border border-gray-100 rounded-md p-4">
                  <p className="font-semibold mb-2">Returns are accepted only if:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>The item is damaged or defective</li>
                    <li>An incorrect item was delivered</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">Return Conditions</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Unused and in original packaging</li>
                    <li>All tags intact</li>
                    <li>Accompanied by proof of purchase</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold">How to Return</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-600">
                    <li>Contact Customer Care via email or phone. Provide order number and photos if item is damaged.</li>
                    <li>We will arrange pickup from your location after approval.</li>
                    <li>Once return is received and verified, we will issue a credit voucher equal to the value of the item.</li>
                    <li>This voucher can be redeemed online only at <a href="https://zaratelier.com" className="text-blue-600 hover:underline">zaratelier.com</a>.</li>
                  </ol>
                </div>

                <div className="text-sm text-gray-600">If you have any questions, our Customer Care team is happy to assist you every step of the way.</div>
              </div>
            </article>

            {/* FAQ Accordions */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">Frequently Asked Questions</h3>

              <div className="space-y-3">
                <button
                  onClick={() => toggle("q1")}
                  className="w-full text-left p-4 bg-gray-50 border border-gray-100 rounded-md flex items-start justify-between"
                >
                  <span>
                    Do I have to pay for pickup for an exchange?
                  </span>
                  <svg className={`w-5 h-5 transform ${open.q1 ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none">
                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open.q1 && (
                  <div className="p-4 text-gray-600 border border-gray-100 rounded-md">
                    For most exchanges we cover the pickup charge once the exchange is approved — our Customer Care will inform you during the approval.
                  </div>
                )}

                <button
                  onClick={() => toggle("q2")}
                  className="w-full text-left p-4 bg-gray-50 border border-gray-100 rounded-md flex items-start justify-between"
                >
                  <span>
                    Can I exchange sale items?
                  </span>
                  <svg className={`w-5 h-5 transform ${open.q2 ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none">
                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open.q2 && (
                  <div className="p-4 text-gray-600 border border-gray-100 rounded-md">
                    Sale and discounted items are not eligible for exchange unless explicitly stated on the product page.
                  </div>
                )}

                <button
                  onClick={() => toggle("q3")}
                  className="w-full text-left p-4 bg-gray-50 border border-gray-100 rounded-md flex items-start justify-between"
                >
                  <span>
                    How long until my exchange is processed?
                  </span>
                  <svg className={`w-5 h-5 transform ${open.q3 ? "rotate-180" : "rotate-0"}`} viewBox="0 0 20 20" fill="none">
                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {open.q3 && (
                  <div className="p-4 text-gray-600 border border-gray-100 rounded-md">
                    The exchange process typically takes 7–10 working days after verification.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Sidebar / Contact card */}
          <aside className="bg-white p-6 rounded-lg shadow-sm flex flex-col gap-4">
            <div>
              <h4 className="text-lg font-semibold">Contact Customer Care</h4>
              <p className="text-sm text-gray-600 mt-2">We're here to help — reach out with your order number and details.</p>
            </div>

            <div className="mt-2">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm hover:underline">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M3 8.5v7A2.5 2.5 0 0 0 5.5 18h13A2.5 2.5 0 0 0 21 15.5v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {contactEmail}
              </a>
              <a href={`tel:${contactPhonePK}`} className="block mt-2 text-sm hover:underline">{contactPhonePK}</a>
              <a href={`tel:${contactPhoneUK}`} className="block mt-1 text-sm hover:underline">{contactPhoneUK}</a>
            </div>

            {/* <div className="mt-4">
              <button
                onClick={() => window.print()}
                className="w-full bg-black text-white py-2 rounded-md hover:opacity-95"
              >
                Print / Save as PDF
              </button>
            </div> */}

            <div className="mt-4 text-xs text-gray-500">
              <p>Processing times exclude public holidays.</p>
              <p>Voucher refunds are redeemable online only.</p>
            </div>
          </aside>
        </div>

        <div className="mt-10 text-xs text-gray-500">If you have any questions, our Customer Care team is happy to assist you every step of the way. Thank you for shopping with ZarAtelier.</div>
      </div>
      <Footer/>
    </main>
  );
}
