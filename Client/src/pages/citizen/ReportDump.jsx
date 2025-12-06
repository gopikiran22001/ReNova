import React, { useState } from 'react';
import { Camera, MapPin, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';

export default function ReportDump() {
    const { addToast } = useToast();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        location: '',
        description: ''
    });

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append('address', formData.location);
            if (formData.coordinates) {
                data.append('latitude', formData.coordinates.lat);
                data.append('longitude', formData.coordinates.lng);
            }
            data.append('description', formData.description);
            if (imageFile) {
                data.append('image', imageFile);
            }

            await api.post('/reports', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            addToast('Report submitted successfully! Thank you for helping.', 'success');
            setImage(null);
            setImageFile(null);
            setFormData({ location: '', description: '' });
        } catch (error) {
            addToast(error.response?.data?.message || 'Failed to submit report', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Report Illegal Dumping</h1>
                <p className="text-gray-600 mt-2">Help us keep the city clean by reporting waste spots.</p>
            </div>

            <div className="card p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Enter address or landmark"
                                className="input-field pl-10"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                            <button
                                type="button"
                                disabled={locationLoading}
                                onClick={() => {
                                    if (navigator.geolocation) {
                                        setLocationLoading(true);
                                        navigator.geolocation.getCurrentPosition(
                                            async (position) => {
                                                const { latitude, longitude } = position.coords;
                                                try {
                                                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                                                    const data = await response.json();
                                                    setFormData({
                                                        ...formData,
                                                        location: data.display_name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
                                                        coordinates: { lat: latitude, lng: longitude }
                                                    });
                                                    addToast('Location fetched successfully', 'success');
                                                } catch (error) {
                                                    console.error('Error fetching address:', error);
                                                    setFormData({
                                                        ...formData,
                                                        location: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
                                                        coordinates: { lat: latitude, lng: longitude }
                                                    });
                                                    addToast('Location fetched, but address lookup failed', 'warning');
                                                } finally {
                                                    setLocationLoading(false);
                                                }
                                            },
                                            (error) => {
                                                console.error(error);
                                                addToast('Unable to retrieve your location', 'error');
                                                setLocationLoading(false);
                                            }
                                        );
                                    } else {
                                        addToast('Geolocation is not supported by your browser', 'error');
                                    }
                                }}
                                className="absolute right-2 top-2 text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-50"
                            >
                                {locationLoading ? 'Fetching...' : 'Use Current Location'}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            rows="4"
                            className="input-field py-3"
                            placeholder="Describe the waste (e.g., construction debris, plastic bags...)"
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Photo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors cursor-pointer relative bg-gray-50">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {image ? (
                                <div className="relative h-48 w-full">
                                    <img src={image} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Camera className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Upload photo of the spot</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`btn bg-red-600 text-white hover:bg-red-700 w-full py-3 flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Submitting...' : <><Send className="h-5 w-5" /> Submit Report</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
