# ReNova - Waste Management System

A full-stack waste management application built with React frontend and Node.js/Express backend with MongoDB.

## Features

- **User Authentication**: JWT-based authentication with role-based access (Citizen, Collector, Admin)
- **Pickup Requests**: Citizens can schedule waste pickups with image uploads
- **Recycling Centers**: View nearby recycling centers and their capacity
- **Report Dumping**: Report illegal waste dumping with location and photos
- **Points System**: Earn and redeem points for recycling activities
- **Admin Dashboard**: Manage users, pickups, and reports
- **File Uploads**: Cloudinary integration for image storage

## Tech Stack

### Frontend
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for file uploads
- Helmet for security headers
- CORS for cross-origin requests

## Environment Variables

### Server (.env in Server directory)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/renova
JWT_SECRET=your_jwt_secret_key_change_this_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Client (.env in Client directory)
```
VITE_API_URL=http://localhost:5000/api
```

## Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd ReNova
```

2. **Install dependencies for all packages**
```bash
npm run install-all
```

3. **Set up environment variables**
   - Copy the environment variables above into `.env` files in respective directories
   - Update the values with your actual credentials

4. **Start MongoDB**
   - Make sure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/renova`

5. **Start the application**
```bash
npm start
```

This will start both the server (port 5000) and client (port 5173) concurrently.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user profile
- `GET /api/auth/users` - Get all users (Admin only)

### Pickups
- `POST /api/pickups` - Create pickup request
- `GET /api/pickups` - Get pickups (filtered by role)
- `GET /api/pickups/:id` - Get single pickup
- `PUT /api/pickups/:id/status` - Update pickup status

### Centers
- `GET /api/centres` - Get all recycling centers
- `POST /api/centres` - Create center (Admin only)
- `PUT /api/centres/:id` - Update center (Admin only)

### Reports
- `POST /api/reports` - Create dump report
- `GET /api/reports` - Get reports (filtered by role)
- `PUT /api/reports/:id/status` - Update report status

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create transaction (points)

### File Upload
- `POST /api/upload/single` - Upload single file
- `POST /api/upload/multiple` - Upload multiple files

## User Roles

### Citizen
- Schedule pickup requests
- View their pickups and status
- Report illegal dumping
- View recycling centers
- Manage points and rewards

### Collector
- View assigned and pending pickups
- Update pickup status
- View routes and assignments

### Admin
- Manage all users, pickups, and reports
- Create and manage recycling centers
- View system-wide analytics
- Assign collectors to pickups

## API Response Format

All API responses follow a standardized format:

**Success Response:**
```json
{
  "success": true,
  "data": {
    "user": {...},
    "items": [...],
    "total": 100,
    "page": 1,
    "pages": 10
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

## Manual Testing Checklist

### Authentication Flow
- [ ] Register new user with different roles
- [ ] Login with valid credentials
- [ ] Access protected routes when authenticated
- [ ] Logout and verify session cleared
- [ ] Try accessing protected routes when not authenticated

### Pickup Management
- [ ] Create pickup request with image upload
- [ ] View pickup list as citizen
- [ ] Update pickup status as collector/admin
- [ ] View pickup details

### File Upload
- [ ] Upload images during pickup creation
- [ ] Upload images during report creation
- [ ] Verify images are stored in Cloudinary

### Points System
- [ ] Earn points (admin/collector action)
- [ ] Redeem points as citizen
- [ ] View transaction history

### Admin Functions
- [ ] Create recycling centers
- [ ] View all users, pickups, reports
- [ ] Update statuses and manage system

## Security Features

- JWT tokens stored in httpOnly cookies
- Password hashing with bcryptjs
- CORS configuration for cross-origin requests
- Helmet for security headers
- Input validation and sanitization
- Role-based access control

## Development

### Running in Development Mode
```bash
# Start server only
npm run server

# Start client only
npm run client

# Start both
npm start
```

### Database Seeding
The application will create collections automatically when first used. For development, you may want to create an admin user manually through the registration endpoint.

## Production Deployment

1. Set `NODE_ENV=production` in server environment
2. Update `CLIENT_URL` to production frontend URL
3. Use secure MongoDB connection string
4. Enable HTTPS and set secure cookie flags
5. Use production Cloudinary credentials
6. Set strong JWT secret

## Troubleshooting

### Common Issues
- **CORS errors**: Check CLIENT_URL in server .env
- **Database connection**: Verify MongoDB is running and MONGO_URI is correct
- **File upload fails**: Check Cloudinary credentials
- **Authentication issues**: Verify JWT_SECRET is set and consistent

### Logs
Server logs are available in the console. In production, consider using structured logging with services like Winston.