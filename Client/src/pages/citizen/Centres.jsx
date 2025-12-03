import React from 'react';
import { useData } from '../../context/DataContext';
import { MapPin, Navigation, Clock } from 'lucide-react';

export default function Centres() {
    const { centres } = useData();

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Recycling Centres Nearby</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {centres.map((centre) => (
                    <div key={centre.id} className="card p-6 hover:border-primary-300 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{centre.name}</h3>
                                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                    <MapPin className="h-4 w-4" /> {centre.address || "123 Green St, Eco City"}
                                </p>
                            </div>
                            <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                                {centre.distance || "2.5 km"}
                            </span>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span>Open: 9 AM - 6 PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${centre.capacity > 90 ? 'bg-red-500' : centre.capacity > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}></div>
                                <span>Capacity: {centre.capacity}%</span>
                            </div>
                        </div>

                        <button className="btn btn-secondary w-full flex items-center justify-center gap-2">
                            <Navigation className="h-4 w-4" /> Get Directions
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
