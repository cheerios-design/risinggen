# Database Design

## RisingGen Database Architecture

The RisingGen platform uses a hybrid database approach to efficiently manage different types of data and access patterns. This document outlines the database design and data models used across the platform.

## Database Technology Stack

### Primary Databases

- **MongoDB** (Document DB)

  - User profiles and authentication
  - Content and resources
  - Event feedback and communications
  - Non-transactional data

- **PostgreSQL** (Relational DB)
  - Event registration and management
  - Financial transactions
  - Reporting data
  - Relationship-heavy data

### Supporting Data Stores

- **Redis** (In-memory Cache)

  - Session management
  - Frequent queries caching
  - Real-time data

- **Elasticsearch** (Search Engine)
  - Full-text search capabilities
  - Event discovery
  - Resource searching

## Data Models

### User Domain

#### User Collection (MongoDB)

```json
{
  "_id": "ObjectId",
  "churchId": "123456789",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1998-04-15",
  "gender": "male",
  "contact": {
    "phone": "+44 7700 900123",
    "address": {
      "street": "123 Main St",
      "city": "London",
      "country": "UK",
      "postalCode": "SW1A 1AA"
    }
  },
  "churchUnit": {
    "unitNumber": "123456",
    "wardName": "London Ward",
    "stakeName": "London Stake"
  },
  "preferences": {
    "language": "en",
    "notifications": {
      "email": true,
      "push": true,
      "sms": false
    },
    "privacy": {
      "shareContact": false,
      "shareProfile": true
    }
  },
  "roles": ["participant"],
  "created": "2024-06-01T12:00:00Z",
  "lastLogin": "2024-08-15T14:30:00Z"
}
```

#### Authentication (MongoDB)

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId(ref:users)",
  "authMethod": "church_sso",
  "churchAccountId": "123456789",
  "tokens": {
    "refreshToken": "hashed_refresh_token",
    "refreshTokenExpiry": "2024-09-15T00:00:00Z"
  },
  "failedAttempts": 0,
  "lastFailedAttempt": null,
  "passwordResetToken": null,
  "passwordResetExpiry": null
}
```

### Event Domain

#### Events (PostgreSQL)

```sql
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  venue_id INTEGER REFERENCES venues(id),
  organizer_id VARCHAR(24) NOT NULL, -- MongoDB ObjectId reference
  max_participants INTEGER,
  status VARCHAR(20) DEFAULT 'draft',
  type VARCHAR(50) NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT true,
  cost_amount DECIMAL(10,2),
  cost_currency VARCHAR(3),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_events_dates ON events (start_date, end_date);
CREATE INDEX idx_events_status ON events (status);
```

#### Event Registrations (PostgreSQL)

```sql
CREATE TABLE event_registrations (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  user_id VARCHAR(24) NOT NULL, -- MongoDB ObjectId reference
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending',
  payment_status VARCHAR(20) DEFAULT 'unpaid',
  payment_id INTEGER REFERENCES payments(id),
  dietary_requirements TEXT,
  special_needs TEXT,
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  cancellation_reason TEXT
);

CREATE INDEX idx_registrations_event ON event_registrations (event_id);
CREATE INDEX idx_registrations_user ON event_registrations (user_id);
CREATE INDEX idx_registrations_status ON event_registrations (status);
```

### Communication Domain

#### Messages Collection (MongoDB)

```json
{
  "_id": "ObjectId",
  "channelId": "ObjectId(ref:channels)",
  "sender": {
    "userId": "ObjectId(ref:users)",
    "role": "organizer"
  },
  "messageType": "announcement",
  "content": {
    "text": "Important update about the conference schedule",
    "attachments": [
      {
        "type": "file",
        "url": "https://storage.example.com/files/schedule.pdf",
        "name": "Conference Schedule.pdf"
      }
    ]
  },
  "priority": "high",
  "sentAt": "2024-08-15T10:30:00Z",
  "readBy": [
    {
      "userId": "ObjectId(ref:users)",
      "readAt": "2024-08-15T11:45:00Z"
    }
  ],
  "metadata": {
    "deliveryStatus": "sent",
    "deliveryCount": 156
  }
}
```

### Financial Domain

#### Payments (PostgreSQL)

```sql
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(24) NOT NULL, -- MongoDB ObjectId reference
  event_id INTEGER REFERENCES events(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  status VARCHAR(20) NOT NULL,
  provider_transaction_id VARCHAR(255),
  provider VARCHAR(50) NOT NULL,
  payment_date TIMESTAMP WITH TIME ZONE,
  refund_status VARCHAR(20),
  refund_amount DECIMAL(10,2),
  refund_date TIMESTAMP WITH TIME ZONE,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments (user_id);
CREATE INDEX idx_payments_event ON payments (event_id);
CREATE INDEX idx_payments_status ON payments (status);
```

## Database Relationships

### Cross-Database References

The system uses MongoDB ObjectIds as reference keys in PostgreSQL to maintain relationships between the databases:

- User authentication data in MongoDB links to event registrations in PostgreSQL
- Event data in PostgreSQL references organizer profiles in MongoDB
- Payment records in PostgreSQL link to user profiles in MongoDB

### Consistency Strategy

- **Event Transaction Data**: Processed through PostgreSQL with ACID guarantees
- **User Data Updates**: Processed through MongoDB with eventual consistency
- **Cross-Database Operations**: Two-phase commit patterns for critical operations

## Data Access Patterns

### Common Queries

1. **Event Discovery**:

   - Find upcoming events by location, type, date range
   - Find events with available registration spots

2. **User Activity**:

   - Get user's registered events
   - Get user's payment history
   - Get user's communication preferences

3. **Event Management**:
   - Get event attendee list with registration status
   - Get event financial summary
   - Get event capacity and statistics

### Query Optimization

- **Indexes**: Strategic indexing on frequently queried fields
- **Denormalization**: Controlled redundancy for read-heavy operations
- **Caching**: Multi-level caching strategy for frequent queries

## Data Migration Strategy

### Migration Approaches

- **Schema Updates**: Versioned schema with backward compatibility
- **Data Transformations**: Scheduled batch processes for large migrations
- **Validation**: Pre and post-migration data integrity checks

### Database Evolution

- **MongoDB**: Schema versioning through application-level validation
- **PostgreSQL**: Migration scripts with up/down capabilities
- **Testing**: Comprehensive testing of migration scripts in staging

## Backup and Recovery

### Backup Strategy

- **MongoDB**: Daily snapshots and continuous oplog backups
- **PostgreSQL**: Daily full backups, hourly incremental backups
- **Retention**: 30-day rolling backup retention
- **Storage**: Encrypted offsite backup storage

### Recovery Process

- **Point-in-time Recovery**: Available for both MongoDB and PostgreSQL
- **Testing**: Monthly recovery testing to verify backup integrity
- **Documentation**: Step-by-step recovery procedures

## Performance Considerations

### Scaling Strategy

- **MongoDB**: Horizontal scaling through sharding
- **PostgreSQL**: Read replicas for query distribution
- **Redis**: Cluster mode for distributed caching

### Monitoring

- **Performance Metrics**: Query execution times, index usage
- **Load Analysis**: Regular query pattern analysis
- **Alerting**: Automated alerts for performance degradation

---

This document outlines the database design principles for the RisingGen platform. Implementation details are subject to refinement during development phases.
