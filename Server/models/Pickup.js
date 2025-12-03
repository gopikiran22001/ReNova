const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    wasteType: {
        type: String,
        enum: ['Dry Waste', 'Wet Waste', 'E-Waste', 'Plastic', 'Glass'],
        required: true
    },
    weight: {
        type: String,
        enum: ['Less than 1 kg', '1 - 5 kg', '5 - 10 kg', 'More than 10 kg'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'assigned', 'completed', 'cancelled'],
        default: 'pending'
    },
    collectorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pickup', pickupSchema);
