# Deployment Guide

## Quick Start

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Zero configuration for Vite projects
- Automatic HTTPS
- Global CDN
- Free tier available

**Steps:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel auto-detects Vite
4. Click "Deploy"

### 2. Netlify

**Steps:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

**Or use Netlify Dashboard:**
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist` folder
3. Or connect your Git repository

**Configuration (`netlify.toml`):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. GitHub Pages

**Steps:**
1. Update `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/bitforge-project/', // Your repo name
})
```

2. Install gh-pages:
```bash
npm install -D gh-pages
```

3. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

### 4. AWS S3 + CloudFront

**Steps:**
1. Build the project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://bitforge-platform
```

3. Upload files:
```bash
aws s3 sync dist/ s3://bitforge-platform --delete
```

4. Configure bucket for static hosting
5. Create CloudFront distribution
6. Point domain to CloudFront

### 5. Docker

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

**Build and run:**
```bash
docker build -t bitforge-platform .
docker run -p 80:80 bitforge-platform
```

### 6. Traditional Web Server (Apache/Nginx)

**Build:**
```bash
npm run build
```

**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
server {
    listen 80;
    server_name bitforge.com;
    root /var/www/bitforge/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## Environment Variables

If you need environment variables:

1. Create `.env` file:
```env
VITE_API_URL=https://api.bitforge.com
VITE_ANALYTICS_ID=UA-XXXXXXXXX
```

2. Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

3. Set in deployment platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Build & Deploy → Environment
- GitHub Actions: Repository Settings → Secrets

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

### Cloudflare (Recommended for DNS)
1. Add site to Cloudflare
2. Update nameservers
3. Enable SSL/TLS
4. Configure page rules

## Performance Optimization

### Before Deployment

1. **Optimize Images:**
```bash
npm install -D vite-plugin-imagemin
```

2. **Enable Compression:**
- Gzip/Brotli enabled by default on most platforms

3. **Analyze Bundle:**
```bash
npm install -D rollup-plugin-visualizer
```

Add to `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react(), visualizer()],
});
```

### After Deployment

1. **Enable CDN caching**
2. **Configure cache headers**
3. **Enable HTTP/2**
4. **Add security headers**

## Security Headers

Add to your server configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src fonts.gstatic.com;
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Monitoring

### Analytics
- Google Analytics
- Plausible
- Fathom

### Error Tracking
- Sentry
- LogRocket
- Rollbar

### Performance
- Lighthouse CI
- WebPageTest
- GTmetrix

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Rollback Strategy

### Vercel/Netlify
- Use deployment history in dashboard
- One-click rollback to previous version

### Manual
1. Keep previous build artifacts
2. Tag releases in Git
3. Deploy from specific tag/commit

## Health Checks

Create a health check endpoint or use:
- Uptime Robot
- Pingdom
- StatusCake

## Backup Strategy

1. **Code**: Git repository (GitHub/GitLab)
2. **Builds**: Keep last 5 production builds
3. **Assets**: S3 or CDN backup

## Troubleshooting

### Blank Page After Deployment
- Check browser console for errors
- Verify `base` path in `vite.config.js`
- Check routing configuration

### 404 on Refresh
- Configure server for SPA routing
- Add redirect rules (see above)

### Assets Not Loading
- Check CORS headers
- Verify asset paths
- Check CDN configuration

### Slow Load Times
- Enable compression
- Optimize images
- Use CDN
- Enable caching

## Checklist

Before deploying:
- [ ] Run `npm run build` successfully
- [ ] Test production build locally (`npm run preview`)
- [ ] Check for console errors
- [ ] Test all routes
- [ ] Test responsive design
- [ ] Optimize images
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] Configure SSL/HTTPS
- [ ] Add security headers
- [ ] Set up monitoring
- [ ] Configure analytics
- [ ] Test performance (Lighthouse)
- [ ] Create backup strategy

## Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally first
- Check browser console

---

**Recommended Stack:**
- **Hosting**: Vercel or Netlify
- **DNS**: Cloudflare
- **Monitoring**: Sentry + Google Analytics
- **CI/CD**: GitHub Actions
