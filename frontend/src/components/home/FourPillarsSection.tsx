import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CalendarIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  HandRaisedIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const FourPillarsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const pillars = [
    {
      id: "events",
      title: "Events",
      subtitle: "Connect & Grow",
      description:
        "Experience life-changing events, conferences, and gatherings that strengthen faith and build lasting friendships across Europe.",
      icon: CalendarIcon,
      color: "from-purple-500 to-purple-700",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      features: [
        "European Conferences",
        "Local Meetups",
        "Spiritual Retreats",
        "Service Projects",
      ],
      image: "/images/events-pillar.jpg",
    },
    {
      id: "community",
      title: "Community",
      subtitle: "Belong & Unite",
      description:
        "Join a vibrant community of young adults who share your values, dreams, and commitment to following Christ.",
      icon: UserGroupIcon,
      color: "from-blue-500 to-blue-700",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      features: [
        "Country Communities",
        "Interest Groups",
        "Mentorship",
        "Friendship Networks",
      ],
      image: "/images/community-pillar.jpg",
    },
    {
      id: "content",
      title: "Content",
      subtitle: "Learn & Inspire",
      description:
        "Access inspiring content, teachings, and resources designed to strengthen your testimony and guide your journey.",
      icon: ChatBubbleBottomCenterTextIcon,
      color: "from-green-500 to-green-700",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      features: [
        "Gospel Insights",
        "Personal Stories",
        "Study Resources",
        "Video Content",
      ],
      image: "/images/content-pillar.jpg",
    },
    {
      id: "service",
      title: "Service",
      subtitle: "Serve & Transform",
      description:
        "Make a difference in your community through organized service opportunities and humanitarian projects.",
      icon: HandRaisedIcon,
      color: "from-orange-500 to-orange-700",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      features: [
        "Humanitarian Aid",
        "Community Service",
        "Disaster Relief",
        "Local Outreach",
      ],
      image: "/images/service-pillar.jpg",
    },
  ];

  return (
    <section
      id="four-pillars"
      className="relative py-20 bg-white/5 backdrop-blur-sm"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              The Four{" "}
              <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                Pillars
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Our mission is built on four foundational pillars that guide
              everything we do - connecting young adults across Europe through
              faith, community, and purpose.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/15 hover:border-white/20 transition-all duration-500 h-full">
                  {/* Pillar Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${pillar.color} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-blue-200 font-medium">
                        {pillar.subtitle}
                      </p>
                    </div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ArrowRightIcon className="w-6 h-6 text-white/70" />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {pillar.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.2 + featureIndex * 0.1 + 0.3,
                        }}
                        className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                      >
                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-r ${pillar.color}`}
                        />
                        <span className="text-white/90 text-sm font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6"
                  >
                    <button
                      className={`w-full bg-gradient-to-r ${pillar.color} text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300`}
                    >
                      Explore {pillar.title}
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Experience All Four Pillars?
            </h3>
            <p className="text-white/80 mb-6">
              Join thousands of young adults across Europe who are already part
              of the RisingGen community.
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 50px rgba(255, 255, 255, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-glow hover:bg-blue-50 transition-all duration-300"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FourPillarsSection;
