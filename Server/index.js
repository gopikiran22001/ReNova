import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import pickupRoutes from './routes/pickupRoutes.js';
import centreRoutes from './routes/centreRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import cookieParser from 'cookie-parser';

// Load env vars
dotenv.config();

const app = express();

// CORS middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Body parsing middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/health',(req,res) => {
    console.log('Health API');
    res.status(200).send('Server Running');
})

// Define Routes
app.use('/auth', authRoutes);
app.use('/pickups', pickupRoutes);
app.use('/centres', centreRoutes);
app.use('/reports', reportRoutes);
app.use('/transactions', transactionRoutes);

const PORT = 5000;

async function startServer() {
    try {
        await connectDB().then(conn=>console.log(`MongoDB Connected: ${conn.connection.host}`));
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

startServer();
