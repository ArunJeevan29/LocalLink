import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, MapPin, CheckCircle, Shield, Clock, Phone, Mail } from "lucide-react";

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setService(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleConnect = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Please log in or register to hire a professional!");
        navigate("/login");
        return;
      }

      await axios.post("http://localhost:5000/api/jobs", 
        {
          provider: service.provider._id,
          serviceTitle: service.title,
          price: service.price
        }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequestSent(true);
    } catch (error) {
      alert("Error sending request. You might be trying to hire yourself!");
    }
  };

  if (!service) return <div className="p-10 text-center text-xl font-bold text-gray-600">Loading Profile...</div>;

  const pro = service.provider;

  return (
    <div className="max-w-5xl mx-auto p-8">
      <button onClick={() => navigate(-1)} className="text-blue-600 font-medium hover:underline mb-6 flex items-center gap-2">
        ← Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {service.category}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 mt-3">{pro.name}</h1>
                <p className="flex items-center text-gray-500 mt-2 font-medium">
                  <MapPin size={18} className="mr-1 text-gray-400" /> {service.location}
                </p>
              </div>
              <div className="flex flex-col items-center bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-1 text-yellow-600 font-bold text-xl">
                  <Star className="fill-yellow-500 text-yellow-500" size={24} /> 
                  {pro.reviews?.length > 0 ? (pro.reviews.reduce((acc, rev) => acc + rev.rating, 0) / pro.reviews.length).toFixed(1) : "5.0"}
                </div>
                <span className="text-xs text-yellow-800 mt-1">{pro.reviews?.length || 0} Reviews</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">About This Service</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>

            <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-100">
              <h4 className="font-bold text-gray-800 mb-3 text-lg">Contact Information</h4>
              <p className="flex items-center text-gray-700 gap-3 mb-2 font-medium">
                <Phone size={18} className="text-blue-600"/> 
                {pro.phone || "Phone number not provided yet."}
              </p>
              <p className="flex items-center text-gray-700 gap-3 font-medium">
                <Mail size={18} className="text-blue-600"/> 
                {pro.email}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Client Reviews</h3>
            <div className="space-y-6">
              {!pro.reviews || pro.reviews.length === 0 ? (
                <p className="text-gray-500 italic">No reviews yet for this professional.</p>
              ) : (
                pro.reviews.map((review) => (
                  <div key={review._id} className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-gray-800">{review.reviewerName}</span>
                      <div className="flex text-yellow-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 italic">"{review.comment}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-8">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              ₹{service.price}
              <span className="text-lg text-gray-500 font-normal">/hr</span>
            </h2>
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-2">
              <Clock size={16} /> Usually responds in 1 hour
            </p>

            {requestSent ? (
              <div className="w-full bg-green-50 text-green-700 font-bold py-4 px-4 rounded-xl flex items-center justify-center gap-2 border border-green-200">
                <CheckCircle size={20} /> Request Sent!
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="w-full bg-blue-600 text-white font-bold text-lg py-4 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-md flex items-center justify-center gap-2"
              >
                Hire
              </button>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <p className="flex items-center text-sm text-gray-600 gap-2">
                <CheckCircle size={16} className="text-green-500" /> Identity Verified
              </p>
              <p className="flex items-center text-sm text-gray-600 gap-2">
                <Shield size={16} className="text-blue-500" /> LocalLink Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;