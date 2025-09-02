# API Examples

## RisingGen API Integration Examples

This document provides practical examples of integrating with the RisingGen API across various common scenarios and use cases.

## Authentication

### Authenticating with Church Account

This example demonstrates authenticating a user with their Church Account credentials and storing the JWT token.

#### Request:

```javascript
// Using fetch API
async function loginWithChurchAccount(churchAccountId, password) {
  try {
    const response = await fetch("https://api.risinggen.eu/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        churchAccountId: churchAccountId,
        password: password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error.message);
    }

    // Store tokens securely
    localStorage.setItem("risinggen_token", data.token);
    localStorage.setItem("risinggen_refresh_token", data.refreshToken);

    return data.user;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}
```

#### Response:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "roles": ["participant"]
  },
  "expiresIn": 3600
}
```

### Refreshing Access Token

When an access token expires, use the refresh token to obtain a new one.

```javascript
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("risinggen_refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await fetch(
      "https://api.risinggen.eu/api/v1/auth/refresh",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      // Clear stored tokens if refresh fails
      localStorage.removeItem("risinggen_token");
      localStorage.removeItem("risinggen_refresh_token");
      throw new Error(data.error.message);
    }

    // Update stored tokens
    localStorage.setItem("risinggen_token", data.token);
    localStorage.setItem("risinggen_refresh_token", data.refreshToken);

    return data.token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    throw error;
  }
}
```

### Creating an API Client

A reusable API client with authentication and token refresh handling:

```javascript
class RisingGenApiClient {
  constructor(baseUrl = "https://api.risinggen.eu/api/v1") {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("risinggen_token");
    this.refreshToken = localStorage.getItem("risinggen_refresh_token");
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    // Set up headers with authentication
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const config = {
      ...options,
      headers,
    };

    try {
      let response = await fetch(url, config);

      // Handle 401 by attempting token refresh
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken();

        if (refreshed) {
          // Retry the original request with new token
          headers["Authorization"] = `Bearer ${this.token}`;
          config.headers = headers;
          response = await fetch(url, config);
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.error?.message || "API request failed",
          details: data.error,
        };
      }

      return data;
    } catch (error) {
      console.error(`API request to ${endpoint} failed:`, error);
      throw error;
    }
  }

  async refreshAccessToken() {
    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: this.refreshToken,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        this.clearTokens();
        return false;
      }

      this.token = data.token;
      this.refreshToken = data.refreshToken;

      localStorage.setItem("risinggen_token", data.token);
      localStorage.setItem("risinggen_refresh_token", data.refreshToken);

      return true;
    } catch (error) {
      this.clearTokens();
      return false;
    }
  }

  clearTokens() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem("risinggen_token");
    localStorage.removeItem("risinggen_refresh_token");
  }

  // Convenience methods for common HTTP verbs
  async get(endpoint) {
    return this.request(endpoint, { method: "GET" });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}
```

## Event Management

### Retrieving Events

Fetch upcoming events with filtering and pagination:

```javascript
// Using the API client from above
const api = new RisingGenApiClient();

async function getUpcomingEvents({ country, type, page = 1, limit = 10 }) {
  try {
    // Build query parameters
    const params = new URLSearchParams({
      page,
      limit,
      sort: "startDate:asc",
    });

    if (country) params.append("country", country);
    if (type) params.append("type", type);

    const data = await api.get(`/events?${params.toString()}`);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    throw error;
  }
}

// Usage
const londonEvents = await getUpcomingEvents({
  country: "UK",
  type: "conference",
});
```

### Creating a New Event

Create a new event as an organizer:

```javascript
async function createEvent(eventData) {
  try {
    const data = await api.post("/events", eventData);
    return data.data;
  } catch (error) {
    console.error("Failed to create event:", error);
    throw error;
  }
}

// Usage
const newEvent = await createEvent({
  title: "London YSA Conference 2025",
  description: "Annual London YSA Conference with workshops and activities",
  startDate: "2025-04-15T09:00:00Z",
  endDate: "2025-04-17T18:00:00Z",
  location: {
    venue: "London Stake Center",
    address: "123 Church Street, London",
    country: "UK",
    coordinates: {
      lat: 51.5074,
      lng: -0.1278,
    },
  },
  registration: {
    maxParticipants: 200,
    deadline: "2025-04-01T23:59:59Z",
    fee: 25.0,
    currency: "GBP",
  },
});
```

### Registering for an Event

Register a user for an event:

```javascript
async function registerForEvent(eventId, registrationData) {
  try {
    const data = await api.post(
      `/events/${eventId}/register`,
      registrationData
    );
    return data.data;
  } catch (error) {
    console.error("Failed to register for event:", error);
    throw error;
  }
}

// Usage
const registration = await registerForEvent("event_123", {
  dietaryRestrictions: ["vegetarian"],
  specialNeeds: "Wheelchair access required",
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Sister",
    phone: "+44 7700 900123",
  },
  workshops: ["leadership", "service"],
});

// If payment is required
if (registration.payment.required) {
  window.location.href = registration.payment.paymentUrl;
}
```

### Managing Event Attendees

Retrieve and filter event registrations (for organizers):

```javascript
async function getEventAttendees(eventId, { status, page = 1, limit = 50 }) {
  try {
    const params = new URLSearchParams({
      page,
      limit,
    });

    if (status) params.append("status", status);

    const data = await api.get(
      `/events/${eventId}/registrations?${params.toString()}`
    );
    return data.data;
  } catch (error) {
    console.error("Failed to fetch attendees:", error);
    throw error;
  }
}

// Usage
const confirmedAttendees = await getEventAttendees("event_123", {
  status: "confirmed",
});
```

## User Management

### Getting Current User Profile

Retrieve and display the current user's profile information:

```javascript
async function getCurrentUserProfile() {
  try {
    const data = await api.get("/users/me");
    return data.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw error;
  }
}

// Usage
const userProfile = await getCurrentUserProfile();
```

### Updating User Preferences

Update a user's notification preferences:

```javascript
async function updateNotificationPreferences(preferences) {
  try {
    const data = await api.patch(
      "/users/me/preferences/notifications",
      preferences
    );
    return data.data;
  } catch (error) {
    console.error("Failed to update preferences:", error);
    throw error;
  }
}

// Usage
await updateNotificationPreferences({
  email: true,
  push: true,
  sms: false,
  eventReminders: true,
  weeklyNewsletter: false,
});
```

## Communication

### Sending a Message to Event Participants

Send an announcement message to event participants (organizers only):

```javascript
async function sendEventAnnouncement(eventId, messageData) {
  try {
    const data = await api.post(`/events/${eventId}/messages`, messageData);
    return data.data;
  } catch (error) {
    console.error("Failed to send announcement:", error);
    throw error;
  }
}

// Usage
const message = await sendEventAnnouncement("event_123", {
  subject: "Important Venue Update",
  content:
    "Due to maintenance, our event has moved to the nearby community center. Please see the updated location details in your event information.",
  priority: "high",
  notificationMethods: ["email", "push"],
});
```

### Retrieving User Messages

Get messages for the current user:

```javascript
async function getUserMessages({ page = 1, limit = 20, folder = "inbox" }) {
  try {
    const params = new URLSearchParams({
      page,
      limit,
      folder,
    });

    const data = await api.get(`/messages?${params.toString()}`);
    return data.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw error;
  }
}

// Usage
const inboxMessages = await getUserMessages({ folder: "inbox" });
```

## Payments

### Processing a Payment

Process a payment for an event registration:

```javascript
async function processPayment(registrationId, paymentDetails) {
  try {
    const data = await api.post("/payments/process", {
      registrationId,
      ...paymentDetails,
    });
    return data.data;
  } catch (error) {
    console.error("Payment processing failed:", error);
    throw error;
  }
}

// Usage
const payment = await processPayment("reg_123", {
  paymentMethod: "stripe_card",
  returnUrl: "https://risinggen.eu/events/event_123/registration/complete",
});

// Redirect to payment processor
window.location.href = payment.checkoutUrl;
```

### Verifying Payment Status

Check the status of a payment:

```javascript
async function checkPaymentStatus(paymentId) {
  try {
    const data = await api.get(`/payments/${paymentId}`);
    return data.data;
  } catch (error) {
    console.error("Failed to check payment status:", error);
    throw error;
  }
}

// Usage
const paymentStatus = await checkPaymentStatus("pay_123");

if (paymentStatus.status === "completed") {
  showSuccessMessage("Your payment has been processed successfully!");
}
```

## Error Handling

### Comprehensive Error Handling

A robust approach to handling API errors:

```javascript
function handleApiError(error) {
  // Network or unexpected errors
  if (!error.status) {
    return {
      title: "Connection Error",
      message:
        "Unable to connect to the server. Please check your internet connection and try again.",
      action: "retry",
    };
  }

  // Handle specific error codes
  switch (error.status) {
    case 400:
      return {
        title: "Invalid Request",
        message:
          error.details?.message ||
          "The request contains invalid data. Please check your inputs and try again.",
        fields: error.details?.fields,
        action: "fix",
      };

    case 401:
      return {
        title: "Authentication Required",
        message: "Your session has expired. Please log in again to continue.",
        action: "login",
      };

    case 403:
      return {
        title: "Permission Denied",
        message: "You don't have permission to perform this action.",
        action: "back",
      };

    case 404:
      return {
        title: "Not Found",
        message: "The requested resource could not be found.",
        action: "back",
      };

    case 409:
      return {
        title: "Conflict",
        message:
          error.message || "This action conflicts with the current state.",
        action: "fix",
      };

    case 429:
      return {
        title: "Too Many Requests",
        message: "Please slow down and try again in a few minutes.",
        action: "wait",
      };

    case 500:
    case 502:
    case 503:
    case 504:
      return {
        title: "Server Error",
        message:
          "Something went wrong on our end. Please try again later or contact support if the problem persists.",
        reference: error.details?.reference,
        action: "retry",
      };

    default:
      return {
        title: "Error",
        message:
          error.message || "An unexpected error occurred. Please try again.",
        action: "retry",
      };
  }
}

// Usage
try {
  await api.post("/events", eventData);
} catch (error) {
  const userError = handleApiError(error);

  showErrorDialog({
    title: userError.title,
    message: userError.message,
    actions: {
      retry: () => attemptOperation(),
      fix: () => showForm(userError.fields),
      back: () => navigation.goBack(),
      login: () => navigation.navigate("Login"),
      wait: () => scheduleRetry(30000),
    }[userError.action],
  });

  // Log for monitoring
  logError({
    api: "/events",
    operation: "POST",
    error: error,
    userError: userError,
  });
}
```

## Real-time Updates

### WebSocket Connection for Live Updates

Establish a WebSocket connection for real-time event updates:

```javascript
class RisingGenRealtimeClient {
  constructor(baseUrl = "wss://realtime.risinggen.eu") {
    this.baseUrl = baseUrl;
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = {};
    this.token = localStorage.getItem("risinggen_token");
  }

  connect() {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        this.socket = new WebSocket(`${this.baseUrl}?token=${this.token}`);

        this.socket.onopen = () => {
          console.log("WebSocket connection established");
          this.reconnectAttempts = 0;
          resolve();
        };

        this.socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);

            if (data.type && this.listeners[data.type]) {
              this.listeners[data.type].forEach((callback) => {
                try {
                  callback(data.payload);
                } catch (err) {
                  console.error(
                    `Error in listener callback for ${data.type}:`,
                    err
                  );
                }
              });
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err);
          }
        };

        this.socket.onclose = (event) => {
          console.log("WebSocket connection closed:", event.code, event.reason);

          if (
            !event.wasClean &&
            this.reconnectAttempts < this.maxReconnectAttempts
          ) {
            const delay = Math.min(
              1000 * Math.pow(2, this.reconnectAttempts),
              30000
            );
            this.reconnectAttempts++;

            console.log(
              `Attempting to reconnect in ${delay}ms (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
            );

            setTimeout(() => {
              this.connect().catch((err) => {
                console.error("Reconnection failed:", err);
              });
            }, delay);
          }
        };

        this.socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        };
      } catch (err) {
        reject(err);
      }
    });
  }

  subscribe(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }

    this.listeners[eventType].push(callback);

    // If already connected, send subscription message
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(
        JSON.stringify({
          action: "subscribe",
          type: eventType,
        })
      );
    }

    return () => this.unsubscribe(eventType, callback);
  }

  unsubscribe(eventType, callback) {
    if (!this.listeners[eventType]) return;

    this.listeners[eventType] = this.listeners[eventType].filter(
      (cb) => cb !== callback
    );

    // If no more listeners, send unsubscribe message
    if (this.listeners[eventType].length === 0) {
      if (this.socket?.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({
            action: "unsubscribe",
            type: eventType,
          })
        );
      }

      delete this.listeners[eventType];
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

// Usage
const realtimeClient = new RisingGenRealtimeClient();
await realtimeClient.connect();

// Subscribe to event updates
const unsubscribe = realtimeClient.subscribe("event:update", (eventData) => {
  console.log("Event updated:", eventData);
  updateEventInUI(eventData);
});

// Subscribe to registration status changes
realtimeClient.subscribe("registration:status", (registrationData) => {
  console.log("Registration status changed:", registrationData);
  updateRegistrationStatus(registrationData);
});

// Later, when done
unsubscribe();
realtimeClient.disconnect();
```

## Mobile Integration Examples

### React Native API Integration

Example of integrating the API with React Native:

```javascript
// api.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export class RisingGenApiClient {
  constructor(baseUrl = "https://api.risinggen.eu/api/v1") {
    this.baseUrl = baseUrl;
  }

  async getToken() {
    try {
      return await AsyncStorage.getItem("risinggen_token");
    } catch (error) {
      console.error("Failed to get token from AsyncStorage:", error);
      return null;
    }
  }

  async getRefreshToken() {
    try {
      return await AsyncStorage.getItem("risinggen_refresh_token");
    } catch (error) {
      console.error("Failed to get refresh token from AsyncStorage:", error);
      return null;
    }
  }

  async setTokens(token, refreshToken) {
    try {
      await AsyncStorage.setItem("risinggen_token", token);
      await AsyncStorage.setItem("risinggen_refresh_token", refreshToken);
    } catch (error) {
      console.error("Failed to store tokens in AsyncStorage:", error);
    }
  }

  async clearTokens() {
    try {
      await AsyncStorage.removeItem("risinggen_token");
      await AsyncStorage.removeItem("risinggen_refresh_token");
    } catch (error) {
      console.error("Failed to clear tokens from AsyncStorage:", error);
    }
  }

  // Similar request methods as in the web example, but using AsyncStorage
}

// Usage in React Native component
import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { RisingGenApiClient } from "./api";

const api = new RisingGenApiClient();

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: 1,
        limit: 20,
        sort: "startDate:asc",
      });

      const data = await api.get(`/events?${params.toString()}`);
      setEvents(data.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Unable to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <Text>Loading events...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: "#eee",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text>{new Date(item.startDate).toLocaleDateString()}</Text>
              <Text>
                {item.location.venue}, {item.location.country}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
```

## Webhooks Integration

### Setting Up a Webhook Receiver

Example of a Node.js webhook receiver for RisingGen events:

```javascript
// Using Express.js
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.use(bodyParser.json());

// Webhook verification secret (should match what's configured in the RisingGen dashboard)
const WEBHOOK_SECRET = process.env.RISINGGEN_WEBHOOK_SECRET;

// Verify webhook signature
function verifyWebhookSignature(req) {
  const signature = req.headers["x-risinggen-signature"];

  if (!signature) {
    return false;
  }

  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET);
  const digest = hmac.update(payload).digest("hex");

  return signature === digest;
}

// Webhook endpoint
app.post("/webhooks/risinggen", (req, res) => {
  // Verify the webhook signature
  if (!verifyWebhookSignature(req)) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  const event = req.body;

  // Process different event types
  switch (event.type) {
    case "event.created":
      console.log("New event created:", event.data.title);
      // Process new event
      processNewEvent(event.data);
      break;

    case "registration.created":
      console.log("New registration:", event.data.userId);
      // Process new registration
      processNewRegistration(event.data);
      break;

    case "payment.completed":
      console.log("Payment completed:", event.data.paymentId);
      // Process completed payment
      processCompletedPayment(event.data);
      break;

    default:
      console.log("Unhandled event type:", event.type);
  }

  // Return 200 OK to acknowledge receipt
  res.status(200).json({ received: true });
});

function processNewEvent(eventData) {
  // Implement your event processing logic
  // For example, sync with your calendar system
}

function processNewRegistration(registrationData) {
  // Implement your registration processing logic
  // For example, update your CRM
}

function processCompletedPayment(paymentData) {
  // Implement your payment processing logic
  // For example, update your accounting system
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server listening on port ${PORT}`);
});
```

## Batch Operations

### Bulk Invitations

Send bulk invitations to multiple users:

```javascript
async function sendBulkInvitations(eventId, invitations) {
  try {
    const data = await api.post(`/events/${eventId}/invitations/bulk`, {
      invitations: invitations,
    });
    return data.data;
  } catch (error) {
    console.error("Failed to send bulk invitations:", error);
    throw error;
  }
}

// Usage
const result = await sendBulkInvitations("event_123", [
  { email: "john.doe@example.com", firstName: "John", lastName: "Doe" },
  { email: "jane.smith@example.com", firstName: "Jane", lastName: "Smith" },
  { email: "mike.brown@example.com", firstName: "Mike", lastName: "Brown" },
]);

console.log(`Sent ${result.successful} invitations successfully`);
if (result.failed.length > 0) {
  console.error("Failed invitations:", result.failed);
}
```

These examples demonstrate common integration patterns with the RisingGen API. They cover authentication, CRUD operations, real-time updates, error handling, and webhooks integration to help developers effectively integrate with the platform.
