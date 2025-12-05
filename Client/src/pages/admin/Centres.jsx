import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { Edit2, Save, Plus, X } from 'lucide-react';

export default function AdminCentres() {
    const { addToast } = useToast();
    const [centres, setCentres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [tempPercentage, setTempPercentage] = useState('');

    // Create Modal State
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newCentre, setNewCentre] = useState({
        name: '',
        address: '',
        capacity: '',
        acceptedTypes: [],
        openTime: '09:00',
        closeTime: '18:00'
    });

    const WASTE_TYPES = ['Dry Waste', 'Wet Waste', 'E-Waste', 'Plastic', 'Glass'];

    const fetchCentres = async () => {
        try {
            const { data } = await api.get('/centres');
            if (data.success) {
                setCentres(data.data.centers || []);
            }
        } catch (error) {
            console.error('Error fetching centres:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCentres();
    }, []);

    const startEditing = (centre) => {
        setEditingId(centre._id);
        const percentage = centre.capacity > 0 ? Math.round((centre.currentLoad / centre.capacity) * 100) : 0;
        setTempPercentage(percentage);
    };

    const saveCapacity = async (centre) => {
        try {
            const newLoad = Math.round((parseInt(tempPercentage) / 100) * centre.capacity);
            await api.put(`/centres/${centre._id}`, { currentLoad: newLoad });
            setEditingId(null);
            addToast('Centre capacity updated', 'success');
            fetchCentres();
        } catch (error) {
            addToast('Failed to update centre', 'error');
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: newCentre.name,
                location: {
                    address: newCentre.address
                },
                capacity: parseInt(newCentre.capacity),
                acceptedTypes: newCentre.acceptedTypes,
                openingHours: {
                    open: newCentre.openTime,
                    close: newCentre.closeTime
                }
            };

            const response = await api.post('/centres', payload);
            if (response.data.success) {
                addToast('Centre created successfully', 'success');
                setShowCreateModal(false);
                setNewCentre({
                    name: '',
                    address: '',
                    capacity: '',
                    acceptedTypes: [],
                    openTime: '09:00',
                    closeTime: '18:00'
                });
                fetchCentres();
            }
        } catch (error) {
            console.error(error);
            addToast(error.response?.data?.message || 'Failed to create centre', 'error');
        }
    };

    const toggleWasteType = (type) => {
        setNewCentre(prev => {
            if (prev.acceptedTypes.includes(type)) {
                return { ...prev, acceptedTypes: prev.acceptedTypes.filter(t => t !== type) };
            } else {
                return { ...prev, acceptedTypes: [...prev.acceptedTypes, type] };
            }
        });
    };

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Centre Management</h1>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <Plus className="h-4 w-4" /> Add Centre
                </button>
            </div>

            <div className="card overflow-hidden">
                <table className="w-full text-left text-sm text-gray-600">
                    <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4">Centre Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Load (%)</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {centres.map((centre) => {
                            const loadPercentage = centre.capacity > 0 ? Math.round((centre.currentLoad / centre.capacity) * 100) : 0;

                            return (
                                <tr key={centre._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{centre.name}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${centre.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {centre.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-full max-w-[100px] h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${loadPercentage > 90 ? 'bg-red-500' : loadPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${loadPercentage}%` }}
                                                ></div>
                                            </div>
                                            {editingId === centre._id ? (
                                                <input
                                                    type="number"
                                                    value={tempPercentage}
                                                    onChange={(e) => setTempPercentage(e.target.value)}
                                                    className="w-16 px-2 py-1 border rounded text-center"
                                                    min="0" max="100"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="font-medium">{loadPercentage}%</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingId === centre._id ? (
                                            <button
                                                onClick={() => saveCapacity(centre)}
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
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Create Centre Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">Add New Recycling Centre</h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Centre Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="e.g. Downtown Recycling Hub"
                                    value={newCentre.name}
                                    onChange={(e) => setNewCentre({ ...newCentre, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                <input
                                    type="text"
                                    required
                                    className="input-field"
                                    placeholder="Full address"
                                    value={newCentre.address}
                                    onChange={(e) => setNewCentre({ ...newCentre, address: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (kg)</label>
                                    <input
                                        type="number"
                                        required
                                        className="input-field"
                                        placeholder="1000"
                                        value={newCentre.capacity}
                                        onChange={(e) => setNewCentre({ ...newCentre, capacity: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Open</label>
                                        <input
                                            type="time"
                                            required
                                            className="input-field"
                                            value={newCentre.openTime}
                                            onChange={(e) => setNewCentre({ ...newCentre, openTime: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Close</label>
                                        <input
                                            type="time"
                                            required
                                            className="input-field"
                                            value={newCentre.closeTime}
                                            onChange={(e) => setNewCentre({ ...newCentre, closeTime: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Accepted Waste Types</label>
                                <div className="flex flex-wrap gap-2">
                                    {WASTE_TYPES.map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => toggleWasteType(type)}
                                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${newCentre.acceptedTypes.includes(type)
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                {newCentre.acceptedTypes.length === 0 && (
                                    <p className="text-xs text-red-500 mt-1">Please select at least one type</p>
                                )}
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={newCentre.acceptedTypes.length === 0}
                                    className="btn btn-primary"
                                >
                                    Create Centre
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
