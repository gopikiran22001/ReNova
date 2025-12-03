import React from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Check, UserPlus } from 'lucide-react';

export default function AdminPickups() {
    const { adminPickupsList, updatePickupStatus } = useData();
    const { addToast } = useToast();

    const handleAction = (id, action) => {
        if (action === 'approve') {
            updatePickupStatus(id, 'Scheduled');
            addToast('Pickup request approved', 'success');
        } else if (action === 'assign') {
            updatePickupStatus(id, 'Assigned');
            addToast('Collector assigned to pickup', 'success');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Pickups</h1>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {adminPickupsList.map((pickup) => (
                                <tr key={pickup.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">#{pickup.id}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{pickup.user}</td>
                                    <td className="px-6 py-4">{pickup.type}</td>
                                    <td className="px-6 py-4">{pickup.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${pickup.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                pickup.status === 'Assigned' ? 'bg-blue-100 text-blue-700' :
                                                    pickup.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {pickup.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        {pickup.status === 'Pending' && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(pickup.id, 'approve')}
                                                    className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                    title="Approve"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleAction(pickup.id, 'assign')}
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
