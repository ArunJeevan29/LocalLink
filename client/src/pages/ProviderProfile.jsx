import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, CheckCircle, Shield, Clock } from "lucide-react";

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);

  const pro = {
    name: "Arun Jeevan",
    category: "Web Development",
    price: 800,
    rating: 4.9,
    location: "Erode, TN",
    bio: "Passionate AI & DS student building top-notch full-stack applications. I specialize in React, Tailwind, and Node.js to bring your ideas to life quickly and efficiently.",
    memberSince: "March 2026",
    reviews: [
      {
        id: 1,
        author: "Rahul K.",
        rating: 5,
        text: "Arun built my business website in record time. Highly recommended!",
      },
      {
        id: 2,
        author: "Priya S.",
        rating: 5,
        text: "Great communication and excellent code quality.",
      },
    ],
  };

  const handleConnect = () => {
    setRequestSent(true);
    alert(`Request sent to ${pro.name}! Check your Dashboard for updates.`);
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 font-medium hover:underline mb-6 flex items-center gap-2"
      >
        ← Back to Search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {pro.category}
                </span>
                <h1 className="text-3xl font-extrabold text-gray-900 mt-3">
                  {pro.name}
                </h1>
                <p className="flex items-center text-gray-500 mt-2 font-medium">
                  <MapPin size={18} className="mr-1 text-gray-400" />{" "}
                  {pro.location}
                </p>
              </div>
              <div className="flex flex-col items-center bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                <div className="flex items-center gap-1 text-yellow-600 font-bold text-xl">
                  <Star className="fill-yellow-500 text-yellow-500" size={24} />{" "}
                  {pro.rating}
                </div>
                <span className="text-xs text-yellow-800 mt-1">
                  {pro.reviews.length} Reviews
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-6 mb-2">
              About Me
            </h3>
            <p className="text-gray-600 leading-relaxed">{pro.bio}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
              Client Reviews
            </h3>
            <div className="space-y-6">
              {pro.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 p-5 rounded-xl border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800">
                      {review.author}
                    </span>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ₹{pro.price}
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
                Connect Now
              </button>
            )}

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
              <p className="flex items-center text-sm text-gray-600 gap-2">
                <CheckCircle size={16} className="text-green-500" /> Identity
                Verified
              </p>
              <p className="flex items-center text-sm text-gray-600 gap-2">
                <Shield size={16} className="text-blue-500" /> LocalLink
                Guarantee
              </p>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Member since {pro.memberSince}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
