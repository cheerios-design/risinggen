# Coding Standards

## RisingGen Coding Standards & Best Practices

This document outlines the coding standards and best practices for the RisingGen development team. Following these guidelines ensures code consistency, quality, and maintainability across the project.

## General Principles

- **Readability First**: Write code that is easy to read and understand
- **Self-Documenting Code**: Use clear names and structure over excessive comments
- **DRY (Don't Repeat Yourself)**: Avoid code duplication
- **KISS (Keep It Simple, Stupid)**: Favor simplicity over complexity
- **Automated Testing**: All code should be covered by automated tests
- **Performance Awareness**: Write efficient code, but prioritize readability over premature optimization

## JavaScript/TypeScript Standards

### Style Guide

We follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with modifications:

- TypeScript is strongly preferred over JavaScript
- 2-space indentation
- Semicolons required
- Single quotes for strings
- Trailing commas required for multi-line

### TypeScript Rules

- **Strict Mode**: Enable TypeScript's strict mode
- **Type Declarations**: Prefer explicit return types on functions
- **Interfaces vs Types**: Use interfaces for object types and types for unions/aliases
- **Enums**: Use string enums over numeric enums
- **Null Checking**: Use strict null checking

```typescript
// Good
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email?: string; // Optional property
}

function getFullName(user: User): string {
  return `${user.firstName} ${user.lastName}`;
}

// Bad
function processUser(user) {
  return user.firstName + " " + user.lastName;
}
```

### React/Frontend Standards

- **Functional Components**: Use functional components with hooks
- **State Management**: Use Context API for local state, Redux for global state
- **CSS-in-JS**: Use styled-components for component styling
- **Component Organization**: Follow atomic design principles
- **Accessibility**: Follow WCAG 2.1 AA standards

```tsx
// Good
import React, { useState } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? "#667eea" : "white")};
  color: ${(props) => (props.primary ? "white" : "#667eea")};
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #667eea;
`;

interface ButtonProps {
  primary?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  primary = false,
  onClick,
  children,
}) => {
  return (
    <ButtonWrapper primary={primary} onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};
```

### Backend Standards

- **RESTful API**: Follow REST principles for API design
- **Error Handling**: Consistent error response format
- **Validation**: Input validation for all API endpoints
- **Middleware**: Use middleware for cross-cutting concerns
- **Environment Config**: Use environment variables for configuration

```typescript
// Good - Express route with validation and error handling
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createUser } from "../services/userService";

const router = Router();

router.post(
  "/users",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  async (req, res, next) => {
    try {
      // Validate request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid request data",
            details: errors.array(),
          },
        });
      }

      // Process request
      const user = await createUser(req.body);
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  }
);
```

## Naming Conventions

### General

- **CamelCase**: Variables, functions, methods
- **PascalCase**: Classes, interfaces, React components
- **UPPER_SNAKE_CASE**: Constants
- **kebab-case**: File names, URLs

### Specific Conventions

- **Boolean variables**: Use `is`, `has`, `can` prefixes (e.g., `isActive`, `hasPermission`)
- **Arrays**: Use plural nouns (e.g., `users`, `eventList`)
- **Functions**: Use verbs for actions (e.g., `getUserById`, `processPayment`)
- **React Components**: Match component name to file name (`UserProfile.tsx` exports `UserProfile`)
- **CSS Classes**: Use BEM (Block Element Modifier) methodology

## File Organization

### Frontend Structure

```
src/
├── assets/           # Static assets
├── components/       # Reusable components
│   ├── atoms/        # Basic building blocks
│   ├── molecules/    # Groups of atoms
│   ├── organisms/    # Complex components
│   └── templates/    # Page layouts
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Route components
├── services/         # API services
├── store/            # Redux store configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

### Backend Structure

```
src/
├── api/              # API routes
│   ├── controllers/  # Route handlers
│   ├── middleware/   # Express middleware
│   ├── routes/       # Route definitions
│   └── validators/   # Request validation
├── config/           # Configuration
├── db/               # Database setup and models
├── services/         # Business logic
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Documentation

### Code Documentation

- **JSDoc**: Use JSDoc comments for functions and classes
- **TODO/FIXME**: Mark temporary solutions with `// TODO:` or `// FIXME:`
- **Complex Logic**: Comment complex algorithms and business logic

```typescript
/**
 * Calculate the total price including applicable discounts and fees
 * @param {number} basePrice - The base price of the item
 * @param {number} [discount=0] - Discount percentage (0-100)
 * @param {boolean} [includeFees=true] - Whether to include processing fees
 * @returns {number} The final calculated price
 */
function calculatePrice(
  basePrice: number,
  discount: number = 0,
  includeFees: boolean = true
): number {
  // Apply discount
  const discountedPrice = basePrice * (1 - discount / 100);

  // Add fees if applicable
  if (includeFees) {
    return discountedPrice * 1.05; // 5% processing fee
  }

  return discountedPrice;
}
```

### Markdown Documentation

- **README**: Every folder should have a README.md explaining its purpose
- **Formatting**: Follow consistent markdown formatting
- **External Docs**: Link to external documentation when appropriate

## Testing Standards

### Test Types

- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test interactions between components
- **E2E Tests**: Test complete user flows

### Testing Guidelines

- **Test Coverage**: Aim for 80%+ code coverage
- **Test Organization**: Mirror source code structure in tests
- **Mocking**: Use mocks for external dependencies
- **Testing Libraries**: Jest for unit/integration, Cypress for E2E
- **Test Descriptions**: Clear test descriptions (describe/it)

```typescript
// Good unit test example
import { calculatePrice } from "./pricing";

describe("calculatePrice", () => {
  it("calculates price without discount or fees", () => {
    expect(calculatePrice(100, 0, false)).toBe(100);
  });

  it("applies discount correctly", () => {
    expect(calculatePrice(100, 20, false)).toBe(80);
  });

  it("applies fees when specified", () => {
    expect(calculatePrice(100, 0, true)).toBe(105);
  });

  it("applies both discount and fees", () => {
    expect(calculatePrice(100, 20, true)).toBe(84); // 80 + 5% fee
  });
});
```

## Git Workflow

### Commit Guidelines

- **Conventional Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) standard
- **Format**: `<type>(<scope>): <description>`
- **Types**: feat, fix, docs, style, refactor, test, chore
- **Example**: `feat(auth): implement JWT token validation`

### Pull Requests

- **Small PRs**: Keep pull requests focused and small
- **Description**: Include clear description of changes
- **References**: Link to relevant issues
- **Checks**: Ensure all CI checks pass
- **Screenshots**: Include screenshots for UI changes

## Accessibility Standards

- **WCAG Compliance**: Follow WCAG 2.1 AA standards
- **Semantic HTML**: Use appropriate HTML elements
- **Keyboard Navigation**: Ensure all interactions work with keyboard
- **Screen Readers**: Test with screen readers
- **Color Contrast**: Maintain 4.5:1 contrast ratio for text

## Performance Considerations

- **Bundling**: Optimize bundle size (code splitting, tree shaking)
- **Lazy Loading**: Implement lazy loading for routes and components
- **Image Optimization**: Use optimized images and lazy loading
- **Caching**: Implement appropriate caching strategies
- **Monitoring**: Use performance monitoring tools

## Security Practices

- **Data Validation**: Validate all input data
- **Authentication**: Secure authentication practices
- **Authorization**: Proper permission checks
- **CSRF Protection**: Implement CSRF tokens
- **XSS Prevention**: Sanitize user input
- **Dependency Security**: Regular security audits of dependencies

## Code Review Checklist

- **Functionality**: Code works as intended
- **Code Quality**: Follows coding standards
- **Tests**: Adequate test coverage
- **Performance**: No obvious performance issues
- **Security**: No security vulnerabilities
- **Documentation**: Code is well-documented

---

These standards should be consistently applied across all RisingGen codebases. Regular code reviews and automated linting will help ensure compliance.
