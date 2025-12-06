import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import api from '../../api/axios';
import { Upload, Calendar, Weight, Trash2, MapPin } from 'lucide-react';
import ListboxSelect from '../../components/ListboxSelect';
import DatePicker from '../../components/DatePicker';

const WASTE_TYPES = ['Dry Waste', 'Wet Waste', 'E-Waste', 'Plastic', 'Glass'];
const WEIGHT_RANGES = ['Less than 1 kg', '1 - 5 kg', '5 - 10 kg', 'More than 10 kg'];

export default function RequestPickup() {
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        type: 'Dry Waste',
        weight: 'Less than 1 kg',
        date: '',
        location: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.date) {
            addToast('Please select a pickup date', 'error');
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('wasteType', formData.type);
            data.append('weight', formData.weight);
            data.append('date', formData.date);
            data.append('address', formData.location);
            if (formData.coordinates) {
                data.append('latitude', formData.coordinates.lat);
                data.append('longitude', formData.coordinates.lng);
            }
            if (imageFile) {
                data.append('image', imageFile);
            }

            await api.post('/pickups', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            addToast('Pickup scheduled successfully!', 'success');
            navigate('/citizen/pickups');
        } catch (error) {
            addToast(error.response?.data?.message || 'Failed to schedule pickup', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Schedule a Pickup</h1>

            <div className="card p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <ListboxSelect
                                label="Waste Type"
                                value={formData.type}
                                onChange={(val) => setFormData({ ...formData, type: val })}
                                options={WASTE_TYPES}
                                leftIcon={<Trash2 className="h-5 w-5 text-gray-400" />}
                            />
                        </div>

                        <div>
                            <ListboxSelect
                                label="Estimated Weight"
                                value={formData.weight}
                                onChange={(val) => setFormData({ ...formData, weight: val })}
                                options={WEIGHT_RANGES}
                                leftIcon={<Weight className="h-5 w-5 text-gray-400" />}
                            />
                        </div>
                    </div>

                    <div>
                        <DatePicker
                            label="Preferred Date"
                            value={formData.date ? new Date(formData.date) : null}
                            onChange={(date) => {
                                if (date) {
                                    // Adjust for timezone offset to ensure the date string represents the selected local date
                                    const offset = date.getTimezoneOffset() * 60000;
                                    const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 10);
                                    setFormData({ ...formData, date: localISOTime });
                                } else {
                                    setFormData({ ...formData, date: '' });
                                }
                            }}
                            min={new Date()}
                            leftIcon={<Calendar className="h-5 w-5 text-gray-400" />}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                            {image ? (
                                <div className="relative h-48 w-full">
                                    <img src={image} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setImage(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Click or drag image here</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary w-full py-3 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Submitting...' : 'Confirm Pickup Request'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
