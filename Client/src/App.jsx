import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Awareness from './pages/Awareness';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Citizen Pages
import CitizenDashboard from './pages/citizen/Dashboard';
import RequestPickup from './pages/citizen/RequestPickup';
import Pickups from './pages/citizen/Pickups';
import ReportDump from './pages/citizen/ReportDump';
import Centres from './pages/citizen/Centres';
import Points from './pages/citizen/Points';

// Collector Pages
import CollectorDashboard from './pages/collector/Dashboard';
import CollectorRoute from './pages/collector/Route';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminPickups from './pages/admin/Pickups';
import AdminCentres from './pages/admin/Centres';
import AdminReports from './pages/admin/Reports';

import PageTitleUpdater from './components/PageTitleUpdater';

function App() {
  return (
    <>
      <PageTitleUpdater />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="awareness" element={<Awareness />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />

          {/* Citizen Routes */}
          <Route path="citizen">
            <Route path="dashboard" element={<CitizenDashboard />} />
            <Route path="request-pickup" element={<RequestPickup />} />
            <Route path="pickups" element={<Pickups />} />
            <Route path="report-dump" element={<ReportDump />} />
            <Route path="centres" element={<Centres />} />
            <Route path="points" element={<Points />} />
          </Route>

          {/* Collector Routes */}
          <Route path="collector">
            <Route path="dashboard" element={<CollectorDashboard />} />
            <Route path="route/:id" element={<CollectorRoute />} />
          </Route>

          {/* Admin Routes */}
          <Route path="admin">
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="pickups" element={<AdminPickups />} />
            <Route path="centres" element={<AdminCentres />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
