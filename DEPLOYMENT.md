# ReNova Deployment & Migration Checklist

## Pre-Deployment Checklist

### Environment Setup
- [ ] Set up production MongoDB database
- [ ] Configure Cloudinary account for production
- [ ] Set up production domain/hosting
- [ ] Configure SSL certificates (HTTPS)

### Environment Variables
- [ ] Update server `.env` with production values:
  - [ ] `NODE_ENV=production`
  - [ ] `MONGO_URI` (production MongoDB connection string)
  - [ ] `JWT_SECRET` (strong, unique secret)
  - [ ] `CLIENT_URL` (production frontend URL)
  - [ ] Cloudinary credentials (production account)
- [ ] Update client `.env` with production API URL:
  - [ ] `VITE_API_URL` (production backend URL)

### Security Configuration
- [ ] Enable HTTPS in production
- [ ] Set secure cookie flags (`secure: true`)
- [ ] Configure CORS for production domains only
- [ ] Review and update Helmet security headers
- [ ] Ensure no sensitive data in client-side code

### Database Migration
- [ ] Create production database
- [ ] Run database migrations (if any)
- [ ] Create initial admin user
- [ ] Set up database backups
- [ ] Configure database monitoring

### Build & Deploy
- [ ] Build client for production (`npm run build`)
- [ ] Test production build locally
- [ ] Deploy server to hosting platform
- [ ] Deploy client to hosting platform
- [ ] Configure reverse proxy (if needed)

## Post-Deployment Verification

### Functionality Tests
- [ ] User registration works
- [ ] User login/logout works
- [ ] File uploads work (Cloudinary integration)
- [ ] Protected routes are secured
- [ ] API endpoints respond correctly
- [ ] Database operations work
- [ ] Email notifications work (if implemented)

### Performance & Monitoring
- [ ] Set up application monitoring
- [ ] Configure error logging
- [ ] Set up performance monitoring
- [ ] Configure database monitoring
- [ ] Set up uptime monitoring

### Security Verification
- [ ] HTTPS is enforced
- [ ] Security headers are present
- [ ] CORS is properly configured
- [ ] Authentication is working
- [ ] File upload security is in place
- [ ] No sensitive data exposed in client

## Production Environment Variables

### Server Environment
```bash
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/renova
JWT_SECRET=your_super_secure_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_production_cloud_name
CLOUDINARY_API_KEY=your_production_api_key
CLOUDINARY_API_SECRET=your_production_api_secret
CLIENT_URL=https://your-frontend-domain.com
```

### Client Environment
```bash
VITE_API_URL=https://your-backend-domain.com/api
```

## Common Deployment Platforms

### Backend Deployment Options
- **Heroku**: Easy deployment with add-ons for MongoDB
- **Railway**: Modern platform with good Node.js support
- **DigitalOcean App Platform**: Scalable with database options
- **AWS Elastic Beanstalk**: Enterprise-grade with full AWS integration
- **Vercel**: Good for serverless functions

### Frontend Deployment Options
- **Vercel**: Excellent for React apps with automatic deployments
- **Netlify**: Great for static sites with form handling
- **AWS S3 + CloudFront**: Enterprise solution with CDN
- **GitHub Pages**: Free option for public repositories

### Database Options
- **MongoDB Atlas**: Managed MongoDB service
- **AWS DocumentDB**: MongoDB-compatible service
- **DigitalOcean Managed Databases**: Cost-effective option

## Migration Scripts

### Create Admin User (Run once after deployment)
```javascript
// Create admin user via API or direct database insert
const adminUser = {
  name: "Admin User",
  email: "admin@renova.com",
  password: "hashed_password_here",
  role: "admin",
  points: 0
};
```

### Sample Data Creation (Optional)
```javascript
// Create sample recycling centers
const sampleCenters = [
  {
    name: "Downtown Recycling Center",
    location: {
      address: "123 Main St, City, State 12345",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    capacity: 1000,
    currentLoad: 250,
    acceptedTypes: ["Dry Waste", "Plastic", "Glass"],
    openingHours: { open: "8:00 AM", close: "6:00 PM" },
    status: "active"
  }
];
```

## Rollback Plan

### In Case of Issues
1. **Immediate Actions**:
   - [ ] Revert to previous deployment
   - [ ] Check error logs
   - [ ] Verify database integrity
   - [ ] Notify users if needed

2. **Investigation**:
   - [ ] Identify root cause
   - [ ] Test fix in staging environment
   - [ ] Plan re-deployment

3. **Recovery**:
   - [ ] Apply fixes
   - [ ] Re-deploy with fixes
   - [ ] Monitor for issues
   - [ ] Update documentation

## Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor application performance
- [ ] Check error logs regularly
- [ ] Update dependencies
- [ ] Backup database regularly
- [ ] Monitor disk space and resources
- [ ] Review security logs

### Monthly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Dependency updates
- [ ] Database optimization
- [ ] Cost analysis

## Support & Documentation

### For Developers
- API documentation available in README.md
- Environment setup instructions
- Local development guide
- Testing procedures

### For Operations
- Deployment procedures (this document)
- Monitoring setup
- Backup and recovery procedures
- Troubleshooting guide