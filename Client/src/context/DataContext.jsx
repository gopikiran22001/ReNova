import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    pickups as initialPickups,
    centres as initialCentres,
    points as initialPoints,
    collectorJobs as initialCollectorJobs,
    adminStats as initialAdminStats,
    adminPickups as initialAdminPickups,
    adminCentres as initialAdminCentres
} from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
    // Citizen Data
    const [pickups, setPickups] = useState(initialPickups);
    const [userPoints, setUserPoints] = useState(initialPoints);
    const [totalPoints, setTotalPoints] = useState(1250);

    // Collector Data
    const [jobs, setJobs] = useState(initialCollectorJobs);

    // Admin Data
    const [adminPickupsList, setAdminPickupsList] = useState(initialAdminPickups);
    const [centres, setCentres] = useState(initialAdminCentres);
    const [stats, setStats] = useState(initialAdminStats);

    // Actions
    const addPickupRequest = (newPickup) => {
        const pickup = {
            id: Date.now(),
            status: 'Pending',
            ...newPickup
        };
        setPickups([pickup, ...pickups]);

        // Also add to admin list
        const adminPickup = {
            id: pickup.id,
            user: 'Alex (You)',
            type: pickup.type,
            date: pickup.date,
            status: 'Pending'
        };
        setAdminPickupsList([adminPickup, ...adminPickupsList]);

        // Update stats
        setStats(prev => ({
            ...prev,
            pendingReports: prev.pendingReports + 1
        }));
    };

    const updatePickupStatus = (id, newStatus) => {
        setAdminPickupsList(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        // Also update citizen view if it matches (in a real app these would be linked by ID)
        setPickups(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    };

    const completeJob = (jobId) => {
        setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'Completed' } : j));

        // Add points to user (simulation)
        const newPointEntry = {
            id: Date.now(),
            action: "Waste Collection Completed",
            points: 50,
            date: new Date().toISOString().split('T')[0]
        };
        setUserPoints([newPointEntry, ...userPoints]);
        setTotalPoints(prev => prev + 50);
    };

    const updateCentreCapacity = (id, capacity) => {
        setCentres(prev => prev.map(c => c.id === id ? { ...c, capacity: parseInt(capacity) } : c));
    };

    const redeemPoints = (amount) => {
        if (totalPoints >= amount) {
            setTotalPoints(prev => prev - amount);
            const redemption = {
                id: Date.now(),
                action: "Reward Redeemed",
                points: -amount,
                date: new Date().toISOString().split('T')[0]
            };
            setUserPoints([redemption, ...userPoints]);
            return true;
        }
        return false;
    };

    return (
        <DataContext.Provider value={{
            pickups,
            userPoints,
            totalPoints,
            jobs,
            adminPickupsList,
            centres,
            stats,
            addPickupRequest,
            updatePickupStatus,
            completeJob,
            updateCentreCapacity,
            redeemPoints
        }}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
    return useContext(DataContext);
}
