# Getting Started with RisingGen Development

## Introduction

Welcome to the RisingGen development team! This guide will help you set up your local development environment and understand the project structure, workflows, and best practices for contributing to the platform.

RisingGen is a ministry-first platform built with modern web technologies, designed to serve Young Single Adult (YSA) communities worldwide with event management, community building, and service coordination tools.

---

## Prerequisites

### Required Software

Before you begin, ensure you have the following installed:

**Node.js & npm**:

- Version: Node.js 20.x LTS or later
- Check version: `node --version` and `npm --version`
- Download: https://nodejs.org/

**Git**:

- Version: 2.34 or later
- Check version: `git --version`
- Download: https://git-scm.com/

**Code Editor**:

- Recommended: Visual Studio Code with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma (for database schema)
  - GitLens (optional but helpful)

**PostgreSQL** (for local development):

- Version: 15.x or later
- Alternative: Use cloud database (Neon, Supabase) for simpler setup
- Download: https://www.postgresql.org/download/

### Recommended Software

**Docker** (optional, for containerized services):

- Download: https://www.docker.com/

**Postman or Thunder Client** (for API testing):

- Postman: https://www.postman.com/
- Thunder Client: VS Code extension

---

## Project Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/risinggen/risinggen-platform.git

# Navigate to the project directory
cd risinggen-platform
```

### 2. Install Dependencies

```bash
# Install all project dependencies
npm install

# This will install:
# - Next.js 14 and React 18
# - Tailwind CSS and dependencies
# - Prisma ORM
# - NextAuth.js
# - Testing libraries
# - Development tools
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/risinggen_dev"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"  # Use: openssl rand -base64 32

# OAuth Providers (for authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Service (Resend, SendGrid, or similar)
EMAIL_SERVER="smtp://user:pass@smtp.example.com:587"
EMAIL_FROM="noreply@risinggen.org"

# S3-Compatible Storage (for file uploads)
S3_ENDPOINT="https://s3.amazonaws.com"
S3_BUCKET="risinggen-dev"
S3_ACCESS_KEY_ID="your-access-key"
S3_SECRET_ACCESS_KEY="your-secret-key"

# Stripe (for payments)
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Optional: Feature Flags
ENABLE_COMMUNITY_FEATURES="true"
ENABLE_SERVICE_PROJECTS="true"
```

### 4. Database Setup

**Option A: Local PostgreSQL**

```bash
# Create the database
createdb risinggen_dev

# Run migrations to set up schema
npx prisma migrate dev

# Seed the database with initial data
npm run db:seed
```

**Option B: Cloud Database (Neon/Supabase)**

1. Create account at Neon (https://neon.tech) or Supabase (https://supabase.com)
2. Create a new project
3. Copy the connection string to `DATABASE_URL` in `.env.local`
4. Run migrations:

```bash
npx prisma migrate deploy
npm run db:seed
```

### 5. Start Development Server

```bash
# Start the Next.js development server
npm run dev
```

Visit `http://localhost:3000` in your browser. You should see the RisingGen homepage.

### 6. Verify Installation

Run the test suite to ensure everything is working:

```bash
# Run all tests
npm test

# Run tests in watch mode (recommended during development)
npm run test:watch

# Run end-to-end tests (requires dev server running)
npm run test:e2e
```

---

## Project Structure

```
risinggen-platform/
├── app/                        # Next.js 14 App Router
│   ├── (auth)/                 # Authentication pages (login, signup)
│   ├── (dashboard)/            # Protected dashboard routes
│   ├── events/                 # Public event pages
│   │   ├── page.tsx            # Events listing
│   │   ├── [eventId]/          # Individual event pages
│   │   └── create/             # Event creation (protected)
│   ├── community/              # Community platform features
│   ├── impact/                 # Service project features
│   ├── api/                    # API routes
│   │   ├── auth/               # NextAuth.js API routes
│   │   ├── events/             # Event API endpoints
│   │   └── registrations/      # Registration API endpoints
│   ├── layout.tsx              # Root layout (shared across all pages)
│   ├── page.tsx                # Homepage
│   └── globals.css             # Global styles (Tailwind imports)
│
├── components/                 # Reusable React components
│   ├── layout/                 # Layout components (NavBar, Footer)
│   ├── events/                 # Event-related components
│   ├── forms/                  # Form components and inputs
│   ├── common/                 # Shared components (Button, Card, Badge)
│   └── ui/                     # Base UI primitives (Radix UI wrappers)
│
├── lib/                        # Utility functions and configurations
│   ├── db.ts                   # Prisma client instance
│   ├── auth.ts                 # NextAuth.js configuration
│   ├── email.ts                # Email sending utilities
│   ├── storage.ts              # S3 file upload utilities
│   └── utils.ts                # General utility functions
│
├── prisma/                     # Database schema and migrations
│   ├── schema.prisma           # Prisma schema definition
│   ├── migrations/             # Database migration history
│   └── seed.ts                 # Database seeding script
│
├── public/                     # Static assets
│   ├── images/                 # Images, logos
│   ├── icons/                  # SVG icons
│   └── fonts/                  # Custom fonts (if any)
│
├── tests/                      # Test files
│   ├── unit/                   # Unit tests
│   ├── integration/            # Integration tests
│   └── e2e/                    # End-to-end tests (Playwright)
│
├── docs/                       # Documentation
│   ├── architecture/           # Architecture documentation
│   ├── design/                 # Design system and guidelines
│   └── development/            # Development guides
│
├── .env.example                # Example environment variables
├── .env.local                  # Local environment variables (git-ignored)
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project overview
```

---

## Development Workflow

### Branch Strategy

We use trunk-based development with short-lived feature branches:

```bash
# Always start from main
git checkout main
git pull origin main

# Create a feature branch
git checkout -b feature/event-calendar-view

# Make your changes, commit frequently
git add .
git commit -m "feat: add calendar view for events"

# Push and create pull request
git push -u origin feature/event-calendar-view
```

**Branch Naming Conventions**:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

### Commit Message Format

We follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:

```
feat(events): add recurring event support

Implement recurring event functionality with daily, weekly, and monthly patterns.
Includes UI for configuring recurrence rules and backend logic for generating instances.

Closes #123
```

```
fix(registration): resolve duplicate registration bug

Prevent users from registering multiple times for the same event by adding unique constraint.

Fixes #456
```

### Code Formatting

We use Prettier for automatic code formatting:

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check
```

**Tip**: Enable "Format on Save" in VS Code:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### Linting

We use ESLint for code quality:

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Type Checking

Run TypeScript type checking:

```bash
# Check types across the project
npm run type-check
```

**Tip**: Enable TypeScript checking in VS Code for real-time feedback.

---

## Working with the Database

### Prisma Overview

RisingGen uses Prisma ORM for database access. Key commands:

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a new migration (after modifying schema.prisma)
npx prisma migrate dev --name add_event_capacity

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

### Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Create migration: `npx prisma migrate dev --name descriptive_name`
3. Prisma Client is automatically regenerated

**Example: Adding a field**

```prisma
model Event {
  id        String   @id @default(cuid())
  title     String
  capacity  Int      @default(100)  // New field added
  // ... other fields
}
```

### Querying the Database

```typescript
import { prisma } from "@/lib/db";

// Find many events
const events = await prisma.event.findMany({
  where: { status: "published" },
  include: { organizer: true },
  orderBy: { startDate: "asc" },
});

// Create an event
const event = await prisma.event.create({
  data: {
    title: "Paris YSA Devotional",
    description: "Join us for spiritual learning",
    type: "devotional",
    organizerId: userId,
  },
});

// Update an event
await prisma.event.update({
  where: { id: eventId },
  data: { capacity: 150 },
});
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
```

### Writing Unit Tests

We use Jest and React Testing Library:

```typescript
// components/events/EventCard.test.tsx
import { render, screen } from "@testing-library/react";
import EventCard from "./EventCard";

describe("EventCard", () => {
  it("renders event title and date", () => {
    const event = {
      id: "1",
      title: "Test Event",
      startDate: new Date("2025-02-15"),
      location: { city: "Paris" },
    };

    render(<EventCard event={event} />);

    expect(screen.getByText("Test Event")).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });
});
```

### Writing Integration Tests

Test API routes and database interactions:

```typescript
// tests/integration/events.test.ts
import { POST } from "@/app/api/events/route";

describe("POST /api/events", () => {
  it("creates a new event", async () => {
    const request = new Request("http://localhost:3000/api/events", {
      method: "POST",
      body: JSON.stringify({
        title: "New Event",
        type: "devotional",
        startDate: "2025-03-01T18:00:00Z",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.title).toBe("New Event");
  });
});
```

---

## Common Tasks

### Creating a New Page

1. Create file in `app/` directory:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="container-safe py-10">
      <h1 className="text-3xl font-bold">About RisingGen</h1>
      <p className="mt-4 text-gray-600">Platform description...</p>
    </div>
  );
}
```

2. Page is automatically routed to `/about`

### Creating a New Component

1. Create file in `components/` directory:

```tsx
// components/events/EventBadge.tsx
interface EventBadgeProps {
  type: string;
}

export default function EventBadge({ type }: EventBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-700">
      {type}
    </span>
  );
}
```

2. Import and use in other components:

```tsx
import EventBadge from "@/components/events/EventBadge";

<EventBadge type="devotional" />;
```

### Creating an API Endpoint

1. Create route handler in `app/api/`:

```typescript
// app/api/events/[eventId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  const event = await prisma.event.findUnique({
    where: { id: params.eventId },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}
```

2. Access at `/api/events/{eventId}`

### Adding a New Database Model

1. Edit `prisma/schema.prisma`:

```prisma
model Announcement {
  id        String   @id @default(cuid())
  title     String
  content   String
  eventId   String
  event     Event    @relation(fields: [eventId], references: [id])
  createdAt DateTime @default(now())

  @@index([eventId])
}
```

2. Create migration:

```bash
npx prisma migrate dev --name add_announcements
```

3. Use in code:

```typescript
const announcement = await prisma.announcement.create({
  data: {
    title: "Important Update",
    content: "Event time has changed",
    eventId: "evt_123",
  },
});
```

---

## Debugging

### Next.js Dev Tools

- **Server Errors**: Check terminal where `npm run dev` is running
- **Client Errors**: Check browser console (F12)
- **Network Requests**: Browser DevTools > Network tab

### VS Code Debugging

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node-terminal",
      "request": "launch",
      "command": "npm run dev"
    },
    {
      "name": "Next.js: debug client-side",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000"
    }
  ]
}
```

### Common Issues

**Issue**: `Module not found` errors  
**Solution**: Run `npm install` to ensure all dependencies are installed

**Issue**: Database connection errors  
**Solution**: Check `DATABASE_URL` in `.env.local` and ensure PostgreSQL is running

**Issue**: Type errors after schema changes  
**Solution**: Run `npx prisma generate` to regenerate Prisma Client

**Issue**: Stale cache or build artifacts  
**Solution**: Delete `.next` folder and restart dev server

```bash
rm -rf .next
npm run dev
```

---

## Useful Resources

### Documentation

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Prisma**: https://www.prisma.io/docs
- **NextAuth.js**: https://next-auth.js.org/

### RisingGen Internal Docs

- **Architecture Overview**: `docs/architecture/system-overview-v2.md`
- **Design System**: `docs/design/design-system-v2.md`
- **API Specification**: `docs/architecture/api-specification-v2.md`
- **Brand Guidelines**: `docs/design/brand-guidelines.md`

### Community

- **Team Slack**: [internal link]
- **Issue Tracker**: GitHub Issues
- **Design Prototypes**: Figma [link]

---

## Getting Help

If you encounter issues or have questions:

1. **Check Documentation**: Review this guide and related docs in `/docs`
2. **Search Issues**: Look for similar issues on GitHub
3. **Ask the Team**: Post in team Slack channel
4. **Create Issue**: If it's a bug, create a GitHub issue with reproduction steps

---

## Next Steps

Now that your environment is set up:

1. **Explore the Codebase**: Browse through key files to understand structure
2. **Review Open Issues**: Check GitHub issues tagged `good first issue`
3. **Read Architecture Docs**: Understand the four-pillar system design
4. **Make a Small Change**: Try fixing a typo or adding a small feature
5. **Submit Your First PR**: Get feedback and iterate

Welcome to the team! 🎉

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-15  
**Status**: Living Document  
**Owner**: RisingGen Engineering Team
