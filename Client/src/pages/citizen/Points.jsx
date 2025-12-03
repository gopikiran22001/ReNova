import React from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Award, TrendingUp, Gift } from 'lucide-react';

export default function Points() {
    const { userPoints, totalPoints, redeemPoints } = useData();
    const { addToast } = useToast();

    const handleRedeem = () => {
        if (redeemPoints(500)) {
            addToast('Redeemed 500 points successfully!', 'success');
        } else {
            addToast('Insufficient points to redeem reward', 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white mb-8 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <p className="text-primary-100 font-medium mb-1">Total Green Points</p>
                        <h1 className="text-5xl font-bold">{totalPoints.toLocaleString()}</h1>
                        <p className="text-sm text-primary-200 mt-2 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" /> Earn points by recycling!
                        </p>
                    </div>
                    <button
                        onClick={handleRedeem}
                        className="bg-white text-primary-700 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors flex items-center gap-2 shadow-lg active:scale-95"
                    >
                        <Gift className="h-5 w-5" /> Redeem 500 Pts
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Points History</h2>
            <div className="card divide-y divide-gray-100">
                {userPoints.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${item.points > 0 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                <Award className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{item.action}</h3>
                                <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                        </div>
                        <span className={`font-bold ${item.points > 0 ? 'text-green-600' : 'text-orange-600'}`}>
                            {item.points > 0 ? '+' : ''}{item.points} pts
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
