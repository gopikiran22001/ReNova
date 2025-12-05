import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['citizen', 'collector', 'admin'],
        default: 'citizen'
    },
    points: {
        type: Number,
        default: 0
    },
    address: {
        street: String,
        city: String,
        zipCode: String
    },
    mobile: {
        type: String
    },
    avatarUrl: {
        type: String
    }
},{
    timestamps:true,
});

export default mongoose.model('User', userSchema);
