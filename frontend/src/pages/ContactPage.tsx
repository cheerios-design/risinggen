import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              We'd love to hear from you. Reach out with questions, suggestions,
              or to get involved with RisingGen Europe.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: EnvelopeIcon,
                title: "Email Us",
                description: "Send us a message and we'll get back to you soon",
                contact: "hello@risinggen.eu",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: PhoneIcon,
                title: "Call Us",
                description: "Speak with our team directly",
                contact: "+44 20 7123 4567",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: MapPinIcon,
                title: "Visit Us",
                description: "Find us across Europe",
                contact: "Multiple Locations",
                color: "from-purple-500 to-pink-500",
              },
            ].map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mx-auto mb-6`}
                >
                  <option.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-white/70 mb-4">{option.description}</p>
                <p className="text-white font-semibold">{option.contact}</p>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 mb-2 font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      placeholder="Your last name"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 resize-none"
                    placeholder="Tell us more..."
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Find answers to common questions about RisingGen
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How can I join RisingGen?",
                answer:
                  "Simply visit our Community page and register for events in your area. You can also follow us on social media to stay updated on activities.",
              },
              {
                question: "Is RisingGen available in my country?",
                answer:
                  "RisingGen is expanding across Europe. Check our Community page to see active locations and upcoming expansion areas.",
              },
              {
                question: "What types of events do you organize?",
                answer:
                  "We organize conferences, service projects, social activities, spiritual devotionals, and professional networking events for young adults aged 18-30.",
              },
              {
                question: "How can I volunteer or get involved?",
                answer:
                  "We're always looking for volunteers! Contact us through this page or visit our Service page to learn about volunteer opportunities.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Connect?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Don't wait - join our community today and start your journey with
            fellow young adults across Europe.
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
              Join Our Community
            </Link>
            <Link
              to="/about"
              className="bg-white/10 backdrop-blur-lg border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;
