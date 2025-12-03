import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useToast } from '../../context/ToastContext';
import { Award, TrendingUp, Gift } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Points() {
    const { user } = useAuth();
    const { addToast } = useToast();
    const [transactions, setTransactions] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const { data: userResponse } = await api.get('/auth/me');
            if (userResponse.success) {
                setTotalPoints(userResponse.data.user.points || 0);
            }

            const { data: transResponse } = await api.get('/transactions');
            if (transResponse.success) {
                setTransactions(transResponse.data.items || []);
            }
        } catch (error) {
            console.error('Error fetching points data:', error);
            setTotalPoints(user?.points || 0);
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRedeem = async () => {
        if (totalPoints < 500) {
            addToast('Insufficient points to redeem reward', 'error');
            return;
        }

        try {
            await api.post('/transactions', {
                amount: 500,
                type: 'redeemed',
                description: 'Reward Redemption'
            });
            addToast('Redeemed 500 points successfully!', 'success');
            fetchData(); // Refresh data
        } catch (error) {
            addToast(error.response?.data?.message || 'Redemption failed', 'error');
        }
    };

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

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
                {transactions.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No transactions yet.</div>
                ) : (
                    transactions.map((item) => (
                        <div key={item._id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-lg ${item.type === 'earned' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                                    <Award className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-900">{item.description}</h3>
                                    <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <span className={`font-bold ${item.type === 'earned' ? 'text-green-600' : 'text-orange-600'}`}>
                                {item.type === 'earned' ? '+' : '-'}{item.amount} pts
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
