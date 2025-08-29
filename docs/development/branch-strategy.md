# Branch Strategy Guide

## Repository Structure

The RisingGen project uses a structured branching strategy designed for collaborative development with individual developer branches merging to main.

## Main Branches

### `main`

- **Purpose**: Production-ready stable releases
- **Protection**: Protected branch with required reviews
- **Merges**: Only from dev branches after code review
- **Deployment**: Automatic deployment to production

## Development Branches

### `sam-dev` - Lead Developer Branch

- **Owner**: Sam Davies (@sam-dev)
- **Role**: Lead Developer & Project Manager
- **Focus**:
  - Integration and coordination
  - Architecture decisions
  - Project management tasks
  - Cross-team feature integration

### `stephano-dev` - Frontend Branch

- **Owner**: Stephano (@stephano-dev)
- **Role**: Frontend Specialist & UX Implementation
- **Focus**:
  - React component development
  - UI/UX implementation
  - Design system integration
  - Frontend performance optimization

### `andreas-dev` - Backend Branch

- **Owner**: Andreas (@andreas-dev)
- **Role**: Backend Architecture & Infrastructure
- **Focus**:
  - API development and design
  - Database architecture
  - Infrastructure and DevOps
  - Backend performance and security

### `test-extras` - Experimental Branch

- **Purpose**: Testing and experimental features
- **Usage**: Non-essential features and experimentation
- **Merge Policy**: Optional features only, low priority

## Workflow Process

### 1. Feature Development

```bash
# Create feature branch from your dev branch
git checkout sam-dev  # or your assigned branch
git pull origin sam-dev
git checkout -b feature/user-authentication

# Develop and commit
git add .
git commit -m "feat: implement JWT authentication"

# Push feature branch
git push origin feature/user-authentication
```

### 2. Pull Request Creation

- Create PR to your assigned dev branch (not main)
- Include comprehensive description
- Add relevant team members as reviewers
- Link related issues or project items

### 3. Code Review Process

- All team members can review
- At least 1 approval required
- Address all comments before merging
- Ensure tests pass and code quality checks

### 4. Integration to Main

- Dev branch owners merge to main
- Requires all tests passing
- Production deployment automatic
- Tag releases with semantic versioning

## Branch Naming Conventions

### Feature Branches

```bash
feature/authentication-system
feature/event-calendar
feature/payment-integration
```

### Bug Fix Branches

```bash
fix/login-redirect-issue
fix/calendar-timezone-bug
hotfix/critical-security-patch
```

### Documentation Branches

```bash
docs/api-documentation
docs/setup-guide
docs/deployment-process
```

## Commit Message Standards

Follow **Conventional Commits** specification:

```bash
# Format
<type>(<scope>): <description>

# Examples
feat(auth): add JWT token validation
fix(calendar): resolve timezone display bug
docs(readme): update installation instructions
style(ui): improve button component spacing
refactor(api): restructure user endpoints
test(auth): add unit tests for login flow
```

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (not affecting functionality)
- **refactor**: Code restructuring without feature changes
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

## Merge Strategies

### Feature to Dev Branch

- **Squash and Merge** preferred
- Clean commit history in dev branches
- Detailed commit messages required

### Dev Branch to Main

- **Merge Commit** preferred
- Preserve development history
- Tag with version numbers

## Release Process

### Version Numbering

Follow **Semantic Versioning** (semver):

- **Major**: Breaking changes (1.0.0 → 2.0.0)
- **Minor**: New features (1.0.0 → 1.1.0)
- **Patch**: Bug fixes (1.0.0 → 1.0.1)

### Release Tags

```bash
# Create release tag
git tag -a v1.2.0 -m "Release version 1.2.0: Event calendar feature"
git push origin v1.2.0
```

## Branch Protection Rules

### Main Branch

- Require pull request reviews
- Require status checks to pass
- Require up-to-date branches
- Include administrators in restrictions

### Dev Branches

- Require pull request reviews
- Allow force pushes (for dev owners only)
- Require status checks to pass

## Emergency Hotfixes

For critical production issues:

```bash
# Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-security-fix

# Fix and test
git add .
git commit -m "hotfix: resolve critical security vulnerability"

# Create PR directly to main
# Deploy immediately after review
```

## Best Practices

### Do's ✅

- Keep feature branches small and focused
- Write descriptive commit messages
- Test thoroughly before creating PRs
- Review code promptly
- Keep branches up to date with base branch

### Don'ts ❌

- Don't commit directly to main
- Don't create large, unfocused PRs
- Don't merge without review
- Don't force push to shared branches
- Don't leave stale branches

---

**Questions?** Contact @sam-dev for clarification on branch strategy and workflow.
