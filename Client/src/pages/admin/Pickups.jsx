import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { Check, UserPlus } from 'lucide-react';

export default function AdminPickups() {
    const { addToast } = useToast();
    const [pickups, setPickups] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPickups = async () => {
        try {
            const { data } = await api.get('/pickups');
            if (data.success) {
                setPickups(data.data.items || []);
            }
        } catch (error) {
            console.error('Error fetching pickups:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPickups();
    }, []);

    const handleAction = async (id, action) => {
        try {
            let status = 'pending';
            if (action === 'approve') status = 'assigned'; // Assuming approve means assigning to a collector (or self for now)
            else if (action === 'assign') status = 'assigned';

            await api.put(`/pickups/${id}/status`, { status });
            addToast(`Pickup ${status} successfully`, 'success');
            fetchPickups();
        } catch (error) {
            addToast('Failed to update pickup', 'error');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Pickups</h1>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Waste Type</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {pickups.map((pickup) => (
                                <tr key={pickup._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">#{pickup._id.slice(-6)}</td>
                                    <td className="px-6 py-4">{pickup.wasteType}</td>
                                    <td className="px-6 py-4">{new Date(pickup.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${pickup.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            pickup.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {pickup.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        {pickup.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(pickup._id, 'assign')}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                    title="Assign Collector"
                                                >
                                                    <UserPlus className="h-4 w-4" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
