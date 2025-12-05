import express from 'express';
import Report from '../models/Report.js';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// @desc    Create new report
// @route   POST /api/reports
// @access  Private
router.post('/', protect, upload.single('image'), async (req, res) => {
    try {
        const { address, description } = req.body;
        const imageUrl = req.file ? req.file.path : null;

        if (!description || !address) {
            return res.status(400).json({
                success: false,
                message: 'Please provide description and location'
            });
        }

        const report = new Report({
            reporterId: req.user.id,
            location: {
                address: address
            },
            description,
            imageUrl
        });

        await report.save();

        res.status(201).json({
            success: true,
            data: { item: report }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating report',
            error: error.message
        });
    }
});

// @desc    Get reports
// @route   GET /api/reports
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        let reports;

        if (req.user.role === 'citizen') {
            reports = await Report.find({ reporterId: req.user.id }).sort({ createdAt: -1 })
        } else {
            reports = await Report.find().sort({ createdAt: -1 })
        }

        res.status(200).json({
            success: true,
            data: {
                reports: reports,
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reports',
            error: error.message
        });
    }
});

// @desc    Update report status
// @route   PUT /api/reports/:id/status
// @access  Private (Admin/Collector)
router.put('/:id/status', protect, async (req, res) => {
    try {
        if (req.user.role === 'citizen') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update report status'
            });
        }

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: 'Report not found'
            });
        }

        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            });
        }

        report.status = status;
        if (status === 'resolved') {
            const userId = report.reporterId;
            const user = await User.findById(userId);
            user.points += 15;
            await user.save();
        }
        await report.save();

        res.status(200).json({
            success: true,
            data: { item: report }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating report status',
            error: error.message
        });
    }
});

export default router;
