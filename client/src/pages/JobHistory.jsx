import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { History, CheckCircle, Star, Calendar } from "lucide-react";

const JobHistory = () => {
  const { user } = useAuth();
  const isProvider = user?.role === "provider";
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const endpoint = isProvider ? "/api/jobs/provider" : "/api/jobs/client";
        
        const response = await axios.get(`http://localhost:5000${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const completed = response.data.filter(job => job.status === "Completed");
        setHistoryData(completed);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    if (user) fetchHistory();
  }, [user, isProvider]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <History className="text-blue-600" size={32} />
          {isProvider ? "Business History" : "Past Hires"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isProvider ? "A record of your completed jobs." : "A record of professionals you have hired."}
        </p>
      </div>

      {historyData.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <History size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No completed jobs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {historyData.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle size={16} className="text-green-500" />
                    <span className="text-sm font-bold text-green-600 uppercase tracking-wide">Completed</span>
                    <span className="text-gray-400 text-sm mx-2">•</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar size={14} /> {new Date(job.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {isProvider ? "Client: " : "Pro: "} {isProvider ? job.client?.name : job.provider?.name}
                  </h3>
                  <p className="text-gray-600 font-medium">{job.serviceTitle}</p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-2xl font-bold text-gray-900">₹{job.price}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-700">5.0</span>
                </div>
                <p className="text-gray-600 italic text-sm">"Excellent work! Transaction completed successfully."</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobHistory;