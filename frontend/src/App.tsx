import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import CommunityPage from "./pages/CommunityPage";
import ContentPage from "./pages/ContentPage";
import ServicePage from "./pages/ServicePage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-hero-gradient overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/service" element={<ServicePage />} />
          </Routes>
        </motion.main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
