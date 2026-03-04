import React, { useState } from "react";
import { Search } from "lucide-react";
import ServiceCard from "../components/ServiceCard";

const MOCK_SERVICES = [
  {
    id: "1",
    providerName: "Arun Jeevan",
    category: "Web Development",
    price: 800,
    rating: 4.9,
    location: "Erode, TN",
  },
  {
    id: "2",
    providerName: "TechFix Solutions",
    category: "PC Repair",
    price: 400,
    rating: 4.5,
    location: "Chennai, TN",
  },
  {
    id: "3",
    providerName: "Sarah Math Tutor",
    category: "Education",
    price: 300,
    rating: 5.0,
    location: "Online",
  },
  {
    id: "4",
    providerName: "Quick Plumbers",
    category: "Home Repair",
    price: 500,
    rating: 4.2,
    location: "Erode, TN",
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = MOCK_SERVICES.filter(
    (service) =>
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.providerName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white border-b border-gray-200 py-12 px-8 shadow-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Find the perfect professional for your needs.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            From web developers to home repairs, LocalLink connects you with
            top-rated experts instantly.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors text-lg shadow-sm"
              placeholder="What service are you looking for? (e.g., Tutor, Plumber)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
            Available Services
          </h2>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No services found matching "{searchTerm}". Try another category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  providerName={service.providerName}
                  category={service.category}
                  price={service.price}
                  rating={service.rating}
                  location={service.location}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
