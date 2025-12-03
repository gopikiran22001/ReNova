import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Users, Truck, AlertTriangle, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        dailyPickups: 0,
        totalWaste: '0 kg',
        pendingReports: 0,
        activeCollectors: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch pickups
                const { data: pickupsResponse } = await api.get('/pickups');
                const pickups = pickupsResponse.success ? pickupsResponse.data.items : [];
                
                const today = new Date().toISOString().split('T')[0];
                const dailyPickups = pickups.filter(p => {
                    return p.date && p.date.startsWith(today);
                }).length;

                // Fetch reports
                const { data: reportsResponse } = await api.get('/reports');
                const reports = reportsResponse.success ? reportsResponse.data.items : [];
                const pendingReports = reports.filter(r => r.status === 'reported').length;

                // Fetch users
                const { data: usersResponse } = await api.get('/auth/users');
                const users = usersResponse.success ? usersResponse.data.items : [];
                const activeCollectors = users.filter(u => u.role === 'collector').length;

                setStats({
                    dailyPickups,
                    totalWaste: `${pickups.filter(p => p.status === 'completed').length * 5} kg`,
                    pendingReports,
                    activeCollectors
                });

                // Recent activity
                const activity = [...pickups, ...reports]
                    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
                    .slice(0, 5);
                setRecentActivity(activity);

            } catch (error) {
                console.error('Error fetching admin stats:', error);
                setStats({
                    dailyPickups: 0,
                    totalWaste: '0 kg',
                    pendingReports: 0,
                    activeCollectors: 0
                });
                setRecentActivity([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Overview</h1>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Daily Pickups</h3>
                        <Truck className="h-5 w-5 text-blue-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.dailyPickups}</p>
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                        <span className="font-bold">Today</span>
                    </p>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Waste</h3>
                        <BarChart3 className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalWaste}</p>
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                        <span className="font-bold">Estimated</span>
                    </p>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Pending Reports</h3>
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingReports}</p>
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
                        <span className="font-bold">Action needed</span>
                    </p>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Active Collectors</h3>
                        <Users className="h-5 w-5 text-purple-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeCollectors}</p>
                    <p className="text-gray-500 text-sm mt-2">
                        System Status: OK
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="space-y-4">
                            {recentActivity.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {item.wasteType ? `New pickup request: ${item.wasteType}` : `New report: ${item.location?.address || 'Location not available'}`}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(item.createdAt || item.date).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Waste Composition</h3>
                    <div className="flex items-end gap-4 h-48 mt-8 px-4">
                        <div className="w-full bg-blue-100 rounded-t-lg relative group">
                            <div className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all h-[40%] group-hover:bg-blue-600"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">Dry</span>
                        </div>
                        <div className="w-full bg-green-100 rounded-t-lg relative group">
                            <div className="absolute bottom-0 w-full bg-green-500 rounded-t-lg transition-all h-[60%] group-hover:bg-green-600"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">Wet</span>
                        </div>
                        <div className="w-full bg-purple-100 rounded-t-lg relative group">
                            <div className="absolute bottom-0 w-full bg-purple-500 rounded-t-lg transition-all h-[25%] group-hover:bg-purple-600"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">E-Waste</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
