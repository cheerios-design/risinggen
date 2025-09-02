# RisingGen Analytics Examples

This document provides examples and guidance for implementing analytics and metrics tracking in the RisingGen platform.

## Overview

Analytics in RisingGen serve several key purposes:

1. Measuring engagement and impact of the platform
2. Understanding user behavior and preferences
3. Identifying opportunities for improvement
4. Supporting data-driven decision making
5. Demonstrating value to stakeholders

## Key Performance Indicators (KPIs)

### User Engagement KPIs

```javascript
// Example of tracking user engagement metrics
function trackUserEngagement(userId, actionType, metadata = {}) {
  analytics.track({
    userId: userId,
    event: "user_engagement",
    properties: {
      action: actionType, // e.g., 'profile_view', 'content_share', 'comment'
      timestamp: new Date().toISOString(),
      sessionId: getCurrentSessionId(),
      ...metadata,
    },
  });
}

// Usage examples
trackUserEngagement("user123", "event_view", { eventId: "event456" });
trackUserEngagement("user123", "profile_update", {
  fieldsUpdated: ["bio", "interests"],
});
trackUserEngagement("user123", "content_share", {
  contentId: "post789",
  platform: "facebook",
});
```

### Event Success Metrics

```javascript
// Example of calculating event success metrics
function calculateEventSuccessMetrics(eventId) {
  return db.transaction(async (tx) => {
    // Registration conversion rate
    const viewsResult = await tx.query(
      "SELECT COUNT(DISTINCT user_id) AS total_views FROM event_views WHERE event_id = ?",
      [eventId]
    );

    const registrationsResult = await tx.query(
      'SELECT COUNT(*) AS total_registrations FROM event_registrations WHERE event_id = ? AND status = "confirmed"',
      [eventId]
    );

    const totalViews = viewsResult[0].total_views;
    const totalRegistrations = registrationsResult[0].total_registrations;
    const conversionRate =
      totalViews > 0 ? (totalRegistrations / totalViews) * 100 : 0;

    // Attendance rate
    const checkedInResult = await tx.query(
      'SELECT COUNT(*) AS checked_in FROM event_attendance WHERE event_id = ? AND status = "checked_in"',
      [eventId]
    );

    const checkedIn = checkedInResult[0].checked_in;
    const attendanceRate =
      totalRegistrations > 0 ? (checkedIn / totalRegistrations) * 100 : 0;

    // Participant satisfaction
    const satisfactionResult = await tx.query(
      `SELECT 
        ROUND(AVG(rating), 1) AS avg_rating,
        COUNT(*) AS total_ratings
       FROM event_feedback 
       WHERE event_id = ?`,
      [eventId]
    );

    return {
      eventId,
      metrics: {
        views: totalViews,
        registrations: totalRegistrations,
        conversionRate: conversionRate.toFixed(1) + "%",
        checkedIn,
        attendanceRate: attendanceRate.toFixed(1) + "%",
        averageRating: satisfactionResult[0].avg_rating || 0,
        totalRatings: satisfactionResult[0].total_ratings || 0,
      },
    };
  });
}
```

### Community Growth Metrics

```javascript
// Example of tracking community growth over time
async function getCommunityGrowthMetrics(
  startDate,
  endDate,
  interval = "month"
) {
  // Format date parameters for the query
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const formattedEndDate = endDate.toISOString().split("T")[0];

  // Define the SQL date format based on the interval
  let dateFormat;
  switch (interval) {
    case "day":
      dateFormat = "%Y-%m-%d";
      break;
    case "week":
      dateFormat = "%Y-%u"; // ISO week number format
      break;
    case "month":
    default:
      dateFormat = "%Y-%m";
      break;
  }

  // Query for new user signups over time
  const signupsQuery = `
    SELECT 
      DATE_FORMAT(created_at, '${dateFormat}') AS time_period,
      COUNT(*) AS new_users
    FROM users
    WHERE created_at BETWEEN ? AND ?
    GROUP BY time_period
    ORDER BY time_period ASC
  `;

  // Query for active users over time
  const activeUsersQuery = `
    SELECT 
      DATE_FORMAT(activity_date, '${dateFormat}') AS time_period,
      COUNT(DISTINCT user_id) AS active_users
    FROM user_activity_logs
    WHERE activity_date BETWEEN ? AND ?
    GROUP BY time_period
    ORDER BY time_period ASC
  `;

  // Query for content creation over time
  const contentCreationQuery = `
    SELECT 
      DATE_FORMAT(created_at, '${dateFormat}') AS time_period,
      COUNT(*) AS content_items
    FROM content_items
    WHERE created_at BETWEEN ? AND ?
    GROUP BY time_period
    ORDER BY time_period ASC
  `;

  // Execute queries in parallel
  const [signups, activeUsers, contentItems] = await Promise.all([
    db.query(signupsQuery, [formattedStartDate, formattedEndDate]),
    db.query(activeUsersQuery, [formattedStartDate, formattedEndDate]),
    db.query(contentCreationQuery, [formattedStartDate, formattedEndDate]),
  ]);

  // Process and combine results
  const periods = new Set();
  signups.forEach((item) => periods.add(item.time_period));
  activeUsers.forEach((item) => periods.add(item.time_period));
  contentItems.forEach((item) => periods.add(item.time_period));

  const sortedPeriods = Array.from(periods).sort();

  return sortedPeriods.map((period) => {
    const signupData = signups.find((item) => item.time_period === period) || {
      new_users: 0,
    };
    const activeUserData = activeUsers.find(
      (item) => item.time_period === period
    ) || { active_users: 0 };
    const contentData = contentItems.find(
      (item) => item.time_period === period
    ) || { content_items: 0 };

    return {
      period,
      newUsers: signupData.new_users,
      activeUsers: activeUserData.active_users,
      contentItems: contentData.content_items,
    };
  });
}
```

## Analytics Implementation Examples

### Google Analytics Integration

```javascript
// Example of Google Analytics 4 integration
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Helper functions for tracking standard events
export function trackPageView(pageName, pageParams = {}) {
  logEvent(analytics, "page_view", {
    page_title: pageName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ...pageParams,
  });
}

export function trackEvent(eventName, eventParams = {}) {
  logEvent(analytics, eventName, {
    timestamp: new Date().toISOString(),
    ...eventParams,
  });
}

// Custom RisingGen events
export function trackEventRegistration(eventId, eventName, registrationType) {
  trackEvent("event_registration", {
    event_id: eventId,
    event_name: eventName,
    registration_type: registrationType,
  });
}

export function trackContentEngagement(contentId, contentType, action) {
  trackEvent("content_engagement", {
    content_id: contentId,
    content_type: contentType, // 'article', 'video', 'devotional', etc.
    action: action, // 'view', 'share', 'like', 'comment', etc.
  });
}

export function trackServiceParticipation(serviceId, serviceName, role) {
  trackEvent("service_participation", {
    service_id: serviceId,
    service_name: serviceName,
    participation_role: role, // 'organizer', 'volunteer', 'participant', etc.
  });
}
```

### Custom Analytics Dashboard

```javascript
// React component for a custom analytics dashboard
import React, { useState, useEffect } from "react";
import { LineChart, BarChart, PieChart } from "./charts";
import { DateRangePicker, SegmentFilter } from "./filters";
import { fetchAnalyticsData } from "../api/analytics";

export default function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
    endDate: new Date(),
  });

  const [filters, setFilters] = useState({
    countries: [],
    eventTypes: [],
    userRoles: [],
  });

  const [metrics, setMetrics] = useState({
    userGrowth: [],
    eventParticipation: [],
    contentEngagement: [],
    serviceImpact: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchAnalyticsData(dateRange, filters);
        setMetrics(data);
      } catch (err) {
        setError("Failed to load analytics data. Please try again.");
        console.error("Analytics error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [dateRange, filters]);

  function handleFilterChange(filterType, values) {
    setFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
  }

  return (
    <div className="analytics-dashboard">
      <h1>RisingGen Analytics Dashboard</h1>

      <div className="dashboard-filters">
        <DateRangePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          onChange={setDateRange}
        />

        <div className="segment-filters">
          <SegmentFilter
            label="Countries"
            options={["Germany", "France", "UK", "Italy", "Spain"]}
            selected={filters.countries}
            onChange={(values) => handleFilterChange("countries", values)}
          />

          <SegmentFilter
            label="Event Types"
            options={["Conference", "Workshop", "Service Project", "Social"]}
            selected={filters.eventTypes}
            onChange={(values) => handleFilterChange("eventTypes", values)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-indicator">Loading analytics data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="dashboard-metrics">
          <div className="metric-card">
            <h2>User Growth</h2>
            <LineChart
              data={metrics.userGrowth}
              xKey="date"
              yKey="newUsers"
              color="#4CAF50"
            />
            <div className="metric-summary">
              <div className="metric-value">
                {metrics.userGrowth.reduce(
                  (sum, item) => sum + item.newUsers,
                  0
                )}
              </div>
              <div className="metric-label">New Users</div>
            </div>
          </div>

          <div className="metric-card">
            <h2>Event Participation</h2>
            <BarChart
              data={metrics.eventParticipation}
              xKey="eventName"
              yKey="participants"
              color="#2196F3"
            />
            <div className="metric-summary">
              <div className="metric-value">
                {metrics.eventParticipation.reduce(
                  (sum, item) => sum + item.participants,
                  0
                )}
              </div>
              <div className="metric-label">Total Participants</div>
            </div>
          </div>

          <div className="metric-card">
            <h2>Content Engagement</h2>
            <LineChart
              data={metrics.contentEngagement}
              xKey="date"
              yKey="engagements"
              color="#FF9800"
            />
            <div className="metric-summary">
              <div className="metric-value">
                {metrics.contentEngagement.reduce(
                  (sum, item) => sum + item.engagements,
                  0
                )}
              </div>
              <div className="metric-label">Total Engagements</div>
            </div>
          </div>

          <div className="metric-card">
            <h2>Service Impact</h2>
            <PieChart
              data={metrics.serviceImpact}
              nameKey="category"
              valueKey="hours"
              colors={["#9C27B0", "#E91E63", "#673AB7", "#3F51B5"]}
            />
            <div className="metric-summary">
              <div className="metric-value">
                {metrics.serviceImpact.reduce(
                  (sum, item) => sum + item.hours,
                  0
                )}
              </div>
              <div className="metric-label">Total Service Hours</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## Data Collection and Processing

### Client-Side Tracking Example

```javascript
// Example of a tracking middleware for React applications
import { createContext, useContext, useEffect } from "react";
import { trackPageView, trackEvent } from "./analytics";

// Create analytics context
const AnalyticsContext = createContext({
  trackEvent: () => {},
  trackPageView: () => {},
  identifyUser: () => {},
});

// Analytics provider component
export function AnalyticsProvider({ children }) {
  const identifyUser = (userId, userProperties = {}) => {
    // Set user identity for analytics
    window.analytics_userId = userId;
    window.analytics_userProps = userProperties;

    // Log user identification
    trackEvent("user_identified", {
      user_id: userId,
      ...userProperties,
    });
  };

  // Context value with tracking functions
  const contextValue = {
    trackEvent,
    trackPageView,
    identifyUser,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Custom hook for using analytics
export function useAnalytics() {
  return useContext(AnalyticsContext);
}

// Route change tracking component
export function RouteChangeTracker({ children, routeInfo }) {
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    if (routeInfo.path) {
      trackPageView(routeInfo.title || routeInfo.path, {
        path: routeInfo.path,
        ...routeInfo.params,
      });
    }
  }, [routeInfo.path]);

  return children;
}

// Event tracking hook
export function useEventTracking(eventName, eventParams = {}) {
  const { trackEvent } = useAnalytics();

  return (additionalParams = {}) => {
    trackEvent(eventName, {
      ...eventParams,
      ...additionalParams,
      timestamp: new Date().toISOString(),
    });
  };
}

// Usage example in a component
function EventRegistrationButton({ eventId, eventName }) {
  const trackRegistration = useEventTracking("click_register_button", {
    eventId,
    eventName,
  });

  return (
    <button
      onClick={() => {
        trackRegistration({ buttonLocation: "event_detail" });
        // Registration logic
      }}
    >
      Register Now
    </button>
  );
}
```

### Server-Side Analytics Processing

```javascript
// Node.js serverless function for processing analytics events
const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery();

/**
 * Cloud Function to process analytics events and store in BigQuery
 */
exports.processAnalyticsEvent = async (event, context) => {
  try {
    // Parse the event data
    const eventData = event.data
      ? JSON.parse(Buffer.from(event.data, "base64").toString())
      : {};
    const { eventName, timestamp, properties, userId } = eventData;

    if (!eventName || !timestamp) {
      console.error("Invalid event data:", eventData);
      return;
    }

    // Add metadata
    const enrichedData = {
      event_name: eventName,
      event_timestamp: timestamp,
      user_id: userId || "anonymous",
      properties: JSON.stringify(properties || {}),
      processed_timestamp: new Date().toISOString(),
      processing_id: context.eventId,
    };

    // Insert data into BigQuery
    const dataset = bigquery.dataset("risinggen_analytics");
    const table = dataset.table("events");

    await table.insert([enrichedData]);
    console.log(`Event ${eventName} processed successfully`);
  } catch (error) {
    console.error("Error processing analytics event:", error);
    throw error;
  }
};
```

## Reporting Examples

### Generating Event Success Reports

```javascript
/**
 * Generates a comprehensive event success report
 */
async function generateEventReport(eventId) {
  // Fetch event details
  const event = await db.query("SELECT * FROM events WHERE id = ?", [eventId]);

  if (!event.length) {
    throw new Error(`Event with ID ${eventId} not found`);
  }

  const eventData = event[0];

  // Calculate success metrics
  const metrics = await calculateEventSuccessMetrics(eventId);

  // Get demographic breakdown
  const demographicsQuery = `
    SELECT 
      u.country,
      COUNT(*) as count,
      ROUND((COUNT(*) / (
        SELECT COUNT(*) FROM event_registrations 
        WHERE event_id = ? AND status = 'confirmed'
      )) * 100, 1) as percentage
    FROM event_registrations er
    JOIN users u ON er.user_id = u.id
    WHERE er.event_id = ? AND er.status = 'confirmed'
    GROUP BY u.country
    ORDER BY count DESC
  `;

  const demographics = await db.query(demographicsQuery, [eventId, eventId]);

  // Get feedback summary
  const feedbackQuery = `
    SELECT
      question,
      ROUND(AVG(rating), 1) as average_rating,
      COUNT(*) as response_count
    FROM event_feedback_responses
    WHERE event_id = ?
    GROUP BY question
    ORDER BY average_rating DESC
  `;

  const feedbackSummary = await db.query(feedbackQuery, [eventId]);

  // Get top positive comments
  const positiveCommentsQuery = `
    SELECT
      comment,
      rating
    FROM event_feedback
    WHERE event_id = ? AND rating >= 4 AND comment IS NOT NULL AND comment != ''
    ORDER BY rating DESC, id DESC
    LIMIT 5
  `;

  const positiveComments = await db.query(positiveCommentsQuery, [eventId]);

  // Get improvement suggestions
  const improvementCommentsQuery = `
    SELECT
      comment,
      rating
    FROM event_feedback
    WHERE event_id = ? AND rating <= 3 AND comment IS NOT NULL AND comment != ''
    ORDER BY rating ASC, id DESC
    LIMIT 5
  `;

  const improvementComments = await db.query(improvementCommentsQuery, [
    eventId,
  ]);

  // Compile complete report
  return {
    event: {
      id: eventData.id,
      title: eventData.title,
      startDate: eventData.start_date,
      endDate: eventData.end_date,
      location: eventData.location,
      type: eventData.type,
      organizer: eventData.organizer_id,
    },
    metrics: metrics.metrics,
    demographics,
    feedback: {
      summary: feedbackSummary,
      positiveComments,
      improvementSuggestions: improvementComments,
    },
    generatedAt: new Date().toISOString(),
  };
}
```

### Generating Activity Reports for Leaders

```javascript
/**
 * Generates an activity report for leaders showing YSA participation trends
 */
async function generateLeadershipReport(params) {
  const {
    countryCode,
    startDate,
    endDate,
    compareWithPreviousPeriod = true,
  } = params;

  // Calculate date range for previous period
  const currentPeriodDays = Math.round(
    (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)
  );
  const previousStartDate = new Date(startDate);
  previousStartDate.setDate(previousStartDate.getDate() - currentPeriodDays);
  const previousEndDate = new Date(startDate);
  previousEndDate.setDate(previousEndDate.getDate() - 1);

  // Format dates for queries
  const formatDate = (date) => date.toISOString().split("T")[0];
  const formattedStartDate = formatDate(new Date(startDate));
  const formattedEndDate = formatDate(new Date(endDate));
  const formattedPreviousStart = formatDate(previousStartDate);
  const formattedPreviousEnd = formatDate(previousEndDate);

  // Base query params
  const baseParams = countryCode ? [countryCode] : [];

  // Current period stats
  const currentStatsQuery = `
    SELECT
      COUNT(DISTINCT u.id) AS active_users,
      COUNT(DISTINCT er.id) AS event_registrations,
      COUNT(DISTINCT e.id) AS events_held,
      IFNULL(SUM(s.hours), 0) AS service_hours,
      COUNT(DISTINCT c.id) AS content_items
    FROM users u
    LEFT JOIN event_registrations er ON u.id = er.user_id AND er.created_at BETWEEN ? AND ?
    LEFT JOIN events e ON e.end_date BETWEEN ? AND ? ${
      countryCode ? "AND e.country = ?" : ""
    }
    LEFT JOIN service_logs s ON u.id = s.user_id AND s.date BETWEEN ? AND ? ${
      countryCode ? "AND s.country = ?" : ""
    }
    LEFT JOIN content_items c ON u.id = c.creator_id AND c.created_at BETWEEN ? AND ?
    WHERE u.last_activity BETWEEN ? AND ? ${
      countryCode ? "AND u.country = ?" : ""
    }
  `;

  const currentParams = [
    formattedStartDate,
    formattedEndDate,
    formattedStartDate,
    formattedEndDate,
    ...baseParams,
    formattedStartDate,
    formattedEndDate,
    ...baseParams,
    formattedStartDate,
    formattedEndDate,
    formattedStartDate,
    formattedEndDate,
    ...baseParams,
  ];

  const currentStats = await db.query(currentStatsQuery, currentParams);

  let previousStats = {
    active_users: 0,
    event_registrations: 0,
    events_held: 0,
    service_hours: 0,
    content_items: 0,
  };

  // Get previous period stats if requested
  if (compareWithPreviousPeriod) {
    const previousStatsQuery = currentStatsQuery;
    const previousParams = [
      formattedPreviousStart,
      formattedPreviousEnd,
      formattedPreviousStart,
      formattedPreviousEnd,
      ...baseParams,
      formattedPreviousStart,
      formattedPreviousEnd,
      ...baseParams,
      formattedPreviousStart,
      formattedPreviousEnd,
      formattedPreviousStart,
      formattedPreviousEnd,
      ...baseParams,
    ];

    const prevStats = await db.query(previousStatsQuery, previousParams);
    previousStats = prevStats[0];
  }

  // Calculate changes and trends
  function calculateChange(current, previous) {
    if (!previous) return { value: current, change: 100, trend: "new" };

    const change =
      previous > 0
        ? ((current - previous) / previous) * 100
        : current > 0
        ? 100
        : 0;

    return {
      value: current,
      change: parseFloat(change.toFixed(1)),
      trend: change > 0 ? "up" : change < 0 ? "down" : "stable",
    };
  }

  const stats = {
    activeUsers: calculateChange(
      currentStats[0].active_users,
      previousStats.active_users
    ),
    eventRegistrations: calculateChange(
      currentStats[0].event_registrations,
      previousStats.event_registrations
    ),
    eventsHeld: calculateChange(
      currentStats[0].events_held,
      previousStats.events_held
    ),
    serviceHours: calculateChange(
      currentStats[0].service_hours,
      previousStats.service_hours
    ),
    contentItems: calculateChange(
      currentStats[0].content_items,
      previousStats.content_items
    ),
  };

  // Get top events
  const topEventsQuery = `
    SELECT
      e.id,
      e.title,
      e.start_date,
      e.location,
      COUNT(er.id) AS registration_count
    FROM events e
    LEFT JOIN event_registrations er ON e.id = er.event_id
    WHERE e.end_date BETWEEN ? AND ? ${countryCode ? "AND e.country = ?" : ""}
    GROUP BY e.id
    ORDER BY registration_count DESC
    LIMIT 5
  `;

  const topEventsParams = [
    formattedStartDate,
    formattedEndDate,
    ...(countryCode ? [countryCode] : []),
  ];
  const topEvents = await db.query(topEventsQuery, topEventsParams);

  // Get most active YSAs
  const mostActiveUsersQuery = `
    SELECT
      u.id,
      u.first_name,
      u.last_name,
      u.email,
      COUNT(DISTINCT er.event_id) + COUNT(DISTINCT s.id) + COUNT(DISTINCT c.id) AS activity_score
    FROM users u
    LEFT JOIN event_registrations er ON u.id = er.user_id AND er.created_at BETWEEN ? AND ?
    LEFT JOIN service_logs s ON u.id = s.user_id AND s.date BETWEEN ? AND ?
    LEFT JOIN content_items c ON u.id = c.creator_id AND c.created_at BETWEEN ? AND ?
    WHERE u.last_activity BETWEEN ? AND ? ${
      countryCode ? "AND u.country = ?" : ""
    }
    GROUP BY u.id
    ORDER BY activity_score DESC
    LIMIT 10
  `;

  const activeUsersParams = [
    formattedStartDate,
    formattedEndDate,
    formattedStartDate,
    formattedEndDate,
    formattedStartDate,
    formattedEndDate,
    formattedStartDate,
    formattedEndDate,
    ...(countryCode ? [countryCode] : []),
  ];

  const mostActiveUsers = await db.query(
    mostActiveUsersQuery,
    activeUsersParams
  );

  // Compile complete report
  return {
    reportType: "leadership_activity",
    timePeriod: {
      start: formattedStartDate,
      end: formattedEndDate,
      days: currentPeriodDays,
    },
    region: countryCode || "All Countries",
    stats,
    topEvents,
    mostActiveUsers,
    generatedAt: new Date().toISOString(),
  };
}
```

## Implementation Best Practices

### Privacy and Data Protection

```javascript
// Example of privacy-conscious analytics collection
class PrivacyAwareAnalytics {
  constructor() {
    this.consentGiven = false;
    this.anonymousId = this.generateAnonymousId();
    this.pendingEvents = [];
  }

  generateAnonymousId() {
    // Generate a random ID that doesn't contain personally identifiable information
    return "anon_" + Math.random().toString(36).substring(2, 15);
  }

  setConsent(consentGiven) {
    this.consentGiven = consentGiven;

    // If consent is given, process any pending events
    if (this.consentGiven && this.pendingEvents.length > 0) {
      this.pendingEvents.forEach((event) => this.trackEvent(...event));
      this.pendingEvents = [];
    }
  }

  trackEvent(eventName, eventParams = {}) {
    // Don't track if consent not given
    if (!this.consentGiven) {
      // Store non-PII events for later if consent is given
      if (this.isNonPIIEvent(eventName)) {
        this.pendingEvents.push([eventName, eventParams]);
      }
      return;
    }

    // Remove any PII from event params
    const sanitizedParams = this.sanitizeEventParams(eventParams);

    // Add anonymous ID instead of user ID
    const eventData = {
      ...sanitizedParams,
      anonymousId: this.anonymousId,
      timestamp: new Date().toISOString(),
    };

    // Send to analytics endpoint
    this.sendToAnalytics(eventName, eventData);
  }

  isNonPIIEvent(eventName) {
    // List of events that don't contain PII and can be stored pending consent
    const nonPIIEvents = [
      "page_view",
      "feature_impression",
      "app_open",
      "app_close",
    ];

    return nonPIIEvents.includes(eventName);
  }

  sanitizeEventParams(params) {
    // Create a copy to avoid mutating the original object
    const sanitized = { ...params };

    // List of fields that might contain PII
    const piiFields = [
      "email",
      "name",
      "phone",
      "address",
      "firstName",
      "lastName",
      "fullName",
      "password",
      "birthdate",
      "socialSecurityNumber",
    ];

    // Remove any fields that might contain PII
    piiFields.forEach((field) => {
      if (field in sanitized) {
        delete sanitized[field];
      }
    });

    // Recursively check nested objects
    Object.keys(sanitized).forEach((key) => {
      if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
        sanitized[key] = this.sanitizeEventParams(sanitized[key]);
      }
    });

    return sanitized;
  }

  sendToAnalytics(eventName, eventData) {
    // Implementation for sending to analytics backend
    fetch("https://api.risinggen.eu/api/v1/analytics/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventData,
      }),
    }).catch((error) => {
      console.error("Error sending analytics event:", error);
    });
  }
}
```

### Performance Considerations

```javascript
// Example of performance-optimized analytics batch processing
class BatchAnalyticsProcessor {
  constructor(options = {}) {
    this.events = [];
    this.maxBatchSize = options.maxBatchSize || 10;
    this.maxWaitTime = options.maxWaitTime || 2000; // ms
    this.endpoint =
      options.endpoint || "https://api.risinggen.eu/api/v1/analytics/batch";
    this.isSending = false;
    this.timer = null;
  }

  addEvent(eventName, eventParams = {}) {
    // Add event to the queue
    this.events.push({
      eventName,
      params: eventParams,
      timestamp: new Date().toISOString(),
    });

    // Start the timer if it's not already running
    if (!this.timer) {
      this.timer = setTimeout(() => this.sendBatch(), this.maxWaitTime);
    }

    // Send immediately if we've reached the batch size
    if (this.events.length >= this.maxBatchSize) {
      this.sendBatch();
    }
  }

  async sendBatch() {
    // Clear the timer
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Don't do anything if there are no events or a send is in progress
    if (this.events.length === 0 || this.isSending) {
      return;
    }

    // Get the current batch and mark as sending
    const batch = [...this.events];
    this.events = [];
    this.isSending = true;

    try {
      // Use navigator.sendBeacon if available for more reliable sending,
      // especially useful when the page is unloading
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({ events: batch })], {
          type: "application/json",
        });

        const success = navigator.sendBeacon(this.endpoint, blob);

        if (success) {
          this.isSending = false;
          return;
        }
        // Fall back to fetch if sendBeacon fails
      }

      // Use fetch API as fallback
      await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events: batch }),
        // Use keepalive to ensure the request completes even if the page is unloading
        keepalive: true,
      });
    } catch (error) {
      console.error("Error sending analytics batch:", error);

      // On failure, add the events back to the queue
      this.events = [...batch, ...this.events];

      // Store in localStorage as backup
      try {
        const storedEvents = JSON.parse(
          localStorage.getItem("risinggen_pending_events") || "[]"
        );
        localStorage.setItem(
          "risinggen_pending_events",
          JSON.stringify([...storedEvents, ...batch])
        );
      } catch (storageError) {
        console.error("Failed to store events in localStorage:", storageError);
      }
    } finally {
      this.isSending = false;

      // If new events came in while we were sending, start a new timer
      if (this.events.length > 0) {
        this.timer = setTimeout(() => this.sendBatch(), this.maxWaitTime);
      }
    }
  }

  // Try to send any pending events from localStorage
  recoverPendingEvents() {
    try {
      const storedEvents = JSON.parse(
        localStorage.getItem("risinggen_pending_events") || "[]"
      );

      if (storedEvents.length > 0) {
        // Add to the current batch
        this.events = [...this.events, ...storedEvents];

        // Clear from localStorage
        localStorage.removeItem("risinggen_pending_events");

        // Try to send if we have enough
        if (this.events.length >= this.maxBatchSize) {
          this.sendBatch();
        } else if (!this.timer) {
          this.timer = setTimeout(() => this.sendBatch(), this.maxWaitTime);
        }
      }
    } catch (error) {
      console.error("Failed to recover pending events:", error);
    }
  }
}

// Usage
const analytics = new BatchAnalyticsProcessor({
  maxBatchSize: 20,
  maxWaitTime: 5000,
});

// Try to recover any pending events from a previous session
analytics.recoverPendingEvents();

// Track events as needed
function trackUserAction(action, params) {
  analytics.addEvent(action, params);
}

// Make sure to send any pending events before the page unloads
window.addEventListener("beforeunload", () => {
  analytics.sendBatch();
});
```

### Visualization and Reporting

```javascript
// Example of an API endpoint for generating visualization data
async function getVisualizationData(req, res) {
  try {
    const {
      metric, // 'user_growth', 'event_participation', 'content_engagement', 'service_impact'
      timeRange, // 'day', 'week', 'month', 'quarter', 'year'
      startDate,
      endDate,
      filters, // { countries: [], eventTypes: [], userRoles: [] }
    } = req.query;

    // Validate inputs
    if (!metric || !timeRange || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: "Missing required parameters",
      });
    }

    let query;
    let params = [];

    // Format date parameters
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];
    params.push(formattedStartDate, formattedEndDate);

    // Add filter conditions if provided
    let filterConditions = "";
    if (filters) {
      if (filters.countries && filters.countries.length > 0) {
        filterConditions += " AND country IN (?)";
        params.push(filters.countries);
      }

      if (filters.eventTypes && filters.eventTypes.length > 0) {
        filterConditions += " AND event_type IN (?)";
        params.push(filters.eventTypes);
      }

      if (filters.userRoles && filters.userRoles.length > 0) {
        filterConditions += " AND user_role IN (?)";
        params.push(filters.userRoles);
      }
    }

    // Define the date format based on the time range
    let dateFormat;
    switch (timeRange) {
      case "day":
        dateFormat = "%Y-%m-%d";
        break;
      case "week":
        dateFormat = "%Y-%u";
        break;
      case "month":
        dateFormat = "%Y-%m";
        break;
      case "quarter":
        dateFormat = "%Y-Q%c";
        break;
      case "year":
      default:
        dateFormat = "%Y";
        break;
    }

    // Build the query based on the requested metric
    switch (metric) {
      case "user_growth":
        query = `
          SELECT 
            DATE_FORMAT(created_at, '${dateFormat}') AS time_period,
            COUNT(*) AS value
          FROM users
          WHERE created_at BETWEEN ? AND ?${filterConditions}
          GROUP BY time_period
          ORDER BY MIN(created_at)
        `;
        break;

      case "event_participation":
        query = `
          SELECT 
            e.title AS label,
            COUNT(er.id) AS value
          FROM events e
          LEFT JOIN event_registrations er ON e.id = er.event_id
          WHERE e.start_date BETWEEN ? AND ?${filterConditions}
          GROUP BY e.id
          ORDER BY value DESC
          LIMIT 10
        `;
        break;

      case "content_engagement":
        query = `
          SELECT 
            DATE_FORMAT(activity_date, '${dateFormat}') AS time_period,
            COUNT(*) AS value
          FROM content_engagement_logs
          WHERE activity_date BETWEEN ? AND ?${filterConditions}
          GROUP BY time_period
          ORDER BY MIN(activity_date)
        `;
        break;

      case "service_impact":
        query = `
          SELECT 
            category AS label,
            SUM(hours) AS value
          FROM service_logs
          WHERE date BETWEEN ? AND ?${filterConditions}
          GROUP BY category
          ORDER BY value DESC
        `;
        break;

      default:
        return res.status(400).json({
          success: false,
          error: "Invalid metric specified",
        });
    }

    // Execute the query
    const data = await db.query(query, params);

    // Return the visualization data
    return res.json({
      success: true,
      data: {
        metric,
        timeRange,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        results: data,
      },
    });
  } catch (error) {
    console.error("Error generating visualization data:", error);
    return res.status(500).json({
      success: false,
      error: "An error occurred while generating visualization data",
    });
  }
}
```

These examples provide a comprehensive overview of implementing analytics in the RisingGen platform, from data collection and processing to reporting and visualization.
