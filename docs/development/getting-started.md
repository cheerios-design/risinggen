# Development Setup Guide

## Prerequisites

Before setting up the RisingGen development environment, ensure you have:

- **Node.js** 18+ and npm
- **Git** with SSH keys configured
- **VS Code** (recommended) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - TypeScript Importer
  - Tailwind CSS IntelliSense
  - Auto Rename Tag
  - Prettier - Code formatter

## Current Tech Stack

### Frontend (✅ Complete)

- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework with custom RisingGen theme
- **Framer Motion** - Professional animations and transitions
- **React Router DOM** - Client-side routing
- **Heroicons** - Beautiful SVG icons
- **ESLint** - Code linting and quality

### Backend (🚧 In Development)

- **Node.js + Express** (planned)
- **MongoDB/PostgreSQL** (planned)
- **JWT Authentication** (planned)

## Environment Setup

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/cheerios-design/risinggen.git
cd risinggen

# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. Development Server

```bash
# Start frontend development server
npm run dev              # Runs on http://localhost:3000

# Other available commands
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm run lint:fix        # Auto-fix ESLint issues
npm run type-check      # TypeScript checking
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx      # Navigation with scroll effects
│   │   ├── Footer.tsx      # Site footer with links
│   │   └── home/           # Home page specific components
│   │       ├── HeroSection.tsx
│   │       ├── FourPillarsSection.tsx
│   │       ├── FeaturedEventsSection.tsx
│   │       ├── CommunityStatsSection.tsx
│   │       ├── TestimonialsSection.tsx
│   │       └── CallToActionSection.tsx
│   ├── pages/              # Route components
│   │   ├── HomePage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── CommunityPage.tsx
│   │   ├── ContentPage.tsx
│   │   ├── ServicePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── assets/             # Static assets
│   │   └── logos/          # RisingGen brand assets
│   ├── styles/             # Global styles
│   │   └── globals.css     # Tailwind imports and custom styles
│   ├── App.tsx             # Main app component with routing
│   └── main.tsx            # Application entry point
├── public/                 # Static public files
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Current Features Implemented

### ✅ Navigation System

- Responsive navbar with scroll effects
- Mobile hamburger menu
- Logo integration with proper routing
- Active link highlighting

### ✅ Home Page Components

- **Hero Section**: Animated landing with CTA buttons
- **Four Pillars Section**: Interactive showcase of Events, Community, Content, Service
- **Featured Events**: Preview of upcoming events
- **Community Stats**: Engagement metrics display
- **Testimonials**: User testimonials carousel
- **Call to Action**: Final conversion section

### ✅ Additional Pages

- **About Page**: Mission, vision, and story
- **Contact Page**: Contact form and information
- **Events, Community, Content, Service Pages**: Placeholder pages ready for content

### ✅ Styling & Animation

- Custom RisingGen purple theme (`#3d1c66`)
- Smooth scroll animations
- Hover effects and micro-interactions
- Responsive design for all screen sizes
- Glassmorphism effects and gradients

## Branch Workflow

### Development Branches

- **`main`** - Production-ready stable releases ✅
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
# Run all tests (when implemented)
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

# TypeScript checking
npm run type-check     # Verify TypeScript compilation
```

## Documentation

- Keep documentation updated with changes
- Follow JSDoc standards for code comments
- Update README files for new features
- Component documentation in Storybook (planned)

## Next Development Steps

### Backend Development (Priority 1)

1. **API Architecture**: Design RESTful API structure
2. **Database Design**: User, events, community data models
3. **Authentication**: JWT-based auth system
4. **Integration**: Connect frontend to backend APIs

### Frontend Enhancements (Priority 2)

1. **Dynamic Content**: Replace mock data with API calls
2. **User Authentication UI**: Login/signup forms
3. **Event Management**: Create, edit, join events
4. **User Profiles**: Personal dashboards and settings

---

For detailed setup issues or questions, contact the development team.
