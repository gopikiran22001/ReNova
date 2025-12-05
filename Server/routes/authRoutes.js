import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, address, mobile } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email, and password'
            });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'citizen',
            address,
            mobile
        });

        await user.save();

        const token = generateToken(user._id);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    mobile: user.mobile,
                    avatarUrl: user.avatarUrl,
                    points: user.points
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error during registration',
            error: error.message
        });
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Check for user email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Email'
            });
        }

        if (user && (await bcryptjs.compare(password, user.password))) {
            const token = generateToken(user._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            });

            res.json({
                success: true,
                data: {
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        mobile: user.mobile,
                        avatarUrl: user.avatarUrl,
                        points: user.points
                    }
                }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid Password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        success: true,
        data: { message: 'Logged out successfully' }
    });
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    role: req.user.role,
                    mobile: req.user.mobile,
                    avatarUrl: req.user.avatarUrl,
                    points: req.user.points,
                    address: req.user.address
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user data',
            error: error.message
        });
    }
});



// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
router.put('/updatedetails', protect, upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.name = req.body.name || user.name;
        user.mobile = req.body.mobile || user.mobile;

        if (req.body.address) {
            user.address = req.body.address;
        }

        if (req.file) {
            user.avatarUrl = req.file.path;
        }

        const updatedUser = await user.save();

        res.json({
            success: true,
            data: {
                user: {
                    id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role,
                    mobile: updatedUser.mobile,
                    avatarUrl: updatedUser.avatarUrl,
                    address: updatedUser.address,
                    points: updatedUser.points
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating user details',
            error: error.message
        });
    }
});

router.get('/user/:id', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as an admin'
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    mobile: user.mobile,
                    avatarUrl: user.avatarUrl,
                    points: user.points,
                    address: user.address
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching user data',
            error: error.message
        });
    }
});

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private/Admin
router.get('/users', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized as an admin'
            });
        }

        const users = await User.find().select('-password').sort({ createdAt: -1 });

        res.json({
            success: true,
            data: {
                users: users,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
});

export default router;
