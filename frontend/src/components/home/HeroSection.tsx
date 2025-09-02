import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDownIcon, PlayIcon } from "@heroicons/react/24/outline";

const HeroSection = () => {
  const scrollToContent = () => {
    const element = document.getElementById("four-pillars");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Geometric Shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/30 rounded-full"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{
            duration: 3,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-3/4 right-1/3 w-24 h-24 border border-white/20 rotate-45"
        />
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 0.1, rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-40 h-40 border border-white/20 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 text-center text-white relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center shadow-glow-lg">
              <svg
                className="w-16 h-16 text-white"
                viewBox="0 0 160.91 146.14"
                fill="currentColor"
              >
                <path d="M58.11,112.6l-8.71,8.71a10.52,10.52,0,0,0,.14,15,10.75,10.75,0,0,0,15-.39l13.42-13.42L64.36,112.18A4.77,4.77,0,0,0,58.11,112.6Z" />
                <path d="M50.38,24.84,65.1,39.55,80,54.42,96.1,70.56,106.43,57a4.76,4.76,0,0,0-.42-6.26L94.84,39.55l15.69-15.69a10.51,10.51,0,0,0,0-14.87h0A10.51,10.51,0,0,0,95.66,9L80,24.68,65.25,10A10.52,10.52,0,1,0,50.38,24.84Z" />
                <path d="M111.5,122.28,94.84,105.62,113,87.46l16.66,16.66a10.52,10.52,0,0,0,14.88-14.87L127.87,72.58l15.69-15.69A10.51,10.51,0,1,0,128.69,42L113,57.71,98.13,72.58,80,90.74,61.81,72.58,77.94,56.45,64.36,46.12a4.76,4.76,0,0,0-6.25.42L46.94,57.71,32.06,72.58,16.37,88.28a10.53,10.53,0,0,0,0,14.87h0a10.53,10.53,0,0,0,14.87,0l15.7-15.69L65.1,105.61,80,120.49l16.66,16.66a10.51,10.51,0,0,0,14.87,0h0A10.52,10.52,0,0,0,111.5,122.28Z" />
                <path d="M40,50.72,32.22,43A10.51,10.51,0,0,0,17.35,57.87L30,70.56,40.37,57A4.78,4.78,0,0,0,40,50.72Z" />
              </svg>
            </div>
          </motion.div>

          {/* Hero Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="block">Drawing Europe's</span>
            <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Young Adults
            </span>
            <span className="block">to the Savior</span>
          </motion.h1>

          {/* Hero Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Building a community of faith, connection, and service across Europe
            through the four pillars of
            <span className="font-semibold text-blue-200"> RisingGen</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/community"
                className="inline-block bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-glow-lg hover:bg-blue-50 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Join Our Community
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/about"
                className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-lg border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto"
              >
                <PlayIcon className="w-6 h-6" />
                <span>Watch Our Story</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <p className="text-white/80 text-lg font-medium italic">
              "Connecting hearts, strengthening faith, and building an eternal
              community of disciples across Europe"
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToContent}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <ChevronDownIcon className="w-6 h-6 text-white" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
