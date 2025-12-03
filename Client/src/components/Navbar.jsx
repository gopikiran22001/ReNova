import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Recycle, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    const isCitizen = user?.role === 'citizen';
    const isCollector = user?.role === 'collector';
    const isAdmin = user?.role === 'admin';

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
        navigate('/login');
    };

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

                        {!user ? (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium">Sign In</Link>
                                <Link to="/register" className="btn btn-primary py-1.5 px-4 text-sm">Get Started</Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/profile" className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded-full transition-colors" title="Profile">
                                    <User className="h-5 w-5" />
                                </Link>
                                <button onClick={handleLogout} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Log Out">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </nav>
    );
}
