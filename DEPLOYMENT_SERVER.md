# Production Server Deployment Guide

This guide covers deploying the Markdown Editor with a robust web server supporting both HTTP and HTTPS with automatic Let's Encrypt SSL certificates.

## Prerequisites

- Node.js 18+ (for bare metal deployment)
- Docker and Docker Compose (for containerized deployment)
- A domain name (for SSL certificates)
- Port 80 and 443 available on your server

## Configuration

1. **Copy the environment example file:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file with your configuration:**
   ```env
   # Basic configuration
   PORT=3000
   HTTPS_PORT=443
   NODE_ENV=production
   
   # SSL Configuration
   USE_SSL=true
   DOMAIN=yourdomain.com
   LETSENCRYPT_EMAIL=your-email@example.com
   ```

## Deployment Options

### Option 1: Docker Deployment (Recommended)

1. **Build and start the container:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the server:**
   ```bash
   docker-compose down
   ```

4. **Update and restart:**
   ```bash
   git pull
   docker-compose build
   docker-compose up -d
   ```

### Option 2: Bare Metal Deployment

1. **Install server dependencies:**
   ```bash
   npm install --production
   npm install express compression helmet morgan dotenv greenlock-express
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **For production, use a process manager like PM2:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name markdown-editor
   pm2 save
   pm2 startup
   ```

## SSL Configuration

### Automatic Let's Encrypt (Recommended)

1. Set these in your `.env`:
   ```env
   USE_SSL=true
   DOMAIN=yourdomain.com
   LETSENCRYPT_EMAIL=your-email@example.com
   ```

2. Ensure ports 80 and 443 are open in your firewall
3. The server will automatically obtain and renew certificates

### Manual SSL Certificates

1. Place your certificates in the `ssl/` directory:
   ```
   ssl/
   ├── key.pem
   └── cert.pem
   ```

2. Update `.env`:
   ```env
   USE_SSL=true
   SSL_KEY_PATH=./ssl/key.pem
   SSL_CERT_PATH=./ssl/cert.pem
   ```

## Security Features

The server includes:
- Helmet.js for security headers
- HSTS enforcement
- Content Security Policy
- Compression for performance
- Request logging
- Automatic HTTPS redirect

## Health Monitoring

Check server health:
```bash
curl http://your-server:3000/health
```

## Troubleshooting

### Let's Encrypt Issues
- Ensure your domain points to your server's IP
- Check that ports 80 and 443 are accessible
- Verify the email address is valid
- Check logs: `docker-compose logs` or PM2 logs

### Permission Issues
- Let's Encrypt needs write access to `greenlock.d/`
- In Docker, this is handled automatically
- On bare metal, ensure the Node process has write permissions

### SSL Certificate Issues
- Verify certificate paths in `.env`
- Check certificate validity: `openssl x509 -in cert.pem -text -noout`
- Ensure private key matches certificate

## Performance Tuning

1. **Enable HTTP/2:** Already enabled with HTTPS
2. **Static asset caching:** Configured for 1 year
3. **Gzip compression:** Enabled by default
4. **CDN:** Consider using Cloudflare or similar

## Backup

Important directories to backup:
- `greenlock.d/` - Let's Encrypt certificates
- `.env` - Your configuration
- `ssl/` - Manual certificates (if used)

## Monitoring

### With Docker:
```bash
# Container status
docker ps

# Resource usage
docker stats markdown-editor

# Logs
docker-compose logs -f --tail=100
```

### With PM2:
```bash
# Process status
pm2 status

# Logs
pm2 logs markdown-editor

# Monitoring dashboard
pm2 monit
```

## Updates

1. **Backup your `.env` file**
2. **Pull latest changes:**
   ```bash
   git pull
   ```
3. **Rebuild and restart:**
   - Docker: `docker-compose build && docker-compose up -d`
   - PM2: `npm run build && pm2 restart markdown-editor`

## Production Checklist

- [ ] Domain DNS configured
- [ ] Firewall rules allow ports 80 and 443
- [ ] `.env` file configured
- [ ] SSL certificates working
- [ ] Health endpoint responding
- [ ] Monitoring configured
- [ ] Backup strategy in place
- [ ] Update process documented