export const pickups = [
    { id: 1, type: "Dry Waste", status: "Completed", date: "2025-02-01", weight: "2.5 kg" },
    { id: 2, type: "E-Waste", status: "Scheduled", date: "2025-02-10", weight: "1.2 kg" },
    { id: 3, type: "Plastic", status: "Pending", date: "2025-02-12", weight: "3.0 kg" }
];

export const centres = [
    { id: 1, name: "Green Recycling Hub", distance: "2.3 km", address: "123 Eco St, Green City", capacity: "80%" },
    { id: 2, name: "EcoDrop Center", distance: "4.9 km", address: "456 Nature Rd, Earth Town", capacity: "45%" },
    { id: 3, name: "City Waste Management", distance: "8.1 km", address: "789 Urban Ave, Metro", capacity: "92%" }
];

export const points = [
    { id: 1, action: "Recycled Plastic", points: 20, date: "2025-02-01" },
    { id: 2, action: "Scheduled Pickup", points: 10, date: "2025-02-05" },
    { id: 3, action: "Reported Illegal Dump", points: 50, date: "2025-02-08" }
];

export const collectorJobs = [
    { id: 1, address: "12 Palm Grove, Sector 4", type: "Dry Waste", status: "Pending", time: "10:00 AM" },
    { id: 2, address: "45 Oak Avenue, Block B", type: "E-Waste", status: "In Progress", time: "11:30 AM" },
    { id: 3, address: "88 Pine Street, Sector 2", type: "Plastic", status: "Completed", time: "09:15 AM" }
];

export const adminStats = {
    dailyPickups: 54,
    totalWaste: "320 kg",
    pendingReports: 3,
    activeCollectors: 12
};

export const adminPickups = [
    { id: 101, user: "John Doe", type: "E-Waste", date: "2025-02-12", status: "Pending" },
    { id: 102, user: "Jane Smith", type: "Dry Waste", date: "2025-02-12", status: "Assigned" },
    { id: 103, user: "Mike Johnson", type: "Plastic", date: "2025-02-11", status: "Completed" }
];

export const adminCentres = [
    { id: 1, name: "Green Recycling Hub", capacity: 80, status: "Active" },
    { id: 2, name: "EcoDrop Center", capacity: 45, status: "Active" },
    { id: 3, name: "City Waste Management", capacity: 92, status: "Critical" }
];
