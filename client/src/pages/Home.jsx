import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");

        const config = token
          ? { headers: { Authorization: `Bearer ${token}` } }
          : {};

        const response = await axios.get(
          "http://localhost:5000/api/services",
          config,
        );

        const fetchedData =
          response.data.services || response.data.data || response.data;

        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setServices(fetchedData);
        } else {
          throw new Error("No data or invalid format");
        }
      } catch (error) {
        console.warn(
          "API failed. Loading backup data for presentation...",
          error,
        );

        setServices([
          {
            _id: "mock1",
            category: "Home Repair",
            title: "Expert Plumbing Service",
            price: "$40/hr",
            provider: { _id: "p1", name: "John Doe" },
            location: "Erode, TN",
          },
          {
            _id: "mock2",
            category: "Education",
            title: "Advanced Math Tutoring",
            price: "$25/hr",
            provider: { _id: "p2", name: "Sarah Smith" },
            location: "Remote",
          },
          {
            _id: "mock3",
            category: "Tech",
            title: "Full-Stack Web Development",
            price: "$50/hr",
            provider: { _id: "p3", name: "Alex Tech" },
            location: "Remote",
          },
          {
            _id: "mock4",
            category: "Cleaning",
            title: "Deep Home Cleaning",
            price: "$30/hr",
            provider: { _id: "p4", name: "CleanSweep Inc." },
            location: "Erode, TN",
          },
        ]);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const categoryMatch = service.category
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const titleMatch = service.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const providerMatch = service.provider?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch || titleMatch || providerMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-100 py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 tracking-tight">
          LocalLink
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            Sign up
          </Link>
        </div>
      </header>

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
                  key={service._id}
                  id={service._id}
                  providerId={service.provider?._id}
                  providerName={service.provider?.name}
                  category={service.category}
                  title={service.title}
                  price={service.price}
                  rating={5.0}
                  location={service.location || "Erode, TN"}
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
