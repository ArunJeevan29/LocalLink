import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, CheckCircle, Clock, MapPin } from "lucide-react";

const ActiveJobs = () => {
  const { user } = useAuth();
  const isProvider = user?.role === "provider";

  // MOCK DATA: Notice how the names change based on who is logged in!
  const [activeJobs, setActiveJobs] = useState([
    {
      id: 101,
      name: isProvider ? "Priya Sharma" : "TechFix Solutions",
      service: "Pipe Installation",
      price: 1200,
      dateStarted: "March 2, 2026",
      location: "Erode, TN",
    },
    {
      id: 102,
      name: isProvider ? "Rahul Kumar" : "Arun Web Dev",
      service: "React Frontend Fix",
      price: 800,
      dateStarted: "March 3, 2026",
      location: "Online",
    },
  ]);

  const handleMarkComplete = (id) => {
    if (window.confirm("Are you sure this job is 100% finished?")) {
      setActiveJobs(activeJobs.filter((job) => job.id !== id));
      alert("Job marked as complete! It has been moved to your History.");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {isProvider ? "Active Client Jobs" : "My Hired Professionals"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isProvider
            ? "Manage the projects you are currently working on."
            : "Manage the pros currently working for you."}
        </p>
      </div>

      {activeJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <Clock size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No active jobs right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {activeJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden"
            >
              {/* Blue accent line on the left */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>

              {/* Job Details */}
              <div className="pl-2">
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {job.service}
                  </span>
                  <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                    <Clock size={14} /> Started {job.dateStarted}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-2">
                  {isProvider ? "Client: " : "Pro: "}{" "}
                  <span className="text-blue-600">{job.name}</span>
                </h3>

                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <MapPin size={14} /> {job.location} •{" "}
                  <span className="font-semibold text-gray-700 ml-1">
                    ₹{job.price}
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={18} /> Message
                </button>

                {/* Only Providers can mark a job as completely done in this mock flow */}
                {isProvider && (
                  <button
                    onClick={() => handleMarkComplete(job.id)}
                    className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} /> Mark as Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveJobs;
