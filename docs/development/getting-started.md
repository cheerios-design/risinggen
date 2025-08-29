# Development Setup Guide

## Prerequisites

Before setting up the RisingGen development environment, ensure you have:

- **Node.js** 18+ and npm/yarn
- **MongoDB** 5.0+
- **PostgreSQL** 14+
- **Git** with SSH keys configured
- **VS Code** (recommended) with extensions

## Environment Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone git@github.com:risinggen/risinggen.git
cd risinggen

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 2. Database Configuration

```bash
# MongoDB setup (user data)
mongodb://localhost:27017/risinggen-dev

# PostgreSQL setup (events data)  
postgresql://localhost:5432/risinggen_events
```

### 3. Development Servers

```bash
# Start all development services
npm run dev:all

# Or start individually
npm run dev:backend    # API server on :3001
npm run dev:frontend   # React app on :3000
npm run dev:db         # Database services
```

## Branch Workflow

### Development Branches

- **`main`** - Production-ready stable releases
- **`sam-dev`** - Lead development and integration
- **`stephano-dev`** - Frontend features and UI/UX
- **`andreas-dev`** - Backend services and API development
- **`test-extras`** - Experimental features and testing

### Workflow Process

1. **Create feature branch** from your assigned dev branch
2. **Implement feature** with comprehensive tests
3. **Create pull request** to your dev branch
4. **Code review** by team members
5. **Merge to main** after approval and testing

## Testing

```bash
# Run all tests
npm run test

# Specific test types
npm run test:unit      # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:coverage  # Coverage report
```

## Code Quality

```bash
# Linting
npm run lint           # ESLint check
npm run lint:fix       # Auto-fix issues

# Formatting
npm run format         # Prettier formatting
npm run format:check   # Format validation
```

## Documentation

- Keep documentation updated with changes
- Follow JSDoc standards for code comments
- Update README files for new features

---

*For detailed setup issues, check the troubleshooting guide or contact @sam-dev*
