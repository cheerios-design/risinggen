# Design System

## RisingGen Design System

This comprehensive design system documentation outlines the visual language, components, and patterns used across the RisingGen platform to ensure a consistent, accessible, and engaging user experience.

## Design Principles

### 1. Faith-Centered

Our design reflects our values and mission to draw young adults closer to the Savior. Visual elements convey spiritual strength while remaining modern and relevant to young adults.

### 2. Inclusive & Accessible

Design that welcomes all users regardless of ability, language, or device, meeting WCAG 2.1 AA accessibility standards and supporting 15+ European languages.

### 3. Community-Focused

Interface design emphasizes connection, collaboration, and shared experiences to strengthen the YSA community across Europe.

### 4. Simple & Intuitive

Clear, straightforward interactions reduce cognitive load and make features easy to discover and use, even for first-time users.

### 5. Consistent & Cohesive

A unified design language creates familiarity across all touchpoints, from web to mobile to print materials.

## Brand Identity

### Logo

The RisingGen logo represents our core mission of drawing young adults to their covenants and the Savior.

- **Primary Logo**: Full-color horizontal version
- **Secondary Logo**: Stacked version
- **Icon**: Simplified mark for small spaces
- **Clear Space**: Minimum 1x height of the icon on all sides
- **Minimum Size**: 24px height for digital, 1 inch for print

### Color Palette

#### Primary Colors

| Name          | Hex     | RGB                | Usage               |
| ------------- | ------- | ------------------ | ------------------- |
| Faith Blue    | #2D4B9A | rgb(45, 75, 154)   | Primary brand color |
| Covenant Gold | #F2B134 | rgb(242, 177, 52)  | Accents, CTAs       |
| Savior Light  | #FFFFFF | rgb(255, 255, 255) | Backgrounds, text   |
| Rising Deep   | #1A2A56 | rgb(26, 42, 86)    | Headings, emphasis  |

#### Secondary Colors

| Name              | Hex     | RGB               | Usage                  |
| ----------------- | ------- | ----------------- | ---------------------- |
| Community Green   | #4B9A68 | rgb(75, 154, 104) | Success states, growth |
| Connection Purple | #7B4B9A | rgb(123, 75, 154) | Social features        |
| Service Orange    | #F27B34 | rgb(242, 123, 52) | Service opportunities  |
| Impact Red        | #E53E3E | rgb(229, 62, 62)  | Alerts, errors         |

#### Neutrals

| Name     | Hex     | RGB                | Usage                  |
| -------- | ------- | ------------------ | ---------------------- |
| Gray 900 | #1A202C | rgb(26, 32, 44)    | Primary text           |
| Gray 700 | #4A5568 | rgb(74, 85, 104)   | Secondary text         |
| Gray 500 | #A0AEC0 | rgb(160, 174, 192) | Placeholders, disabled |
| Gray 300 | #E2E8F0 | rgb(226, 232, 240) | Borders, dividers      |
| Gray 100 | #F7FAFC | rgb(247, 250, 252) | Backgrounds            |

### Typography

#### Primary Fonts

- **Headings**: Inter (Sans-serif)

  - Weights: 700 (Bold), 600 (Semibold)
  - Sizes: H1 (32px/2rem), H2 (24px/1.5rem), H3 (20px/1.25rem), H4 (18px/1.125rem)

- **Body**: Inter (Sans-serif)
  - Weights: 400 (Regular), 500 (Medium)
  - Sizes: Body (16px/1rem), Small (14px/0.875rem), XSmall (12px/0.75rem)

#### Fallback Stack

```css
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
```

#### Typography Scale

| Element | Size (px/rem) | Weight | Line Height | Letter Spacing |
| ------- | ------------- | ------ | ----------- | -------------- |
| H1      | 32px/2rem     | 700    | 1.2         | -0.025em       |
| H2      | 24px/1.5rem   | 700    | 1.3         | -0.025em       |
| H3      | 20px/1.25rem  | 600    | 1.4         | -0.01em        |
| H4      | 18px/1.125rem | 600    | 1.4         | -0.01em        |
| Body    | 16px/1rem     | 400    | 1.6         | 0              |
| Small   | 14px/0.875rem | 400    | 1.5         | 0.01em         |
| XSmall  | 12px/0.75rem  | 400    | 1.5         | 0.02em         |

### Iconography

We use a consistent icon system throughout the platform:

- **Icon Library**: Custom RisingGen icons + Phosphor Icons
- **Style**: Outlined with 1.5px stroke, rounded corners
- **Sizes**: 16px, 20px, 24px, 32px
- **Color**: Inherits text color by default
- **Touch Targets**: Minimum 44x44px for interactive icons

## Layout System

### Grid System

- **Base Unit**: 8px (0.5rem)
- **Column System**: 12-column fluid grid
- **Gutters**: 16px (1rem) default
- **Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1023px
  - Desktop: 1024px - 1279px
  - Large Desktop: ≥ 1280px

### Spacing System

Consistent spacing using 8px increments:

| Token    | Value          | Usage                 |
| -------- | -------------- | --------------------- |
| space-0  | 0              | No spacing            |
| space-1  | 4px (0.25rem)  | Tight spacing (icons) |
| space-2  | 8px (0.5rem)   | Compact elements      |
| space-3  | 12px (0.75rem) | Form controls         |
| space-4  | 16px (1rem)    | Standard spacing      |
| space-5  | 24px (1.5rem)  | Related content       |
| space-6  | 32px (2rem)    | Group separation      |
| space-8  | 48px (3rem)    | Section spacing       |
| space-10 | 64px (4rem)    | Large section spacing |

## Component Library

### Core Components

#### Buttons

Four button variants with consistent states:

- **Primary**: High emphasis, main actions
- **Secondary**: Medium emphasis, secondary actions
- **Tertiary**: Low emphasis, optional actions
- **Danger**: Destructive actions

Each button has consistent states:

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

Size variants:

- Small: 32px height
- Medium: 40px height (default)
- Large: 48px height

```jsx
<Button
  variant="primary"
  size="medium"
  leftIcon="calendar"
  isLoading={false}
  isDisabled={false}
>
  Register Now
</Button>
```

#### Forms

Form elements maintain consistent styling:

- **Text Inputs**: For single-line text
- **Textareas**: For multi-line text
- **Select Menus**: For choosing from options
- **Checkboxes**: For multiple selections
- **Radio Buttons**: For single selection from a list
- **Toggles**: For binary on/off states
- **Date Pickers**: For date selection
- **File Uploads**: For document/image uploading

Each form element includes:

- Label
- Input field
- Helper text (optional)
- Error state
- Success state
- Disabled state

```jsx
<FormControl isInvalid={hasError}>
  <FormLabel htmlFor="email">Email Address</FormLabel>
  <Input id="email" type="email" placeholder="your.name@example.com" />
  <FormHelperText>We'll never share your email.</FormHelperText>
  <FormErrorMessage>Please enter a valid email</FormErrorMessage>
</FormControl>
```

#### Cards

Content containers with consistent styling:

- **Standard Card**: General content
- **Event Card**: Event information
- **Profile Card**: User profiles
- **Media Card**: Images and videos
- **Action Card**: Interactive elements

Card variations:

- Elevated (with shadow)
- Outlined (with border)
- Filled (with background)

#### Navigation

Navigation components:

- **Top Navigation**: Main site navigation
- **Side Navigation**: Section/account navigation
- **Tab Navigation**: Content organization
- **Bottom Navigation**: Mobile primary actions
- **Breadcrumbs**: Page hierarchy

#### Feedback

User feedback components:

- **Alerts**: Important information
- **Toasts**: Temporary notifications
- **Dialogs**: Required user attention
- **Progress Indicators**: Loading states
- **Empty States**: No content indication

### Patterns

#### Loading States

Consistent loading indicators:

- **Skeleton Screens**: Content placeholders
- **Spinners**: Processing indicators
- **Progress Bars**: Completion tracking

#### Error Handling

User-friendly error patterns:

- **Form Validation**: Inline field validation
- **Error Messages**: Clear explanation and resolution
- **Error Pages**: 404, 500, etc.

#### Responsive Behavior

Mobile-first approach with responsive adaptations:

- **Stack on Mobile**: Column layouts on small screens
- **Horizontal on Desktop**: Row layouts on larger screens
- **Progressive Disclosure**: Show less on mobile, more on desktop
- **Touch Targets**: Minimum 44x44px for all interactive elements

## Voice and Tone

### Content Guidelines

- **Clear**: Simple language, avoid jargon
- **Concise**: Brief, focused messages
- **Friendly**: Warm, approachable tone
- **Action-Oriented**: Clear calls to action
- **Consistent**: Unified terminology

### Common UI Text Patterns

- **Buttons**: Verb + Noun format ("Register Event" not "Registration")
- **Form Labels**: Concise, descriptive nouns
- **Error Messages**: Problem + Solution format
- **Success Messages**: Confirmation of action completed
- **Empty States**: Explanation + Next Action

## Accessibility Guidelines

### Standards Compliance

- **WCAG 2.1 AA**: Minimum compliance level
- **Keyboard Navigation**: Full functionality without mouse
- **Screen Reader Support**: ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences

### Color Contrast

- **Text**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **UI Components**: Minimum 3:1 ratio for interactive elements
- **Non-text**: Essential graphics maintain sufficient contrast

### Inclusive Design

- **Language**: Clear, simple language (CEFR B1 level)
- **Text Size**: Minimum 16px for body text
- **Touch Targets**: Minimum 44x44px
- **Motion**: Non-essential animation can be disabled

## Implementation

### Design Tokens

Design tokens are stored in a centralized system:

```json
{
  "colors": {
    "faithBlue": {
      "50": "#EBF0FF",
      "100": "#D6E0FF",
      "500": "#2D4B9A",
      "900": "#1A2A56"
    },
    "covenantGold": {
      "50": "#FFF8E6",
      "100": "#FFF1CC",
      "500": "#F2B134",
      "900": "#946206"
    }
  },
  "spacing": {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "4": "1rem"
  }
}
```

### Technical Implementation

- **CSS Framework**: Tailwind CSS with custom theme
- **Component Library**: React components with Storybook
- **Dark Mode**: Supported via CSS variables
- **RTL Support**: For multilingual interface
- **Design System Package**: Published as NPM package

## Version Control

- **Semantic Versioning**: Following semver conventions
- **Changelog**: Documented changes between versions
- **Migration Guides**: For breaking changes

## Resources

### Design Files

- **Figma Library**: Master component library
- **Asset Package**: Downloadable logos and icons
- **Sketch Library**: Alternative format for design team

### Developer Resources

- **Storybook**: Interactive component documentation
- **GitHub Repo**: Code implementation of components
- **NPM Package**: @risinggen/design-system

### Templates

- **Page Templates**: Common layouts
- **Email Templates**: Notification designs
- **Print Templates**: Offline materials

## Usage Guidelines

### Do's and Don'ts

**Do:**

- Use components from the official library
- Maintain proper spacing and alignment
- Follow accessibility guidelines
- Use the design token system

**Don't:**

- Create custom components that duplicate existing ones
- Modify core components directly
- Use colors outside the approved palette
- Ignore responsive design guidelines

### Implementation Checklist

- [ ] Use official color tokens
- [ ] Implement proper spacing
- [ ] Ensure responsive behavior
- [ ] Test keyboard navigation
- [ ] Verify screen reader compatibility
- [ ] Check color contrast
- [ ] Test with various text lengths
- [ ] Validate against device sizes

---

This design system documentation serves as the single source of truth for the RisingGen visual language. The design system is a living document that will evolve as the platform grows and new requirements emerge.
