import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { MapPin, Navigation, Clock } from 'lucide-react';

export default function Centres() {
    const [centres, setCentres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCentres = async () => {
            try {
                const { data } = await api.get('/centres');
                if (data.success) {
                    setCentres(data.data.centers || []);
                } else {
                    console.error('Failed to fetch centres:', data.message);
                    setCentres([]);
                }
            } catch (error) {
                console.error('Error fetching centres:', error);
                setCentres([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCentres();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Recycling Centres Nearby</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {centres.map((centre) => {
                    const loadPercentage = centre.capacity > 0 ? Math.round((centre.currentLoad / centre.capacity) * 100) : 0;

                    return (
                        <div key={centre._id} className="card p-6 hover:border-primary-300 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{centre.name}</h3>
                                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                        <MapPin className="h-4 w-4" /> {centre.location?.address || "Address not available"}
                                    </p>
                                </div>
                                <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {centre.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-gray-400" />
                                    <span>Open: {centre.openingHours?.open || '9 AM'} - {centre.openingHours?.close || '6 PM'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${loadPercentage > 90 ? 'bg-red-500' : loadPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}></div>
                                    <span>Load: {loadPercentage}%</span>
                                </div>
                            </div>

                            <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
                                <Navigation className="h-4 w-4" /> Get Directions
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
