#  RisingGen EU - Unified Digital Platform for European Young Single Adults

[![Project Status](https://img.shields.io/badge/Status-MVP_Development-blue)](https://github.com/risinggen/risinggen)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)
[![Contributors](https://img.shields.io/badge/Contributors-3-green)](CONTRIBUTORS.md)
[![Documentation](https://img.shields.io/badge/Docs-Complete-brightgreen)](docs/README.md)

##  Project Overview

**RisingGen** is a comprehensive digital platform designed to unite, empower, and serve European Young Single Adults (YSAs) across The Church of Jesus Christ of Latter-day Saints communities. Our mission is to draw Europe's young adults to the Savior and their covenants while enabling meaningful connections, facilitating conferences, and building lifelong disciples.

###  Vision Statement
> Transform the European YSA experience by eliminating organizational chaos, fragmented communication, and spiritual isolation through unified digital solutions.

###  Four Pillars Architecture

| Pillar | Purpose | Key Features |
|--------|---------|-------------|
|  **Unified Event Hub** | Event Discovery & Planning | 24-month timeline generator, centralized calendar, financial management |
|  **RisingGen Community** | Connection & Registration | Universal profiles, smart registration, participant management |
|  **Engagement Channel** | Communication & Content | Unified messaging, multi-language support, knowledge base |
|  **Impact Platform** | Service & Spiritual Growth | Project coordination, workshop management, compliance tracking |

##  Current Development Status

### MVP Features (22 Essential)
-  **Phase 1**: Information Architecture Complete
-  **Phase 2**: Wireframing & UX Design
-  **Phase 3**: Core Development
-  **Phase 4**: Testing & Launch

### Key Pain Points Being Addressed
1. **24-Month Planning Chaos**  Automated timeline generation
2. **Registration Fragmentation**  Universal YSA profiles
3. **WhatsApp Communication Breakdown**  Unified messaging system
4. **150 Fee Limit Complexity**  Intelligent financial management

##  Technical Stack

### Frontend
- **Framework**: React.js with TypeScript
- **Styling**: Tailwind CSS + Custom Design System
- **State Management**: Redux Toolkit
- **Mobile**: Progressive Web App (PWA)

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB (user data) + PostgreSQL (events)
- **Authentication**: JWT with LDS membership verification
- **Payments**: Stripe with multi-currency support
- **Real-time**: WebSocket for live communication

### Infrastructure
- **Hosting**: AWS with CloudFront CDN
- **CI/CD**: GitHub Actions
- **Monitoring**: Datadog + Sentry
- **Security**: GDPR compliant, PCI DSS certified

##  Multi-Language Support

**Supported Languages**: 15+ European languages including:
- English, German, French, Spanish, Italian
- Dutch, Portuguese, Polish, Czech, Hungarian
- Romanian, Swedish, Norwegian, Danish, Finnish

**Cultural Considerations**:
- Dynamic text expansion handling
- Currency localization (, , CHF, etc.)
- Cultural sensitivity in imagery and content
- Regional compliance (GDPR, local regulations)

##  Development Team Structure

### Active Contributors
- **@sam-dev** - Lead Developer & Project Manager
- **@stephano-dev** - Frontend Specialist & UX Implementation  
- **@andreas-dev** - Backend Architecture & Infrastructure

### Branch Strategy
- **`main`** - Production-ready stable releases
- **`sam-dev`** - Lead development and integration
- **`stephano-dev`** - Frontend features and UI/UX
- **`andreas-dev`** - Backend services and API development
- **`test-extras`** - Experimental features and testing

##  Documentation Structure

```
docs/
 api/                    # API documentation
 deployment/            # Deployment guides
 development/          # Development setup
 user-guides/         # End-user documentation
 architecture/        # Technical architecture
 project-management/  # Project tracking docs
```

##  Development Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB 5.0+
- PostgreSQL 14+
- Git with SSH keys configured

### Quick Start

```bash
# Clone the repository
git clone git@github.com:risinggen/risinggen.git
cd risinggen

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development servers
npm run dev:backend    # API server on :3001
npm run dev:frontend   # React app on :3000
npm run dev:db         # Database services

# Run tests
npm run test:unit      # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:coverage  # Coverage report
```

### Development Workflow

1. **Create feature branch** from your assigned dev branch
2. **Implement feature** with comprehensive tests
3. **Create pull request** to your dev branch
4. **Code review** by team members
5. **Merge to main** after approval and testing

##  Project Management

### GitHub Projects Integration

Our project uses **GitHub Projects** for comprehensive project management:

- ** MVP Development Board**: Track 22 essential features
- ** Sprint Planning**: 2-week sprint cycles
- ** Bug Tracking**: Issue management and resolution
- ** Release Planning**: Version control and deployment tracking

### Key Metrics & KPIs

- **Registration Completion Rate**: Target >90% (vs current ~60%)
- **Planning Timeline Adherence**: Target >80% milestone completion
- **Communication Efficiency**: 70% reduction in organizer message management
- **Multi-language Adoption**: Support for 15+ European languages

##  Security & Compliance

### Data Protection
- **GDPR Compliant**: Full European data protection compliance
- **PCI DSS Certified**: Secure payment processing
- **Church Data Integration**: Verified LDS membership system
- **Role-Based Access Control**: Granular permissions system

### Privacy Controls
- **Data Export**: User-initiated data download
- **Right to Deletion**: Complete data removal capability
- **Consent Management**: Granular privacy preferences
- **Audit Logging**: Complete activity tracking

##  Key Features Highlight

### For Event Participants
- **One-Click Registration**: Universal profile for all European events
- **Smart Event Discovery**: Personalized recommendations
- **Unified Communication**: No more WhatsApp chaos
- **Multi-Language Interface**: Native language support

### For Event Organizers
- **24-Month Planning Timeline**: Automated milestone tracking
- **Financial Dashboard**: 150 fee limit automation
- **Committee Management**: Role-based collaboration tools
- **Compliance Center**: Church guideline adherence

### For Area Leadership
- **Oversight Dashboard**: Europe-wide event monitoring
- **Reporting System**: Comprehensive analytics
- **Compliance Tracking**: Policy adherence monitoring
- **Resource Management**: Centralized content control

##  Contributing

### Contribution Guidelines
1. **Follow coding standards** (ESLint + Prettier configured)
2. **Write comprehensive tests** (>80% coverage required)
3. **Update documentation** for new features
4. **Follow Git commit conventions** (Conventional Commits)

### Code of Conduct
We are committed to providing a welcoming and inclusive environment for all contributors. Please review our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

### Feature Requests
- Use **GitHub Issues** for feature requests
- Follow the **feature request template**
- Provide clear use cases and acceptance criteria
- Include mockups or wireframes when applicable

##  Release Schedule

### 2024 Roadmap

| Quarter | Milestone | Features |
|---------|-----------|----------|
| **Q4 2024** | MVP Alpha | Core 13 features, basic UI |
| **Q1 2025** | MVP Beta | Full 22 features, testing |
| **Q2 2025** | Public Launch | Production release |
| **Q3 2025** | Enhancement Phase | Community features |

### Version Strategy
- **Semantic Versioning** (MAJOR.MINOR.PATCH)
- **Feature Flags** for gradual rollouts
- **Backward Compatibility** maintained
- **Migration Scripts** for major updates

##  Support & Contact

### Development Team
- **Technical Issues**: Create GitHub issue with detailed reproduction steps
- **Feature Discussions**: Use GitHub Discussions
- **Security Concerns**: Email security@risinggen.eu

### Community
- **User Support**: help@risinggen.eu
- **Feedback**: feedback@risinggen.eu
- **Partnerships**: partnerships@risinggen.eu

##  License & Legal

**Proprietary License** - This project is proprietary software owned by the RisingGen development team. 

### Important Legal Notice
> Any use, reproduction, distribution, or modification of this software outside of authorized development team members is strictly prohibited without written permission. This includes but is not limited to commercial use, derivative works, or redistribution in any form.

### Authorized Usage
- **Development Team Members**: Full access for project development
- **LDS Church Leadership**: Review and evaluation purposes
- **End Users**: Access through official deployment only

For licensing inquiries: legal@risinggen.eu

---

##  Acknowledgments

Special thanks to:
- **European Area YSA Leadership** for vision and guidance
- **YSA Community Members** for feedback and testing
- **Technical Advisors** for architecture guidance
- **Design Contributors** for UX/UI excellence

---

<div align="center">

**Made with  for European YSA Communities**

*"Draw Europe's young adults to the Savior and their covenants, enable faith-building connections with each other, facilitate conferences, broadly communicate activities, and build lifelong disciples."*

[ Official Website](https://risinggen.eu) | [ Contact Us](mailto:team@risinggen.eu) | [ Documentation](docs/README.md)

</div>
