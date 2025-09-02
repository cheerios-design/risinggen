import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import FourPillarsSection from "../components/home/FourPillarsSection";
import FeaturedEventsSection from "../components/home/FeaturedEventsSection";
import CommunityStatsSection from "../components/home/CommunityStatsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import CallToActionSection from "../components/home/CallToActionSection";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="overflow-hidden"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Four Pillars Section */}
      <FourPillarsSection />

      {/* Featured Events Section */}
      <FeaturedEventsSection />

      {/* Community Stats Section */}
      <CommunityStatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action Section */}
      <CallToActionSection />
    </motion.div>
  );
};

export default HomePage;
