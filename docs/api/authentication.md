# API Documentation

## Authentication

### JWT Token Authentication

RisingGen uses JWT (JSON Web Token) authentication with Church of Jesus Christ of Latter-day Saints membership verification.

#### Login Endpoint

```http
POST /api/auth/login
Content-Type: application/json

{
  "membershipNumber": "123456789",
  "password": "securePassword123",
  "language": "en"
}
```

**Response**:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "preferredLanguage": "en",
    "role": "participant"
  },
  "expiresIn": 3600
}
```

#### Token Verification

Include JWT token in Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### User Roles

- **participant**: Regular YSA member
- **organizer**: Event organizer with management permissions
- **admin**: System administrator
- **leadership**: Area/regional leadership

## Core Endpoints

### Events API

#### Get Events

```http
GET /api/events?page=1&limit=20&country=UK&language=en
```

#### Create Event (Organizer only)

```http
POST /api/events
Content-Type: application/json
Authorization: Bearer {token}

{
  "title": "London YSA Conference 2025",
  "description": "Annual London YSA Conference",
  "startDate": "2025-04-15T09:00:00Z",
  "endDate": "2025-04-15T18:00:00Z",
  "location": {
    "venue": "London Stake Center",
    "address": "123 Church Street, London",
    "country": "UK"
  },
  "registration": {
    "maxParticipants": 200,
    "fee": 25.00,
    "currency": "GBP",
    "deadline": "2025-04-01T23:59:59Z"
  }
}
```

### Registration API

#### Register for Event

```http
POST /api/events/{eventId}/register
Content-Type: application/json
Authorization: Bearer {token}

{
  "dietaryRestrictions": ["vegetarian"],
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "+44 7700 900123"
  },
  "workshopPreferences": ["leadership", "service"]
}
```

### Communication API

#### Send Message

```http
POST /api/communication/channels/{channelId}/messages
Content-Type: application/json
Authorization: Bearer {token}

{
  "content": "Welcome everyone to the London YSA Conference!",
  "type": "announcement",
  "priority": "high"
}
```

### Financial API

#### Process Payment

```http
POST /api/payments/process
Content-Type: application/json
Authorization: Bearer {token}

{
  "eventId": "event_123",
  "amount": 25.00,
  "currency": "GBP",
  "paymentMethod": "stripe_card",
  "subsidyApplied": false
}
```

## Error Handling

All API responses use consistent error format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "provided": "invalid-email",
      "expected": "valid email address"
    }
  }
}
```

### Common Error Codes

- **AUTH_REQUIRED**: Authentication token required
- **AUTH_INVALID**: Invalid or expired token
- **VALIDATION_ERROR**: Request validation failed
- **PERMISSION_DENIED**: Insufficient permissions
- **RESOURCE_NOT_FOUND**: Requested resource not found
- **RATE_LIMIT_EXCEEDED**: Too many requests

## Rate Limiting

- **Public endpoints**: 100 requests/minute
- **Authenticated endpoints**: 1000 requests/minute
- **Payment endpoints**: 10 requests/minute

---

For detailed integration examples, see [examples.md](examples.md)
