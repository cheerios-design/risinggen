# Component Library Documentation

## Overview

This document provides comprehensive documentation for all components in the RisingGen frontend application. Each component is built with React 18, TypeScript, and Tailwind CSS.

## Design Principles

- **Accessibility First**: All components follow WCAG 2.1 AA guidelines
- **Type Safety**: Full TypeScript support with proper interfaces
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Performance**: Optimized with React best practices
- **Consistency**: Unified design language and interaction patterns

## Layout Components

### Navbar

**File:** `src/components/Navbar.tsx`

**Purpose:** Primary site navigation with responsive design and scroll effects.

**Features:**

- Scroll-based background transitions (transparent → solid)
- Mobile hamburger menu with smooth animations
- Active link highlighting based on current route
- Brand logo with home navigation
- Responsive breakpoints for mobile/desktop views

**Props:** None (uses React Router hooks internally)

**State:**

- `isMobileMenuOpen: boolean` - Controls mobile menu visibility
- `isScrolled: boolean` - Tracks scroll position for background effects

**Dependencies:**

- React Router (`useLocation` for active links)
- Framer Motion for animations
- Heroicons for menu icons
- Custom scroll event handling

**Usage:**

```tsx
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      {/* Main content */}
    </div>
  );
}
```

### Footer

**File:** `src/components/Footer.tsx`

**Purpose:** Site footer with organized navigation links and brand information.

**Features:**

- Organized link sections (Platform, Community, Resources, Legal)
- Brand logo and mission statement
- Responsive grid layout
- Internal routing with React Router Links
- Newsletter signup placeholder

**Props:** None

**Usage:**

```tsx
import { Footer } from "./components/Footer";

function App() {
  return (
    <div>
      {/* Main content */}
      <Footer />
    </div>
  );
}
```

## Home Page Components

### HeroSection

**File:** `src/components/home/HeroSection.tsx`

**Purpose:** Landing page hero with animated content and CTAs.

**Features:**

- Staggered text animations on page load
- Dual call-to-action buttons with hover effects
- Scroll indicator with smooth scrolling behavior
- Background gradient with animated geometric shapes
- Responsive typography scaling

**Animation Timeline:**

1. Hero title fades in from bottom (0.2s delay)
2. Subtitle follows (0.4s delay)
3. CTA buttons appear (0.6s delay)
4. Background shapes begin floating animation

**Props:** None

**Key Animations:**

```tsx
// Main content container
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>

// CTA buttons with hover effects
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
```

### FourPillarsSection

**File:** `src/components/home/FourPillarsSection.tsx`

**Purpose:** Showcases the four main platform pillars with interactive cards.

**Features:**

- Grid layout with pillar cards
- Hover animations and transformations
- Individual feature lists with icons
- Scroll-triggered animations using `useInView`
- Navigation to dedicated pages

**Pillar Data:**

1. **Unified Event Hub**

   - Features: Event discovery, RSVP management, calendar integration
   - Route: `/events`
   - Color: Primary purple gradient

2. **RisingGen Community**

   - Features: Member connections, discussion forums, mentorship
   - Route: `/community`
   - Color: Blue accent gradient

3. **Engagement Channel**

   - Features: Content library, newsletters, feedback
   - Route: `/content`
   - Color: Teal accent gradient

4. **Impact Platform**
   - Features: Service projects, testimony sharing, goal tracking
   - Route: `/service`
   - Color: Green accent gradient

**Props:** None

**Animation Pattern:**

```tsx
const { ref, inView } = useInView({ once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
```

### FeaturedEventsSection

**File:** `src/components/home/FeaturedEventsSection.tsx`

**Purpose:** Displays upcoming events to drive engagement.

**Features:**

- Event card grid with mock data
- Event details (title, date, location, attendees)
- Individual RSVP buttons
- "View All Events" navigation
- Progressive loading animations

**Mock Data Structure:**

```tsx
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
}
```

**Example Events:**

- Munich Young Adult Conference (Sep 15, 2024)
- London Service Project (Sep 22, 2024)
- Amsterdam Community Gathering (Sep 29, 2024)

### CommunityStatsSection

**File:** `src/components/home/CommunityStatsSection.tsx`

**Purpose:** Displays community growth and engagement metrics.

**Features:**

- Animated counter effects on scroll
- Statistical highlights and achievements
- Progress indicators for goals
- European community focus

**Statistics Displayed:**

- **2,500+** Active Members
- **150+** Cities Represented
- **500+** Monthly Events
- **12** Countries Connected

**Animation Effects:**

- Numbers count up from 0 when section comes into view
- Progress bars animate to their final values
- Staggered appearance for visual impact

### TestimonialsSection

**File:** `src/components/home/TestimonialsSection.tsx`

**Purpose:** User testimonials to build trust and community.

**Features:**

- Rotating testimonial cards
- User profiles with photos and locations
- Authentic European young adult voices
- Smooth transition animations

**Testimonial Structure:**

```tsx
interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  role: string;
}
```

### CallToActionSection

**File:** `src/components/home/CallToActionSection.tsx`

**Purpose:** Final conversion opportunity before footer.

**Features:**

- Compelling headline and value proposition
- Dual CTA approach (primary + secondary actions)
- Background gradient matching hero section
- Strategic placement for maximum impact

**CTA Actions:**

- **Primary**: "Join Our Community" → `/community`
- **Secondary**: "Learn More" → `/about`

## Page Components

### HomePage

**File:** `src/pages/HomePage.tsx`

**Purpose:** Orchestrates all home page sections with smooth flow.

**Structure:**

```tsx
export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FourPillarsSection />
      <FeaturedEventsSection />
      <CommunityStatsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
}
```

**Features:**

- Page-level animation coordination
- Scroll behavior management
- Section spacing and flow
- SEO optimization ready

### AboutPage

**File:** `src/pages/AboutPage.tsx`

**Purpose:** Comprehensive information about RisingGen mission and vision.

**Sections:**

1. **Hero Section**: Mission statement and overview
2. **Vision Section**: Our goals for European YSA community
3. **Four Pillars Preview**: Brief overview linking to main pillars
4. **Video Section**: Placeholder for introduction video
5. **Story Section**: Origin and development of platform
6. **Values Section**: Core principles and beliefs
7. **Call to Action**: Multiple engagement opportunities

**Key Features:**

- Scroll-based animations throughout
- Multiple conversion opportunities
- Storytelling approach to build connection
- Video integration ready

### ContactPage

**File:** `src/pages/ContactPage.tsx`

**Purpose:** Contact information, support, and communication channels.

**Sections:**

1. **Contact Methods**: Email, phone, social media
2. **Interactive Form**: Contact form with validation ready
3. **FAQ Section**: Common questions and answers
4. **Office Information**: European office locations
5. **Support Channels**: Different ways to get help

**Form Fields:**

- Name (required)
- Email (required, validation ready)
- Subject (required)
- Message (required, min length)
- Category (dropdown selection)

**Contact Methods:**

- **General**: <info@risinggen.eu>
- **Events**: <events@risinggen.eu>
- **Support**: <support@risinggen.eu>
- **Phone**: +41 XX XXX XX XX (Switzerland)

### Placeholder Pages

#### EventsPage

**File:** `src/pages/EventsPage.tsx`

**Current Status:** Basic layout with placeholder content

**Planned Features:**

- Event calendar view
- Event search and filtering
- RSVP management
- Event creation (for organizers)
- Map integration for locations

#### CommunityPage

**File:** `src/pages/CommunityPage.tsx`

**Current Status:** Basic layout with placeholder content

**Planned Features:**

- Member directory
- Discussion forums
- Private messaging
- Groups and communities
- Mentorship matching

#### ContentPage

**File:** `src/pages/ContentPage.tsx`

**Current Status:** Basic layout with placeholder content

**Planned Features:**

- Content library
- Newsletter archive
- Video resources
- Downloadable materials
- Content filtering and search

#### ServicePage

**File:** `src/pages/ServicePage.tsx`

**Current Status:** Basic layout with placeholder content

**Planned Features:**

- Service project listings
- Volunteer sign-ups
- Impact tracking
- Testimony sharing
- Service hour logging

## Shared Interfaces

### Common Types

```tsx
// Event interface used across components
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  description?: string;
  organizer?: string;
}

// Testimonial interface
interface Testimonial {
  id: number;
  name: string;
  location: string;
  image: string;
  quote: string;
  role: string;
}

// Navigation link interface
interface NavLink {
  name: string;
  href: string;
  current: boolean;
}
```

## Animation Utilities

### Framer Motion Patterns

**Standard Enter Animation:**

```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};
```

**Staggered Children:**

```tsx
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
```

**Scroll-triggered Animation:**

```tsx
const { ref, inView } = useInView({ once: true });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 30 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
```

## Styling Conventions

### CSS Class Patterns

**Container Classes:**

- `container mx-auto px-6` - Standard content container
- `max-w-7xl mx-auto` - Wide content areas
- `max-w-4xl mx-auto` - Narrow content areas

**Responsive Grid:**

- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- `flex flex-col md:flex-row items-center gap-8`

**Button Styles:**

- Primary: `bg-primary-500 hover:bg-primary-600 text-white`
- Secondary: `border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white`

**Animation Classes:**

- `transform transition-all duration-300`
- `hover:scale-105 hover:shadow-glow`

## Testing Guidelines

### Component Testing

Each component should be tested for:

1. **Rendering**: Component renders without crashing
2. **Props**: All props are handled correctly
3. **Interactions**: Click handlers and user interactions work
4. **Accessibility**: Keyboard navigation and screen readers
5. **Responsive**: Mobile and desktop layouts

### Example Test Structure

```tsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
  });
});
```

## Future Enhancements

### Planned Component Additions

1. **Loading Components**: Skeleton screens and spinners
2. **Modal Components**: Reusable modal system
3. **Form Components**: Input, select, textarea components
4. **Data Components**: Tables, lists, pagination
5. **Media Components**: Image galleries, video players

### Architecture Improvements

1. **Component Composition**: More flexible component APIs
2. **Theme System**: Centralized design tokens
3. **State Management**: Context providers for shared state
4. **Error Boundaries**: Component-level error handling
5. **Performance**: Lazy loading and code splitting

---

_Last updated: September 2, 2025_
_Status: Frontend Implementation Complete_
_Next: Backend Integration and Dynamic Data_
