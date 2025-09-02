# RisingGen API Design

This document outlines the API design for the RisingGen platform, covering endpoints, authentication, error handling, and best practices.

## API Architecture Overview

The RisingGen API follows RESTful principles with the following characteristics:

- **Base URL**: `https://api.risinggen.eu/api/v1`
- **Authentication**: JWT-based with refresh tokens
- **Format**: JSON for request and response bodies
- **Versioning**: URL-based versioning (v1, v2, etc.)
- **Rate Limiting**: Tiered rate limits based on endpoint sensitivity

## Authentication

### Authentication Flow

1. **Login with Church Account**

```http
POST /auth/login
Content-Type: application/json

{
  "churchAccountId": "user123",
  "password": "password123"
}
```

Response:

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

2. **Token Refresh**

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

3. **Logout**

```http
POST /auth/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:

```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

### Authentication Headers

All authenticated requests should include the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Core API Endpoints

### User Management

#### Get Current User Profile

```http
GET /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "churchAccountId": "church123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "profileImage": "https://storage.risinggen.eu/profiles/user_123.jpg",
    "dateOfBirth": "1995-05-15",
    "gender": "male",
    "country": "UK",
    "city": "London",
    "language": "en-GB",
    "timezone": "Europe/London",
    "stake": "London Stake",
    "ward": "Hyde Park Ward",
    "roles": ["participant"],
    "bio": "Young professional working in finance",
    "interests": ["music", "sports", "scripture study"],
    "joinedAt": "2023-03-10T14:30:00Z",
    "lastActive": "2024-08-20T09:15:00Z"
  }
}
```

#### Update User Profile

```http
PATCH /users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "bio": "Young professional with a passion for service",
  "interests": ["music", "sports", "scripture study", "service"],
  "city": "Manchester"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "user_123",
    "bio": "Young professional with a passion for service",
    "interests": ["music", "sports", "scripture study", "service"],
    "city": "Manchester",
    "updatedAt": "2024-08-21T10:25:00Z"
  }
}
```

#### Update User Preferences

```http
PATCH /users/me/preferences
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "notifications": {
    "email": true,
    "push": true,
    "sms": false
  },
  "privacy": {
    "shareProfile": true,
    "shareContactInfo": false,
    "allowMessageRequests": true
  }
}
```

Response:

```json
{
  "success": true,
  "data": {
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "shareProfile": true,
      "shareContactInfo": false,
      "allowMessageRequests": true
    },
    "updatedAt": "2024-08-21T10:30:00Z"
  }
}
```

### Event Management

#### Get Events

```http
GET /events?page=1&limit=10&country=UK&type=conference&startDate=2024-09-01&endDate=2024-12-31
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "event_456",
      "title": "London YSA Conference 2024",
      "description": "Annual London YSA Conference with workshops and activities",
      "eventType": "conference",
      "startDate": "2024-09-15T09:00:00Z",
      "endDate": "2024-09-17T18:00:00Z",
      "timezone": "Europe/London",
      "location": {
        "venue": "London Stake Center",
        "address": "123 Church Street",
        "city": "London",
        "country": "UK",
        "coordinates": {
          "lat": 51.5074,
          "lng": -0.1278
        }
      },
      "registration": {
        "status": "open",
        "deadline": "2024-09-01T23:59:59Z",
        "fee": 25.0,
        "currency": "GBP",
        "availableSpots": 45,
        "totalSpots": 200
      },
      "organizer": {
        "id": "user_789",
        "name": "Sarah Johnson",
        "role": "YSA Representative"
      },
      "featured": true
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
GET /events/event_456
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "event_456",
    "title": "London YSA Conference 2024",
    "description": "Annual London YSA Conference with workshops and activities",
    "detailedDescription": "Join us for a weekend of spiritual growth, fun activities, and meeting new friends...",
    "eventType": "conference",
    "startDate": "2024-09-15T09:00:00Z",
    "endDate": "2024-09-17T18:00:00Z",
    "timezone": "Europe/London",
    "location": {
      "venue": "London Stake Center",
      "address": "123 Church Street",
      "city": "London",
      "country": "UK",
      "coordinates": {
        "lat": 51.5074,
        "lng": -0.1278
      }
    },
    "registration": {
      "status": "open",
      "deadline": "2024-09-01T23:59:59Z",
      "fee": 25.0,
      "currency": "GBP",
      "availableSpots": 45,
      "totalSpots": 200
    },
    "schedule": [
      {
        "id": "schedule_1",
        "title": "Welcome Session",
        "description": "Opening remarks and orientation",
        "startTime": "2024-09-15T09:00:00Z",
        "endTime": "2024-09-15T10:00:00Z",
        "location": "Main Hall"
      },
      {
        "id": "schedule_2",
        "title": "Workshop: Building Lasting Relationships",
        "description": "Interactive workshop on relationship building",
        "startTime": "2024-09-15T10:30:00Z",
        "endTime": "2024-09-15T12:00:00Z",
        "location": "Room 101",
        "presenter": "Elder James Smith"
      }
    ],
    "organizers": [
      {
        "id": "user_789",
        "name": "Sarah Johnson",
        "role": "YSA Representative",
        "contact": "sarah.johnson@example.com"
      }
    ],
    "createdAt": "2024-07-01T14:30:00Z",
    "updatedAt": "2024-08-15T09:20:00Z"
  }
}
```

#### Register for Event

```http
POST /events/event_456/register
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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
```

Response:

```json
{
  "success": true,
  "data": {
    "registrationId": "reg_123",
    "eventId": "event_456",
    "status": "pending",
    "payment": {
      "required": true,
      "amount": 25.0,
      "currency": "GBP",
      "paymentUrl": "https://api.risinggen.eu/payments/checkout/payment_789"
    },
    "registeredAt": "2024-08-21T10:45:00Z"
  }
}
```

#### Get User's Events

```http
GET /users/me/events?status=registered&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "event_456",
      "title": "London YSA Conference 2024",
      "startDate": "2024-09-15T09:00:00Z",
      "endDate": "2024-09-17T18:00:00Z",
      "location": {
        "city": "London",
        "country": "UK"
      },
      "registration": {
        "id": "reg_123",
        "status": "confirmed",
        "paymentStatus": "paid"
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

### Community Features

#### Get User Connections

```http
GET /users/me/connections?status=active&page=1&limit=20
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "user_789",
      "firstName": "Sarah",
      "lastName": "Johnson",
      "profileImage": "https://storage.risinggen.eu/profiles/user_789.jpg",
      "country": "UK",
      "city": "London",
      "connectedSince": "2024-07-15T14:30:00Z",
      "mutualConnections": 5
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

#### Send Connection Request

```http
POST /users/user_456/connect
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "message": "Hi! We met at the London conference. Let's connect!"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "connectionId": "conn_123",
    "status": "pending",
    "requestedAt": "2024-08-21T11:00:00Z"
  }
}
```

#### Get Groups

```http
GET /groups?category=interest&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "group_123",
      "name": "YSA Music Enthusiasts",
      "description": "A group for YSAs who love music and want to share their talents",
      "category": "interest",
      "memberCount": 45,
      "location": {
        "country": "UK",
        "region": "London"
      },
      "createdAt": "2024-01-15T10:00:00Z",
      "isMember": false
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

#### Join Group

```http
POST /groups/group_123/join
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "introduction": "I love playing piano and singing in church choir!"
}
```

Response:

```json
{
  "success": true,
  "data": {
    "groupId": "group_123",
    "membershipId": "member_456",
    "status": "active",
    "role": "member",
    "joinedAt": "2024-08-21T11:15:00Z"
  }
}
```

### Messaging

#### Get Conversations

```http
GET /messages/conversations?page=1&limit=20
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "convo_123",
      "type": "individual",
      "participant": {
        "id": "user_789",
        "firstName": "Sarah",
        "lastName": "Johnson",
        "profileImage": "https://storage.risinggen.eu/profiles/user_789.jpg"
      },
      "lastMessage": {
        "content": "Are you coming to the service project this weekend?",
        "sentAt": "2024-08-20T18:45:00Z",
        "sentBy": "user_789",
        "read": true
      },
      "unreadCount": 0
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 20,
    "pages": 1
  }
}
```

#### Get Conversation Messages

```http
GET /messages/conversations/convo_123/messages?page=1&limit=50
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "msg_456",
      "conversationId": "convo_123",
      "content": "Hi there! How are you doing?",
      "sender": {
        "id": "user_123",
        "firstName": "John",
        "lastName": "Doe"
      },
      "sentAt": "2024-08-20T18:30:00Z",
      "read": true,
      "readAt": "2024-08-20T18:35:00Z"
    },
    {
      "id": "msg_457",
      "conversationId": "convo_123",
      "content": "Are you coming to the service project this weekend?",
      "sender": {
        "id": "user_789",
        "firstName": "Sarah",
        "lastName": "Johnson"
      },
      "sentAt": "2024-08-20T18:45:00Z",
      "read": true,
      "readAt": "2024-08-20T19:00:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "page": 1,
    "limit": 50,
    "pages": 1
  }
}
```

#### Send Message

```http
POST /messages/conversations/convo_123/messages
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "content": "Yes, I'll be there! Looking forward to it.",
  "attachments": []
}
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "msg_458",
    "conversationId": "convo_123",
    "content": "Yes, I'll be there! Looking forward to it.",
    "sender": {
      "id": "user_123",
      "firstName": "John",
      "lastName": "Doe"
    },
    "sentAt": "2024-08-21T11:30:00Z",
    "read": false
  }
}
```

### Content & Resources

#### Get Content Items

```http
GET /content?type=article&category=spiritual&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "content_123",
      "title": "Finding Strength Through Daily Scripture Study",
      "summary": "Practical tips for developing a meaningful scripture study habit",
      "type": "article",
      "category": "spiritual",
      "featuredImage": "https://storage.risinggen.eu/content/article_123.jpg",
      "author": {
        "id": "user_456",
        "name": "Elder Thomas Wilson"
      },
      "publishedAt": "2024-08-01T10:00:00Z",
      "readTime": 5,
      "engagement": {
        "views": 1245,
        "likes": 89,
        "shares": 23,
        "comments": 12
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

#### Get Content Item Details

```http
GET /content/content_123
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "content_123",
    "title": "Finding Strength Through Daily Scripture Study",
    "summary": "Practical tips for developing a meaningful scripture study habit",
    "content": "<div><p>In today's busy world, finding time for meaningful scripture study can be challenging...</p></div>",
    "type": "article",
    "category": "spiritual",
    "featuredImage": "https://storage.risinggen.eu/content/article_123.jpg",
    "author": {
      "id": "user_456",
      "name": "Elder Thomas Wilson",
      "bio": "Serving as a counselor in the YSA stake presidency"
    },
    "tags": ["scripture study", "spiritual habits", "personal revelation"],
    "publishedAt": "2024-08-01T10:00:00Z",
    "updatedAt": "2024-08-02T14:30:00Z",
    "readTime": 5,
    "engagement": {
      "views": 1245,
      "likes": 89,
      "shares": 23,
      "comments": 12,
      "userEngagement": {
        "liked": true,
        "shared": false,
        "commented": false
      }
    },
    "relatedContent": [
      {
        "id": "content_456",
        "title": "Making Prayer Meaningful",
        "type": "article",
        "category": "spiritual"
      }
    ]
  }
}
```

### Service & Impact

#### Get Service Opportunities

```http
GET /service?location=London&date=2024-09&page=1&limit=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Response:

```json
{
  "success": true,
  "data": [
    {
      "id": "service_123",
      "title": "Community Garden Cleanup",
      "description": "Help clean and prepare the community garden for fall planting",
      "date": "2024-09-10T09:00:00Z",
      "duration": 180,
      "location": {
        "venue": "Brixton Community Garden",
        "city": "London",
        "country": "UK",
        "coordinates": {
          "lat": 51.4613,
          "lng": -0.1156
        }
      },
      "organizer": {
        "id": "user_789",
        "name": "Sarah Johnson"
      },
      "spots": {
        "available": 12,
        "total": 20
      },
      "skills": ["gardening", "physical labor", "organization"],
      "impact": {
        "beneficiaries": "Local community",
        "estimatedImpact": "Provides fresh produce for 50+ families"
      }
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

#### Register for Service Opportunity

```http
POST /service/service_123/register
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "skills": ["organization"],
  "notes": "I can bring gardening tools",
  "availableHours": 3
}
```

Response:

```json
{
  "success": true,
  "data": {
    "registrationId": "sreg_456",
    "serviceId": "service_123",
    "status": "confirmed",
    "registeredAt": "2024-08-21T11:45:00Z"
  }
}
```

## Error Handling

### Error Response Format

All error responses follow a consistent format:

```json
{
  "success": false,
  "error": {
    "code": "resource_not_found",
    "message": "The requested resource could not be found",
    "details": {
      "resourceType": "Event",
      "resourceId": "event_999"
    }
  }
}
```

### Common Error Codes

| Code                      | HTTP Status | Description                                          |
| ------------------------- | ----------- | ---------------------------------------------------- |
| `authentication_required` | 401         | Authentication is required for this endpoint         |
| `invalid_credentials`     | 401         | The provided credentials are invalid                 |
| `access_denied`           | 403         | User does not have permission to access the resource |
| `resource_not_found`      | 404         | The requested resource could not be found            |
| `validation_error`        | 422         | Request validation failed                            |
| `rate_limit_exceeded`     | 429         | Rate limit exceeded for the endpoint                 |
| `server_error`            | 500         | Internal server error                                |

### Validation Error Response

For validation errors, additional details are provided:

```json
{
  "success": false,
  "error": {
    "code": "validation_error",
    "message": "Request validation failed",
    "details": {
      "fields": {
        "email": "Must be a valid email address",
        "password": "Must be at least 8 characters long"
      }
    }
  }
}
```

## Rate Limiting

### Rate Limit Headers

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1629557400
```

### Rate Limit Tiers

| Tier      | Endpoints                       | Limit                   |
| --------- | ------------------------------- | ----------------------- |
| Standard  | Most read endpoints             | 100 requests per minute |
| Sensitive | Authentication, profile updates | 20 requests per minute  |
| Write     | Content creation, messaging     | 50 requests per minute  |

## Pagination

### Request Parameters

All list endpoints support pagination with the following parameters:

- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

### Response Format

Paginated responses include a `pagination` object:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 243,
    "page": 2,
    "limit": 20,
    "pages": 13
  }
}
```

## Filtering and Sorting

### Filtering

Endpoints support filtering via query parameters:

- Single value: `country=UK`
- Multiple values: `type=conference,workshop`
- Range values: `startDate=2024-09-01&endDate=2024-12-31`

### Sorting

Sort using the `sort` parameter:

- Single field ascending: `sort=title`
- Single field descending: `sort=-title`
- Multiple fields: `sort=country,-startDate`

## API Versioning

### URL-based Versioning

The API uses URL-based versioning:

- `https://api.risinggen.eu/api/v1/events`
- `https://api.risinggen.eu/api/v2/events`

### Version Lifecycle

1. **Current**: v1 - Actively maintained and enhanced
2. **Deprecated**: None yet
3. **Sunset**: None yet

### Version Headers

Responses include version information:

```
X-API-Version: v1
X-API-Deprecated: false
```

## WebSocket API

### Connection

Connect to the WebSocket API:

```
wss://api.risinggen.eu/ws?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Message Format

All WebSocket messages have a consistent format:

```json
{
  "type": "message_received",
  "payload": {
    "conversationId": "convo_123",
    "message": {
      "id": "msg_459",
      "content": "Are we meeting at the north entrance?",
      "sender": {
        "id": "user_789",
        "firstName": "Sarah",
        "lastName": "Johnson"
      },
      "sentAt": "2024-08-21T12:30:00Z"
    }
  }
}
```

### Event Types

| Event Type           | Description                   |
| -------------------- | ----------------------------- |
| `message_received`   | New message received          |
| `connection_request` | New connection request        |
| `event_reminder`     | Reminder about upcoming event |
| `notification`       | General notification          |

## API Documentation

### OpenAPI Specification

The complete API specification is available in OpenAPI format:

- [OpenAPI JSON](https://api.risinggen.eu/docs/openapi.json)
- [OpenAPI YAML](https://api.risinggen.eu/docs/openapi.yaml)

### Interactive Documentation

Interactive API documentation is available at:

- [API Documentation Portal](https://api.risinggen.eu/docs)

## Security Considerations

### HTTPS

All API requests must use HTTPS. HTTP requests are redirected to HTTPS.

### CORS

Cross-Origin Resource Sharing (CORS) is configured for:

- Web application origin: `https://app.risinggen.eu`
- Mobile application schemes: `risinggen://`

### API Keys

API keys for server-to-server integrations are available through:

- [Developer Portal](https://developers.risinggen.eu)

## Implementation Guidelines

### Client Implementation

1. **Authentication Flow**

   - Store refresh tokens securely
   - Implement token refresh logic
   - Handle expired sessions gracefully

2. **Error Handling**

   - Present user-friendly error messages
   - Implement retry logic for 5xx errors
   - Add special handling for offline scenarios

3. **Offline Support**
   - Queue operations when offline
   - Implement conflict resolution strategies
   - Sync data when connection is restored

### Testing

1. **Test Endpoints**

   - Testing environment: `https://api-test.risinggen.eu/api/v1`
   - Sandbox data available for integration testing

2. **Postman Collection**
   - [Download Postman Collection](https://api.risinggen.eu/docs/risinggen-api.postman.json)

## API Changelog

### v1.0.0 (2024-06-01)

- Initial API release with core functionality
- User authentication and profile management
- Event discovery and registration
- Basic community features

### v1.1.0 (2024-07-15)

- Added messaging endpoints
- Enhanced event management features
- Improved connection management
- Added service opportunity endpoints
