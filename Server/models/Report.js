import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    reporterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        address: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['reported', 'analyzing', 'assigned', 'investigating', 'resolved', 'dismissed'],
        default: 'reported'
    },
    priority: {
        type: String,
        enum: ['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'],
        default: 'MEDIUM'
    },
    priorityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
    },
    assignedCollector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    aiProcessed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

// Index for efficient querying
reportSchema.index({ priority: -1, priorityScore: -1, createdAt: -1 });
reportSchema.index({ status: 1, assignedCollector: 1 });

export default mongoose.model('Report', reportSchema);
