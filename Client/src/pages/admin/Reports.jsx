import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Download, FileText, PieChart, BarChart3 } from 'lucide-react';

export default function AdminReports() {
    const [stats, setStats] = useState({
        wasteByType: {},
        pickupsByStatus: {}
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: pickupsResponse } = await api.get('/pickups');
                const pickups = pickupsResponse.success ? pickupsResponse.data.pickups : [];

                // Calculate waste by type
                const wasteByType = pickups.reduce((acc, p) => {
                    acc[p.wasteType] = (acc[p.wasteType] || 0) + 1;
                    return acc;
                }, {});

                // Calculate pickups by status
                const pickupsByStatus = pickups.reduce((acc, p) => {
                    acc[p.status] = (acc[p.status] || 0) + 1;
                    return acc;
                }, {});

                setStats({ wasteByType, pickupsByStatus });
            } catch (error) {
                console.error('Error fetching report data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
                <button className="btn btn-primary flex items-center gap-2">
                    <Download className="h-4 w-4" /> Export All
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Waste Type Analysis</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {Object.keys(stats.wasteByType).length > 0 ? (
                            <ul className="space-y-2">
                                {Object.entries(stats.wasteByType).map(([type, count]) => (
                                    <li key={type} className="flex justify-between items-center">
                                        <span className="text-gray-700 capitalize">{type}</span>
                                        <span className="font-bold text-gray-900">{count} pickups</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-400">No data available</p>
                        )}
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Pickup Status Overview</h3>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        {Object.keys(stats.pickupsByStatus).length > 0 ? (
                            <ul className="space-y-2">
                                {Object.entries(stats.pickupsByStatus).map(([status, count]) => (
                                    <li key={status} className="flex justify-between items-center">
                                        <span className="text-gray-700 capitalize">{status}</span>
                                        <span className="font-bold text-gray-900">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-400">No data available</p>
                        )}
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">Available Reports</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {['Daily Pickup Log', 'User Activity Report', 'Centre Capacity History', 'Illegal Dumping Heatmap', 'Financial Summary'].map((report, i) => (
                    <div key={i} className="card p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                <FileText className="h-5 w-5 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-700">{report}</span>
                        </div>
                        <Download className="h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                    </div>
                ))}
            </div>
        </div>
    );
}


