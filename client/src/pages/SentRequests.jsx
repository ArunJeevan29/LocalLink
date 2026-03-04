import React, { useState } from 'react';
import { Clock, CheckCircle, XCircle, Send } from 'lucide-react';

const SentRequests = () => {

  const [requests] = useState([
    { id: 101, name: 'TechFix Solutions', service: 'PC Repair', date: 'March 4, 2026', status: 'pending', price: '₹500' },
    { id: 102, name: 'Arun Web Dev', service: 'React Frontend', date: 'March 3, 2026', status: 'accepted', price: '₹1200' },
    { id: 103, name: 'Quick Plumbers', service: 'Sink Repair', date: 'March 1, 2026', status: 'rejected', price: '₹300' },
  ]);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">My Sent Requests</h1>
        <p className="text-gray-600 mt-1">Track the status of professionals you have contacted.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <Send className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-800">Pending Approvals</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {requests.map((request) => (
            <div key={request.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              
              <div>
                <h4 className="text-lg font-bold text-gray-900">Pro: {request.name}</h4>
                <p className="text-sm text-gray-600 font-medium">{request.service} • <span className="text-blue-600">{request.price}</span></p>
                <p className="text-xs text-gray-500 mt-1">Requested on: {request.date}</p>
              </div>

              <div className="flex items-center gap-3">
                {request.status === 'pending' && (
                  <span className="px-4 py-2 bg-yellow-100 text-yellow-800 font-medium rounded-lg flex items-center gap-2">
                    <Clock size={18} /> Waiting for Pro
                  </span>
                )}

                {request.status === 'accepted' && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 font-bold rounded-lg flex items-center gap-2">
                    <CheckCircle size={18} /> Pro Accepted!
                  </span>
                )}

                {request.status === 'rejected' && (
                  <span className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg flex items-center gap-2">
                    <XCircle size={18} /> Pro Declined
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SentRequests;