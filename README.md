# ReNova ♻️

ReNova is a comprehensive waste management and recycling platform designed to connect citizens, waste collectors, and administrators. It facilitates efficient waste disposal, recycling centre management, and illegal dumping reporting.

## 🚀 Features

### 👤 Citizen
- **Schedule Pickups**: Request waste pickup for different categories (Dry, Wet, E-Waste, etc.) with specific weight ranges.
- **Report Issues**: Report illegal dumping spots with geolocation and photo evidence.
- **Track Status**: Monitor the status of pickup requests.
- **Earn Points**: Get rewarded for responsible waste disposal.

### 🚛 Collector
- **Job Management**: View and claim available pickup jobs.
- **Route Optimization**: Access location details for efficient collection (feature implied).
- **Status Updates**: Update the status of pickups (Assigned, In Progress, Completed).

### 🛡️ Admin
- **Dashboard**: View system-wide statistics (Waste composition, Pickup statuses).
- **Centre Management**: Create and manage recycling centres, including capacity and location.
- **Report Management**: Review and resolve illegal dumping reports.
- **User Management**: Oversee citizen and collector activities.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- Lucide React (Icons)
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)

**Services & Tools:**
- **Cloudinary**: For storing image uploads (Pickup items, Report evidence).
- **OpenStreetMap (Nominatim)**: For reverse geocoding coordinates to addresses.
- **JWT**: For secure authentication.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Cloudinary Account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd ReNova
```

### 2. Backend Setup
Navigate to the Server directory and install dependencies:
```bash
cd Server
npm install
```

Create a `.env` file in the `Server` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/renova
JWT_SECRET=your_super_secret_key
# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the server:
```bash
npm run dev
# or
npm start
```

### 3. Frontend Setup
Open a new terminal, navigate to the Client directory, and install dependencies:
```bash
cd Client
npm install
```

Create a `.env` file in the `Client` directory (optional if using default localhost:5000):
```env
VITE_API_URL=http://localhost:5000/api
```

Start the client:
```bash
npm run dev
```

## 🏗️ Project Structure

```
ReNova/
├── Client/                 # Frontend React Application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context (Auth, Toast)
│   │   ├── layouts/       # Page layouts (Dashboard, etc.)
│   │   ├── pages/         # Application pages
│   │   └── utils/         # Helper functions
│   └── ...
├── Server/                 # Backend Node.js Application
│   ├── config/            # DB and Service configs
│   ├── controllers/       # Route logic
│   ├── middleware/        # Auth and upload middleware
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes
│   └── ...
└── ...
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.
