import { motion } from "framer-motion";
import { PlayIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                RisingGen
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              Empowering young adults across Europe to strengthen their faith,
              build meaningful connections, and make a lasting impact in their
              communities.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                RisingGen seeks to draw Europe's young adults to the Savior and
                their covenants, enabling faith-building connections with each
                other, facilitating conferences, broadly communicating
                activities, and building lifelong disciples.
              </p>
              <div className="space-y-3">
                {[
                  "Strengthen faith through meaningful experiences",
                  "Connect young adults across Europe",
                  "Facilitate impactful events and conferences",
                  "Build lasting spiritual communities",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Vision Statement
                </h3>
                <p className="text-white/90 leading-relaxed">
                  A united community of young adults across Europe, drawing
                  closer to the Savior through meaningful connections,
                  faith-building experiences, and purposeful service that
                  transforms both individuals and communities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four Pillars Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Built on Four Pillars
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              RisingGen is founded on four core pillars that guide everything we
              do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Unified Event Hub",
                description:
                  "Platform for discovering, planning, and managing YSA events",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "RisingGen Community",
                description:
                  "Platform for connecting, supporting, and empowering young adults",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "Engagement Channel",
                description:
                  "Platform for uplifting content, staying up to date, and meaningful feedback",
                color: "from-green-500 to-teal-500",
              },
              {
                title: "Impact Platform",
                description:
                  "Platform for living faith through service, sharing, and meaningful action",
                color: "from-orange-500 to-red-500",
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-4`}
                >
                  <div className="w-6 h-6 bg-white rounded opacity-80" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white/80 mb-12 max-w-2xl mx-auto"
            >
              Discover how RisingGen is transforming young adult communities
              across Europe
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30"
                  >
                    <PlayIcon className="w-8 h-8 text-white ml-1" />
                  </motion.button>
                </div>
                <p className="text-white/70 mt-4 text-center">
                  Coming Soon - Watch our story unfold
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Join Our Mission
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Be part of a growing community that's making a difference across
            Europe. Your journey starts here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/community"
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-glow hover:bg-blue-50 transition-all duration-300"
            >
              Join RisingGen Today
            </Link>
            <Link
              to="/events"
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Explore Events
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;
