import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  MapPinIcon,
  UserGroupIcon,
  MagnifyingGlassIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location: string;
  country: string;
  type: "conference" | "workshop" | "service" | "social" | "retreat";
  capacity: number;
  registered: number;
  price: number;
  currency: string;
  image: string;
  description: string;
  organizer: string;
  tags: string[];
  registrationDeadline: string;
  featured?: boolean;
}

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const countries = [
    "all",
    "Denmark",
    "Sweden",
    "Norway",
    "Finland",
    "Germany",
    "Netherlands",
    "United Kingdom",
  ];
  const eventTypes = [
    "all",
    "conference",
    "workshop",
    "service",
    "social",
    "retreat",
  ];

  const events: Event[] = [
    {
      id: "1",
      title: "Copenhagen Young Adult Conference 2025",
      date: "2025-10-15",
      endDate: "2025-10-17",
      location: "Copenhagen",
      country: "Denmark",
      type: "conference",
      capacity: 400,
      registered: 287,
      price: 150,
      currency: "EUR",
      image: "/events/copenhagen-conference.jpg",
      description:
        "Three days of inspiring workshops, spiritual growth, and meaningful connections with young adults across Northern Europe.",
      organizer: "Copenhagen Stake Young Adults",
      tags: ["Spiritual Growth", "Leadership", "Networking", "Workshops"],
      registrationDeadline: "2025-10-01",
      featured: true,
    },
    {
      id: "2",
      title: "Stockholm Leadership Workshop Series",
      date: "2025-09-28",
      endDate: "2025-09-29",
      location: "Stockholm",
      country: "Sweden",
      type: "workshop",
      capacity: 60,
      registered: 42,
      price: 75,
      currency: "EUR",
      image: "/events/stockholm-workshop.jpg",
      description:
        "Develop your leadership skills through interactive workshops and peer learning sessions.",
      organizer: "Stockholm Young Adults Committee",
      tags: ["Leadership", "Personal Development", "Interactive"],
      registrationDeadline: "2025-09-20",
    },
    {
      id: "3",
      title: "Helsinki Community Service Marathon",
      date: "2025-09-20",
      location: "Helsinki",
      country: "Finland",
      type: "service",
      capacity: 100,
      registered: 73,
      price: 0,
      currency: "EUR",
      image: "/events/helsinki-service.jpg",
      description:
        "Join us for a day of meaningful service projects throughout Helsinki, making a positive impact in our community.",
      organizer: "Helsinki Finland Stake",
      tags: ["Service", "Community Impact", "Team Building"],
      registrationDeadline: "2025-09-15",
      featured: true,
    },
    {
      id: "4",
      title: "Norwegian Fjords Spiritual Retreat",
      date: "2025-11-08",
      endDate: "2025-11-10",
      location: "Bergen",
      country: "Norway",
      type: "retreat",
      capacity: 80,
      registered: 23,
      price: 200,
      currency: "EUR",
      image: "/events/norway-retreat.jpg",
      description:
        "A peaceful retreat in the beautiful Norwegian fjords focusing on spiritual growth and personal reflection.",
      organizer: "Norway Young Adult Ministry",
      tags: ["Spiritual Growth", "Nature", "Reflection", "Peace"],
      registrationDeadline: "2025-10-25",
    },
    {
      id: "5",
      title: "Berlin Cultural Exchange Weekend",
      date: "2025-12-05",
      endDate: "2025-12-07",
      location: "Berlin",
      country: "Germany",
      type: "social",
      capacity: 120,
      registered: 89,
      price: 120,
      currency: "EUR",
      image: "/events/berlin-cultural.jpg",
      description:
        "Experience Berlin's rich culture while building lasting friendships with young adults from across Europe.",
      organizer: "Berlin International Young Adults",
      tags: ["Cultural", "Friendship", "Exploration", "International"],
      registrationDeadline: "2025-11-20",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCountry =
      selectedCountry === "all" || event.country === selectedCountry;
    const matchesType = selectedType === "all" || event.type === selectedType;

    return matchesSearch && matchesCountry && matchesType;
  });

  const getTypeColor = (type: Event["type"]) => {
    const colors = {
      conference: "bg-blue-100 text-blue-800",
      workshop: "bg-purple-100 text-purple-800",
      service: "bg-green-100 text-green-800",
      social: "bg-orange-100 text-orange-800",
      retreat: "bg-indigo-100 text-indigo-800",
    };
    return colors[type];
  };

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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Events
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join amazing events across Europe. Connect, learn, serve, and grow
              with young adults in your community.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {events.length}
                </div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {countries.length - 1}
                </div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {events.reduce((sum, event) => sum + event.registered, 0)}
                </div>
                <div className="text-sm text-gray-600">Participants</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, locations, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 items-center">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country === "all" ? "All Countries" : country}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === "all"
                        ? "All Types"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 ${
                      viewMode === "grid"
                        ? "bg-primary-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 ${
                      viewMode === "list"
                        ? "bg-primary-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </div>
          </motion.div>

          {/* Events Grid/List */}
          <motion.div variants={itemVariants}>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl"
                  >
                    {/* Event Image */}
                    <div className="relative h-48 bg-gradient-to-r from-primary-500 to-purple-600">
                      {event.featured && (
                        <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                            event.type
                          )}`}
                        >
                          {event.type.charAt(0).toUpperCase() +
                            event.type.slice(1)}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center text-white">
                          <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-80" />
                          <div className="font-semibold">{event.location}</div>
                        </div>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                            {event.endDate &&
                              ` - ${new Date(event.endDate).toLocaleDateString(
                                "en-US",
                                { month: "long", day: "numeric" }
                              )}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4" />
                          <span>
                            {event.location}, {event.country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <UserGroupIcon className="w-4 h-4" />
                          <span>
                            {event.registered}/{event.capacity} registered
                          </span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary-600">
                          {event.price === 0
                            ? "Free"
                            : `${event.price} ${event.currency}`}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/events/${event.id}`}
                            className="flex items-center gap-1 px-3 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                          >
                            <EyeIcon className="w-4 h-4" />
                            View
                          </Link>
                          <Link
                            to={`/events/${event.id}/register`}
                            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-semibold"
                          >
                            Register
                          </Link>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {event.tags.slice(0, 2).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    whileHover={{ x: 4 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Event Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <h3 className="text-xl font-bold text-gray-900 flex-1">
                            {event.title}
                          </h3>
                          {event.featured && (
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              Featured
                            </span>
                          )}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                              event.type
                            )}`}
                          >
                            {event.type.charAt(0).toUpperCase() +
                              event.type.slice(1)}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">
                          {event.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                              {event.endDate &&
                                ` - ${new Date(
                                  event.endDate
                                ).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            <span>
                              {event.location}, {event.country}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <UserGroupIcon className="w-4 h-4" />
                            <span>
                              {event.registered}/{event.capacity} registered
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col items-end justify-between gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-600">
                            {event.price === 0
                              ? "Free"
                              : `${event.price} ${event.currency}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            per person
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to={`/events/${event.id}`}
                            className="flex items-center gap-1 px-4 py-2 text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-200"
                          >
                            <EyeIcon className="w-4 h-4" />
                            View Details
                          </Link>
                          <Link
                            to={`/events/${event.id}/register`}
                            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-semibold"
                          >
                            Register Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Empty State */}
          {filteredEvents.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-16">
              <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search filters to find more events.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCountry("all");
                  setSelectedType("all");
                }}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EventsPage;
