import React, { useState } from 'react';
import { Users, Database, Activity, Trash2, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Arun Jeevan', email: 'arun@example.com', role: 'provider', status: 'active' },
    { id: 2, name: 'Rahul Kumar', email: 'rahul@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Spam Account', email: 'spam@bot.com', role: 'provider', status: 'flagged' }
  ]);

  const handleDeleteUser = (id) => {
    if(window.confirm("WARNING: Are you sure you want to delete this user?")) {
      setUsers(users.filter(user => user.id !== id));
      alert("User removed from the platform.");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ShieldCheck className="text-blue-600" size={32} />
          Platform Admin
        </h1>
        <p className="text-gray-600 mt-1">Monitor the LocalLink marketplace and manage users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase">Total Users</p>
            <p className="text-3xl font-black text-blue-600">1,248</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg"><Users className="text-blue-500" size={32} /></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase">Active Listings</p>
            <p className="text-3xl font-black text-green-600">432</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg"><Database className="text-green-500" size={32} /></div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase">Jobs Completed</p>
            <p className="text-3xl font-black text-purple-600">890</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg"><Activity className="text-purple-500" size={32} /></div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Users</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      user.role === 'provider' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role}
                    </span>
                    {user.status === 'flagged' && (
                      <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-red-100 text-red-700">Flagged</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;