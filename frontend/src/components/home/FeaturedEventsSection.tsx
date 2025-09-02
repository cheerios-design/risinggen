import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const FeaturedEventsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const events = [
    {
      id: 1,
      title: "European YSA Conference 2025",
      date: "March 15-17, 2025",
      location: "Vienna, Austria",
      attendees: 2500,
      description:
        "Join thousands of young adults from across Europe for three days of spiritual growth, workshops, and unforgettable connections.",
      image: "/images/conference-2025.jpg",
      color: "from-purple-500 to-purple-700",
      status: "Registration Open",
    },
    {
      id: 2,
      title: "Germany YSA Weekend Retreat",
      date: "February 8-10, 2025",
      location: "Black Forest, Germany",
      attendees: 150,
      description:
        "A peaceful weekend retreat focused on personal revelation and building stronger friendships in beautiful natural surroundings.",
      image: "/images/germany-retreat.jpg",
      color: "from-blue-500 to-blue-700",
      status: "Few Spots Left",
    },
    {
      id: 3,
      title: "Service Project: Amsterdam",
      date: "January 25, 2025",
      location: "Amsterdam, Netherlands",
      attendees: 80,
      description:
        "Make a difference in the local community through organized service opportunities and humanitarian projects.",
      image: "/images/amsterdam-service.jpg",
      color: "from-green-500 to-green-700",
      status: "Join Us",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-transparent to-white/5">
      <div className="container mx-auto px-6">
        <div ref={ref} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                Events
              </span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Experience life-changing events that bring young adults together
              from across Europe
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden hover:bg-white/15 hover:border-white/20 transition-all duration-500">
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-white/20 to-white/5 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-80`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CalendarIcon className="w-16 h-16 text-white/80" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm font-semibold rounded-full`}
                    >
                      {event.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-white/70">
                      <CalendarIcon className="w-4 h-4" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <UsersIcon className="w-4 h-4" />
                      <span className="text-sm">
                        {event.attendees} attendees expected
                      </span>
                    </div>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${event.color} text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-glow transition-all duration-300`}
                  >
                    Learn More
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            View All Events
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEventsSection;
