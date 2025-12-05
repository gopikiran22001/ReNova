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
        enum: ['reported', 'investigating', 'resolved', 'dismissed'],
        default: 'reported'
    }
},{
    timestamps:true,
});

export default mongoose.model('Report', reportSchema);
