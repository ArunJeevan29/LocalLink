import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, CheckCircle, XCircle, Trash2, Loader2, Database } from 'lucide-react';

const ManageListing = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/listings');
        setListings(response.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();
  }, []);

  const handleUpdateListingStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/admin/listings/${id}/status`, {
        status: newStatus
      });
      
      setListings(listings.map(listing => 
        (listing._id || listing.id) === id ? { ...listing, status: newStatus } : listing
      ));
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update listing status on the server.");
    }
  };

  const handleDeleteListing = async (id) => {
    if (window.confirm("WARNING: Delete this listing permanently?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/listings/${id}`);
        setListings(listings.filter(listing => (listing._id || listing.id) !== id));
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete listing on the server.");
      }
    }
  };

  const filteredListings = listings.filter(l => 
    l.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.provider?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Database className="text-emerald-600" size={32} />
            Manage Listings
          </h1>
          <p className="text-slate-500 mt-1">Review, approve, and manage marketplace listings.</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search listings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Listing Details</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredListings.map((listing) => (
                <tr key={listing._id || listing.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-900">{listing.title}</p>
                    <p className="text-sm text-slate-500">by {listing.provider || 'Unknown Provider'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{listing.category || 'Uncategorized'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      listing.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 
                      listing.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {listing.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    {(listing.status === 'pending' || !listing.status) && (
                      <button 
                        onClick={() => handleUpdateListingStatus(listing._id || listing.id, 'active')}
                        className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Approve Listing"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}
                    {listing.status === 'active' && (
                      <button 
                        onClick={() => handleUpdateListingStatus(listing._id || listing.id, 'flagged')}
                        className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Suspend Listing"
                      >
                        <XCircle size={18} />
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteListing(listing._id || listing.id)}
                      className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete Listing"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredListings.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                    No listings found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageListing;