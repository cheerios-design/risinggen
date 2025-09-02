# API Reference

This document provides a comprehensive reference for the RisingGen platform API, including authentication methods, endpoints, request/response formats, and best practices.

## Overview

The RisingGen API is a RESTful API that provides programmatic access to the RisingGen platform's data and functionality. It allows developers to build integrations, extensions, and custom applications that leverage the RisingGen ecosystem.

## Base URL

All API requests should be made to the following base URL:

```
https://api.risinggen.eu/v1
```

## Authentication

### Authentication Methods

The RisingGen API supports two authentication methods:

1. **OAuth 2.0** - For user-context operations and third-party integrations
2. **API Key** - For server-to-server operations and internal services

### OAuth 2.0 Authentication

OAuth 2.0 is used for operations that require user context. The API implements the Authorization Code Flow with PKCE (Proof Key for Code Exchange).

#### OAuth Endpoints

| Endpoint      | URL                                         |
| ------------- | ------------------------------------------- |
| Authorization | `https://auth.risinggen.eu/oauth/authorize` |
| Token         | `https://auth.risinggen.eu/oauth/token`     |
| Revoke        | `https://auth.risinggen.eu/oauth/revoke`    |
| User Info     | `https://auth.risinggen.eu/userinfo`        |

#### OAuth Scopes

| Scope               | Description                           |
| ------------------- | ------------------------------------- |
| `profile`           | Basic user profile information        |
| `email`             | User's email address                  |
| `events:read`       | Read access to event data             |
| `events:write`      | Write access to event data            |
| `connections:read`  | Read access to user connections       |
| `connections:write` | Write access to user connections      |
| `content:read`      | Read access to content                |
| `content:write`     | Write access to content               |
| `service:read`      | Read access to service opportunities  |
| `service:write`     | Write access to service opportunities |

#### OAuth Flow Example

```javascript
// 1. Redirect user to authorization URL
const authUrl =
  "https://auth.risinggen.eu/oauth/authorize?" +
  "response_type=code&" +
  "client_id=YOUR_CLIENT_ID&" +
  "redirect_uri=YOUR_REDIRECT_URI&" +
  "scope=profile email events:read&" +
  "state=RANDOM_STATE_VALUE&" +
  "code_challenge=CODE_CHALLENGE&" +
  "code_challenge_method=S256";

// 2. Receive authorization code at redirect URI

// 3. Exchange code for access token
const tokenResponse = await fetch("https://auth.risinggen.eu/oauth/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "authorization_code",
    code: "AUTHORIZATION_CODE",
    redirect_uri: "YOUR_REDIRECT_URI",
    client_id: "YOUR_CLIENT_ID",
    code_verifier: "CODE_VERIFIER",
  }),
});

const tokens = await tokenResponse.json();
// {
//   "access_token": "ACCESS_TOKEN",
//   "token_type": "Bearer",
//   "expires_in": 3600,
//   "refresh_token": "REFRESH_TOKEN",
//   "scope": "profile email events:read"
// }
```

### API Key Authentication

API keys are used for server-to-server operations and internal services. API keys must be kept secure and should never be exposed in client-side code.

API keys are included in the request header:

```
Authorization: ApiKey YOUR_API_KEY
```

#### API Key Management

API keys can be created and managed in the RisingGen Developer Portal. Each API key can be scoped to specific endpoints and operations.

## Request Format

### Headers

All API requests should include the following headers:

```
Content-Type: application/json
Accept: application/json
Authorization: Bearer YOUR_ACCESS_TOKEN  // For OAuth
Authorization: ApiKey YOUR_API_KEY       // For API Key
```

### Query Parameters

Common query parameters supported across multiple endpoints:

| Parameter | Type    | Description                                             |
| --------- | ------- | ------------------------------------------------------- |
| `page`    | Integer | Page number for paginated results (starting at 1)       |
| `limit`   | Integer | Number of items per page (default: 25, max: 100)        |
| `sort`    | String  | Field to sort by (prefix with `-` for descending order) |
| `fields`  | String  | Comma-separated list of fields to include in response   |
| `filter`  | String  | Filter expression (field:value)                         |

### Request Body

For POST, PUT, and PATCH requests, the request body should be a valid JSON object.

## Response Format

### Standard Response Structure

All API responses follow a consistent structure:

```json
{
  "data": {}, // The primary resource or collection
  "meta": {}, // Metadata about the request/response
  "links": {}, // Links for pagination and related resources
  "included": [], // Related resources included in the response
  "errors": [] // Error details (if any)
}
```

### Success Responses

Successful responses include the requested data and metadata:

```json
{
  "data": {
    "id": "123",
    "type": "event",
    "attributes": {
      "title": "European YSA Conference",
      "startDate": "2023-07-15T10:00:00Z",
      "endDate": "2023-07-18T18:00:00Z",
      "location": "Paris, France"
    },
    "relationships": {
      "organizer": {
        "data": { "id": "456", "type": "user" }
      }
    }
  },
  "meta": {
    "requestId": "req_12345abcde"
  },
  "links": {
    "self": "https://api.risinggen.eu/v1/events/123"
  },
  "included": [
    {
      "id": "456",
      "type": "user",
      "attributes": {
        "name": "Jane Smith",
        "role": "Event Coordinator"
      }
    }
  ]
}
```

### Error Responses

Error responses include details about what went wrong:

```json
{
  "errors": [
    {
      "status": "401",
      "code": "unauthorized",
      "title": "Authentication Required",
      "detail": "Valid authentication credentials are required to access this resource."
    }
  ],
  "meta": {
    "requestId": "req_12345abcde"
  }
}
```

### HTTP Status Codes

| Code | Description                                                    |
| ---- | -------------------------------------------------------------- |
| 200  | OK - The request was successful                                |
| 201  | Created - A new resource was created                           |
| 204  | No Content - The request was successful but returns no content |
| 400  | Bad Request - The request was invalid or cannot be served      |
| 401  | Unauthorized - Authentication is required or failed            |
| 403  | Forbidden - The authenticated user does not have access        |
| 404  | Not Found - The requested resource does not exist              |
| 422  | Unprocessable Entity - The request was well-formed but invalid |
| 429  | Too Many Requests - Rate limit exceeded                        |
| 500  | Internal Server Error - Something went wrong on the server     |

## Core Resources

### Users

Users represent individuals on the RisingGen platform.

#### User Properties

| Property       | Type   | Description                 |
| -------------- | ------ | --------------------------- |
| `id`           | String | Unique identifier           |
| `firstName`    | String | User's first name           |
| `lastName`     | String | User's last name            |
| `email`        | String | User's email address        |
| `username`     | String | User's username             |
| `profileImage` | String | URL to profile image        |
| `location`     | Object | User's location information |
| `stake`        | String | User's stake                |
| `ward`         | String | User's ward                 |
| `interests`    | Array  | User's interests            |
| `role`         | String | User's role in the system   |
| `createdAt`    | String | ISO 8601 datetime           |
| `updatedAt`    | String | ISO 8601 datetime           |

#### User Endpoints

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| GET    | `/users`                 | List users                           |
| GET    | `/users/:id`             | Get a specific user                  |
| GET    | `/users/me`              | Get the authenticated user           |
| PATCH  | `/users/:id`             | Update a user                        |
| DELETE | `/users/:id`             | Delete a user                        |
| GET    | `/users/:id/connections` | List a user's connections            |
| GET    | `/users/:id/events`      | List events a user is registered for |

### Events

Events represent gatherings organized through the RisingGen platform.

#### Event Properties

| Property               | Type   | Description                       |
| ---------------------- | ------ | --------------------------------- |
| `id`                   | String | Unique identifier                 |
| `title`                | String | Event title                       |
| `description`          | String | Event description                 |
| `startDate`            | String | ISO 8601 datetime                 |
| `endDate`              | String | ISO 8601 datetime                 |
| `timezone`             | String | Event timezone                    |
| `location`             | Object | Location information              |
| `capacity`             | Number | Maximum number of attendees       |
| `registrationCount`    | Number | Current number of registrations   |
| `registrationDeadline` | String | ISO 8601 datetime                 |
| `visibility`           | String | Public, private, or restricted    |
| `status`               | String | Published, draft, or cancelled    |
| `type`                 | String | Conference, service, social, etc. |
| `organizer`            | Object | Organizer information             |
| `createdAt`            | String | ISO 8601 datetime                 |
| `updatedAt`            | String | ISO 8601 datetime                 |

#### Event Endpoints

| Method | Endpoint                            | Description                     |
| ------ | ----------------------------------- | ------------------------------- |
| GET    | `/events`                           | List events                     |
| POST   | `/events`                           | Create a new event              |
| GET    | `/events/:id`                       | Get a specific event            |
| PATCH  | `/events/:id`                       | Update an event                 |
| DELETE | `/events/:id`                       | Delete an event                 |
| GET    | `/events/:id/registrations`         | List registrations for an event |
| POST   | `/events/:id/registrations`         | Register for an event           |
| DELETE | `/events/:id/registrations/:userId` | Cancel a registration           |

### Connections

Connections represent relationships between users on the platform.

#### Connection Properties

| Property      | Type   | Description                          |
| ------------- | ------ | ------------------------------------ |
| `id`          | String | Unique identifier                    |
| `user1Id`     | String | First user in the connection         |
| `user2Id`     | String | Second user in the connection        |
| `status`      | String | Pending, accepted, or declined       |
| `initiatedBy` | String | User ID who initiated the connection |
| `createdAt`   | String | ISO 8601 datetime                    |
| `updatedAt`   | String | ISO 8601 datetime                    |

#### Connection Endpoints

| Method | Endpoint                | Description                             |
| ------ | ----------------------- | --------------------------------------- |
| GET    | `/connections`          | List connections for authenticated user |
| POST   | `/connections`          | Create a new connection request         |
| GET    | `/connections/:id`      | Get a specific connection               |
| PATCH  | `/connections/:id`      | Update a connection (accept/decline)    |
| DELETE | `/connections/:id`      | Remove a connection                     |
| GET    | `/connections/requests` | List pending connection requests        |

### Content

Content represents articles, posts, and media shared on the platform.

#### Content Properties

| Property        | Type   | Description                       |
| --------------- | ------ | --------------------------------- |
| `id`            | String | Unique identifier                 |
| `title`         | String | Content title                     |
| `body`          | String | Content body (may be HTML)        |
| `summary`       | String | Brief summary                     |
| `type`          | String | Article, post, announcement, etc. |
| `author`        | Object | Author information                |
| `tags`          | Array  | Content tags                      |
| `category`      | String | Content category                  |
| `publishedAt`   | String | ISO 8601 datetime                 |
| `featuredImage` | String | URL to featured image             |
| `status`        | String | Published, draft, or archived     |
| `visibility`    | String | Public or restricted              |
| `createdAt`     | String | ISO 8601 datetime                 |
| `updatedAt`     | String | ISO 8601 datetime                 |

#### Content Endpoints

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| GET    | `/content`            | List content items          |
| POST   | `/content`            | Create new content          |
| GET    | `/content/:id`        | Get a specific content item |
| PATCH  | `/content/:id`        | Update content              |
| DELETE | `/content/:id`        | Delete content              |
| GET    | `/content/categories` | List content categories     |
| GET    | `/content/tags`       | List content tags           |

### Service Opportunities

Service opportunities represent ways users can serve within the community.

#### Service Opportunity Properties

| Property            | Type   | Description                       |
| ------------------- | ------ | --------------------------------- |
| `id`                | String | Unique identifier                 |
| `title`             | String | Opportunity title                 |
| `description`       | String | Opportunity description           |
| `startDate`         | String | ISO 8601 datetime                 |
| `endDate`           | String | ISO 8601 datetime                 |
| `location`          | Object | Location information              |
| `organizerId`       | String | User ID of organizer              |
| `capacity`          | Number | Maximum number of participants    |
| `registrationCount` | Number | Current number of registrations   |
| `skills`            | Array  | Skills needed for the opportunity |
| `impact`            | String | Description of expected impact    |
| `status`            | String | Active, completed, or cancelled   |
| `createdAt`         | String | ISO 8601 datetime                 |
| `updatedAt`         | String | ISO 8601 datetime                 |

#### Service Opportunity Endpoints

| Method | Endpoint                            | Description                      |
| ------ | ----------------------------------- | -------------------------------- |
| GET    | `/service`                          | List service opportunities       |
| POST   | `/service`                          | Create a new service opportunity |
| GET    | `/service/:id`                      | Get a specific opportunity       |
| PATCH  | `/service/:id`                      | Update an opportunity            |
| DELETE | `/service/:id`                      | Delete an opportunity            |
| GET    | `/service/:id/participants`         | List participants                |
| POST   | `/service/:id/participants`         | Register as a participant        |
| DELETE | `/service/:id/participants/:userId` | Remove a participant             |

## Advanced Features

### Webhooks

The API supports webhooks to notify your application of events in real-time.

#### Webhook Events

| Event                    | Description                 |
| ------------------------ | --------------------------- |
| `event.created`          | New event created           |
| `event.updated`          | Event details updated       |
| `event.cancelled`        | Event cancelled             |
| `registration.created`   | New event registration      |
| `registration.cancelled` | Registration cancelled      |
| `user.created`           | New user registered         |
| `connection.requested`   | Connection request sent     |
| `connection.accepted`    | Connection request accepted |
| `content.published`      | New content published       |

#### Webhook Setup

Webhooks can be configured in the Developer Portal. Each webhook requires:

- A target URL that will receive the webhook payload
- A list of events to subscribe to
- An optional secret key for payload verification

#### Webhook Payload

```json
{
  "id": "whk_12345abcde",
  "event": "event.created",
  "created": "2023-07-15T15:30:45Z",
  "data": {
    "id": "123",
    "type": "event",
    "attributes": {
      "title": "European YSA Conference",
      "startDate": "2023-07-15T10:00:00Z"
    }
  }
}
```

#### Webhook Security

All webhook payloads include a signature header:

```
X-RisingGen-Signature: t=1626368442,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

To verify the signature:

```javascript
const crypto = require("crypto");

function verifyWebhookSignature(payload, header, secret) {
  const [timestamp, signature] = header.split(",");
  const t = timestamp.split("=")[1];
  const sig = signature.split("=")[1];

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${t}.${payload}`)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(sig),
    Buffer.from(expectedSignature)
  );
}
```

### Batch Operations

The API supports batch operations to perform multiple actions in a single request.

#### Batch Request Format

```json
{
  "operations": [
    {
      "id": "op1",
      "method": "GET",
      "path": "/events/123"
    },
    {
      "id": "op2",
      "method": "POST",
      "path": "/events/123/registrations",
      "body": {
        "userId": "456"
      }
    }
  ]
}
```

#### Batch Response Format

```json
{
  "operations": [
    {
      "id": "op1",
      "status": 200,
      "body": {
        "data": {
          "id": "123",
          "type": "event",
          "attributes": {
            "title": "European YSA Conference"
          }
        }
      }
    },
    {
      "id": "op2",
      "status": 201,
      "body": {
        "data": {
          "id": "789",
          "type": "registration",
          "attributes": {
            "userId": "456",
            "eventId": "123",
            "status": "confirmed"
          }
        }
      }
    }
  ]
}
```

### Filtering, Sorting, and Pagination

#### Filtering

Filtering is supported using the `filter` query parameter:

```
GET /events?filter[status]=published&filter[startDate][gte]=2023-07-01
```

Complex filters can be created using the following operators:

- `eq`: Equal (default if no operator is specified)
- `ne`: Not equal
- `gt`: Greater than
- `gte`: Greater than or equal
- `lt`: Less than
- `lte`: Less than or equal
- `in`: In a list of values
- `nin`: Not in a list of values
- `like`: String pattern match

#### Sorting

Sorting is supported using the `sort` query parameter:

```
GET /events?sort=startDate,-title
```

- Prefix with `-` for descending order
- Multiple sort fields can be comma-separated
- The order of sort fields determines precedence

#### Pagination

Pagination is supported using the `page` and `limit` query parameters:

```
GET /events?page=2&limit=25
```

Pagination metadata is included in the response:

```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "pages": 4,
    "page": 2,
    "limit": 25
  },
  "links": {
    "first": "https://api.risinggen.eu/v1/events?page=1&limit=25",
    "prev": "https://api.risinggen.eu/v1/events?page=1&limit=25",
    "self": "https://api.risinggen.eu/v1/events?page=2&limit=25",
    "next": "https://api.risinggen.eu/v1/events?page=3&limit=25",
    "last": "https://api.risinggen.eu/v1/events?page=4&limit=25"
  }
}
```

### Sparse Fieldsets

To reduce response size, you can specify which fields to include using the `fields` query parameter:

```
GET /events?fields=title,startDate,location
```

For related resources, specify fields by type:

```
GET /events?fields[events]=title,startDate&fields[users]=name,email
```

### Including Related Resources

To include related resources in the response, use the `include` query parameter:

```
GET /events/123?include=organizer,registrations
```

To include nested relationships:

```
GET /events/123?include=organizer,registrations.user
```

## Best Practices

### Rate Limiting

The API implements rate limiting to ensure fair usage and system stability.

Rate limits are specified in the response headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1626368442
```

When rate limits are exceeded, the API returns a `429 Too Many Requests` response.

#### Rate Limit Tiers

| Tier       | Requests per minute | Burst capacity |
| ---------- | ------------------- | -------------- |
| Standard   | 60                  | 100            |
| Premium    | 300                 | 500            |
| Enterprise | 1000                | 1500           |

### Error Handling

Best practices for handling API errors:

1. Always check the HTTP status code first
2. Parse the error response for detailed information
3. Implement exponential backoff for rate limiting (429) errors
4. Log detailed error information for troubleshooting
5. Handle authentication errors (401, 403) by refreshing tokens or re-authenticating
6. Provide user-friendly error messages in your application

### Security Recommendations

1. **Store API Keys Securely**

   - Never expose API keys in client-side code
   - Use environment variables or secure key management
   - Rotate API keys regularly

2. **Implement Proper OAuth Flow**

   - Always use PKCE with OAuth flow
   - Store tokens securely
   - Validate state parameter to prevent CSRF attacks

3. **Limit API Key Scopes**

   - Request only the scopes your application needs
   - Use different API keys for different services

4. **Secure Webhook Endpoints**
   - Always verify webhook signatures
   - Implement IP allowlisting for webhook sources
   - Process webhook payloads asynchronously

### Performance Optimization

1. **Minimize Request Volume**

   - Use sparse fieldsets to reduce response size
   - Batch related requests when possible
   - Implement client-side caching

2. **Optimize Query Parameters**

   - Only request the data you need
   - Use filtering to reduce result sets
   - Implement pagination for large result sets

3. **Handle Asynchronous Operations**
   - Use webhooks for real-time updates
   - Implement polling with exponential backoff when webhooks aren't available

## SDK and Client Libraries

The RisingGen API is supported by official client libraries:

- [JavaScript SDK](https://github.com/risinggen/risinggen-js)
- [Python SDK](https://github.com/risinggen/risinggen-python)
- [PHP SDK](https://github.com/risinggen/risinggen-php)
- [.NET SDK](https://github.com/risinggen/risinggen-dotnet)

### JavaScript SDK Example

```javascript
const RisingGen = require("@risinggen/sdk");

// Initialize the client
const client = new RisingGen.Client({
  apiKey: "YOUR_API_KEY",
});

// Get upcoming events
async function getUpcomingEvents() {
  const events = await client.events.list({
    filter: {
      startDate: { gte: new Date().toISOString() },
      status: "published",
    },
    sort: "startDate",
    limit: 10,
  });

  return events;
}

// Create a new event
async function createEvent(eventData) {
  const event = await client.events.create({
    title: eventData.title,
    description: eventData.description,
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    location: eventData.location,
  });

  return event;
}
```

## Changelog and Versioning

The API follows semantic versioning (MAJOR.MINOR.PATCH):

- MAJOR: Breaking changes
- MINOR: New features, non-breaking
- PATCH: Bug fixes, non-breaking

### Current Versions

| Version | Status     | End of Life |
| ------- | ---------- | ----------- |
| v1      | Current    | -           |
| v0      | Deprecated | 2023-12-31  |

### Breaking Changes

Major version changes include breaking changes such as:

- Removed endpoints
- Changed response formats
- Modified authentication requirements
- Renamed resources or properties

### Migration Guides

When breaking changes are introduced, migration guides are provided to help you update your integrations:

- [v0 to v1 Migration Guide](https://developers.risinggen.eu/docs/migrations/v0-to-v1)

## Support and Resources

### Developer Portal

The [RisingGen Developer Portal](https://developers.risinggen.eu) provides:

- Interactive API documentation
- API key management
- Webhook configuration
- Usage monitoring
- Support resources

### Testing Environment

A sandbox environment is available for testing:

```
https://api-sandbox.risinggen.eu/v1
```

The sandbox environment:

- Uses test data
- Does not affect production data
- Supports all API features
- Has higher rate limits for testing

### Support Channels

- [Developer Forum](https://developers.risinggen.eu/forum)
- [GitHub Issues](https://github.com/risinggen/api/issues)
- Email: api-support@risinggen.eu

### Status Page

The [RisingGen API Status Page](https://status.risinggen.eu) provides:

- Current operational status
- Incident reports
- Scheduled maintenance notifications
- Historical uptime information

## Appendix

### Glossary

| Term         | Definition                                                          |
| ------------ | ------------------------------------------------------------------- |
| API Key      | A secret token used for server-to-server authentication             |
| Bearer Token | An OAuth access token used for user-context authentication          |
| Endpoint     | A specific URL route that accesses a resource or performs an action |
| Rate Limit   | The maximum number of requests allowed in a time period             |
| Webhook      | An HTTP callback triggered by events in the API                     |
| PKCE         | Proof Key for Code Exchange, a security extension for OAuth         |
| JWT          | JSON Web Token, a compact token format used for authentication      |

### Frequently Asked Questions

**Q: How do I handle authentication errors?**

A: If you receive a 401 Unauthorized error, check that your API key or access token is valid and properly included in the request. For expired OAuth tokens, use the refresh token to obtain a new access token.

**Q: What's the difference between API key and OAuth authentication?**

A: API keys are used for server-to-server communication and provide access to endpoints that don't require user context. OAuth is used for operations that need to be performed on behalf of a specific user.

**Q: How can I test the API before going to production?**

A: Use the sandbox environment (api-sandbox.risinggen.eu) for testing. It provides a full simulation of the production API with test data.

**Q: How do I report API bugs or request new features?**

A: Submit issues through the GitHub repository or contact the API support team directly at api-support@risinggen.eu.
