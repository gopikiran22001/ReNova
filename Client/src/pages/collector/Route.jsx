import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Navigation } from 'lucide-react';

export default function Route() {
    const { id } = useParams();

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link to="/collector/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>

            <div className="card p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Navigation to Job #{id}</h1>
                <p className="text-gray-600">Estimated time: 12 mins</p>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-4 space-y-8 pb-8">
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 ring-4 ring-white"></div>
                    <h3 className="font-bold text-gray-900">Start: Current Location</h3>
                    <p className="text-gray-500 text-sm mt-1">Head north on Main Street</p>
                </div>

                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <h3 className="font-medium text-gray-900">Turn Right</h3>
                    <p className="text-gray-500 text-sm mt-1">onto Oak Avenue (2.3 km)</p>
                </div>

                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <h3 className="font-medium text-gray-900">Turn Left</h3>
                    <p className="text-gray-500 text-sm mt-1">onto Palm Grove (500 m)</p>
                </div>

                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-red-500 ring-4 ring-white"></div>
                    <h3 className="font-bold text-gray-900">Destination</h3>
                    <p className="text-gray-500 text-sm mt-1">12 Palm Grove, Sector 4</p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <p className="text-sm font-medium text-gray-700">Note for driver:</p>
                        <p className="text-sm text-gray-500">Gate code is 1234. Call upon arrival.</p>
                    </div>
                </div>
            </div>

            <button className="btn btn-primary w-full py-4 text-lg flex items-center justify-center gap-2">
                <Navigation className="h-5 w-5" /> Arrived at Location
            </button>
        </div>
    );
}
