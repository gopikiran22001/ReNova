import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { User, Mail, Phone, MapPin, Save, Camera } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Profile() {
    const { addToast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        bio: 'Passionate about recycling and keeping our planet clean.' // Bio not in model yet, keeping as placeholder or we can add it
    });
    const [loading, setLoading] = useState(true);

    const [avatar, setAvatar] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await api.get('/auth/me');
                if (data.success) {
                    const user = data.data.user;
                    setFormData({
                        name: user.name,
                        email: user.email,
                        phone: user.mobile || '',
                        address: typeof user.address === 'object' && user.address !== null
                            ? `${user.address.street || ''} ${user.address.city || ''} ${user.address.zipCode || ''}`.trim()
                            : user.address || '',
                        bio: 'Passionate about recycling and keeping our planet clean.'
                    });
                    if (user.avatarUrl) {
                        setAvatar(user.avatarUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                addToast('Failed to load profile', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(URL.createObjectURL(e.target.files[0]));
            setAvatarFile(e.target.files[0]);
            setIsEditing(true); // Auto-enable editing when photo changes
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('mobile', formData.phone);
            data.append('address', formData.address);
            if (avatarFile) {
                data.append('avatar', avatarFile);
            }

            const response = await api.put('/auth/updatedetails', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setIsEditing(false);
                addToast('Profile updated successfully!', 'success');
                // Update local avatar with returned url if needed, or just keep the preview
                if (response.data.data.user.avatarUrl) {
                    setAvatar(response.data.data.user.avatarUrl);
                }
            }
        } catch (error) {
            console.error(error);
            addToast('Failed to update profile', 'error');
        }
    };

    if (loading) return <div className="text-center py-12">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar / Photo */}
                <div className="md:col-span-1">
                    <div className="card p-6 text-center">
                        <div className="relative inline-block mb-4 group">
                            <div className="h-32 w-32 rounded-full bg-primary-100 flex items-center justify-center mx-auto overflow-hidden border-4 border-white shadow-lg">
                                {avatar ? (
                                    <img src={avatar} alt="Profile" className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-16 w-16 text-primary-400" />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 shadow-md transition-colors cursor-pointer">
                                <Camera className="h-4 w-4" />
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </label>
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
