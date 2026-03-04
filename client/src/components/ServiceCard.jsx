import React from "react";
import { Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const ServiceCard = ({
  id,
  providerName,
  category,
  price,
  rating,
  location,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
      {/* Top Banner section */}
      <div className="bg-blue-600 h-24 p-4 flex justify-between items-start text-white">
        <span className="bg-blue-800/50 px-3 py-1 text-xs font-semibold rounded-full shadow-sm uppercase">
          {category}
        </span>
        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded text-sm backdrop-blur-sm">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{providerName}</h3>
        <p className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin size={14} className="mr-1" /> {location}
        </p>

        {/* Pricing & Button pushed to the bottom */}
        <div className="mt-auto flex justify-between items-end border-t border-gray-100 pt-4"  >
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Starting at
            </p>
            <p className="text-xl font-bold text-gray-900">
              ₹{price}
              <span className="text-sm font-normal text-gray-500">/hr</span>
            </p>
          </div>

          {/* This button will link to their specific profile page later */}
          <Link
            to={`/provider/${id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            View Pro
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
