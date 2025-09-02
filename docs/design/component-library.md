# Component Library

## RisingGen Component Library

This document provides detailed documentation for the RisingGen component library, a collection of reusable UI elements that implement our design system across the platform.

## Overview

The RisingGen component library is built with React and TypeScript, providing a comprehensive set of UI components that adhere to our design system principles. These components ensure consistency, accessibility, and quality across all user interfaces.

## Getting Started

### Installation

```bash
# Using npm
npm install @risinggen/components

# Using yarn
yarn add @risinggen/components
```

### Basic Usage

```jsx
import { Button, Card, TextField } from "@risinggen/components";

function MyComponent() {
  return (
    <Card>
      <h2>Registration Form</h2>
      <TextField label="Email Address" placeholder="your.name@example.com" />
      <Button variant="primary">Register</Button>
    </Card>
  );
}
```

### Provider Setup

Wrap your application with the RisingGen provider to enable theming and global settings:

```jsx
import { RisingGenProvider } from "@risinggen/components";

function App() {
  return (
    <RisingGenProvider>
      <YourApplication />
    </RisingGenProvider>
  );
}
```

## Core Components

### Layout Components

#### Container

A responsive container with configurable max-width by breakpoint.

```jsx
<Container maxWidth="lg">
  <YourContent />
</Container>
```

| Prop     | Type                                   | Default | Description                      |
| -------- | -------------------------------------- | ------- | -------------------------------- |
| maxWidth | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'lg'    | Maximum width constraint         |
| padding  | boolean \| number                      | true    | Container padding                |
| centered | boolean                                | true    | Center content horizontally      |
| as       | React.ElementType                      | 'div'   | Render as different HTML element |

#### Grid

Flexible grid system with configurable columns and spacing.

```jsx
<Grid columns={12} spacing={4}>
  <GridItem span={6}>Column 1</GridItem>
  <GridItem span={6}>Column 2</GridItem>
</Grid>
```

| Prop         | Type                                      | Default | Description                       |
| ------------ | ----------------------------------------- | ------- | --------------------------------- |
| columns      | number                                    | 12      | Number of grid columns            |
| spacing      | number                                    | 4       | Gap between grid items (in units) |
| alignItems   | 'start' \| 'center' \| 'end'              | 'start' | Vertical alignment                |
| justifyItems | 'start' \| 'center' \| 'end' \| 'stretch' | 'start' | Horizontal alignment              |

#### Stack

Vertical or horizontal stack with consistent spacing.

```jsx
<Stack direction="vertical" spacing={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

| Prop      | Type                                      | Default    | Description                    |
| --------- | ----------------------------------------- | ---------- | ------------------------------ |
| direction | 'vertical' \| 'horizontal'                | 'vertical' | Stack direction                |
| spacing   | number                                    | 4          | Space between items (in units) |
| align     | 'start' \| 'center' \| 'end' \| 'stretch' | 'start'    | Cross-axis alignment           |
| justify   | 'start' \| 'center' \| 'end' \| 'between' | 'start'    | Main-axis alignment            |
| wrap      | boolean                                   | false      | Allow items to wrap            |
| divider   | React.ReactNode                           | undefined  | Element between items          |

### Typography Components

#### Text

Text component with variants for different purposes.

```jsx
<Text variant="body" color="gray.700">
  This is some body text with a custom color.
</Text>
```

| Prop     | Type                                                          | Default           | Description                      |
| -------- | ------------------------------------------------------------- | ----------------- | -------------------------------- |
| variant  | 'h1' \| 'h2' \| 'h3' \| 'h4' \| 'body' \| 'small' \| 'xsmall' | 'body'            | Text style variant               |
| color    | string                                                        | 'gray.900'        | Text color (from theme)          |
| weight   | 'normal' \| 'medium' \| 'semibold' \| 'bold'                  | 'normal'          | Font weight                      |
| align    | 'left' \| 'center' \| 'right'                                 | 'left'            | Text alignment                   |
| truncate | boolean                                                       | false             | Truncate with ellipsis           |
| as       | React.ElementType                                             | varies by variant | Render as different HTML element |

#### Heading

Semantic heading components with consistent styling.

```jsx
<Heading level={2} size="lg">
  Section Title
</Heading>
```

| Prop  | Type                                                   | Default         | Description           |
| ----- | ------------------------------------------------------ | --------------- | --------------------- |
| level | 1 \| 2 \| 3 \| 4 \| 5 \| 6                             | 2               | Heading level (h1-h6) |
| size  | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' | varies by level | Text size             |
| color | string                                                 | 'gray.900'      | Text color            |
| align | 'left' \| 'center' \| 'right'                          | 'left'          | Text alignment        |

### Input Components

#### Button

Multi-purpose button component with variants.

```jsx
<Button variant="primary" size="md" leftIcon="calendar" onClick={handleClick}>
  Schedule Event
</Button>
```

| Prop        | Type                                               | Default   | Description                 |
| ----------- | -------------------------------------------------- | --------- | --------------------------- |
| variant     | 'primary' \| 'secondary' \| 'tertiary' \| 'danger' | 'primary' | Button style                |
| size        | 'sm' \| 'md' \| 'lg'                               | 'md'      | Button size                 |
| leftIcon    | string                                             | undefined | Icon before text            |
| rightIcon   | string                                             | undefined | Icon after text             |
| isLoading   | boolean                                            | false     | Show loading spinner        |
| isDisabled  | boolean                                            | false     | Disable button              |
| isFullWidth | boolean                                            | false     | Take full width             |
| as          | React.ElementType                                  | 'button'  | Render as different element |
| type        | 'button' \| 'submit' \| 'reset'                    | 'button'  | Button type attribute       |

#### TextField

Text input component with integrated label and validation.

```jsx
<TextField
  label="Email"
  placeholder="your.name@example.com"
  helper="We'll never share your email"
  error={emailError}
  value={email}
  onChange={handleEmailChange}
  required
/>
```

| Prop        | Type     | Default   | Description             |
| ----------- | -------- | --------- | ----------------------- |
| label       | string   | undefined | Input label             |
| placeholder | string   | undefined | Input placeholder       |
| helper      | string   | undefined | Helper text below input |
| error       | string   | undefined | Error message           |
| value       | string   | ''        | Input value             |
| onChange    | function | undefined | Change handler          |
| type        | string   | 'text'    | Input type              |
| required    | boolean  | false     | Mark as required        |
| disabled    | boolean  | false     | Disable input           |
| readOnly    | boolean  | false     | Read-only mode          |

#### Select

Dropdown selection component.

```jsx
<Select
  label="Country"
  options={[
    { value: "uk", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
  ]}
  value={country}
  onChange={handleCountryChange}
/>
```

| Prop        | Type                                  | Default     | Description      |
| ----------- | ------------------------------------- | ----------- | ---------------- |
| label       | string                                | undefined   | Select label     |
| options     | Array<{value: string, label: string}> | []          | Select options   |
| value       | string                                | ''          | Selected value   |
| onChange    | function                              | undefined   | Change handler   |
| placeholder | string                                | 'Select...' | Placeholder text |
| error       | string                                | undefined   | Error message    |
| disabled    | boolean                               | false       | Disable select   |

#### Checkbox

Checkbox input component.

```jsx
<Checkbox
  label="I agree to the terms"
  checked={agreed}
  onChange={handleAgreementChange}
/>
```

| Prop          | Type     | Default   | Description         |
| ------------- | -------- | --------- | ------------------- |
| label         | string   | undefined | Checkbox label      |
| checked       | boolean  | false     | Checked state       |
| onChange      | function | undefined | Change handler      |
| disabled      | boolean  | false     | Disable checkbox    |
| error         | string   | undefined | Error message       |
| indeterminate | boolean  | false     | Indeterminate state |

#### RadioGroup

Group of radio button options.

```jsx
<RadioGroup
  label="Preferred Contact Method"
  options={[
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "sms", label: "SMS" },
  ]}
  value={contactMethod}
  onChange={handleContactMethodChange}
/>
```

| Prop      | Type                                  | Default    | Description        |
| --------- | ------------------------------------- | ---------- | ------------------ |
| label     | string                                | undefined  | Group label        |
| options   | Array<{value: string, label: string}> | []         | Radio options      |
| value     | string                                | ''         | Selected value     |
| onChange  | function                              | undefined  | Change handler     |
| direction | 'vertical' \| 'horizontal'            | 'vertical' | Layout direction   |
| error     | string                                | undefined  | Error message      |
| disabled  | boolean                               | false      | Disable all radios |

#### DatePicker

Calendar-based date selection component.

```jsx
<DatePicker
  label="Event Date"
  value={eventDate}
  onChange={handleDateChange}
  minDate={new Date()}
  format="yyyy-MM-dd"
/>
```

| Prop     | Type     | Default      | Description             |
| -------- | -------- | ------------ | ----------------------- |
| label    | string   | undefined    | Date picker label       |
| value    | Date     | undefined    | Selected date           |
| onChange | function | undefined    | Change handler          |
| minDate  | Date     | undefined    | Minimum selectable date |
| maxDate  | Date     | undefined    | Maximum selectable date |
| format   | string   | 'yyyy-MM-dd' | Display format          |
| disabled | boolean  | false        | Disable picker          |
| error    | string   | undefined    | Error message           |

### Feedback Components

#### Alert

Informational alert component with variants.

```jsx
<Alert variant="info" title="Information" onClose={handleClose}>
  Your registration has been received.
</Alert>
```

| Prop    | Type                                        | Default           | Description   |
| ------- | ------------------------------------------- | ----------------- | ------------- |
| variant | 'info' \| 'success' \| 'warning' \| 'error' | 'info'            | Alert style   |
| title   | string                                      | undefined         | Alert title   |
| onClose | function                                    | undefined         | Close handler |
| icon    | string                                      | varies by variant | Custom icon   |

#### Toast

Temporary notification component.

```jsx
// Usage with toast service
toast.show({
  title: "Success",
  message: "Event has been scheduled",
  variant: "success",
  duration: 5000,
});
```

| Prop     | Type                                               | Default     | Description            |
| -------- | -------------------------------------------------- | ----------- | ---------------------- |
| title    | string                                             | undefined   | Toast title            |
| message  | string                                             | required    | Toast message          |
| variant  | 'info' \| 'success' \| 'warning' \| 'error'        | 'info'      | Toast style            |
| duration | number                                             | 5000        | Display duration in ms |
| position | 'top-right' \| 'top' \| 'bottom-right' \| 'bottom' | 'top-right' | Screen position        |

#### Dialog

Modal dialog for focused interactions.

```jsx
<Dialog isOpen={showDialog} onClose={closeDialog} title="Confirm Action">
  <p>Are you sure you want to cancel your registration?</p>
  <DialogFooter>
    <Button variant="tertiary" onClick={closeDialog}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleConfirm}>
      Confirm
    </Button>
  </DialogFooter>
</Dialog>
```

| Prop                | Type                         | Default   | Description            |
| ------------------- | ---------------------------- | --------- | ---------------------- |
| isOpen              | boolean                      | false     | Show/hide dialog       |
| onClose             | function                     | required  | Close handler          |
| title               | string                       | undefined | Dialog title           |
| size                | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md'      | Dialog size            |
| closeOnEsc          | boolean                      | true      | Close on Escape key    |
| closeOnOverlayClick | boolean                      | true      | Close on overlay click |

### Display Components

#### Card

Container for grouped content.

```jsx
<Card title="Event Details" variant="elevated">
  <CardContent>
    <p>Conference details and information...</p>
  </CardContent>
  <CardFooter>
    <Button>Register Now</Button>
  </CardFooter>
</Card>
```

| Prop        | Type                                 | Default    | Description   |
| ----------- | ------------------------------------ | ---------- | ------------- |
| title       | string                               | undefined  | Card title    |
| variant     | 'elevated' \| 'outlined' \| 'filled' | 'elevated' | Card style    |
| isHoverable | boolean                              | false      | Hover effect  |
| padding     | number \| string                     | 4          | Inner padding |

#### Tabs

Tabbed interface component.

```jsx
<Tabs defaultValue="details">
  <TabsList>
    <Tab value="details">Details</Tab>
    <Tab value="schedule">Schedule</Tab>
    <Tab value="location">Location</Tab>
  </TabsList>
  <TabsContent value="details">Event details content...</TabsContent>
  <TabsContent value="schedule">Event schedule content...</TabsContent>
  <TabsContent value="location">Event location content...</TabsContent>
</Tabs>
```

| Prop         | Type                           | Default      | Description           |
| ------------ | ------------------------------ | ------------ | --------------------- |
| defaultValue | string                         | undefined    | Default active tab    |
| value        | string                         | undefined    | Controlled active tab |
| onChange     | function                       | undefined    | Tab change handler    |
| orientation  | 'horizontal' \| 'vertical'     | 'horizontal' | Tab layout            |
| variant      | 'line' \| 'enclosed' \| 'pill' | 'line'       | Tab style             |

#### Avatar

User or entity avatar component.

```jsx
<Avatar name="John Doe" src="/images/john.jpg" size="md" />
```

| Prop    | Type                                      | Default   | Description              |
| ------- | ----------------------------------------- | --------- | ------------------------ |
| name    | string                                    | undefined | User name (for fallback) |
| src     | string                                    | undefined | Image URL                |
| size    | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'      | 'md'      | Avatar size              |
| variant | 'circle' \| 'square'                      | 'circle'  | Avatar shape             |
| status  | 'online' \| 'offline' \| 'busy' \| 'away' | undefined | Status indicator         |

#### Badge

Small status indicator component.

```jsx
<Badge variant="success">Active</Badge>
```

| Prop      | Type                                                        | Default   | Description     |
| --------- | ----------------------------------------------------------- | --------- | --------------- |
| variant   | 'default' \| 'primary' \| 'success' \| 'warning' \| 'error' | 'default' | Badge style     |
| size      | 'sm' \| 'md'                                                | 'md'      | Badge size      |
| isRounded | boolean                                                     | true      | Rounded corners |

### Navigation Components

#### Breadcrumb

Page hierarchy navigation component.

```jsx
<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbItem href="/events">Events</BreadcrumbItem>
  <BreadcrumbItem isCurrentPage>London Conference</BreadcrumbItem>
</Breadcrumb>
```

| Prop      | Type                      | Default   | Description       |
| --------- | ------------------------- | --------- | ----------------- |
| separator | string \| React.ReactNode | '/'       | Item separator    |
| maxItems  | number                    | undefined | Max visible items |

#### Pagination

Page navigation component.

```jsx
<Pagination currentPage={2} totalPages={10} onPageChange={handlePageChange} />
```

| Prop          | Type     | Default  | Description            |
| ------------- | -------- | -------- | ---------------------- |
| currentPage   | number   | 1        | Active page            |
| totalPages    | number   | required | Total pages            |
| onPageChange  | function | required | Page change handler    |
| siblingCount  | number   | 1        | Adjacent page buttons  |
| boundaryCount | number   | 1        | Start/end page buttons |

#### Navigation

Application navigation component.

```jsx
<Navigation>
  <NavigationItem href="/" icon="home" isActive>
    Home
  </NavigationItem>
  <NavigationItem href="/events" icon="calendar">
    Events
  </NavigationItem>
  <NavigationItem href="/community" icon="users">
    Community
  </NavigationItem>
</Navigation>
```

| Prop        | Type                       | Default      | Description      |
| ----------- | -------------------------- | ------------ | ---------------- |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | Layout direction |
| variant     | 'primary' \| 'secondary'   | 'primary'    | Navigation style |
| isMobile    | boolean                    | false        | Mobile optimized |

## Utility Components

#### Icon

SVG icon component from the RisingGen icon set.

```jsx
<Icon name="calendar" size="md" color="primary" />
```

| Prop  | Type                                 | Default        | Description     |
| ----- | ------------------------------------ | -------------- | --------------- |
| name  | string                               | required       | Icon identifier |
| size  | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md'           | Icon size       |
| color | string                               | 'currentColor' | Icon color      |

#### Spinner

Loading indicator component.

```jsx
<Spinner size="md" color="primary" />
```

| Prop      | Type                                 | Default   | Description    |
| --------- | ------------------------------------ | --------- | -------------- |
| size      | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md'      | Spinner size   |
| color     | string                               | 'primary' | Spinner color  |
| thickness | number                               | 2         | Line thickness |

#### Skeleton

Loading placeholder component.

```jsx
<Skeleton height="20px" width="100%" />
```

| Prop      | Type                                  | Default   | Description    |
| --------- | ------------------------------------- | --------- | -------------- |
| height    | string \| number                      | undefined | Element height |
| width     | string \| number                      | '100%'    | Element width  |
| variant   | 'text' \| 'rectangular' \| 'circular' | 'text'    | Shape variant  |
| animation | 'pulse' \| 'wave' \| 'none'           | 'pulse'   | Animation type |

## Composition Patterns

### Form Pattern

```jsx
<Form onSubmit={handleSubmit}>
  <Stack spacing={4}>
    <TextField label="Full Name" name="fullName" required />
    <TextField label="Email" name="email" type="email" required />
    <Select label="Country" name="country" options={countries} required />
    <Checkbox label="I agree to the terms" name="terms" required />
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </Stack>
</Form>
```

### Card Grid Pattern

```jsx
<Grid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
  {events.map((event) => (
    <GridItem key={event.id}>
      <Card>
        <CardImage src={event.image} alt={event.title} />
        <CardContent>
          <Heading level={3}>{event.title}</Heading>
          <Text>{event.description}</Text>
        </CardContent>
        <CardFooter>
          <Button variant="primary">View Details</Button>
        </CardFooter>
      </Card>
    </GridItem>
  ))}
</Grid>
```

### Data Display Pattern

```jsx
<Card>
  <CardHeader>
    <Heading level={3}>Event Registrations</Heading>
  </CardHeader>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {registrations.map((registration) => (
        <TableRow key={registration.id}>
          <TableCell>{registration.name}</TableCell>
          <TableCell>{registration.email}</TableCell>
          <TableCell>
            <Badge variant={getStatusVariant(registration.status)}>
              {registration.status}
            </Badge>
          </TableCell>
          <TableCell>
            <Button size="sm" variant="tertiary">
              View
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Card>
```

## Theming

### Theme Customization

Customize the default theme by extending or overriding theme values:

```jsx
import { RisingGenProvider, createTheme } from "@risinggen/components";

// Create custom theme
const customTheme = createTheme({
  colors: {
    primary: {
      500: "#1A365D", // Custom primary color
    },
  },
  fonts: {
    body: "Roboto, sans-serif", // Custom font
  },
});

// Apply custom theme
function App() {
  return (
    <RisingGenProvider theme={customTheme}>
      <YourApplication />
    </RisingGenProvider>
  );
}
```

### Dark Mode Support

The component library supports both light and dark modes:

```jsx
import { RisingGenProvider } from "@risinggen/components";

function App() {
  return (
    <RisingGenProvider colorMode="dark">
      <YourApplication />
    </RisingGenProvider>
  );
}
```

Or with dynamic switching:

```jsx
import { RisingGenProvider, useColorMode } from "@risinggen/components";

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode}>
      {colorMode === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}
```

## Accessibility

All components are built with accessibility in mind:

- ARIA attributes are properly implemented
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Color contrast compliance

Example of accessibility features:

```jsx
// Dialog with proper focus management
<Dialog
  isOpen={isOpen}
  onClose={onClose}
  initialFocusRef={initialRef}
  returnFocusRef={returnRef}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <DialogHeader id="dialog-title">Accessible Dialog</DialogHeader>
  <DialogBody id="dialog-description">
    <TextField ref={initialRef} label="Focus goes here first" />
  </DialogBody>
  <DialogFooter>
    <Button ref={returnRef} onClick={onClose}>
      Close
    </Button>
  </DialogFooter>
</Dialog>
```

## Best Practices

1. **Use Composition**: Combine components to build complex interfaces
2. **Controlled Components**: Use React's controlled component pattern for forms
3. **Accessibility First**: Test all interfaces with keyboard and screen readers
4. **Responsive Design**: Design for mobile first, then expand for larger screens
5. **Error Handling**: Always provide clear error states and feedback

## Contributing

To contribute to the component library:

1. Follow the established design system guidelines
2. Write comprehensive tests for new components
3. Include storybook documentation
4. Ensure accessibility compliance
5. Add TypeScript types and documentation

---

This documentation provides an overview of the RisingGen component library. For complete API documentation and interactive examples, refer to the Storybook documentation.
