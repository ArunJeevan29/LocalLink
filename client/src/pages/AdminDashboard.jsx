import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Database, Activity, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, activeListings: 0, pendingListings: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const [usersRes, listingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users'),
          axios.get('http://localhost:5000/api/admin/listings')
        ]);

        const usersData = usersRes.data;
        const listingsData = listingsRes.data;

        setStats({
          users: usersData.length,
          activeListings: listingsData.filter(l => l.status === 'active').length,
          pendingListings: listingsData.filter(l => l.status === 'pending').length
        });
      } catch (err) {
        console.error("Error fetching overview data:", err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-800">{error}</h3>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <ShieldCheck className="text-blue-600" size={36} />
          Platform Overview
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Manage your marketplace, users, and platform health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Users</p>
            <p className="text-4xl font-black text-slate-800 mt-1">{stats.users}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-xl"><Users className="text-blue-600" size={28} /></div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Listings</p>
            <p className="text-4xl font-black text-slate-800 mt-1">{stats.activeListings}</p>
          </div>
          <div className="p-4 bg-emerald-50 rounded-xl"><Database className="text-emerald-600" size={28} /></div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending Approvals</p>
            <p className="text-4xl font-black text-slate-800 mt-1">{stats.pendingListings}</p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl"><Activity className="text-amber-600" size={28} /></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <ShieldCheck className="mx-auto text-slate-300 mb-4" size={48} />
        <h3 className="text-xl font-bold text-slate-800">System is Healthy</h3>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          All platform services are running smoothly. Use the sidebar menu to manage your users and listings.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;