import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bars3Icon,
  XMarkIcon,
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navigation = [
    {
      name: "Events",
      href: "/events",
      icon: CalendarIcon,
      description: "Discover and join amazing events",
    },
    {
      name: "Community",
      href: "/community",
      icon: UserGroupIcon,
      description: "Connect with young adults",
    },
    {
      name: "Content",
      href: "/content",
      icon: ChatBubbleBottomCenterTextIcon,
      description: "Inspiring content and updates",
    },
    {
      name: "Service",
      href: "/service",
      icon: HandRaisedIcon,
      description: "Make a difference through service",
    },
  ];

  // Determine if current route needs dark navbar (light background pages)
  const lightBackgroundRoutes = ['/events', '/auth', '/login', '/register', '/dashboard', '/profile', '/help', '/about', '/contact'];
  const isLightBackground = lightBackgroundRoutes.includes(location.pathname);
  
  // Determine navbar styling based on scroll and background
  const getNavbarStyle = () => {
    if (scrolled) {
      return "bg-white/95 backdrop-blur-lg shadow-lg";
    } else if (isLightBackground) {
      return "bg-white/90 backdrop-blur-lg shadow-md";
    } else {
      return "bg-transparent";
    }
  };

  const getTextColor = (isActive: boolean = false) => {
    if (scrolled || isLightBackground) {
      return isActive ? "text-primary-600" : "text-gray-700";
    } else {
      return isActive ? "text-white" : "text-white/90";
    }
  };

  const getHoverColor = () => {
    if (scrolled || isLightBackground) {
      return "hover:text-primary-600 hover:bg-primary-50";
    } else {
      return "hover:text-white hover:bg-white/10";
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarStyle()}`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center shadow-glow transition-all duration-300 ${
                  (scrolled || isLightBackground) ? "bg-primary-500/20" : "bg-white/20"
                }`}
              >
                {/* RisingGen Logo - Using SVG directly */}
                <svg
                  className={`w-8 h-8 transition-colors duration-300 ${
                    (scrolled || isLightBackground) ? "text-primary-500" : "text-white"
                  }`}
                  viewBox="0 0 160.91 146.14"
                  fill="currentColor"
                >
                  <path d="M58.11,112.6l-8.71,8.71a10.52,10.52,0,0,0,.14,15,10.75,10.75,0,0,0,15-.39l13.42-13.42L64.36,112.18A4.77,4.77,0,0,0,58.11,112.6Z" />
                  <path d="M50.38,24.84,65.1,39.55,80,54.42,96.1,70.56,106.43,57a4.76,4.76,0,0,0-.42-6.26L94.84,39.55l15.69-15.69a10.51,10.51,0,0,0,0-14.87h0A10.51,10.51,0,0,0,95.66,9L80,24.68,65.25,10A10.52,10.52,0,1,0,50.38,24.84Z" />
                  <path d="M111.5,122.28,94.84,105.62,113,87.46l16.66,16.66a10.52,10.52,0,0,0,14.88-14.87L127.87,72.58l15.69-15.69A10.51,10.51,0,1,0,128.69,42L113,57.71,98.13,72.58,80,90.74,61.81,72.58,77.94,56.45,64.36,46.12a4.76,4.76,0,0,0-6.25.42L46.94,57.71,32.06,72.58,16.37,88.28a10.53,10.53,0,0,0,0,14.87h0a10.53,10.53,0,0,0,14.87,0l15.7-15.69L65.1,105.61,80,120.49l16.66,16.66a10.51,10.51,0,0,0,14.87,0h0A10.52,10.52,0,0,0,111.5,122.28Z" />
                  <path d="M40,50.72,32.22,43A10.51,10.51,0,0,0,17.35,57.87L30,70.56,40.37,57A4.78,4.78,0,0,0,40,50.72Z" />
                </svg>
              </div>
              <div>
                <div
                  className={`font-bold text-xl transition-colors duration-300 ${getTextColor()}`}
                >
                  RisingGen
                </div>
                <div
                  className={`text-xs font-medium transition-colors duration-300 ${
                    scrolled || isLightBackground ? "text-primary-400" : "text-white/80"
                  }`}
                >
                  Europe
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? (scrolled || isLightBackground)
                          ? "bg-primary-500/20 backdrop-blur-md text-primary-600 shadow-glow"
                          : "bg-white/20 backdrop-blur-md text-white shadow-glow"
                        : `${getTextColor()} ${getHoverColor()}`
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Help Link */}
            <Link
              to="/help"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${getTextColor()} ${getHoverColor()}`}
            >
              Help
            </Link>

            {/* Dashboard Link (for authenticated users) */}
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${getTextColor()} ${getHoverColor()}`}
            >
              Dashboard
            </Link>

            {/* Auth Button */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(61, 28, 102, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/auth"
                className="inline-block bg-white text-primary-500 px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-glow-lg transition-all duration-300"
              >
                Sign In
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-colors duration-300 ${getTextColor()} ${getHoverColor()}`}
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 pb-4"
            >
              <div
                className={`backdrop-blur-lg rounded-2xl p-4 space-y-2 ${
                  scrolled || isLightBackground ? "bg-primary-500/10" : "bg-white/10"
                }`}
              >
                {navigation.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? (scrolled || isLightBackground)
                              ? "bg-primary-500/20 text-primary-600"
                              : "bg-white/20 text-white"
                            : `${getTextColor()} ${getHoverColor()}`
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div
                            className={`text-sm transition-colors duration-300 ${
                              scrolled || isLightBackground ? "text-primary-400" : "text-white/70"
                            }`}
                          >
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                  className="pt-2 space-y-2"
                >
                  <Link
                    to="/help"
                    className={`block p-3 rounded-xl font-medium transition-all duration-300 ${getTextColor()} ${getHoverColor()}`}
                  >
                    Help & Support
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`block p-3 rounded-xl font-medium transition-all duration-300 ${getTextColor()} ${getHoverColor()}`}
                  >
                    My Dashboard
                  </Link>
                  <Link
                    to="/auth"
                    className="block w-full bg-white text-primary-500 py-3 rounded-xl font-semibold shadow-lg text-center"
                  >
                    Sign In / Register
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;
