import React from 'react';
import { Download, FileText, PieChart, BarChart3 } from 'lucide-react';

export default function AdminReports() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>
                <button className="btn btn-primary flex items-center gap-2">
                    <Download className="h-4 w-4" /> Export All
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Monthly Waste Analysis</h3>
                        <button className="text-sm text-primary-600 hover:underline">Download CSV</button>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                        <div className="text-center text-gray-400">
                            <PieChart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Chart Placeholder</p>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-900">Collector Performance</h3>
                        <button className="text-sm text-primary-600 hover:underline">Download PDF</button>
                    </div>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
                        <div className="text-center text-gray-400">
                            <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Chart Placeholder</p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">Available Reports</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {['Daily Pickup Log', 'User Activity Report', 'Centre Capacity History', 'Illegal Dumping Heatmap', 'Financial Summary'].map((report, i) => (
                    <div key={i} className="card p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                <FileText className="h-5 w-5 text-gray-500" />
                            </div>
                            <span className="font-medium text-gray-700">{report}</span>
                        </div>
                        <Download className="h-4 w-4 text-gray-400 group-hover:text-primary-600" />
                    </div>
                ))}
            </div>
        </div>
    );
}


