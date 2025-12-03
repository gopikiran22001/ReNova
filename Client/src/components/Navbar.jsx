import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Recycle, Menu, X, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = React.useState(false);

    const isCitizen = location.pathname.includes('/citizen');
    const isCollector = location.pathname.includes('/collector');
    const isAdmin = location.pathname.includes('/admin');
    const isPublic = !isCitizen && !isCollector && !isAdmin;

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <Recycle className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
                                ReNova
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/awareness" className="text-gray-600 hover:text-primary-600 font-medium">Awareness</Link>

                        {isCitizen && (
                            <>
                                <Link to="/citizen/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
                                <Link to="/citizen/request-pickup" className="text-gray-600 hover:text-primary-600 font-medium">Request Pickup</Link>
                                <Link to="/citizen/pickups" className="text-gray-600 hover:text-primary-600 font-medium">My Pickups</Link>
                                <Link to="/citizen/centres" className="text-gray-600 hover:text-primary-600 font-medium">Centres</Link>
                                <Link to="/citizen/points" className="text-gray-600 hover:text-primary-600 font-medium">Points</Link>
                            </>
                        )}

                        {isCollector && (
                            <>
                                <Link to="/collector/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
                            </>
                        )}

                        {isAdmin && (
                            <>
                                <Link to="/admin/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
                                <Link to="/admin/pickups" className="text-gray-600 hover:text-primary-600 font-medium">Pickups</Link>
                                <Link to="/admin/centres" className="text-gray-600 hover:text-primary-600 font-medium">Centres</Link>
                                <Link to="/admin/reports" className="text-gray-600 hover:text-primary-600 font-medium">Reports</Link>
                            </>
                        )}

                        <div className="h-6 w-px bg-gray-200 mx-2"></div>

                        {isPublic ? (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">Sign In</Link>
                                <Link to="/register" className="btn btn-primary py-1.5 px-4 text-sm">Get Started</Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors" title="Profile">
                                    <User className="h-5 w-5" />
                                </Link>
                                <Link to="/login" className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Log Out">
                                    <LogOut className="h-5 w-5" />
                                </Link>
                            </div>
                        )}

                        <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dev Mode:</span>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => navigate('/citizen/dashboard')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${isCitizen ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Citizen
                                </button>
                                <button
                                    onClick={() => navigate('/collector/dashboard')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${isCollector ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Collector
                                </button>
                                <button
                                    onClick={() => navigate('/admin/dashboard')}
                                    className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${isAdmin ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Admin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
