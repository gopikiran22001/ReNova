import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { MapPin, Clock, Package, Navigation, CheckCircle } from 'lucide-react';

export default function CollectorDashboard() {
    const { addToast } = useToast();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const { data } = await api.get('/pickups');
            if (data.success) {
                setJobs(data.data.pickups || []);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleComplete = async (id) => {
        try {
            await api.put(`/pickups/${id}/status`, { status: 'completed' });
            addToast('Job marked as completed!', 'success');
            fetchJobs();
        } catch (error) {
            addToast('Failed to complete job', 'error');
        }
    };

    const handleClaim = async (id) => {
        try {
            await api.put(`/pickups/${id}/status`, { status: 'assigned' });
            addToast('Job claimed successfully!', 'success');
            fetchJobs();
        } catch (error) {
            addToast('Failed to claim job', 'error');
        }
    };

    const activeJobs = jobs.filter(j => j.status !== 'completed');
    // const completedJobs = jobs.filter(j => j.status === 'completed');

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

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
                {jobs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <p className="text-gray-500">No jobs available.</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} className={`card p-6 transition-colors ${job.status === 'completed' ? 'opacity-75 bg-gray-50' : 'hover:border-primary-300'}`}>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${job.status === 'completed' ? 'bg-green-100 text-green-700' :
                                            job.status === 'assigned' ? 'bg-blue-100 text-blue-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {job.status}
                                        </span>
                                        <span className="text-gray-400 text-sm">•</span>
                                        <span className="text-gray-500 text-sm flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {new Date(job.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{job.location?.address || "Address not available"}</h3>
                                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                                        <Package className="h-4 w-4" />
                                        <span>{job.wasteType} - {job.weight}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {job.status === 'pending' && (
                                        <button
                                            onClick={() => handleClaim(job._id)}
                                            className="btn btn-primary"
                                        >
                                            Claim Job
                                        </button>
                                    )}
                                    {job.status === 'assigned' && (
                                        <>
                                            <Link to={`/collector/route/${job._id}`} className="btn btn-secondary flex items-center gap-2">
                                                <Navigation className="h-4 w-4" /> Navigate
                                            </Link>
                                            <button
                                                onClick={() => handleComplete(job._id)}
                                                className="btn btn-primary"
                                            >
                                                Complete
                                            </button>
                                        </>
                                    )}
                                    {job.status === 'completed' && (
                                        <div className="flex items-center gap-2 text-green-600 font-medium">
                                            <CheckCircle className="h-5 w-5" /> Completed
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
