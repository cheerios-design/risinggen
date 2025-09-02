# Frontend Architecture Documentation

## Overview

The RisingGen frontend is built using modern React architecture with TypeScript, providing a robust and maintainable codebase for the European YSA community platform.

## Tech Stack

### Core Technologies

- **React 18**: Latest React with concurrent features and hooks
- **TypeScript**: Type safety and enhanced developer experience
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Framer Motion**: Professional animations and smooth transitions
- **React Router DOM**: Client-side routing and navigation

### Supporting Libraries

- **Heroicons**: SVG icon library for consistent iconography
- **Headless UI**: Unstyled, accessible UI components
- **clsx**: Utility for constructing className strings
- **date-fns**: Modern JavaScript date utility library
- **Lucide React**: Additional icon set

## Project Structure

```text
frontend/src/
├── components/              # Reusable UI components
│   ├── Navbar.tsx          # Site navigation with scroll effects
│   ├── Footer.tsx          # Site footer with organized links
│   └── home/               # Home page specific components
│       ├── HeroSection.tsx
│       ├── FourPillarsSection.tsx
│       ├── FeaturedEventsSection.tsx
│       ├── CommunityStatsSection.tsx
│       ├── TestimonialsSection.tsx
│       └── CallToActionSection.tsx
├── pages/                   # Route-level page components
│   ├── HomePage.tsx
│   ├── EventsPage.tsx
│   ├── CommunityPage.tsx
│   ├── ContentPage.tsx
│   ├── ServicePage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── assets/                  # Static assets and media
│   └── logos/              # RisingGen brand assets (SVG format)
├── styles/                  # Global styles and Tailwind config
│   └── globals.css         # CSS imports and custom utilities
├── App.tsx                 # Root component with routing setup
└── main.tsx               # Application entry point
```

## Component Architecture

### Layout Components

#### Navbar (`components/Navbar.tsx`)

**Features:**

- Responsive navigation with mobile hamburger menu
- Scroll-based background transitions
- Active link highlighting
- Brand logo with routing
- Smooth animations with Framer Motion

**State Management:**

- `useState` for mobile menu toggle
- `useEffect` for scroll event handling
- `useLocation` for active link detection

#### Footer (`components/Footer.tsx`)

**Features:**

- Organized link sections
- Brand integration
- Responsive grid layout
- Proper internal routing

### Home Page Components

#### HeroSection (`components/home/HeroSection.tsx`)

**Features:**

- Animated hero content with staggered animations
- Call-to-action buttons with hover effects
- Scroll indicator with smooth scrolling
- Background geometric animations
- Responsive text scaling

#### FourPillarsSection (`components/home/FourPillarsSection.tsx`)

**Features:**

- Interactive pillar showcases
- Hover animations and transformations
- Feature lists with icons
- Individual CTA buttons for each pillar
- Scroll-triggered animations with `useInView`

#### FeaturedEventsSection (`components/home/FeaturedEventsSection.tsx`)

**Features:**

- Event card grid layout
- Mock event data with realistic content
- Individual event CTAs
- "View All Events" navigation button
- Progressive loading animations

#### CommunityStatsSection (`components/home/CommunityStatsSection.tsx`)

**Features:**

- Statistical displays with animated counters
- Progress indicators
- Achievement showcases
- European country representation

#### TestimonialsSection (`components/home/TestimonialsSection.tsx`)

**Features:**

- User testimonial cards
- Profile information and quotes
- Rotating testimonial display
- Authentic European community voices

#### CallToActionSection (`components/home/CallToActionSection.tsx`)

**Features:**

- Final conversion opportunity
- Dual CTA buttons (Join/Learn More)
- Compelling copy and value proposition
- Strategic placement for maximum impact

### Page Components

#### HomePage (`pages/HomePage.tsx`)

**Structure:**

- Orchestrates all home page sections
- Manages page-level animations
- Handles section flow and transitions

#### AboutPage (`pages/AboutPage.tsx`)

**Features:**

- Mission and vision statements
- Four pillars overview
- Video section (prepared for future content)
- Team and story information
- Multiple call-to-action opportunities

#### ContactPage (`pages/ContactPage.tsx`)

**Features:**

- Contact information and methods
- Interactive contact form
- FAQ section
- Office locations and details
- Support channels

#### Other Pages

- **EventsPage**: Placeholder for event listings and management
- **CommunityPage**: Community features and member interactions
- **ContentPage**: Content library and resources
- **ServicePage**: Service opportunities and project coordination

## Styling Architecture

### Tailwind CSS Configuration

Custom configuration in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f4f1ff',
        500: '#3d1c66',  // Main brand purple
        600: '#2D4B9A',  // Darker variant
        700: '#1A2A56',  // Darkest variant
      }
    },
    backgroundImage: {
      'hero-gradient': 'linear-gradient(135deg, #3d1c66 0%, #2D4B9A 50%, #1A2A56 100%)',
    },
    boxShadow: {
      'glow': '0 0 20px rgba(61, 28, 102, 0.3)',
      'glow-lg': '0 0 30px rgba(61, 28, 102, 0.4)',
    },
    animation: {
      'float': 'float 6s ease-in-out infinite',
    }
  }
}
```

### Design Tokens

#### Colors

- **Primary Purple (`#3d1c66`)**: Main brand color, buttons, highlights
- **Primary Blue (`#2D4B9A`)**: Gradient transitions, hover states
- **Primary Dark (`#1A2A56`)**: Text, deep backgrounds
- **White**: Backgrounds, contrast text
- **Glass effects**: `bg-white/10`, `bg-white/20` for backdrop blur

#### Typography

- **Font Family**: Inter (system fallbacks)
- **Scale**: Tailwind's default scale with custom responsive breakpoints
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

#### Spacing & Layout

- **Container**: Responsive max-widths with horizontal padding
- **Grid**: CSS Grid and Flexbox for layouts
- **Spacing**: Tailwind's spacing scale (4, 6, 8, 12, 16, 20, etc.)

## Animation Strategy

### Framer Motion Implementation

#### Page Transitions

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
```

#### Scroll Animations

```tsx
const { ref, isInView } = useInView({ once: true });

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
```

#### Interactive Elements

- **Hover Effects**: `whileHover={{ scale: 1.05 }}`
- **Click Effects**: `whileTap={{ scale: 0.95 }}`
- **Staggered Children**: Sequential animation delays

### Performance Considerations

- **Reduced Motion**: Respects user accessibility preferences
- **Once-only Animations**: Scroll animations trigger once for performance
- **Hardware Acceleration**: Transform-based animations for smooth 60fps

## Routing Architecture

### React Router Setup

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/events" element={<EventsPage />} />
    <Route path="/community" element={<CommunityPage />} />
    <Route path="/content" element={<ContentPage />} />
    <Route path="/service" element={<ServicePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/contact" element={<ContactPage />} />
  </Routes>
</BrowserRouter>
```

### Navigation Strategy

- **Internal Links**: `<Link to="/path">` for SPA navigation
- **Active States**: `useLocation` hook for current route detection
- **Scroll Behavior**: Smooth scrolling with `behavior: 'smooth'`
- **Mobile Navigation**: Collapsible menu with route change handling

## State Management

### Current Approach

- **Local State**: `useState` for component-specific state
- **Side Effects**: `useEffect` for subscriptions and cleanup
- **Router State**: `useLocation` and `useNavigate` for routing
- **Animation State**: Framer Motion's built-in state management

### Future Considerations

- **Context API**: For shared application state
- **React Query**: For server state management (when backend is ready)
- **Zustand/Redux**: For complex client state (if needed)

## Performance Optimizations

### Build Optimizations

- **Vite**: Fast HMR and optimized production builds
- **Code Splitting**: Dynamic imports for route-based splitting
- **Tree Shaking**: Automatic dead code elimination
- **Asset Optimization**: SVG optimization and image compression

### Runtime Optimizations

- **React.memo**: For expensive component re-renders (when needed)
- **useMemo/useCallback**: For expensive calculations (when needed)
- **Lazy Loading**: `React.lazy()` for route components (planned)
- **Image Optimization**: Progressive loading and WebP support (planned)

## Accessibility

### Implementation

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Visible focus indicators

### Testing

- **Automated Testing**: ESLint accessibility plugin
- **Manual Testing**: Keyboard and screen reader testing
- **Lighthouse Audits**: Performance and accessibility scores

## Future Enhancements

### Planned Features

1. **Component Library**: Storybook implementation
2. **Design Tokens**: Centralized design system
3. **Internationalization**: i18n support for European languages
4. **PWA Features**: Service worker and offline support
5. **Performance Monitoring**: Real-time performance tracking

### Backend Integration

1. **API Layer**: Axios or Fetch API for HTTP requests
2. **Authentication**: JWT token management
3. **Real-time Features**: WebSocket integration
4. **Error Handling**: Global error boundaries
5. **Loading States**: Skeleton screens and spinners

---

_Last updated: September 2, 2025_
_Status: Frontend Complete, Backend Integration Pending_
