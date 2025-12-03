import express from 'express';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create new transaction (e.g. points earned/redeemed)
// @route   POST /api/transactions
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { amount, type, description } = req.body;

        if (!amount || !type || !description) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide amount, type, and description' 
            });
        }

        // Restrict 'earned' transactions to admin/collectors only
        if (type === 'earned' && !['admin', 'collector'].includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to create earned transactions'
            });
        }

        // Check if user has enough points for redemption
        if (type === 'redeemed') {
            const user = await User.findById(req.user.id);
            if (user.points < amount) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient points for redemption'
                });
            }
        }

        const transaction = await Transaction.create({
            userId: req.user.id,
            amount,
            type,
            description
        });

        // Update user points
        const user = await User.findById(req.user.id);
        if (type === 'earned') {
            user.points += amount;
        } else if (type === 'redeemed') {
            user.points -= amount;
        }
        await user.save();

        res.status(201).json({
            success: true,
            data: { item: transaction }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating transaction',
            error: error.message
        });
    }
});

// @desc    Get transactions
// @route   GET /api/transactions
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        let query = {};
        
        if (req.user.role === 'citizen') {
            query = { userId: req.user.id };
        }
        // Admin sees all transactions

        const transactions = await Transaction.find(query)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Transaction.countDocuments(query);
        const pages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: {
                items: transactions,
                total,
                page,
                pages
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching transactions',
            error: error.message
        });
    }
});

export default router;
