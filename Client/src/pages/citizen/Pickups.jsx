import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Clock, CheckCircle, Calendar, XCircle } from 'lucide-react';

export default function Pickups() {
    const [pickups, setPickups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const { data } = await api.get('/pickups');
                if (data.success) {
                    setPickups(data.data.items || []);
                } else {
                    console.error('Failed to fetch pickups:', data.message);
                    setPickups([]);
                }
            } catch (error) {
                console.error('Error fetching pickups:', error);
                setPickups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPickups();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'assigned': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle className="h-6 w-6" />;
            case 'cancelled': return <XCircle className="h-6 w-6" />;
            default: return <Clock className="h-6 w-6" />;
        }
    };

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Pickups</h1>

            <div className="space-y-4">
                {pickups.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500">No pickups scheduled yet.</p>
                    </div>
                ) : (
                    pickups.map((pickup) => (
                        <div key={pickup._id} className="card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className={`p-3 rounded-full ${getStatusColor(pickup.status)} bg-opacity-20`}>
                                    {getStatusIcon(pickup.status)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{pickup.wasteType}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>{new Date(pickup.date).toLocaleDateString()}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>{pickup.weight}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(pickup.status)} capitalize`}>
                                {pickup.status}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
