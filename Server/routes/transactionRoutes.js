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

        const transaction = new  Transaction({
            userId: req.user.id,
            amount,
            type,
            description
        });

        await transaction.save();

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

        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: {
                transactions: transactions,
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
