# API Specification

## RisingGen API Documentation

This document outlines the comprehensive API specification for the RisingGen platform, defining endpoints, request/response formats, and authentication requirements.

## API Design Principles

- **RESTful Design**: Resource-oriented API design
- **Consistent Response Format**: Standardized error and success responses
- **Versioned API**: `/api/v1` versioning scheme
- **Comprehensive Documentation**: OpenAPI/Swagger specification
- **Authentication**: JWT-based authentication with Church SSO

## Base URL

```
Production: https://api.risinggen.eu/api/v1
Staging: https://staging-api.risinggen.eu/api/v1
Development: https://dev-api.risinggen.eu/api/v1
```

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

### Authentication Endpoints

#### Login with Church Account

```http
POST /auth/login
Content-Type: application/json

{
  "churchAccountId": "123456789",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "role": "participant"
  },
  "expiresIn": 3600
}
```

#### Refresh Token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

#### Logout

```http
POST /auth/logout
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Successfully logged out"
}
```

## Core API Resources

### Users API

#### Get Current User

```http
GET /users/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "churchUnit": {
      "unitNumber": "123456",
      "wardName": "London Ward",
      "stakeName": "London Stake"
    },
    "roles": ["participant"],
    "preferences": {
      "language": "en",
      "notifications": {
        "email": true,
        "push": true
      }
    }
  }
}
```

#### Update User Profile

```http
PATCH /users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "contact": {
    "phone": "+44 7700 900123"
  },
  "preferences": {
    "notifications": {
      "sms": true
    }
  }
}

Response:
{
  "success": true,
  "data": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Smith",
    "contact": {
      "phone": "+44 7700 900123"
    },
    "preferences": {
      "language": "en",
      "notifications": {
        "email": true,
        "push": true,
        "sms": true
      }
    }
  }
}
```

### Events API

#### List Events

```http
GET /events?page=1&limit=10&type=conference&country=UK&search=london

Response:
{
  "success": true,
  "data": [
    {
      "id": "event_123",
      "title": "London YSA Conference 2025",
      "description": "Annual London YSA Conference",
      "startDate": "2025-04-15T09:00:00Z",
      "endDate": "2025-04-17T18:00:00Z",
      "location": {
        "venue": "London Stake Center",
        "address": "123 Church Street, London",
        "country": "UK"
      },
      "registration": {
        "status": "open",
        "maxParticipants": 200,
        "currentParticipants": 45,
        "deadline": "2025-04-01T23:59:59Z"
      }
    }
  ],
  "pagination": {
    "total": 24,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### Get Event Details

```http
GET /events/{eventId}

Response:
{
  "success": true,
  "data": {
    "id": "event_123",
    "title": "London YSA Conference 2025",
    "description": "Annual London YSA Conference",
    "startDate": "2025-04-15T09:00:00Z",
    "endDate": "2025-04-17T18:00:00Z",
    "location": {
      "venue": "London Stake Center",
      "address": "123 Church Street, London",
      "country": "UK",
      "coordinates": {
        "lat": 51.5074,
        "lng": -0.1278
      }
    },
    "registration": {
      "status": "open",
      "maxParticipants": 200,
      "currentParticipants": 45,
      "deadline": "2025-04-01T23:59:59Z",
      "fee": 25.00,
      "currency": "GBP"
    },
    "schedule": [
      {
        "day": "2025-04-15",
        "items": [
          {
            "title": "Welcome Session",
            "startTime": "09:00",
            "endTime": "10:00",
            "location": "Main Hall"
          }
        ]
      }
    ],
    "organizers": [
      {
        "id": "user_456",
        "name": "Jane Smith",
        "role": "Conference Chair"
      }
    ]
  }
}
```

#### Create Event (Organizer only)

```http
POST /events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "London YSA Conference 2025",
  "description": "Annual London YSA Conference",
  "startDate": "2025-04-15T09:00:00Z",
  "endDate": "2025-04-17T18:00:00Z",
  "location": {
    "venue": "London Stake Center",
    "address": "123 Church Street, London",
    "country": "UK"
  },
  "registration": {
    "maxParticipants": 200,
    "deadline": "2025-04-01T23:59:59Z",
    "fee": 25.00,
    "currency": "GBP"
  }
}

Response:
{
  "success": true,
  "data": {
    "id": "event_123",
    "title": "London YSA Conference 2025",
    // ... other event details
  }
}
```

#### Register for Event

```http
POST /events/{eventId}/register
Authorization: Bearer {token}
Content-Type: application/json

{
  "dietaryRestrictions": ["vegetarian"],
  "specialNeeds": "Wheelchair access required",
  "emergencyContact": {
    "name": "Jane Doe",
    "relationship": "Sister",
    "phone": "+44 7700 900123"
  },
  "workshops": ["leadership", "service"]
}

Response:
{
  "success": true,
  "data": {
    "registrationId": "reg_123",
    "status": "pending",
    "payment": {
      "required": true,
      "amount": 25.00,
      "currency": "GBP",
      "paymentUrl": "https://api.risinggen.eu/payments/checkout/reg_123"
    }
  }
}
```

### Communication API

#### Get Channels

```http
GET /communication/channels
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": "channel_123",
      "type": "event",
      "name": "London YSA Conference 2025",
      "unreadCount": 3
    },
    {
      "id": "channel_456",
      "type": "stake",
      "name": "London Stake YSA",
      "unreadCount": 0
    }
  ]
}
```

#### Get Messages

```http
GET /communication/channels/{channelId}/messages?page=1&limit=20
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": "msg_123",
      "sender": {
        "id": "user_456",
        "name": "Jane Smith",
        "role": "organizer"
      },
      "content": "Welcome to the London YSA Conference channel!",
      "sentAt": "2025-01-15T10:30:00Z",
      "attachments": []
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

#### Send Message (Organizer only)

```http
POST /communication/channels/{channelId}/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": "Important update about the venue for tomorrow",
  "priority": "high",
  "attachments": [
    {
      "name": "venue-map.pdf",
      "content": "base64_encoded_content",
      "type": "application/pdf"
    }
  ]
}

Response:
{
  "success": true,
  "data": {
    "id": "msg_789",
    "sentAt": "2025-01-15T14:45:00Z",
    "deliveryStatus": "sending"
  }
}
```

### Payments API

#### Get Payment Methods

```http
GET /payments/methods
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": "stripe_card",
      "name": "Credit/Debit Card",
      "provider": "Stripe",
      "supportedCurrencies": ["EUR", "GBP", "USD"]
    },
    {
      "id": "paypal",
      "name": "PayPal",
      "provider": "PayPal",
      "supportedCurrencies": ["EUR", "GBP", "USD"]
    }
  ]
}
```

#### Create Payment

```http
POST /payments/process
Authorization: Bearer {token}
Content-Type: application/json

{
  "registrationId": "reg_123",
  "paymentMethod": "stripe_card",
  "returnUrl": "https://risinggen.eu/events/event_123/registration/complete"
}

Response:
{
  "success": true,
  "data": {
    "paymentId": "pay_123",
    "checkoutUrl": "https://checkout.stripe.com/session/xyz",
    "amount": 25.00,
    "currency": "GBP",
    "expiresAt": "2025-01-15T15:30:00Z"
  }
}
```

#### Get Payment Status

```http
GET /payments/{paymentId}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "paymentId": "pay_123",
    "status": "completed",
    "amount": 25.00,
    "currency": "GBP",
    "paymentMethod": "stripe_card",
    "paymentDate": "2025-01-15T14:55:00Z",
    "receipt": "https://api.risinggen.eu/payments/pay_123/receipt"
  }
}
```

## Administrative APIs

### User Management (Admin only)

#### List Users

```http
GET /admin/users?page=1&limit=20&role=organizer
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": [
    {
      "id": "user_123",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "churchUnit": {
        "stakeName": "London Stake"
      },
      "roles": ["organizer", "participant"],
      "lastLogin": "2025-01-10T08:30:00Z"
    }
  ],
  "pagination": {
    "total": 145,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

#### Update User Roles

```http
PATCH /admin/users/{userId}/roles
Authorization: Bearer {token}
Content-Type: application/json

{
  "roles": ["organizer", "participant"]
}

Response:
{
  "success": true,
  "data": {
    "id": "user_123",
    "roles": ["organizer", "participant"]
  }
}
```

### System Settings (Admin only)

```http
GET /admin/settings
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "system": {
      "maintenanceMode": false,
      "announcementBanner": "Welcome to RisingGen Platform!"
    },
    "registration": {
      "defaultMaxParticipants": 200,
      "requirePaymentUpfront": true
    },
    "payment": {
      "providers": {
        "stripe": true,
        "paypal": true
      }
    }
  }
}
```

## Error Handling

All API endpoints follow a standardized error response format:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested event could not be found",
    "details": {
      "eventId": "invalid_id"
    }
  }
}
```

### Common Error Codes

| Code                      | Description                   | HTTP Status |
| ------------------------- | ----------------------------- | ----------- |
| `AUTHENTICATION_REQUIRED` | Valid authentication required | 401         |
| `INVALID_TOKEN`           | Token invalid or expired      | 401         |
| `PERMISSION_DENIED`       | Insufficient permissions      | 403         |
| `RESOURCE_NOT_FOUND`      | Requested resource not found  | 404         |
| `VALIDATION_ERROR`        | Request validation failed     | 400         |
| `RATE_LIMIT_EXCEEDED`     | Too many requests             | 429         |
| `PAYMENT_REQUIRED`        | Payment needed to proceed     | 402         |
| `INTERNAL_SERVER_ERROR`   | Server encountered an error   | 500         |

## Pagination

List endpoints support standard pagination parameters:

- `page`: Page number (1-indexed)
- `limit`: Items per page (default: 20, max: 100)

Response includes pagination metadata:

```json
{
  "pagination": {
    "total": 145,
    "page": 1,
    "limit": 20,
    "pages": 8
  }
}
```

## Filtering and Sorting

List endpoints support filtering and sorting:

- Filtering: `?country=UK&type=conference`
- Sorting: `?sort=startDate:desc`
- Search: `?search=london`

## Rate Limiting

API implements rate limiting to prevent abuse:

- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- Payment endpoints: 10 requests/minute

Rate limit headers included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1609459200
```

## Webhooks

RisingGen provides webhooks for real-time integration:

### Available Events

- `event.created`
- `event.updated`
- `registration.created`
- `payment.completed`
- `message.delivered`

### Webhook Format

```json
{
  "id": "hook_123",
  "createdAt": "2025-01-15T14:45:00Z",
  "type": "payment.completed",
  "data": {
    "paymentId": "pay_123",
    "registrationId": "reg_123",
    "status": "completed",
    "amount": 25.0
  }
}
```

---

This API specification is subject to changes during development phases. All endpoints are versioned to maintain backward compatibility.
