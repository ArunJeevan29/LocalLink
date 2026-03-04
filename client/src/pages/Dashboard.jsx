import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ClientModal from '../components/ClientModal'; // 🌟 Importing your new Modal!

const Dashboard = () => {
  // State to track which client's profile is currently open in the popup
  const [selectedClient, setSelectedClient] = useState(null);

  // MOCK DATA: Incoming requests with detailed client profiles attached
  const [requests, setRequests] = useState([
    { 
      id: 1, 
      name: 'Rahul Kumar', 
      service: 'Plumbing Repair', 
      date: 'March 4, 2026', 
      status: 'pending', 
      price: '₹500',
      clientDetails: {
        name: 'Rahul Kumar',
        phone: '+91 98765 11111',
        location: 'Erode South',
        rating: 4.8,
        jobsCompleted: 4,
        reviews: [
          { proName: 'Quick Plumbers', stars: 5, text: 'Paid immediately. Very polite.' }
        ]
      }
    },
    { 
      id: 2, 
      name: 'Priya Sharma', 
      service: 'Pipe Installation', 
      date: 'March 3, 2026', 
      status: 'accepted', 
      price: '₹1200',
      clientDetails: {
        name: 'Priya Sharma',
        phone: '+91 98765 22222',
        location: 'Thindal, Erode',
        rating: 5.0,
        jobsCompleted: 12,
        reviews: [
          { proName: 'Arun Web Dev', stars: 5, text: 'Great client, clear requirements.' }
        ]
      }
    },
  ]);

  const handleAccept = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'accepted' } : req));
    alert("Job Accepted! It has been moved to your Active Jobs.");
  };

  const handleDecline = (id) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'rejected' } : req));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your incoming client requests.</p>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <AlertCircle className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-800">Incoming Service Requests</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {requests.map((request) => (
            <div key={request.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              
              {/* Job Details */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  Client: 
                  {/* 🌟 CLICKABLE NAME: This opens the modal! 🌟 */}
                  <button 
                    onClick={() => setSelectedClient(request.clientDetails)}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors focus:outline-none"
                  >
                    {request.name}
                  </button>
                </h4>
                <p className="text-sm text-gray-600 font-medium">{request.service} • <span className="text-blue-600">{request.price}</span></p>
                <p className="text-xs text-gray-500 mt-1">Requested on: {request.date}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {request.status === 'pending' && (
                  <>
                    <button onClick={() => handleDecline(request.id)} className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                      <XCircle size={18} /> Decline
                    </button>
                    <button onClick={() => handleAccept(request.id)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                      <CheckCircle size={18} /> Accept Job
                    </button>
                  </>
                )}

                {request.status === 'accepted' && (
                  <span className="px-4 py-2 bg-green-100 text-green-800 font-bold rounded-lg flex items-center gap-2">
                    <CheckCircle size={18} /> Job Accepted
                  </span>
                )}

                {request.status === 'rejected' && (
                  <span className="px-4 py-2 bg-gray-100 text-gray-500 font-medium rounded-lg">
                    Declined
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌟 THE POPUP MODAL 🌟 
          This sits invisibly at the bottom until `selectedClient` has data
      */}
      <ClientModal 
        client={selectedClient} 
        onClose={() => setSelectedClient(null)} 
      />
      
    </div>
  );
};

export default Dashboard;