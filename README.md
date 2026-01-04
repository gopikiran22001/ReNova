<div align="center">

# 🌱 ReNova - Smart Waste Management Platform

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Revolutionizing Waste Management for a Cleaner Future**

A comprehensive MERN stack platform connecting citizens, waste collectors, and administrators for efficient waste disposal, recycling, and environmental sustainability.

[Features](#-features) • [Screenshots](#-screenshots) • [Installation](#-installation--setup) • [API Documentation](#-api-documentation) • [Tech Stack](#-technology-stack)

</div>

---

## 📋 Overview

ReNova is a full-stack waste management and recycling platform designed to create sustainable communities through smart recycling and efficient waste collection. The platform serves three types of users with distinct functionalities:

- **👤 Citizens** - Schedule pickups, report illegal dumping, earn rewards
- **🚛 Collectors** - Manage pickup routes, claim jobs, update statuses
- **🛡️ Admins** - Oversee operations, manage centers, analyze data

---

## ✨ Features

### 👤 **Citizen Features**

- 📅 **Schedule Pickups** - Request waste collection for different categories (Dry, Wet, E-Waste, Plastic, Glass) with specific weight ranges
- 📸 **Upload Evidence** - Attach photos of waste items for verification
- 📍 **Location Services** - Automatic address detection with geolocation support
- 🚨 **Report Illegal Dumping** - Report unauthorized waste disposal with photo evidence and location
- 📊 **Track Status** - Real-time monitoring of pickup request statuses
- 🏆 **Earn Points** - Get rewarded for responsible waste disposal (10 points per pickup, 15 per report)
- 🗺️ **Find Recycling Centers** - Locate nearby drop-off points and recycling facilities
- 💰 **Points History** - View transaction history and redeem rewards

### 🚛 **Collector Features**

- 📋 **Job Dashboard** - View all available and assigned pickup jobs
- ✅ **Claim Jobs** - Accept pickup requests from citizens
- 🗺️ **Route Navigation** - Access location details for efficient collection
- 🔄 **Status Updates** - Update pickup status (Pending → Assigned → Completed)
- 📦 **Job Details** - View waste type, weight, images, and location information

### 🛡️ **Admin Features**

- 📊 **Analytics Dashboard** - System-wide statistics and real-time metrics
  - Daily pickups count
  - Total waste collected (kg)
  - Pending reports
  - Active collectors
  - Waste composition analysis
  - Completion rate tracking
- 🏢 **Center Management** - Create and manage recycling centers
  - Set capacity and accepted waste types
  - Define operating hours
  - Monitor current load
  - Update status (Active/Full/Maintenance)
- 📝 **Report Management** - Review and resolve illegal dumping reports
  - Priority levels (LOW, MEDIUM, HIGH, EMERGENCY)
  - Status tracking (Reported → Investigating → Resolved)
  - Assign to collectors
- 👥 **User Management** - Oversee citizen and collector activities
- 📈 **System Reports** - Generate and export comprehensive reports

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](./ScreenShots/Screenshot%202026-01-04%20114842.png)
*Clean, modern landing page with quick access to key features*

### 📊 Admin Dashboard
![Admin Dashboard](./ScreenShots/Screenshot%202026-01-04%20114905.png)
*Comprehensive analytics with real-time system metrics and waste composition analysis*

### 📋 Reports Management
![Reports Management](./ScreenShots/Screenshot%202026-01-04%20114926.png)
*Manage illegal dumping reports with status tracking and export capabilities*

### 🔧 API Testing (Postman)
![API Testing](./ScreenShots/Screenshot%202026-01-04%20114812.png)
*Robust REST API with comprehensive endpoint testing*

---

## 🛠️ Technology Stack

### **Frontend**
- ⚛️ **React 19** - Modern UI library with hooks
- ⚡ **Vite** - Next-generation frontend tooling
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧭 **React Router DOM v7** - Client-side routing
- 📡 **Axios** - HTTP client with interceptors
- 🎭 **Framer Motion** - Animation library
- 🎯 **Lucide React** - Beautiful icon set
- 🎛️ **Headless UI** - Unstyled accessible components
- 📅 **React Day Picker** - Date selection component

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express.js v5** - Web application framework
- 🍃 **MongoDB** - NoSQL database
- 🔗 **Mongoose** - MongoDB object modeling
- 🔐 **JWT** - Secure authentication
- 🔒 **bcryptjs** - Password hashing
- 🍪 **cookie-parser** - Cookie handling
- 🛡️ **Helmet** - Security headers
- 🌐 **CORS** - Cross-origin resource sharing

### **Services & Tools**
- ☁️ **Cloudinary** - Image storage and optimization
- 📦 **Multer** - File upload handling
- 🗺️ **OpenStreetMap (Nominatim)** - Geocoding services
- 🔄 **Nodemon** - Development auto-restart

---

## 📦 Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB (Local installation or MongoDB Atlas)
- Cloudinary Account (for image uploads)
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/ReNova.git
cd ReNova
```

### **2. Backend Setup**

Navigate to the Server directory:
```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/renova
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### **3. Frontend Setup**

Open a new terminal and navigate to the Client directory:
```bash
cd Client
npm install
```

Create a `.env` file in the `Client` directory:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

### **4. Quick Start (Run Both)**

From the root directory:
```bash
# Install all dependencies
npm run install-all

# Run both client and server concurrently
npm start
```

---

## 🏗️ Project Structure

```
ReNova/
├── 📁 Client/                      # Frontend React Application
│   ├── 📁 public/                  # Static assets
│   ├── 📁 src/
│   │   ├── 📁 api/                 # API configuration
│   │   │   └── axios.js            # Axios instance with interceptors
│   │   ├── 📁 components/          # Reusable UI components
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── ProtectedRoute.jsx  # Route guards
│   │   │   ├── DatePicker.jsx      # Custom date picker
│   │   │   ├── ListboxSelect.jsx   # Dropdown component
│   │   │   └── PageTitleUpdater.jsx
│   │   ├── 📁 context/             # React Context providers
│   │   │   ├── AuthContext.jsx     # Authentication state
│   │   │   └── ToastContext.jsx    # Toast notifications
│   │   ├── 📁 layouts/             # Page layouts
│   │   │   └── Layout.jsx          # Main layout wrapper
│   │   ├── 📁 pages/               # Application pages
│   │   │   ├── Home.jsx
│   │   │   ├── Awareness.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── 📁 citizen/         # Citizen pages (6 pages)
│   │   │   ├── 📁 collector/       # Collector pages (2 pages)
│   │   │   └── 📁 admin/           # Admin pages (4 pages)
│   │   ├── 📁 utils/               # Helper functions
│   │   │   └── dateHelpers.js
│   │   ├── App.jsx                 # Route definitions
│   │   ├── main.jsx                # Application entry point
│   │   └── index.css               # Global styles
│   ├── index.html
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── vite.config.js              # Vite configuration
│   └── package.json
│
├── 📁 Server/                      # Backend Node.js Application
│   ├── 📁 config/                  # Configuration files
│   │   ├── db.js                   # MongoDB connection
│   │   └── cloudinary.js           # Cloudinary + Multer setup
│   ├── 📁 middleware/              # Custom middleware
│   │   └── authMiddleware.js       # JWT authentication
│   ├── 📁 models/                  # Mongoose schemas
│   │   ├── User.js                 # User model
│   │   ├── Pickup.js               # Pickup request model
│   │   ├── Centre.js               # Recycling center model
│   │   ├── Report.js               # Illegal dump report model
│   │   └── Transaction.js          # Points transaction model
│   ├── 📁 routes/                  # API routes
│   │   ├── authRoutes.js           # Authentication endpoints
│   │   ├── pickupRoutes.js         # Pickup CRUD operations
│   │   ├── centreRoutes.js         # Center management
│   │   ├── reportRoutes.js         # Report management
│   │   └── transactionRoutes.js    # Transaction handling
│   ├── index.js                    # Server entry point
│   └── package.json
│
├── 📁 ScreenShots/                 # Application screenshots
├── package.json                    # Root package.json
└── README.md                       # This file
```

---

## 🗄️ Database Schema

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'citizen' | 'collector' | 'admin',
  points: Number (default: 0),
  address: String,
  mobile: String,
  avatarUrl: String,
  timestamps: true
}
```

### **Pickup Model**
```javascript
{
  userId: ObjectId (ref: User),
  wasteType: 'Dry Waste' | 'Wet Waste' | 'E-Waste' | 'Plastic' | 'Glass',
  weight: 'Less than 1 kg' | '1 - 5 kg' | '5 - 10 kg' | 'More than 10 kg',
  date: Date,
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  imageUrl: String,
  status: 'pending' | 'assigned' | 'completed' | 'cancelled',
  collectorId: ObjectId (ref: User),
  timestamps: true
}
```

### **Centre Model**
```javascript
{
  name: String,
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  capacity: Number,
  currentLoad: Number (default: 0),
  acceptedTypes: [String],
  openingHours: { open: String, close: String },
  status: 'active' | 'full' | 'maintenance',
  timestamps: true
}
```

### **Report Model**
```javascript
{
  reporterId: ObjectId (ref: User),
  location: {
    address: String,
    coordinates: { lat: Number, lng: Number }
  },
  description: String,
  imageUrl: String,
  status: 'reported' | 'analyzing' | 'assigned' | 'investigating' | 'resolved' | 'dismissed',
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY',
  priorityScore: Number (0-100),
  assignedCollector: ObjectId (ref: User),
  aiProcessed: Boolean,
  timestamps: true
}
```

### **Transaction Model**
```javascript
{
  userId: ObjectId (ref: User),
  amount: Number,
  type: 'earned' | 'redeemed',
  description: String,
  date: Date,
  timestamps: true
}
```

---

## 🔌 API Documentation

### **Base URL**
```
http://localhost:5000
```

### **Authentication Routes** (`/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/auth/register` | Register new user | Public |
| POST | `/auth/login` | Login user | Public |
| POST | `/auth/logout` | Logout user | Public |
| GET | `/auth/me` | Get current user | Private |
| PUT | `/auth/updatedetails` | Update user profile | Private |
| GET | `/auth/users` | Get all users | Admin |
| GET | `/auth/user/:id` | Get user by ID | Admin |

### **Pickup Routes** (`/pickups`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/pickups` | Create new pickup | Private |
| GET | `/pickups` | Get pickups (role-filtered) | Private |
| GET | `/pickups/:id` | Get single pickup | Private |
| PUT | `/pickups/:id/status` | Update pickup status | Collector/Admin |

### **Centre Routes** (`/centres`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/centres` | Create recycling center | Admin |
| GET | `/centres` | Get all centers | Public |
| PUT | `/centres/:id` | Update center | Admin |

### **Report Routes** (`/reports`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/reports` | Create new report | Private |
| GET | `/reports` | Get reports (role-filtered) | Private |
| PUT | `/reports/:id/status` | Update report status | Admin/Collector |

### **Transaction Routes** (`/transactions`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/transactions` | Create transaction | Private |
| GET | `/transactions` | Get user transactions | Private |

### **Request/Response Examples**

#### Register User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "citizen",
  "mobile": "1234567890",
  "address": "123 Main St"
}

# Response
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "citizen",
      "points": 0
    }
  }
}
```

#### Create Pickup
```bash
POST /pickups
Content-Type: multipart/form-data

{
  "wasteType": "E-Waste",
  "weight": "1 - 5 kg",
  "date": "2026-01-10",
  "address": "123 Main St",
  "latitude": "17.385044",
  "longitude": "78.486671",
  "image": <file>
}

# Response
{
  "success": true,
  "data": {
    "item": {
      "_id": "...",
      "userId": "...",
      "wasteType": "E-Waste",
      "weight": "1 - 5 kg",
      "status": "pending",
      "imageUrl": "https://cloudinary.com/..."
    }
  }
}
```

---

## 🔐 Authentication

ReNova uses **JWT (JSON Web Tokens)** for secure authentication:

- Tokens are stored in **HTTP-only cookies** for security
- Token expiration: **30 days**
- Automatic token refresh on valid requests
- Role-based access control (RBAC)
- Protected routes with middleware

### **Authentication Flow**
1. User registers/logs in
2. Server generates JWT and sets HTTP-only cookie
3. Client automatically sends cookie with each request
4. Server validates token via middleware
5. User data attached to `req.user`

---

## 🎨 Design System

### **Color Palette**
- **Primary (Green)**: `#22c55e` - Eco-friendly, sustainability theme
- **Secondary (Blue)**: `#0ea5e9` - Trust, reliability
- **Gray Scale**: Tailwind's default gray palette
- **Status Colors**: 
  - Success: Green
  - Warning: Yellow/Orange
  - Error: Red
  - Info: Blue

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### **Components**
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`
- **Cards**: `.card` with hover effects
- **Inputs**: `.input-field` with focus states
- **Responsive**: Mobile-first approach

---

## 🎯 Key Features Implementation

### **Points System**
- Citizens earn **10 points** per completed pickup
- Citizens earn **15 points** per resolved report
- Points can be redeemed through the transaction system
- Real-time points tracking on dashboard

### **Image Upload**
- Cloudinary integration for optimized storage
- Supported formats: JPG, PNG, JPEG, WebP
- Automatic image optimization
- Secure upload with Multer middleware

### **Location Services**
- Geolocation support (latitude/longitude)
- Address storage for each pickup/report
- Ready for map integration (Google Maps/Mapbox)
- Reverse geocoding capability

### **Role-Based Access**
- **Citizens**: Request pickups, report dumps, view own data
- **Collectors**: View available jobs, claim jobs, update status
- **Admins**: Full system access, analytics, user management

---

## 🚀 Deployment

### **Backend Deployment (Heroku/Railway)**
```bash
# Set environment variables
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_production_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=production
```

### **Frontend Deployment (Vercel/Netlify)**
```bash
# Build command
npm run build

# Environment variables
VITE_API_URL=https://your-backend-url.com
```

---

## 🧪 Testing

### **API Testing with Postman**
Import the collection and test all endpoints:
- Authentication flows
- CRUD operations
- File uploads
- Role-based access

### **Manual Testing Checklist**
- [ ] User registration and login
- [ ] Citizen pickup request flow
- [ ] Collector job claiming and completion
- [ ] Admin dashboard analytics
- [ ] Image upload functionality
- [ ] Points system calculation
- [ ] Report submission and resolution

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### **Coding Standards**
- Use ES6+ syntax
- Follow React best practices
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR

---

## 📝 Future Enhancements

- [ ] **Real-time Updates** - WebSocket integration for live status updates
- [ ] **Map Integration** - Google Maps/Mapbox for visual location display
- [ ] **Route Optimization** - AI-powered route planning for collectors
- [ ] **AI Processing** - Automated report analysis and priority scoring
- [ ] **Email Notifications** - Status update notifications
- [ ] **Mobile App** - React Native version
- [ ] **Payment Gateway** - Points redemption system
- [ ] **Analytics Dashboard** - Advanced charts and insights
- [ ] **Multi-language Support** - Internationalization (i18n)
- [ ] **Dark Mode** - Theme switching

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI Components inspired by [Tailwind UI](https://tailwindui.com/)
- Image storage by [Cloudinary](https://cloudinary.com/)
- Geocoding by [OpenStreetMap](https://www.openstreetmap.org/)

---

<div align="center">

**Made with ❤️ for a Cleaner Planet 🌍**

⭐ Star this repo if you find it helpful!

</div>
