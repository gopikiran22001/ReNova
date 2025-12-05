import mongoose from 'mongoose';

const centreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    capacity: {
        type: Number, // in kg or percentage
        required: true
    },
    currentLoad: {
        type: Number,
        default: 0
    },
    acceptedTypes: [{
        type: String
    }],
    openingHours: {
        open: String,
        close: String
    },
    status: {
        type: String,
        enum: ['active', 'full', 'maintenance'],
        default: 'active'
    }
}, {
    timestamps: true,
});

export default mongoose.model('Centre', centreSchema);
