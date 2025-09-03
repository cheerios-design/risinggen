import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  UserGroupIcon,
  BellIcon,
  ChartBarIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  CalendarIcon as CalendarSolidIcon,
  UserGroupIcon as UserGroupSolidIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  status: "registered" | "attending" | "completed";
  type: "conference" | "workshop" | "service" | "social";
  image?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "event" | "system" | "social";
}

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Copenhagen Conference Update",
      message:
        "New workshop added to the schedule - 'Digital Ministry in the Modern Age'",
      time: "2 hours ago",
      read: false,
      type: "event",
    },
    {
      id: "2",
      title: "Welcome to RisingGen!",
      message:
        "Complete your profile to get personalized event recommendations",
      time: "1 day ago",
      read: false,
      type: "system",
    },
    {
      id: "3",
      title: "Service Project Reminder",
      message: "Stockholm Community Garden project starts tomorrow at 9 AM",
      time: "2 days ago",
      read: true,
      type: "event",
    },
  ]);

  const [upcomingEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Copenhagen Young Adult Conference",
      date: "2025-10-15",
      location: "Copenhagen, Denmark",
      status: "registered",
      type: "conference",
      image: "/events/copenhagen-conference.jpg",
    },
    {
      id: "2",
      title: "Leadership Workshop Series",
      date: "2025-09-28",
      location: "Stockholm, Sweden",
      status: "attending",
      type: "workshop",
    },
    {
      id: "3",
      title: "Community Service Day",
      date: "2025-09-20",
      location: "Helsinki, Finland",
      status: "registered",
      type: "service",
    },
  ]);

  const [stats] = useState({
    eventsAttended: 12,
    hoursOfService: 24,
    connectionsMade: 47,
    upcomingEvents: 3,
  });

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
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

  const getStatusBadge = (status: Event["status"]) => {
    const badges = {
      registered: "bg-blue-100 text-blue-800",
      attending: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
    };
    const labels = {
      registered: "Registered",
      attending: "Attending",
      completed: "Completed",
    };
    return { class: badges[status], label: labels[status] };
  };

  const getEventIcon = (type: Event["type"]) => {
    const icons = {
      conference: CalendarSolidIcon,
      workshop: UserGroupSolidIcon,
      service: StarIcon,
      social: UserGroupIcon,
    };
    return icons[type];
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
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Welcome back, Sarah! 👋
                </h1>
                <p className="text-gray-600 text-lg">
                  Here's what's happening in your RisingGen community
                </p>
              </div>
              <Link
                to="/profile"
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <UserGroupIcon className="w-6 h-6 text-primary-600" />
              </Link>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Events Attended
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.eventsAttended}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <CalendarIcon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Service Hours
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.hoursOfService}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <StarIcon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Connections
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.connectionsMade}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <UserGroupIcon className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Upcoming Events
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.upcomingEvents}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <ClockIcon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100 inline-flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === "overview"
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === "events"
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                My Events
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 relative ${
                  activeTab === "notifications"
                    ? "bg-primary-500 text-white shadow-md"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                Notifications
                {notifications.filter((n) => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  variants={itemVariants}
                  className="space-y-6"
                >
                  {/* Upcoming Events */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        Upcoming Events
                      </h2>
                      <Link
                        to="/events"
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                      >
                        View All →
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {upcomingEvents.slice(0, 3).map((event) => {
                        const Icon = getEventIcon(event.type);
                        const badge = getStatusBadge(event.status);
                        return (
                          <div
                            key={event.id}
                            className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
                          >
                            <div className="bg-primary-100 p-3 rounded-full">
                              <Icon className="w-5 h-5 text-primary-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">
                                {event.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <CalendarIcon className="w-4 h-4" />
                                  {new Date(event.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPinIcon className="w-4 h-4" />
                                  {event.location}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.class}`}
                            >
                              {badge.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link
                        to="/events"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-primary-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all duration-200"
                      >
                        <CalendarIcon className="w-5 h-5 text-primary-600" />
                        <span className="font-semibold text-gray-700">
                          Discover Events
                        </span>
                      </Link>
                      <Link
                        to="/community"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all duration-200"
                      >
                        <UserGroupIcon className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">
                          Connect
                        </span>
                      </Link>
                      <Link
                        to="/service"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-orange-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all duration-200"
                      >
                        <StarIcon className="w-5 h-5 text-orange-600" />
                        <span className="font-semibold text-gray-700">
                          Serve Together
                        </span>
                      </Link>
                      <Link
                        to="/content"
                        className="flex items-center gap-3 p-4 border-2 border-dashed border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                      >
                        <ChartBarIcon className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-gray-700">
                          Learn & Grow
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "events" && (
                <motion.div
                  key="events"
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    My Events
                  </h2>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => {
                      const Icon = getEventIcon(event.type);
                      const badge = getStatusBadge(event.status);
                      return (
                        <div
                          key={event.id}
                          className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all duration-200"
                        >
                          <div className="bg-primary-100 p-3 rounded-full">
                            <Icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 text-lg">
                              {event.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="w-4 h-4" />
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPinIcon className="w-4 h-4" />
                                {event.location}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.class}`}
                            >
                              {badge.label}
                            </span>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                              <EllipsisVerticalIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Notifications
                  </h2>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                          notification.read
                            ? "border-gray-100 bg-gray-50"
                            : "border-primary-200 bg-primary-50"
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              notification.type === "event"
                                ? "bg-blue-100"
                                : notification.type === "system"
                                ? "bg-gray-100"
                                : "bg-green-100"
                            }`}
                          >
                            <BellIcon
                              className={`w-4 h-4 ${
                                notification.type === "event"
                                  ? "text-blue-600"
                                  : notification.type === "system"
                                  ? "text-gray-600"
                                  : "text-green-600"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold ${
                                notification.read
                                  ? "text-gray-700"
                                  : "text-gray-900"
                              }`}
                            >
                              {notification.title}
                            </h3>
                            <p
                              className={`text-sm mt-1 ${
                                notification.read
                                  ? "text-gray-500"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Profile Card */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">SJ</span>
                  </div>
                  <h3 className="font-bold text-gray-900">Sarah Johnson</h3>
                  <p className="text-gray-500 text-sm">Helsinki 1st Ward</p>
                  <Link
                    to="/profile"
                    className="inline-block mt-4 bg-primary-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200"
                  >
                    Edit Profile
                  </Link>
                </div>
              </motion.div>

              {/* Recommended Events */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">
                  Recommended for You
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold text-sm text-gray-900">
                      Stockholm Young Adult Retreat
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Oct 5-7 • Leadership Focus
                    </p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                    <h4 className="font-semibold text-sm text-gray-900">
                      Helsinki Service Marathon
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Sep 25 • Community Impact
                    </p>
                  </div>
                </div>
                <Link
                  to="/events"
                  className="block text-center text-primary-600 font-semibold text-sm mt-4 hover:text-primary-700"
                >
                  See All Recommendations →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
