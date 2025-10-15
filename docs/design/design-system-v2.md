# RisingGen Design System

## Introduction

The RisingGen Design System provides a comprehensive guide for creating consistent, accessible, and spiritually purposeful user experiences across the platform. This system prioritizes clarity, reverence, and inclusion while supporting efficient development and maintenance.

## Design Principles

### 1. Ministry-First, Not Business-First

Every design decision should prioritize spiritual stewardship, covenant belonging, and disciple

ship growth over metrics optimization or commercial patterns.

**Application**:

- No dark patterns or manipulative UI
- Opt-in communication preferences, never assumed
- Clear, honest language without marketing hype
- Success measured by spiritual engagement, not just clicks

### 2. Reverent Simplicity

The platform should feel calm, trustworthy, and purposeful—removing cognitive load to create space for spiritual focus.

**Application**:

- Generous whitespace and breathing room
- Limited color palette rooted in spiritual symbolism
- Progressive disclosure of information
- Clear hierarchy and visual rhythm

### 3. Inclusive by Default

Accessibility and inclusion are requirements, not add-ons. Every feature must serve all YSAs regardless of language, ability, or socioeconomic status.

**Application**:

- WCAG 2.1 AA minimum standards
- Multi-language support in core features
- Mobile-first responsive design
- Clear affordance and support mechanisms

### 4. Consistent & Predictable

Users across language regions and experience levels should find the platform intuitive and familiar at every touchpoint.

**Application**:

- Shared component library
- Standardized interactions
- Persistent navigation patterns
- Unified information architecture

### 5. Empowering Volunteers

Organizers are time-limited servants, not professional administrators. The system should guide, support, and celebrate their stewardship.

**Application**:

- Inline guidance and contextual help
- Milestone-driven workflows
- Recognition and progress visibility
- Error prevention over error correction

## Color System

### Primary Palette

#### Purple (Ministry & Covenant)

The primary brand color represents covenant commitment and spiritual unity.

```
rg-purple-50:  #f5f3ff
rg-purple-100: #ede9fe
rg-purple-200: #ddd6fe
rg-purple-300: #c4b5fd
rg-purple-400: #a78bfa
rg-purple-500: #8b5cf6
rg-purple-600: #7c3aed  (Primary brand)
rg-purple-700: #6d28d9
rg-purple-800: #5b21b6
rg-purple-900: #4c1d95
```

**Usage**:

- Primary actions (CTAs)
- Active navigation states
- Focus rings
- Brand elements

#### Blue (Trust & Clarity)

Supporting color for informational elements and secondary actions.

```
rg-blue-50:  #eff6ff
rg-blue-100: #dbeafe
rg-blue-200: #bfdbfe
rg-blue-300: #93c5fd
rg-blue-400: #60a5fa
rg-blue-500: #3b82f6
rg-blue-600: #2563eb  (Informational)
rg-blue-700: #1d4ed8
rg-blue-800: #1e40af
rg-blue-900: #1e3a8a
```

**Usage**:

- Informational messages
- Links and interactive text
- Secondary buttons
- Info indicators

### Semantic Colors

#### Success (Green - Growth)

```
rg-green-50:  #f0fdf4
rg-green-100: #dcfce7
rg-green-600: #16a34a  (Success primary)
rg-green-700: #15803d
```

**Usage**:

- Success messages
- Confirmation states
- Progress indicators
- Positive metrics

#### Warning (Orange - Attention)

```
rg-orange-50:  #fff7ed
rg-orange-100: #ffedd5
rg-orange-600: #ea580c  (Warning primary)
rg-orange-700: #c2410c
```

**Usage**:

- Warning messages
- Pending states
- Important notifications
- Caution indicators

#### Danger (Red - Care)

```
rg-red-50:  #fef2f2
rg-red-100: #fee2e2
rg-red-600: #dc2626  (Danger primary)
rg-red-700: #b91c1c
```

**Usage**:

- Error messages
- Destructive actions
- Critical alerts
- Blocking issues

### Neutral Palette

```
rg-gray-50:  #f9fafb
rg-gray-100: #f3f4f6
rg-gray-200: #e5e7eb
rg-gray-300: #d1d5db
rg-gray-400: #9ca3af
rg-gray-500: #6b7280
rg-gray-600: #4b5563
rg-gray-700: #374151
rg-gray-800: #1f2937
rg-gray-900: #111827
```

**Usage**:

- Text (700-900)
- Borders (200-300)
- Backgrounds (50-100)
- Disabled states (400-500)

### Background & Surfaces

```
rg-bg:       #f7f8fb  (Page background)
rg-surface:  #ffffff  (Cards, panels)
rg-overlay:  #00000088  (Modal backdrop)
```

## Typography

### Font Stack

**Primary**: Inter (Google Fonts)

```css
font-family: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
  Arial, sans-serif;
```

**Code/Monospace** (if needed):

```css
font-family: "JetBrains Mono", "Courier New", monospace;
```

### Type Scale

```
text-xs:   0.75rem  (12px)  - Small labels, captions
text-sm:   0.875rem (14px)  - Secondary text, descriptions
text-base: 1rem     (16px)  - Body text (default)
text-lg:   1.125rem (18px)  - Emphasized body
text-xl:   1.25rem  (20px)  - Small headings
text-2xl:  1.5rem   (24px)  - Section headings
text-3xl:  1.875rem (30px)  - Page headings
text-4xl:  2.25rem  (36px)  - Hero headings
text-5xl:  3rem     (48px)  - Large hero text
```

### Font Weights

```
font-light:     300  - Rarely used
font-normal:    400  - Body text
font-medium:    500  - Subtle emphasis
font-semibold:  600  - Subheadings, labels
font-bold:      700  - Headings, strong emphasis
font-extrabold: 800  - Hero text, major headings
```

### Line Heights

```
leading-none:    1.0   - Tight headings
leading-tight:   1.25  - Headings
leading-snug:    1.375 - Compact text
leading-normal:  1.5   - Body text (default)
leading-relaxed: 1.625 - Comfortable reading
leading-loose:   2.0   - Extra spacious
```

### Usage Guidelines

**Headings**:

- Use `font-bold` or `font-extrabold`
- Use `leading-tight` or `leading-snug`
- Add margin-bottom for spacing

**Body Text**:

- Use `text-base` with `font-normal`
- Use `leading-normal` or `leading-relaxed`
- Keep line length 60-75 characters for readability

**Labels & UI Text**:

- Use `text-sm` or `text-xs` with `font-medium` or `font-semibold`
- Use uppercase sparingly (`uppercase` + `tracking-wide`) for visual tags

## Spacing System

Based on 4px grid system:

```
0:    0px
px:   1px
0.5:  2px
1:    4px
2:    8px
3:    12px
4:    16px
5:    20px
6:    24px
8:    32px
10:   40px
12:   48px
16:   64px
20:   80px
24:   96px
```

### Common Patterns

**Component Padding**:

- Buttons: `px-4 py-2` (16px × 8px)
- Cards: `p-6` (24px)
- Containers: `px-4 sm:px-6 lg:px-8` (responsive)

**Margins**:

- Section spacing: `my-10` or `my-12` (40-48px)
- Element spacing: `mb-4` or `mb-6` (16-24px)

**Gaps**:

- Grid/flex gaps: `gap-4`, `gap-6` (16-24px)

## Border & Shadow System

### Border Radius

```
rounded-none: 0px
rounded-sm:   2px   - Small elements
rounded:      4px   - Default
rounded-md:   6px   - Buttons, inputs
rounded-lg:   8px   - Cards
rounded-xl:   12px  - Large cards
rounded-2xl:  16px  - Modals
rounded-full: 9999px - Pills, avatars
```

### Border Widths

```
border:   1px  - Default
border-2: 2px  - Emphasis
border-4: 4px  - Strong emphasis
```

### Shadows

```
shadow-sm:      0 1px 2px 0 rgba(0,0,0,0.05)
shadow:         0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)
shadow-md:      0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)
shadow-lg:      0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)
shadow-xl:      0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)
shadow-2xl:     0 25px 50px -12px rgba(0,0,0,0.25)

Custom:
shadow-sm-soft: 0 2px 8px -2px rgba(0,0,0,0.08)
shadow-card:    0 4px 16px -4px rgba(0,0,0,0.12)
```

**Usage**:

- Cards: `shadow-sm` or `shadow-card`
- Buttons: No shadow (flat design preferred)
- Modals: `shadow-2xl`
- Dropdowns: `shadow-lg`

## Component Patterns

### Buttons

#### Primary Button

```tsx
<button className="inline-flex items-center gap-2 rounded-md bg-rg-purple-600 text-white px-4 py-2 text-sm font-semibold shadow-sm-soft hover:bg-rg-purple-700 focus:outline-none focus:ring-2 focus:ring-rg-purple-600 focus:ring-offset-2 transition-colors">
  Primary Action
</button>
```

#### Secondary Button

```tsx
<button className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white text-gray-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rg-purple-600 focus:ring-offset-2 transition-colors">
  Secondary Action
</button>
```

#### Danger Button

```tsx
<button className="inline-flex items-center gap-2 rounded-md bg-rg-red-600 text-white px-4 py-2 text-sm font-semibold hover:bg-rg-red-700 focus:outline-none focus:ring-2 focus:ring-rg-red-600 focus:ring-offset-2 transition-colors">
  Destructive Action
</button>
```

### Cards

```tsx
<div className="bg-white rounded-xl border border-gray-200 shadow-sm-soft p-6">
  <h3 className="text-xl font-bold text-gray-900 mb-2">Card Title</h3>
  <p className="text-gray-600">Card content goes here...</p>
</div>
```

### Forms

#### Input

```tsx
<input
  type="text"
  className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rg-purple-600 focus:border-transparent"
  placeholder="Enter text..."
/>
```

#### Label

```tsx
<label className="block text-sm font-medium text-gray-700 mb-1">
  Field Label
</label>
```

#### Helper Text

```tsx
<p className="mt-1 text-xs text-gray-500">
  Helpful description or guidance text
</p>
```

#### Error Message

```tsx
<p className="mt-1 text-xs text-rg-red-600">
  Error message describing the issue
</p>
```

### Tags / Chips

```tsx
<span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 border border-gray-200">
  Tag Label
</span>

<span className="inline-flex items-center rounded-md bg-rg-purple-50 px-2 py-0.5 text-xs font-medium text-rg-purple-700 border border-rg-purple-200">
  Accent Tag
</span>
```

### Badges

```tsx
<span className="inline-flex items-center rounded-full bg-rg-green-50 px-2 py-1 text-xs font-semibold text-rg-green-700">
  Active
</span>

<span className="inline-flex items-center rounded-full bg-rg-orange-50 px-2 py-1 text-xs font-semibold text-rg-orange-700">
  Pending
</span>
```

### Alerts

#### Info

```tsx
<div className="rounded-lg bg-rg-blue-50 border border-rg-blue-200 p-4">
  <div className="flex">
    <svg className="h-5 w-5 text-rg-blue-400" />
    <div className="ml-3">
      <h3 className="text-sm font-medium text-rg-blue-800">Information</h3>
      <p className="mt-1 text-sm text-rg-blue-700">Details go here...</p>
    </div>
  </div>
</div>
```

#### Success

```tsx
<div className="rounded-lg bg-rg-green-50 border border-rg-green-200 p-4">
  <div className="flex">
    <svg className="h-5 w-5 text-rg-green-400" />
    <div className="ml-3">
      <h3 className="text-sm font-medium text-rg-green-800">Success</h3>
      <p className="mt-1 text-sm text-rg-green-700">
        Operation completed successfully.
      </p>
    </div>
  </div>
</div>
```

## Accessibility Guidelines

### Focus Indicators

All interactive elements must have visible focus states:

```css
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-rg-purple-600 focus:ring-offset-2;
}
```

### Color Contrast

- Text: Minimum 4.5:1 ratio (WCAG AA)
- Large text (18pt+): Minimum 3:1 ratio
- UI elements: Minimum 3:1 ratio

**Approved Text Combinations**:

- `text-gray-900` on `bg-white` ✓
- `text-gray-700` on `bg-white` ✓
- `text-white` on `bg-rg-purple-600` ✓
- `text-gray-600` on `bg-white` ✓ (for secondary text)

### Semantic HTML

- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<button>` for actions, `<a>` for navigation
- Use `<label>` with `htmlFor` for form inputs
- Use appropriate ARIA attributes when needed

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Logical tab order
- Escape key closes modals/dropdowns
- Enter/Space activates buttons

### Screen Reader Support

- Meaningful alt text for images
- ARIA labels for icon-only buttons
- Status messages announced appropriately
- Form validation errors clearly associated with inputs

## Responsive Design

### Breakpoints

```
sm:  640px   - Small tablets
md:  768px   - Tablets
lg:  1024px  - Small desktops
xl:  1280px  - Desktops
2xl: 1536px  - Large desktops
```

### Mobile-First Approach

Always design and develop for mobile first, then enhance for larger screens:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### Container Widths

```tsx
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{/* Content */}</div>
```

**Custom Container** (`.container-safe`):

```css
.container-safe {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

## Animation & Transitions

### Duration

```
duration-75:   75ms   - Micro-interactions
duration-100:  100ms  - Quick transitions
duration-150:  150ms  - Default
duration-200:  200ms  - Smooth transitions
duration-300:  300ms  - Deliberate transitions
duration-500:  500ms  - Slow, purposeful
```

### Easing

```
ease-linear:     linear
ease-in:         cubic-bezier(0.4, 0, 1, 1)
ease-out:        cubic-bezier(0, 0, 0.2, 1)
ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1)
```

**Default**: `ease-out` for most transitions

### Common Transitions

```tsx
// Button hover
transition-colors duration-150

// Card hover
transition-shadow duration-200

// Modal/Drawer entry
transition-opacity duration-300 ease-out

// Dropdown menu
transition-all duration-200 ease-out
```

### Motion Guidelines

- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` user preferences
- Avoid unnecessary animation on critical paths
- Use animation to guide attention, not distract

## Iconography

### Icon Library

**Primary**: Lucide React

- Consistent stroke width
- Open-source and well-maintained
- Good coverage of common needs

```tsx
import { Calendar, MapPin, Users, Settings } from "lucide-react";

<Calendar className="h-5 w-5 text-gray-400" />;
```

### Icon Sizing

```
h-3 w-3:  12px  - Inline with text-xs
h-4 w-4:  16px  - Inline with text-sm
h-5 w-5:  20px  - Inline with text-base (default)
h-6 w-6:  24px  - Emphasis, headers
h-8 w-8:  32px  - Feature icons
h-12 w-12: 48px - Hero icons
```

### Usage

- Use consistent stroke weight across platform
- Pair icons with text for clarity (except very common actions)
- Ensure sufficient color contrast
- Provide aria-label for icon-only buttons

## Layout Patterns

### Page Layout

```tsx
<div className="min-h-screen flex flex-col">
  <NavBar />
  <main className="flex-1">
    <div className="container-safe py-10">{/* Page content */}</div>
  </main>
  <Footer />
</div>
```

### Section Layout

```tsx
<section className="py-14">
  <div className="container-safe">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-bold">Section Title</h2>
      <Link href="#" className="text-sm font-medium text-rg-purple-600">
        View All →
      </Link>
    </div>
    <div className="grid gap-6 md:grid-cols-3">{/* Content */}</div>
  </div>
</section>
```

### Card Grid

```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

## Writing Guidelines

### Voice & Tone

**Ministry-Centered**:

- "Gather", "serve", "uplift", "connect" over "maximize", "optimize", "leverage"
- "Young adults" or "YSAs", not "users" or "customers"
- "Organizers" or "leaders", not "admins" or "organizers"

**Clear & Direct**:

- Active voice preferred
- Short sentences (aim for 15-20 words)
- Scannable content with bullet points and headers

**Compassionate & Supportive**:

- Encouraging, never condescending
- Acknowledge challenges without dwelling on negatives
- Celebrate progress and efforts

### Button Labels

- Use verbs: "Create Event", "Register Now", "Save Changes"
- Be specific: "Send Invitation" not "Submit"
- Keep concise: 1-3 words ideal

### Error Messages

- Be specific about what went wrong
- Provide actionable next steps
- Avoid technical jargon
- Be supportive, not blaming

**Good**: "Registration closes on March 10. You can still save this event to your calendar."  
**Bad**: "Registration period has expired."

### Success Messages

- Confirm the action completed
- Suggest logical next steps
- Celebrate when appropriate

**Good**: "Event created successfully! Next, invite your team to start planning together."  
**Bad**: "Operation completed."

## Implementation Notes

### Tailwind Configuration

The design system is implemented via custom Tailwind config:

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      rg: {
        purple: { /* ... */ },
        blue: { /* ... */ },
        // etc.
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', /* ... */],
    },
  }
}
```

### CSS Utilities

Custom utility classes in `globals.css`:

```css
.container-safe {
  /* ... */
}
.focus-ring {
  /* ... */
}
.gradient-hero {
  /* ... */
}
.card {
  /* ... */
}
.tag {
  /* ... */
}
```

### Component Library

Reusable components in `/components`:

- `/layout` - NavBar, Footer
- `/events` - EventCard, TagList
- `/common` - Button, Input, Badge, Alert

---

**Document Version**: 1.0  
**Last Updated**: 2025-01-15  
**Status**: Living Document  
**Owner**: RisingGen Design Team
