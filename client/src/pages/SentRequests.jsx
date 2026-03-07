import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, CheckCircle, XCircle, Send } from "lucide-react";

const SentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchSentJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/jobs/client",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching sent requests:", error);
      }
    };
    fetchSentJobs();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">My Sent Requests</h1>
        <p className="text-gray-600 mt-1">
          Track the status of professionals you have contacted.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
          <Send className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-800">Your Bookings</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {requests.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">
              You haven't requested any services yet.
            </p>
          ) : (
            requests.map((request) => (
              <div
                key={request._id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    Pro: {request.provider?.name}
                  </h4>
                  <p className="text-sm text-gray-600 font-medium">
                    {request.serviceTitle} •{" "}
                    <span className="text-blue-600">₹{request.price}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Requested on:{" "}
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {request.status === "Pending" && (
                    <span className="px-4 py-2 bg-yellow-100 text-yellow-800 font-medium rounded-lg flex items-center gap-2">
                      <Clock size={18} /> Waiting for Pro
                    </span>
                  )}
                  {request.status === "Accepted" && (
                    <span className="px-4 py-2 bg-green-100 text-green-800 font-bold rounded-lg flex items-center gap-2">
                      <CheckCircle size={18} /> Pro Accepted!
                    </span>
                  )}
                  {request.status === "Declined" && (
                    <span className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg flex items-center gap-2">
                      <XCircle size={18} /> Pro Declined
                    </span>
                  )}
                  {request.status === "Completed" && (
                    <span className="px-4 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg flex items-center gap-2">
                      <CheckCircle size={18} /> Completed
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SentRequests;
