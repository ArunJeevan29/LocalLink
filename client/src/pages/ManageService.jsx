import React, { useState } from 'react';
import { Briefcase, DollarSign, MapPin, AlignLeft, Save, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

const ManageService = () => {
  // 1. MOCK DATA: Simulating a user who already has two different skills listed
  const [listings, setListings] = useState([
    { id: 1, businessName: 'Arun Web Solutions', category: 'Web Development', price: 800, location: 'Erode, TN', bio: 'Expert React developer.' },
    { id: 2, businessName: 'Arun PC Repair', category: 'PC Repair', price: 400, location: 'Erode, TN', bio: 'Fast and reliable computer troubleshooting.' }
  ]);

  // 2. STATE: Are we looking at the 'list' of services, or the 'form' to edit/create one?
  const [view, setView] = useState('list'); 
  
  // 3. STATE: Holds the data for the form we are currently typing in
  const emptyForm = { businessName: '', category: 'Web Development', price: '', location: '', bio: '' };
  const [currentService, setCurrentService] = useState(emptyForm);

  // --- HANDLERS ---
  
  const handleAddNew = () => {
    setCurrentService(emptyForm); // Clear the form
    setView('form'); // Show the form
  };

  const handleEdit = (service) => {
    setCurrentService(service); // Load the existing data into the form
    setView('form'); // Show the form
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(item => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setCurrentService({ ...currentService, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentService.id) {
      // Updating an existing listing
      setListings(listings.map(item => item.id === currentService.id ? currentService : item));
    } else {
      // Creating a brand new listing
      const newListing = { ...currentService, id: Date.now() }; // Fake ID generation
      setListings([...listings, newListing]);
    }
    setView('list'); // Go back to the list view
    alert("Listing saved successfully!");
  };

  // --- RENDER VIEWS ---

  // VIEW 1: The List of Services
  if (view === 'list') {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
            <p className="text-gray-600 mt-1">Manage all the different skills you offer on LocalLink.</p>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus size={20} /> Add New Service
          </button>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">You haven't listed any services yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {listing.category}
                  </span>
                  <span className="font-bold text-gray-900">₹{listing.price}/hr</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{listing.businessName}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{listing.bio}</p>
                
                <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <button onClick={() => handleEdit(listing)} className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(listing.id)} className="px-4 bg-red-50 text-red-600 font-medium py-2 rounded hover:bg-red-100 transition-colors flex items-center justify-center">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // VIEW 2: The Form (Create or Edit)
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-4 flex items-center gap-4">
        <button onClick={() => setView('list')} className="text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentService.id ? 'Edit Service' : 'Create New Service'}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Business / Display Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" name="businessName" value={currentService.businessName} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Service Category</label>
              <select name="category" value={currentService.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white">
                <option value="Web Development">Web Development</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Education/Tutoring">Education / Tutoring</option>
                <option value="PC Repair">PC Repair</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Hourly Rate (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input type="number" name="price" value={currentService.price} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" required />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" name="location" value={currentService.location} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" required />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">About This Service</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <AlignLeft className="h-5 w-5 text-gray-400" />
              </div>
              <textarea name="bio" rows="4" value={currentService.bio} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 resize-none" required></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" onClick={() => setView('list')} className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2">
              <Save size={20} /> Save Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageService;