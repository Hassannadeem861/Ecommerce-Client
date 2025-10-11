import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice.js";
import { loginUser, signup } from "../utils/auth-api"; // <-- register API import
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Flag from "../assets/pk.png";

export default function AuthModal({ onClose }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // 👈 conditional rendering

  useEffect(() => {
    reset();
  }, [isLogin]);

  // ---------- LOGIN SUBMIT ----------
  const onLogin = async (data) => {
    setLoading(true);
    try {
      const res = await loginUser(data);
      if (res.user.role === 1) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

      dispatch(login({ user: res.user, token: res.token }));
      reset();
      // navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  // ---------- REGISTER SUBMIT ----------
  const onRegister = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await signup(data);
      reset();
      setIsLogin(true); // 👈 switch back to login after signup
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-black/10 backdrop-blur-[1px] z-50">
      <div className="w-full sm:w-[400px] h-full bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 bg-black">
          <h2 className="text-lg font-semibold text-white w-full text-center font-sans">
            ACCOUNT
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl absolute right-4 top-3"
          >
            &times;
          </button>
        </div>

        {/* ---------- LOGIN FORM ---------- */}
        {isLogin ? (
          <>
            <form onSubmit={handleSubmit(onLogin)} className="p-6 space-y-4">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm focus:ring-1 focus:ring-black outline-none"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm focus:ring-1 focus:ring-black outline-none"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-black underline hover:text-gray-700 font-medium"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 text-sm font-semibold rounded-md hover:bg-gray-900"
              >
                {loading ? "Signing in..." : "SIGN IN"}
              </button>

              {/* Create Account */}
              <div className="text-center text-sm">
                <p className="mt-2">New to zaratelier?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  type="button"
                  className="w-full mt-2 border bg-black text-white border-black text-black py-3 text-sm font-semibold rounded-md"
                >
                  CREATE ACCOUNT
                </button>
              </div>
            </form>

            {/* Divider */}
            {/* <div className="flex items-center px-6">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="mx-2 text-xs text-gray-500">
                OR SIGN IN WITH
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div> */}

            {/* Social Logins */}
            {/* <div className="flex justify-center gap-4 py-4">
              <button className="p-2 border border-gray-300 rounded">
                <FcGoogle size={20} />
              </button>
              <button className="p-2 border border-gray-300 rounded text-blue-600">
                <FaFacebookF size={18} />
              </button>
            </div> */}
          </>
        ) : (
          /* ---------- REGISTER FORM ---------- */
          <>
            <form onSubmit={handleSubmit(onRegister)} className="p-6 space-y-4">
              {/* First Name */}
              <input
                type="text"
                placeholder="First Name *"
                className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm"
                {...register("first_name", {
                  required: "First name is required",
                })}
              />

              {/* Last Name */}
              <input
                type="text"
                placeholder="Last Name *"
                className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm"
                {...register("last_name", {
                  required: "Last name is required",
                })}
              />

              {/* Phone Number with Flag +92 */}
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-4 text-sm">
                <img
                  src={Flag}
                  alt="PK"
                  className="w-6 h-4 mr-2"
                  loading="lazy"
                />
                {/* 🇵🇰 Flag */}
                <span className="mr-2">+92 *</span>
                <input
                  type="text"
                  placeholder="3001234567"
                  className="flex-1 outline-none"
                  {...register("phone_number", {
                    required: "Phone is required",
                  })}
                />
              </div>

              {/* Email */}
              <input
                type="email"
                placeholder="Email *"
                className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm"
                {...register("email", { required: "Email is required" })}
              />

              {/* Password with Eye Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password *"
                  className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              {/* Confirm Password with Eye Toggle */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password *"
                  className="w-full border border-gray-300 rounded-md px-3 py-4 text-sm"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 text-sm font-semibold rounded-md hover:bg-gray-900"
              >
                {loading ? "Registering..." : "REGISTER"}
              </button>

              {/* Switch to Login */}
              <div className="text-center text-sm">
                <p className="mt-2">Already have an account?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  type="button"
                  className="text-black underline hover:text-gray-700"
                >
                  Login here
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
