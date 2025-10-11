"use client";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, ArrowLeft, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-12">
      <div className="absolute top-10 left-10">
        <Link 
          to="/"
          className="flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to homepage
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center p-8 rounded-2xl shadow-lg bg-white max-w-md w-full border border-slate-100"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ y: -20, rotate: -5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            repeatType: "reverse",
            repeatDelay: 1
          }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full opacity-70 animate-ping -z-10"></div>
            <AlertTriangle className="w-20 h-20 text-red-500 p-2 bg-red-50 rounded-full" />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-bold text-slate-800 mb-2"
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-semibold text-slate-700 mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-slate-600 mb-8 leading-relaxed"
        >
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you entered an incorrect URL.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center px-5 py-3 bg-slate-800 text-white rounded-lg shadow-sm hover:bg-slate-900 transition-all duration-300 font-medium"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-5 py-3 border border-slate-300 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-all duration-300 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </motion.div>

        {/* Support Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pt-6 border-t border-slate-200"
        >
          <Link 
            to="/support"
            className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <HelpCircle className="w-4 h-4 mr-1" />
            Need help? Contact support
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}