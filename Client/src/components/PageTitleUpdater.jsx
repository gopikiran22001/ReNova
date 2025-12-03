import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TITLES = {
    '/': 'Home | ReNova',
    '/awareness': 'Awareness | ReNova',
    '/citizen/dashboard': 'Dashboard | ReNova',
    '/citizen/request-pickup': 'Request Pickup | ReNova',
    '/citizen/pickups': 'My Pickups | ReNova',
    '/citizen/report-dump': 'Report Dump | ReNova',
    '/citizen/centres': 'Recycling Centres | ReNova',
    '/citizen/points': 'My Points | ReNova',
    '/collector/dashboard': 'Collector Dashboard | ReNova',
    '/admin/dashboard': 'Admin Dashboard | ReNova',
    '/admin/pickups': 'Manage Pickups | ReNova',
    '/admin/centres': 'Manage Centres | ReNova',
    '/admin/reports': 'System Reports | ReNova',
};

export default function PageTitleUpdater() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = TITLES[path];

        if (!title) {
            // Handle dynamic routes
            if (path.startsWith('/collector/route/')) {
                title = 'Route Navigation | ReNova';
            } else {
                title = 'ReNova Waste Management';
            }
        }

        document.title = title;
    }, [location]);

    return null;
}
