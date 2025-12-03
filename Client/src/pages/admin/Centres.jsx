import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Edit2, Save } from 'lucide-react';

export default function AdminCentres() {
    const { centres, updateCentreCapacity } = useData();
    const { addToast } = useToast();
    const [editingId, setEditingId] = useState(null);
    const [tempCapacity, setTempCapacity] = useState('');

    const startEditing = (centre) => {
        setEditingId(centre.id);
        setTempCapacity(centre.capacity);
    };

    const saveCapacity = (id) => {
        updateCentreCapacity(id, tempCapacity);
        setEditingId(null);
        addToast('Centre capacity updated', 'success');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Centre Management</h1>

            <div className="card overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Centre Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Capacity (%)</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {centres.map((centre) => (
                            <tr key={centre.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{centre.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${centre.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {centre.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${centre.capacity > 90 ? 'bg-red-500' : centre.capacity > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${centre.capacity}%` }}
                                            ></div>
                                        </div>
                                        {editingId === centre.id ? (
                                            <input
                                                type="number"
                                                value={tempCapacity}
                                                onChange={(e) => setTempCapacity(e.target.value)}
                                                className="w-16 px-2 py-1 border rounded text-center"
                                                min="0" max="100"
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="font-medium">{centre.capacity}%</span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {editingId === centre.id ? (
                                        <button
                                            onClick={() => saveCapacity(centre.id)}
                                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                                        >
                                            <Save className="h-4 w-4" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(centre)}
                                            className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
