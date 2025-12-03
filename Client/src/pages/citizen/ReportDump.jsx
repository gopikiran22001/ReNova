import React, { useState } from 'react';
import { Camera, MapPin, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ReportDump() {
    const { addToast } = useToast();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            addToast('Report submitted successfully! Thank you for helping.', 'success');
            setImage(null);
            e.target.reset();
        }, 1500);
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
                            />
                            <button type="button" className="absolute right-2 top-2 text-xs bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 text-gray-600">
                                Use Current Location
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
