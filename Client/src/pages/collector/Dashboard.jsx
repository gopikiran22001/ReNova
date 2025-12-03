import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { MapPin, Clock, Package, Navigation, CheckCircle } from 'lucide-react';

export default function CollectorDashboard() {
    const { jobs, completeJob } = useData();
    const { addToast } = useToast();

    const handleComplete = (id) => {
        completeJob(id);
        addToast('Job marked as completed!', 'success');
    };

    const activeJobs = jobs.filter(j => j.status !== 'Completed');
    const completedJobs = jobs.filter(j => j.status === 'Completed');

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Today's Route</h1>
                    <p className="text-gray-600">{activeJobs.length} jobs remaining</p>
                </div>
                <button className="btn btn-primary">Start Route</button>
            </div>

            <div className="space-y-4">
                {jobs.map((job) => (
                    <div key={job.id} className={`card p-6 transition-colors ${job.status === 'Completed' ? 'opacity-75 bg-gray-50' : 'hover:border-primary-300'}`}>
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${job.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            job.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {job.status}
                                    </span>
                                    <span className="text-gray-400 text-sm">•</span>
                                    <span className="text-gray-500 text-sm flex items-center gap-1">
                                        <Clock className="h-3 w-3" /> {job.time}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.address}</h3>
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <Package className="h-4 w-4" />
                                    <span>{job.type}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {job.status !== 'Completed' ? (
                                    <>
                                        <Link to={`/collector/route/${job.id}`} className="btn btn-secondary flex items-center gap-2">
                                            <Navigation className="h-4 w-4" /> Navigate
                                        </Link>
                                        <button
                                            onClick={() => handleComplete(job.id)}
                                            className="btn btn-primary"
                                        >
                                            Complete
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2 text-green-600 font-medium">
                                        <CheckCircle className="h-5 w-5" /> Completed
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
