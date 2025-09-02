# Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the RisingGen frontend application to various hosting platforms and environments.

## Frontend Deployment

### Current Status

- **Frontend**: ✅ Complete and ready for deployment
- **Backend**: ⏳ Pending development
- **Database**: ⏳ Pending setup
- **Authentication**: ⏳ Pending integration

### Build Process

The RisingGen frontend uses Vite for building and bundling:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Preview production build (optional)
npm run preview
```

### Build Output

The build process creates a `dist/` directory with:

- `index.html` - Main HTML file
- `assets/` - Optimized JavaScript, CSS, and static assets
- Optimized and tree-shaken code bundles
- Source maps for debugging (optional)

## Deployment Platforms

### Netlify (Recommended for Frontend)

**Advantages:**

- Excellent support for React/SPA applications
- Automatic deployments from Git
- Built-in form handling
- Custom domain support
- Free tier with generous limits

**Deployment Steps:**

1. **Connect Repository**:

   - Log in to Netlify
   - Click "New site from Git"
   - Connect to GitHub repository
   - Select `risinggen` repository

2. **Configure Build Settings**:

   - **Build command**: `cd frontend && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Node version**: 18 or later

3. **Environment Variables** (when backend is ready):

   ```bash
   VITE_API_URL=https://api.risinggen.eu
   VITE_ENVIRONMENT=production
   ```

4. **Netlify Configuration** (`netlify.toml`):

   ```toml
   [build]
     base = "frontend"
     command = "npm run build"
     publish = "dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Vercel (Alternative for Frontend)

**Advantages:**

- Optimized for React and modern frameworks
- Automatic deployments and previews
- Excellent performance and CDN
- Serverless functions support

**Deployment Steps:**

1. **Install Vercel CLI**:

   ```bash
   npm install -g vercel
   ```

2. **Deploy**:

   ```bash
   cd frontend
   vercel
   ```

3. **Vercel Configuration** (`vercel.json`):
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
   }
   ```

### Traditional Web Hosting

For shared hosting or VPS deployment:

1. **Build the application**:

   ```bash
   cd frontend
   npm run build
   ```

2. **Upload `dist/` contents** to web server document root

3. **Configure web server** for SPA routing:

   **Apache (`.htaccess`)**:

   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

   **Nginx**:

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## Backend Deployment (Future)

### Architecture Plan

When the backend is developed, consider this architecture:

```text
Frontend (Static) → CDN/Static Hosting (Netlify/Vercel)
Backend (API) → Application Server (Railway/Render/DigitalOcean)
Database → Cloud Database (Supabase/PlanetScale/Railway)
```

### Recommended Backend Platforms

#### Railway

**Advantages:**

- Easy deployment from Git
- Built-in database options
- Environment variable management
- Automatic scaling
- Good free tier

#### Render

**Advantages:**

- Static sites and backend services
- Automatic deployments
- PostgreSQL databases
- SSL certificates included

#### DigitalOcean App Platform

**Advantages:**

- Full-stack application deployment
- Database clusters
- CDN integration
- Scalable infrastructure

## Environment Configuration

### Development Environment

```bash
# .env.local (frontend)
VITE_API_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
```

### Production Environment

```bash
# Environment variables (set in hosting platform)
VITE_API_URL=https://api.risinggen.eu
VITE_ENVIRONMENT=production
```

### Environment Variables Needed

**Frontend:**

- `VITE_API_URL` - Backend API base URL
- `VITE_ENVIRONMENT` - Environment identifier
- `VITE_SENTRY_DSN` - Error tracking (optional)
- `VITE_GOOGLE_ANALYTICS_ID` - Analytics (optional)

**Backend (Future):**

- `DATABASE_URL` - Database connection string
- `JWT_SECRET` - Authentication secret
- `CORS_ORIGIN` - Frontend URL for CORS
- `EMAIL_API_KEY` - Email service API key
- `NODE_ENV` - Environment identifier

## Custom Domain Setup

### DNS Configuration

1. **Purchase domain** (e.g., `risinggen.eu`)

2. **Configure DNS records**:

   ```text
   Type: CNAME
   Name: www
   Value: [hosting-platform-url]

   Type: A (if supported)
   Name: @
   Value: [hosting-platform-ip]
   ```

### SSL Certificate

Most modern hosting platforms (Netlify, Vercel, etc.) provide automatic SSL certificates via Let's Encrypt.

## Performance Optimization

### Build Optimization

Current Vite configuration already includes:

- **Code splitting**: Automatic route-based splitting
- **Tree shaking**: Dead code elimination
- **Minification**: JavaScript and CSS compression
- **Asset optimization**: Image and SVG optimization

### Additional Optimizations

1. **Image Optimization**:

   ```bash
   # Install image optimization plugin
   npm install --save-dev vite-plugin-imagemin
   ```

2. **Bundle Analysis**:

   ```bash
   # Analyze bundle size
   npm run build -- --analyze
   ```

3. **Preloading**:
   ```html
   <!-- In index.html -->
   <link
     rel="preload"
     href="/fonts/inter.woff2"
     as="font"
     type="font/woff2"
     crossorigin
   />
   ```

## Monitoring and Analytics

### Error Tracking (Recommended)

**Sentry Integration**:

```bash
npm install @sentry/react @sentry/tracing
```

```tsx
// In main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

### Analytics (Optional)

**Google Analytics 4**:

```bash
npm install @google-analytics/gtag
```

### Performance Monitoring

**Web Vitals**:

```bash
npm install web-vitals
```

```tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Security Considerations

### Content Security Policy

```html
<!-- In index.html -->
<meta
  http-equiv="Content-Security-Policy"
  content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.risinggen.eu;
"
/>
```

### Environment Variables

- Never commit sensitive keys to version control
- Use platform environment variables for secrets
- Prefix frontend env vars with `VITE_`

## Backup and Recovery

### Version Control

- All code is backed up in Git repository
- Use Git tags for release versions
- Maintain separate branches for environments

### Database Backup (Future)

When backend is implemented:

- Automated daily database backups
- Point-in-time recovery capabilities
- Cross-region backup storage

## Deployment Checklist

### Pre-Deployment

- [ ] Run tests: `npm test`
- [ ] Build successfully: `npm run build`
- [ ] Check for TypeScript errors: `npm run type-check`
- [ ] Lint code: `npm run lint`
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all routes work correctly
- [ ] Check mobile responsiveness
- [ ] Test accessibility with screen readers

### Post-Deployment

- [ ] Verify site loads correctly
- [ ] Test all navigation links
- [ ] Check mobile and desktop views
- [ ] Verify form submissions (when backend ready)
- [ ] Test performance with Lighthouse
- [ ] Check browser console for errors
- [ ] Verify analytics tracking (if configured)

### Ongoing Monitoring

- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Review user feedback
- [ ] Update dependencies regularly
- [ ] Monitor security vulnerabilities

## Rollback Procedure

### Netlify/Vercel

1. **Access deployment history** in platform dashboard
2. **Select previous working deployment**
3. **Click "Publish deploy"** or equivalent
4. **Verify rollback** successful

### Git-based Rollback

```bash
# Revert to previous commit
git revert HEAD

# Or reset to specific commit (use carefully)
git reset --hard [commit-hash]

# Push changes
git push origin main
```

## Future Deployment Considerations

### Microservices Architecture

As the platform grows, consider splitting into:

- **Frontend**: Static site (current)
- **API Gateway**: Request routing and authentication
- **Event Service**: Event management
- **Community Service**: User interactions
- **Content Service**: Content management
- **Notification Service**: Email and push notifications

### Scaling Strategy

1. **Phase 1**: Static frontend + single backend service
2. **Phase 2**: CDN integration + database optimization
3. **Phase 3**: Microservices + container orchestration
4. **Phase 4**: Multi-region deployment + edge computing

## Support and Maintenance

### Regular Tasks

- **Weekly**: Monitor performance and errors
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Performance optimization review
- **Annually**: Architecture and technology review

### Emergency Contacts

- **Platform Issues**: Hosting platform support
- **Domain Issues**: Domain registrar support
- **SSL Issues**: Certificate authority support
- **Code Issues**: Development team

---

_Last updated: September 2, 2025_
_Status: Frontend Deployment Ready_
_Next: Backend Development and Integration_
