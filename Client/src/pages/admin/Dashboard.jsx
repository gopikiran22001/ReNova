import React from 'react';
import { useData } from '../../context/DataContext';
import { Users, Truck, AlertTriangle, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
    const { stats } = useData();

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
                        <span className="font-bold">↑ 12%</span> vs yesterday
                    </p>
                </div>

                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-gray-500 font-medium">Total Waste</h3>
                        <BarChart3 className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalWaste}</p>
                    <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                        <span className="font-bold">↑ 5%</span> vs last week
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
                        All systems operational
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">New pickup request from Sector 4</p>
                                    <p className="text-xs text-gray-500">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
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
