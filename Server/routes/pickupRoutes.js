import express from 'express';
import Pickup from '../models/Pickup.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();
// @desc    Create new pickup
// @route   POST /api/pickups
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        const { wasteType, weight, date, address, latitude, longitude } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        if (!wasteType || !weight || !date || !address) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: wasteType, weight, date, address'
            });
        }

        const pickup = new Pickup({
            userId: req.user.id,
            wasteType,
            weight,
            date,
            location: {
                address: address,
                coordinates: {
                    lat: latitude,
                    lng: longitude
                }
            },
            imageUrl
        });

        await pickup.save();

        res.status(201).json({
            success: true,
            data: { item: pickup }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating pickup request',
            error: error.message
        });
    }
});

// @desc    Get pickups
// @route   GET /api/pickups
// @access  Private
router.get('/', protect, async (req, res) => {
    try {

        let pickups;

        if (req.user.role === 'citizen') {
            pickups = await Pickup.find({ userId: req.user.id }).sort({ createdAt: -1 });
        } else if (req.user.role === 'collector') {
            pickups = await Pickup.find({
                $or: [
                    { status: 'pending' },
                    { collectorId: req.user.id }
                ]
            }).sort({ createdAt: -1 });
        } else {
            pickups = await Pickup.find().sort({ createdAt: -1 });
        }

        res.status(200).json({
            success: true,
            data: {
                pickups: pickups,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching pickups',
            error: error.message
        });
    }
});

// @desc    Get single pickup
// @route   GET /api/pickups/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const pickup = await Pickup.findById(req.params.id);

        if (!pickup) {
            return res.status(404).json({
                success: false,
                message: 'Pickup not found'
            });
        }

        // Check permissions
        if (req.user.role === 'citizen' && pickup.userId._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this pickup'
            });
        }

        res.status(200).json({
            success: true,
            data: { item: pickup }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching pickup',
            error: error.message
        });
    }
});

// @desc    Update pickup status
// @route   PUT /api/pickups/:id/status
// @access  Private (Collector/Admin)
router.put('/:id/status', protect, async (req, res) => {
    try {
        const pickup = await Pickup.findById(req.params.id);

        if (!pickup) {
            return res.status(404).json({
                success: false,
                message: 'Pickup not found'
            });
        }

        // Check permissions
        if (req.user.role === 'citizen') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update pickup status'
            });
        }

        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        if (status === 'assigned' && !pickup.collectorId) {
            pickup.collectorId = req.user.id;
        }

        if (status === 'completed') {
            const userId = pickup.userId;
            const user = await User.findById(userId);
            user.points += 10;
            await user.save();
        }

        pickup.status = status;
        await pickup.save();

        res.status(200).json({
            success: true,
            data: { item: pickup }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating pickup status',
            error: error.message
        });
    }
});

export default router;
