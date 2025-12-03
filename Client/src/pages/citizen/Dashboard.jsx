import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, List, MapPin, Award } from 'lucide-react';

export default function CitizenDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
                <p className="text-gray-600 mt-2">Here's what's happening with your recycling impact.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-none">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Award className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-primary-100 text-sm font-medium">Total Points</p>
                            <h3 className="text-3xl font-bold">1,250</h3>
                        </div>
                    </div>
                    <Link to="/citizen/points" className="text-sm text-primary-100 hover:text-white underline">View History</Link>
                </div>

                <div className="card p-6">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Waste Recycled</h3>
                    <p className="text-3xl font-bold text-gray-900">45.2 kg</p>
                    <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-[70%]"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Top 5% in your area!</p>
                </div>

                <div className="card p-6">
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Next Pickup</h3>
                    <p className="text-xl font-bold text-gray-900">Feb 15, 2025</p>
                    <p className="text-sm text-gray-500">E-Waste Collection</p>
                    <Link to="/citizen/pickups" className="mt-4 inline-block text-sm text-primary-600 font-medium hover:text-primary-700">View Schedule</Link>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <Link to="/citizen/request-pickup" className="card p-6 hover:border-primary-200 hover:bg-primary-50 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <Plus className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Request Pickup</h3>
                            <p className="text-sm text-gray-500">Schedule a new collection</p>
                        </div>
                    </div>
                </Link>

                <Link to="/citizen/pickups" className="card p-6 hover:border-primary-200 hover:bg-primary-50 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg group-hover:bg-purple-200 transition-colors">
                            <List className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">View Pickups</h3>
                            <p className="text-sm text-gray-500">Track status & history</p>
                        </div>
                    </div>
                </Link>

                <Link to="/citizen/centres" className="card p-6 hover:border-primary-200 hover:bg-primary-50 transition-colors group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-200 transition-colors">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">Recycle Centres</h3>
                            <p className="text-sm text-gray-500">Find drop-off points</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
