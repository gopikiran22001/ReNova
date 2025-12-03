import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Profile() {
    const { addToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Green Street, Eco City, EC 45678',
        bio: 'Passionate about recycling and keeping our planet clean.'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        addToast('Profile updated successfully!', 'success');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar / Photo */}
                <div className="md:col-span-1">
                    <div className="card p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <div className="h-32 w-32 rounded-full bg-primary-100 flex items-center justify-center mx-auto overflow-hidden border-4 border-white shadow-lg">
                                <User className="h-16 w-16 text-primary-400" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 shadow-md transition-colors">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{formData.name}</h2>
                        <p className="text-gray-500 text-sm">Citizen</p>

                        <div className="mt-6 pt-6 border-t border-gray-100 text-left space-y-3">
                            <div className="flex items-center gap-3 text-gray-600">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-sm truncate">{formData.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{formData.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{formData.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-2">
                    <div className="card p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className={`btn ${isEditing ? 'btn-secondary' : 'btn-primary'} text-sm`}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="input-field"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    className="input-field bg-gray-50"
                                    value={formData.email}
                                    disabled={true} // Email usually immutable
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    rows="4"
                                    className="input-field"
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    disabled={!isEditing}
                                ></textarea>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="btn btn-primary flex items-center gap-2">
                                        <Save className="h-4 w-4" /> Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
