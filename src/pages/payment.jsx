import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Redirect after countdown
      window.location.href = "/";
    }
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-white to-green-50 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order! Your purchase has been confirmed and is now
          being processed. You will receive an update once your order is
          shipped.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm text-gray-500 mb-4">
            Redirecting to home in{" "}
            <span className="font-semibold">{countdown}</span> seconds...
          </p>

          <a
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-md transition"
          >
            Go to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
