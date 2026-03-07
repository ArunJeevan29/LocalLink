import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import ClientModal from '../components/ClientModal';

const Dashboard = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchIncomingJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/jobs/provider", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const pendingJobs = response.data.filter(job => job.status === "Pending");
        setRequests(pendingJobs);
      } catch (error) {
        console.error("Error fetching incoming requests:", error);
      }
    };
    fetchIncomingJobs();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/jobs/${id}/status`, 
        { status: "Accepted" }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setRequests(requests.filter(req => req._id !== id));
      alert("Job Accepted! It has been moved to your Active Jobs.");
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };

  const handleDecline = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/jobs/${id}/status`, 
        { status: "Declined" }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(requests.filter(req => req._id !== id));
    } catch (error) {
      console.error("Error declining job:", error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your incoming client requests.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <AlertCircle className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-800">Incoming Service Requests</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {requests.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">No pending requests right now.</p>
          ) : (
            requests.map((request) => (
              <div key={request._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    Client: 
                    <button 
                      onClick={() => setSelectedClient({ name: request.client?.name, email: request.client?.email })}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors focus:outline-none"
                    >
                      {request.client?.name}
                    </button>
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">{request.serviceTitle} • <span className="text-blue-600">₹{request.price}</span></p>
                  <p className="text-xs text-gray-500 mt-1">Requested on: {new Date(request.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => handleDecline(request._id)} className="px-4 py-2 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2">
                    <XCircle size={18} /> Decline
                  </button>
                  <button onClick={() => handleAccept(request._id)} className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm">
                    <CheckCircle size={18} /> Accept Job
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ClientModal client={selectedClient} onClose={() => setSelectedClient(null)} />
    </div>
  );
};

export default Dashboard;