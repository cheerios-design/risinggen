import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  PencilIcon,
  CameraIcon,
  MapPinIcon,
  CalendarIcon,
  ShieldCheckIcon,
  BellIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ward: string;
  stake: string;
  country: string;
  city: string;
  bio: string;
  interests: string[];
  profilePicture?: string;
  isVerified: boolean;
  joinDate: string;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+358 40 123 4567",
    dateOfBirth: "1995-03-15",
    ward: "Helsinki 1st Ward",
    stake: "Helsinki Finland Stake",
    country: "Finland",
    city: "Helsinki",
    bio: "I love connecting with other young adults and participating in meaningful activities. Currently working as a software developer and passionate about service projects.",
    interests: [
      "Service Projects",
      "Leadership Development",
      "Technology",
      "Music",
      "Outdoor Activities",
    ],
    isVerified: true,
    joinDate: "2024-01-15",
  });

  const [notifications, setNotifications] = useState({
    eventUpdates: true,
    newEvents: true,
    communityMessages: false,
    weeklyDigest: true,
    emergency: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "members",
    contactInfo: "friends",
    eventHistory: "private",
    locationSharing: false,
  });

  const handleProfileUpdate = (
    field: keyof UserProfile,
    value: string | string[]
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
    console.log("Profile saved:", profile);
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

  const tabs = [
    { id: "personal", name: "Personal Info", icon: UserCircleIcon },
    { id: "notifications", name: "Notifications", icon: BellIcon },
    { id: "privacy", name: "Privacy", icon: EyeIcon },
    { id: "security", name: "Security", icon: LockClosedIcon },
  ];

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
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-32 h-32 bg-primary-500 rounded-full flex items-center justify-center">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-4xl">
                        {profile.firstName[0]}
                        {profile.lastName[0]}
                      </span>
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200">
                    <CameraIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    {profile.isVerified && (
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {profile.city}, {profile.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      Member since{" "}
                      {new Date(profile.joinDate).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheckIcon className="w-4 h-4" />
                      {profile.ward}
                    </span>
                  </div>

                  <p className="text-gray-700 max-w-2xl">{profile.bio}</p>

                  {/* Interests */}
                  <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                    {profile.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
                  >
                    <PencilIcon className="w-5 h-5" />
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </button>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100 flex flex-wrap gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-primary-500 text-white shadow-md"
                        : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) =>
                          handleProfileUpdate("firstName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) =>
                          handleProfileUpdate("lastName", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          handleProfileUpdate("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) =>
                          handleProfileUpdate("phone", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) =>
                          handleProfileUpdate("dateOfBirth", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) =>
                          handleProfileUpdate("city", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Ward
                      </label>
                      <input
                        type="text"
                        value={profile.ward}
                        onChange={(e) =>
                          handleProfileUpdate("ward", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Stake
                      </label>
                      <input
                        type="text"
                        value={profile.stake}
                        onChange={(e) =>
                          handleProfileUpdate("stake", e.target.value)
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) =>
                        handleProfileUpdate("bio", e.target.value)
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-50"
                      placeholder="Tell others about yourself..."
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {key === "eventUpdates" &&
                              "Get notified about changes to events you've registered for"}
                            {key === "newEvents" &&
                              "Receive notifications when new events are available in your area"}
                            {key === "communityMessages" &&
                              "Get notified about community discussions and messages"}
                            {key === "weeklyDigest" &&
                              "Receive a weekly summary of upcoming events and community activity"}
                            {key === "emergency" &&
                              "Important emergency notifications (cannot be disabled)"}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              setNotifications((prev) => ({
                                ...prev,
                                [key]: e.target.checked,
                              }))
                            }
                            disabled={key === "emergency"}
                            className="sr-only peer"
                          />
                          <div
                            className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                              value ? "peer-checked:bg-primary-600" : ""
                            } ${
                              key === "emergency"
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          ></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "privacy" && (
                <motion.div
                  key="privacy"
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Privacy Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Profile Visibility
                      </label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) =>
                          setPrivacy((prev) => ({
                            ...prev,
                            profileVisibility: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="public">
                          Public - Anyone can see your profile
                        </option>
                        <option value="members">
                          Members Only - Only verified church members
                        </option>
                        <option value="friends">
                          Friends Only - Only people you've connected with
                        </option>
                        <option value="private">
                          Private - Only you can see your profile
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Contact Information
                      </label>
                      <select
                        value={privacy.contactInfo}
                        onChange={(e) =>
                          setPrivacy((prev) => ({
                            ...prev,
                            contactInfo: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="public">
                          Public - Anyone can see your contact info
                        </option>
                        <option value="members">Members Only</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">
                          Private - Hidden from everyone
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Event History
                      </label>
                      <select
                        value={privacy.eventHistory}
                        onChange={(e) =>
                          setPrivacy((prev) => ({
                            ...prev,
                            eventHistory: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      >
                        <option value="public">
                          Public - Anyone can see events you've attended
                        </option>
                        <option value="members">Members Only</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">
                          Private - Hidden from everyone
                        </option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-4 border-t border-gray-100">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Location Sharing
                        </h3>
                        <p className="text-sm text-gray-600">
                          Allow the app to access your location for event
                          recommendations
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacy.locationSharing}
                          onChange={(e) =>
                            setPrivacy((prev) => ({
                              ...prev,
                              locationSharing: e.target.checked,
                            }))
                          }
                          className="sr-only peer"
                        />
                        <div
                          className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                            privacy.locationSharing
                              ? "peer-checked:bg-primary-600"
                              : ""
                          }`}
                        ></div>
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-6">
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                        <h3 className="font-semibold text-green-800">
                          Church Membership Verified
                        </h3>
                      </div>
                      <p className="text-green-700 text-sm">
                        Your church membership has been verified with{" "}
                        {profile.ward}. This gives you access to all RisingGen
                        features.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">
                            Change Password
                          </h3>
                          <p className="text-sm text-gray-600">
                            Update your account password
                          </p>
                        </div>
                        <PencilIcon className="w-5 h-5 text-gray-400" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200">
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">
                            Two-Factor Authentication
                          </h3>
                          <p className="text-sm text-gray-600">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">Disabled</span>
                      </button>

                      <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all duration-200">
                        <div className="text-left">
                          <h3 className="font-semibold text-red-800">
                            Delete Account
                          </h3>
                          <p className="text-sm text-red-600">
                            Permanently delete your RisingGen account
                          </p>
                        </div>
                        <LockClosedIcon className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Account Status */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">Account Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">
                      Email Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">
                      Church Membership Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-gray-700">
                      Profile Complete
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <h3 className="font-bold text-gray-900 mb-4">Your Activity</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      12
                    </div>
                    <div className="text-xs text-gray-600">Events Attended</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-xs text-gray-600">Service Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">47</div>
                    <div className="text-xs text-gray-600">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-xs text-gray-600">Upcoming</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
