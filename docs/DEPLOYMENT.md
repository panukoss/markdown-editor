# Deployment Guide

This guide explains how to deploy the Markdown Editor as a static site.

## Build for Production

First, ensure all dependencies are installed and build the project:

```bash
npm install
npm run build
```

This creates a `dist/` directory with all static files ready for deployment.

## Deployment Options

### 1. Simple Web Server (Local Testing)

For local testing, you can use any static file server:

```bash
# Using Python
cd dist
python -m http.server 8000

# Using Node.js http-server
npx http-server dist -p 8000

# Using PHP
cd dist
php -S localhost:8000
```

### 2. Nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/markdown-editor/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Apache Configuration (.htaccess)

Place this in the `dist/` directory:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Cache static assets
<FilesMatch "\.(js|css|woff|woff2|ttf|png|jpg|jpeg|gif|ico)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

### 4. Cloud Platforms

#### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

#### Vercel
1. Import your project
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

#### GitHub Pages
1. Build locally: `npm run build`
2. Push `dist/` contents to `gh-pages` branch
3. Or use GitHub Actions:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 5. Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM nginx:alpine
COPY dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

Build and run:

```bash
docker build -t markdown-editor .
docker run -p 80:80 markdown-editor
```

## Environment Considerations

### Base URL / Sub-site Deployment

To deploy the application in a subdirectory (e.g., `https://example.com/markdown-editor/`):

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` to set your base URL:
   ```bash
   # For root deployment (default)
   VITE_BASE_URL=/

   # For sub-site deployment
   VITE_BASE_URL=/markdown-editor/
   ```

3. Build the application:
   ```bash
   npm run build
   ```

The base URL is configured at build time and cannot be changed after deployment. Make sure to set the correct `VITE_BASE_URL` before building.

### CORS
The app runs entirely in the browser. No CORS configuration needed.

### Security Headers
Recommended security headers for production:

```
Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: blob:;
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

## Build Optimization

The production build includes:
- Minified JavaScript and CSS
- Code splitting for better caching
- Optimized fonts (KaTeX for math rendering)
- Tree-shaking to remove unused code

## Testing the Deployment

After deployment, verify:
1. App loads correctly
2. Editor and preview sync properly
3. Export features work (PDF, DOCX, Markdown)
4. Dark mode toggles and persists
5. Copy functionality works
6. Keyboard shortcuts function

## Troubleshooting

### Blank Page
- Check console for errors
- Verify all files uploaded correctly
- Check base URL configuration

### Large Bundle Size
The ~3.5MB main bundle includes:
- Rich text editing libraries
- PDF generation
- DOCX generation
- Syntax highlighting
- Math rendering

This is normal for a feature-rich editor.

### 404 Errors
Ensure your web server redirects all routes to `index.html` (SPA requirement).

## Performance Tips

1. Enable gzip/brotli compression on your web server
2. Use a CDN for global distribution
3. Set appropriate cache headers for assets
4. Consider lazy-loading features if needed