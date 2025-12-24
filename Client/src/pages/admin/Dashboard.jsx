import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import {
    Users, Truck, AlertTriangle, BarChart3,
    TrendingUp, TrendingDown, Clock, CheckCircle,
    XCircle, Package, Recycle, Zap, Calendar,
    MapPin, Activity
} from 'lucide-react';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        dailyPickups: 0,
        totalWaste: 0,
        pendingReports: 0,
        activeCollectors: 0,
        completedPickups: 0,
        totalPickups: 0,
        trends: {
            pickups: 0,
            waste: 0,
            reports: 0
        }
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [wasteData, setWasteData] = useState({
        dry: 0,
        wet: 0,
        ewaste: 0,
        hazardous: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch pickups
                const { data: pickupsResponse } = await api.get('/pickups');
                const pickups = pickupsResponse.success ? pickupsResponse.data.pickups : [];

                const today = new Date().toISOString().split('T')[0];
                const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

                const dailyPickups = pickups.filter(p => p.date && p.date.startsWith(today)).length;
                const yesterdayPickups = pickups.filter(p => p.date && p.date.startsWith(yesterday)).length;
                const completedPickups = pickups.filter(p => p.status === 'completed').length;

                // Calculate waste by type
                const wasteByType = pickups.reduce((acc, p) => {
                    const type = p.wasteType?.toLowerCase() || 'dry';
                    acc[type] = (acc[type] || 0) + 1;
                    return acc;
                }, {});

                setWasteData({
                    dry: wasteByType.dry || 0,
                    wet: wasteByType.wet || 0,
                    ewaste: wasteByType['e-waste'] || 0,
                    hazardous: wasteByType.hazardous || 0
                });

                // Fetch reports
                const { data: reportsResponse } = await api.get('/reports');
                const reports = reportsResponse.success ? reportsResponse.data.reports : [];
                const pendingReports = reports.filter(r => r.status === 'reported').length;
                const yesterdayReports = reports.filter(r => {
                    const reportDate = new Date(r.createdAt).toISOString().split('T')[0];
                    return reportDate === yesterday && r.status === 'reported';
                }).length;

                // Fetch users
                const { data: usersResponse } = await api.get('/auth/users');
                const users = usersResponse.success ? usersResponse.data.users : [];
                const activeCollectors = users.filter(u => u.role === 'collector').length;

                const totalWaste = completedPickups * 5;
                const yesterdayWaste = pickups.filter(p =>
                    p.date && p.date.startsWith(yesterday) && p.status === 'completed'
                ).length * 5;

                setStats({
                    dailyPickups,
                    totalWaste,
                    pendingReports,
                    activeCollectors,
                    completedPickups,
                    totalPickups: pickups.length,
                    trends: {
                        pickups: yesterdayPickups ? ((dailyPickups - yesterdayPickups) / yesterdayPickups * 100) : 0,
                        waste: yesterdayWaste ? ((totalWaste - yesterdayWaste) / yesterdayWaste * 100) : 0,
                        reports: yesterdayReports ? ((pendingReports - yesterdayReports) / yesterdayReports * 100) : 0
                    }
                });

                // Recent activity with more details
                const activity = [...pickups, ...reports]
                    .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
                    .slice(0, 8);
                setRecentActivity(activity);

            } catch (error) {
                console.error('Error fetching admin stats:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const StatCard = ({ title, value, icon: Icon, gradient, trend, subtitle }) => (
        <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${gradient}`}>
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white opacity-10"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 h-32 w-32 rounded-full bg-white opacity-5"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium opacity-90">{title}</h3>
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                        <Icon className="h-6 w-6" />
                    </div>
                </div>

                <p className="text-4xl font-bold mb-2">{value}</p>

                <div className="flex items-center justify-between">
                    <p className="text-xs opacity-75">{subtitle}</p>
                    {trend !== undefined && (
                        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'bg-white bg-opacity-20' : 'bg-black bg-opacity-20'
                            }`}>
                            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {Math.abs(trend).toFixed(1)}%
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const getActivityIcon = (item) => {
        if (item.wasteType) {
            switch (item.status) {
                case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
                case 'cancelled': return <XCircle className="h-5 w-5 text-red-500" />;
                case 'claimed': return <Truck className="h-5 w-5 text-blue-500" />;
                default: return <Clock className="h-5 w-5 text-orange-500" />;
            }
        }
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    };

    const getStatusBadge = (status) => {
        const badges = {
            completed: 'bg-green-100 text-green-700',
            claimed: 'bg-blue-100 text-blue-700',
            pending: 'bg-orange-100 text-orange-700',
            cancelled: 'bg-red-100 text-red-700',
            reported: 'bg-yellow-100 text-yellow-700',
            resolved: 'bg-green-100 text-green-700'
        };
        return badges[status] || 'bg-gray-100 text-gray-700';
    };

    const totalWasteCount = wasteData.dry + wasteData.wet + wasteData.ewaste + wasteData.hazardous;
    const wastePercentages = {
        dry: totalWasteCount ? (wasteData.dry / totalWasteCount * 100) : 25,
        wet: totalWasteCount ? (wasteData.wet / totalWasteCount * 100) : 40,
        ewaste: totalWasteCount ? (wasteData.ewaste / totalWasteCount * 100) : 20,
        hazardous: totalWasteCount ? (wasteData.hazardous / totalWasteCount * 100) : 15
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        Real-time system overview and analytics
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Daily Pickups"
                        value={stats.dailyPickups}
                        icon={Truck}
                        gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                        trend={stats.trends.pickups}
                        subtitle="Today's collections"
                    />
                    <StatCard
                        title="Total Waste Collected"
                        value={`${stats.totalWaste} kg`}
                        icon={Recycle}
                        gradient="bg-gradient-to-br from-green-500 to-green-600"
                        trend={stats.trends.waste}
                        subtitle="Estimated weight"
                    />
                    <StatCard
                        title="Pending Reports"
                        value={stats.pendingReports}
                        icon={AlertTriangle}
                        gradient="bg-gradient-to-br from-orange-500 to-orange-600"
                        trend={stats.trends.reports}
                        subtitle="Requires attention"
                    />
                    <StatCard
                        title="Active Collectors"
                        value={stats.activeCollectors}
                        icon={Users}
                        gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                        subtitle="System operational"
                    />
                </div>

                {/* Progress Section */}
                <div className="grid lg:grid-cols-3 gap-6 mb-8">
                    <div className="card p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Waste Composition Analysis</h3>
                            <BarChart3 className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="space-y-6">
                            {/* Dry Waste */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Package className="h-4 w-4 text-blue-500" />
                                        <span className="text-sm font-medium text-gray-700">Dry Waste</span>
                                    </div>
                                    <span className="text-sm font-bold text-blue-600">{wastePercentages.dry.toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${wastePercentages.dry}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Wet Waste */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Recycle className="h-4 w-4 text-green-500" />
                                        <span className="text-sm font-medium text-gray-700">Wet Waste</span>
                                    </div>
                                    <span className="text-sm font-bold text-green-600">{wastePercentages.wet.toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${wastePercentages.wet}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* E-Waste */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-purple-500" />
                                        <span className="text-sm font-medium text-gray-700">E-Waste</span>
                                    </div>
                                    <span className="text-sm font-bold text-purple-600">{wastePercentages.ewaste.toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${wastePercentages.ewaste}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Hazardous Waste */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                        <span className="text-sm font-medium text-gray-700">Hazardous Waste</span>
                                    </div>
                                    <span className="text-sm font-bold text-red-600">{wastePercentages.hazardous.toFixed(1)}%</span>
                                </div>
                                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: `${wastePercentages.hazardous}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Completion Rate */}
                    <div className="card p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Completion Rate</h3>
                        <div className="flex items-center justify-center">
                            <div className="relative w-40 h-40">
                                <svg className="transform -rotate-90 w-40 h-40">
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="#e5e7eb"
                                        strokeWidth="12"
                                        fill="none"
                                    />
                                    <circle
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        stroke="url(#gradient)"
                                        strokeWidth="12"
                                        fill="none"
                                        strokeDasharray={`${2 * Math.PI * 70}`}
                                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - (stats.completedPickups / (stats.totalPickups || 1)))}`}
                                        className="transition-all duration-1000 ease-out"
                                        strokeLinecap="round"
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#10b981" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-gray-900">
                                        {stats.totalPickups ? Math.round((stats.completedPickups / stats.totalPickups) * 100) : 0}%
                                    </span>
                                    <span className="text-xs text-gray-500 mt-1">Completed</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 space-y-2 text-center">
                            <p className="text-sm text-gray-600">
                                <span className="font-bold text-gray-900">{stats.completedPickups}</span> of{' '}
                                <span className="font-bold text-gray-900">{stats.totalPickups}</span> pickups
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                        <Calendar className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="space-y-1">
                        {recentActivity.length > 0 ? recentActivity.map((item, i) => (
                            <div
                                key={i}
                                className="group flex items-start gap-4 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 rounded-xl transition-all duration-200 border border-transparent hover:border-blue-100"
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {getActivityIcon(item)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">
                                                {item.wasteType ? (
                                                    <>Pickup Request - {item.wasteType}</>
                                                ) : (
                                                    <>Report - {item.location?.address || 'Location unavailable'}</>
                                                )}
                                            </p>
                                            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(item.createdAt || item.date).toLocaleString()}
                                                </span>
                                                {item.location?.address && (
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {item.location.address.substring(0, 30)}...
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusBadge(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-12 text-gray-500">
                                <Activity className="h-12 w-12 mx-auto mb-3 opacity-20" />
                                <p>No recent activity</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
