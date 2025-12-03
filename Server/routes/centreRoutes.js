import express from 'express';
import Centre from '../models/Centre.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create new centre
// @route   POST /api/centres
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized as an admin' 
            });
        }

        const { name, location, capacity, acceptedTypes, openingHours } = req.body;

        if (!name || !capacity) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide name and capacity' 
            });
        }

        const centre = await Centre.create({
            name,
            location,
            capacity,
            acceptedTypes,
            openingHours
        });

        res.status(201).json({
            success: true,
            data: { item: centre }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating centre',
            error: error.message
        });
    }
});

// @desc    Get all centres
// @route   GET /api/centres
// @access  Public
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const centres = await Centre.find()
            .sort({ name: 1 })
            .skip(skip)
            .limit(limit);

        const total = await Centre.countDocuments();
        const pages = Math.ceil(total / limit);

        res.status(200).json({
            success: true,
            data: {
                items: centres,
                total,
                page,
                pages
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching centres',
            error: error.message
        });
    }
});

// @desc    Update centre
// @route   PUT /api/centres/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false,
                message: 'Not authorized as an admin' 
            });
        }

        const centre = await Centre.findById(req.params.id);

        if (!centre) {
            return res.status(404).json({ 
                success: false,
                message: 'Centre not found' 
            });
        }

        const updatedCentre = await Centre.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json({
            success: true,
            data: { item: updatedCentre }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating centre',
            error: error.message
        });
    }
});

export default router;
