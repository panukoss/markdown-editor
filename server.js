const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const greenlock = require('greenlock-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const USE_SSL = process.env.USE_SSL === 'true';
const DOMAIN = process.env.DOMAIN;
const LETSENCRYPT_EMAIL = process.env.LETSENCRYPT_EMAIL;
const NODE_ENV = process.env.NODE_ENV || 'production';

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Compression
app.use(compression());

// Logging
app.use(morgan('combined'));

// Force HTTPS in production
if (USE_SSL && NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure && req.get('X-Forwarded-Proto') !== 'https') {
      return res.redirect('https://' + req.get('Host') + req.url);
    }
    next();
  });
}

// Static file serving with proper cache headers
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1y',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    // Don't cache HTML files
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// SPA fallback - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server based on SSL configuration
if (USE_SSL && DOMAIN && LETSENCRYPT_EMAIL) {
  // Let's Encrypt configuration
  greenlock.init({
    packageRoot: __dirname,
    configDir: './greenlock.d',
    maintainerEmail: LETSENCRYPT_EMAIL,
    cluster: false,
    workers: 1
  }).ready((glx) => {
    // Handles ACME challenges and redirects to HTTPS
    glx.serveApp(app);
    console.log(`Server running with Let's Encrypt SSL on https://${DOMAIN}`);
  });
} else if (USE_SSL) {
  // Manual SSL certificate configuration
  const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH || './ssl/key.pem', 'utf8');
  const certificate = fs.readFileSync(process.env.SSL_CERT_PATH || './ssl/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  
  https.createServer(credentials, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
  });
  
  // HTTP redirect server
  http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  }).listen(PORT, () => {
    console.log(`HTTP Server redirecting to HTTPS on port ${PORT}`);
  });
} else {
  // HTTP only
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
    console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`);
  });
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});