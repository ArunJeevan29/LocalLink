import React from 'react';
import { X, Star, Phone, MapPin, UserCheck } from 'lucide-react';

const ClientModal = ({ client, onClose }) => {
  if (!client) return null; // If no client is selected, don't show the popup

  return (
    // The dark transparent background overlay
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      
      {/* The White Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header Section */}
        <div className="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
            <p className="flex items-center text-gray-500 mt-1 text-sm">
              <MapPin size={14} className="mr-1" /> {client.location || 'Local Area'}
            </p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body Section */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 bg-blue-50 p-4 rounded-xl border border-blue-100 text-center">
              <div className="flex items-center justify-center gap-1 text-blue-700 font-bold text-xl mb-1">
                <Star className="fill-blue-600 text-blue-600" size={20} /> {client.rating || 'New'}
              </div>
              <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold">Client Rating</p>
            </div>
            <div className="flex-1 bg-green-50 p-4 rounded-xl border border-green-100 text-center">
              <div className="flex items-center justify-center gap-1 text-green-700 font-bold text-xl mb-1">
                <UserCheck size={20} /> {client.jobsCompleted || 0}
              </div>
              <p className="text-xs text-green-600 uppercase tracking-wide font-semibold">Jobs Hired</p>
            </div>
          </div>

          {/* Contact Info (Only show if they want to call) */}
          <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <span className="text-gray-600 font-medium text-sm">Contact Number</span>
            <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
              <Phone size={16} /> {client.phone || '+91 98765 43210'}
            </a>
          </div>

          {/* Reviews from other Pros */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3 border-b border-gray-100 pb-2">
              Reviews from Professionals
            </h3>
            {client.reviews && client.reviews.length > 0 ? (
              <div className="space-y-4 max-h-48 overflow-y-auto pr-2">
                {client.reviews.map((review, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-700">{review.proName}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(review.stars)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400" />)}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic text-center py-4">No reviews yet. This is a new client.</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ClientModal;