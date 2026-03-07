import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, DollarSign, MapPin, AlignLeft, Save, Plus, Edit2, Trash2, ArrowLeft } from 'lucide-react';

const ManageService = () => {
  const [listings, setListings] = useState([]);
  const [view, setView] = useState('list');
  
  const emptyForm = { title: '', category: 'Web Development', price: '', location: 'Erode, TN', description: '' };
  const [currentService, setCurrentService] = useState(emptyForm);

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/services/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching your services:", error);
      }
    };
    fetchMyServices();
  }, []);
  
  const handleAddNew = () => {
    setCurrentService(emptyForm); 
    setView('form'); 
  };

  const handleEdit = (service) => {
    setCurrentService(service); 
    setView('form'); 
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this listing?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setListings(listings.filter(item => item._id !== id));
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service.");
      }
    }
  };

  const handleChange = (e) => {
    setCurrentService({ ...currentService, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (currentService._id) {
        const response = await axios.put(
          `http://localhost:5000/api/services/${currentService._id}`, 
          currentService, 
          config
        );
 
        setListings(listings.map(item => item._id === currentService._id ? response.data : item));
        alert("Listing updated successfully!");
      } else {

        const response = await axios.post("http://localhost:5000/api/services", currentService, config);
        setListings([...listings, response.data]);
        alert("New listing created successfully!");
      }
      
      setView('list'); 
    } catch (error) {
      console.error("Error saving service:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Error saving your service. Check the console.");
    }
  };

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
              <div key={listing._id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {listing.category}
                  </span>
                  <span className="font-bold text-gray-900">₹{listing.price}/hr</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{listing.title}</h3>
                <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{listing.description}</p>
                
                <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                  <button onClick={() => handleEdit(listing)} className="flex-1 bg-gray-100 text-gray-700 font-medium py-2 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    <Edit2 size={16} /> Edit
                  </button>
                  <button onClick={() => handleDelete(listing._id)} className="px-4 bg-red-50 text-red-600 font-medium py-2 rounded hover:bg-red-100 transition-colors flex items-center justify-center">
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

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-200 pb-4 flex items-center gap-4">
        <button onClick={() => setView('list')} className="text-gray-500 hover:text-blue-600 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {currentService._id ? 'Edit Service' : 'Create New Service'}
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Service Title</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input type="text" name="title" value={currentService.title} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Service Category</label>
              <select name="category" value={currentService.category} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white">
                <option value="Web Development">Web Development</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Education/Tutoring">Education / Tutoring</option>
                <option value="PC Repair">PC Repair</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Hourly Rate (₹)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input type="number" name="price" value={currentService.price} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" required />
              </div>
            </div>

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

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">About This Service</label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <AlignLeft className="h-5 w-5 text-gray-400" />
              </div>
              <textarea name="description" rows="4" value={currentService.description} onChange={handleChange} className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 resize-none" required></textarea>
            </div>
          </div>

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