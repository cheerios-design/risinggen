import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const categories = [
    { id: "all", name: "All Topics", count: 24 },
    { id: "events", name: "Events & Registration", count: 8 },
    { id: "account", name: "Account & Profile", count: 5 },
    { id: "community", name: "Community Features", count: 4 },
    { id: "technical", name: "Technical Support", count: 4 },
    { id: "organizers", name: "Event Organizers", count: 3 },
  ];

  const faqItems: FAQItem[] = [
    {
      id: "1",
      question: "How do I register for an event?",
      answer:
        "To register for an event, navigate to the event details page and click the 'Register Now' button. You'll need to complete the registration form with your personal information, answer any event-specific questions, and complete payment if required. Once registered, you'll receive a confirmation email with event details and next steps.",
      category: "events",
    },
    {
      id: "2",
      question: "What if I can't afford the full registration fee?",
      answer:
        "RisingGen offers financial assistance through our subsidy program. When registering, you can apply for a subsidy by indicating your need and providing basic financial information. Each application is reviewed by local leadership, and subsidies are available based on need and available funds. Don't let cost prevent you from participating!",
      category: "events",
    },
    {
      id: "3",
      question: "How do I verify my church membership?",
      answer:
        "During account creation, you'll provide your ward and stake information. Our system works with local leadership to verify your membership status. This typically takes 24-48 hours. Verified members have access to all RisingGen features and events. If you're having trouble with verification, contact your local leaders or our support team.",
      category: "account",
    },
    {
      id: "4",
      question: "Can I change my registration after submitting it?",
      answer:
        "Yes! You can modify most registration details up to 7 days before the event through your dashboard. Go to 'My Events,' find the event, and click 'Edit Registration.' Some changes (like dietary requirements or accessibility needs) can be made even closer to the event date. Contact the event organizers for last-minute changes.",
      category: "events",
    },
    {
      id: "5",
      question: "How do I connect with other attendees before an event?",
      answer:
        "Once registered for an event, you'll gain access to the event's communication channels where you can chat with other attendees, find travel companions, and coordinate accommodation sharing. You can also use our connection features to find attendees from your area or with similar interests.",
      category: "community",
    },
    {
      id: "6",
      question: "What happens if an event is cancelled?",
      answer:
        "If an event is cancelled, all registered attendees are notified immediately via email and in-app notifications. Full refunds are processed automatically within 5-7 business days. If the event is rescheduled, you can choose to transfer your registration or receive a refund.",
      category: "events",
    },
    {
      id: "7",
      question: "How do I organize an event through RisingGen?",
      answer:
        "Event organizers can access our planning dashboard after being approved by their local leadership. The dashboard includes timeline generators, committee management tools, registration systems, and communication platforms. Contact your stake Young Adults leader to begin the organizer application process.",
      category: "organizers",
    },
    {
      id: "8",
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use industry-standard encryption to protect your data, and we never share your personal information with third parties without your consent. Your church membership verification is handled securely through official channels. You can control what information is visible to other users in your privacy settings.",
      category: "account",
    },
    {
      id: "9",
      question: "How do I delete my account?",
      answer:
        "You can delete your account anytime from your profile settings. Click 'Account Settings' > 'Privacy & Security' > 'Delete Account.' Note that deleting your account will cancel any active event registrations and remove access to past event information. This action cannot be undone.",
      category: "account",
    },
    {
      id: "10",
      question: "The app isn't working properly. What should I do?",
      answer:
        "First, try refreshing the page or restarting the app. Make sure you're using the latest version of your browser. If problems persist, clear your browser cache and cookies. For ongoing issues, contact our technical support team with details about your device, browser, and the specific problem you're experiencing.",
      category: "technical",
    },
  ];

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-primary-50 via-white to-purple-50">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <QuestionMarkCircleIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Help & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions or get in touch with our support
              team. We're here to help you make the most of your RisingGen
              experience.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg shadow-lg"
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-32">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        activeCategory === category.id
                          ? "bg-primary-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span
                          className={`text-sm ${
                            activeCategory === category.id
                              ? "text-primary-100"
                              : "text-gray-400"
                          }`}
                        >
                          {category.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg border border-gray-100"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                      Frequently Asked Questions
                    </h2>
                    <span className="text-sm text-gray-500">
                      {filteredFAQs.length}{" "}
                      {filteredFAQs.length === 1 ? "question" : "questions"}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {filteredFAQs.map((item) => (
                    <motion.div key={item.id} initial={false} className="p-6">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full text-left focus:outline-none group"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                            {item.question}
                          </h3>
                          <ChevronDownIcon
                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                              openItems.has(item.id) ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence>
                        {openItems.has(item.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 text-gray-700 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="p-12 text-center">
                    <QuestionMarkCircleIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your search terms or browse a different
                      category.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Contact Support */}
              <motion.div
                variants={itemVariants}
                className="mt-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-8 text-white"
              >
                <div className="text-center">
                  <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                  <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
                  <p className="text-primary-100 mb-6 text-lg">
                    Can't find the answer you're looking for? Our support team
                    is here to help.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <a
                      href="mailto:support@risinggen.eu"
                      className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-3 px-4 font-semibold transition-all duration-200"
                    >
                      <EnvelopeIcon className="w-5 h-5" />
                      Email Support
                    </a>
                    <button className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-3 px-4 font-semibold transition-all duration-200">
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      Live Chat
                    </button>
                  </div>

                  <p className="text-primary-100 text-sm mt-4">
                    Typical response time: 2-4 hours
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpPage;
