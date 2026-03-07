import React from "react";
import { Star, MapPin, CheckCircle } from "lucide-react";
import axios from "axios"
import { Link } from "react-router-dom"

const ServiceCard = ({
  id,
  providerId,
  providerName,
  category,
  title,
  price,
  rating,
  location,
}) => {

  const handleHire = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return alert("Please log in to hire a professional!");
      }

      await axios.post("http://localhost:5000/api/jobs", 
        {
          provider: providerId,
          serviceTitle: title,
          price: price
        }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Success! You just sent a request to ${providerName}. Check your "Sent Requests" menu!`);
    } catch (error) {
      console.error("Error booking job:", error);
      alert(error.response?.data?.message || "Error booking this service.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
      <div className="bg-blue-600 h-24 p-4 flex justify-between items-start text-white">
        <span className="bg-blue-800/50 px-3 py-1 text-xs font-semibold rounded-full shadow-sm uppercase">
          {category}
        </span>
        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-sm backdrop-blur-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 font-medium mb-2">
          By: <Link to={`/provider/${id}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">{providerName}</Link>
        </p>

        <p className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" /> {location}
        </p>

        <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Fixed Rate</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{price}
            </p>
          </div>

          <button
            onClick={handleHire}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;