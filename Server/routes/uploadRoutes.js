import express from 'express';
import upload from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload single file
// @route   POST /api/upload/single
// @access  Private
router.post('/single', protect, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                url: req.file.path,
                public_id: req.file.filename
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message
        });
    }
});

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', protect, upload.array('files', 5), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        const uploadedFiles = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));

        res.status(200).json({
            success: true,
            data: uploadedFiles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'File upload failed',
            error: error.message
        });
    }
});

export default router;