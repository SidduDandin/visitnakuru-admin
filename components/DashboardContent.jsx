"use client";

import { useState, useEffect } from "react";
import { Users, Map, DollarSign, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardContent({ user, refreshUser }) {
  const [currentUser, setCurrentUser] = useState(user);

  // Sync local user state when parent updates
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const visitorStats = [
    { month: "Jan", visitors: 1200 },
    { month: "Feb", visitors: 1800 },
    { month: "Mar", visitors: 2500 },
    { month: "Apr", visitors: 2000 },
    { month: "May", visitors: 3000 },
  ];

  const attractionStats = [
    { name: "National Park", value: 45 },
    { name: "Lakes & Nature", value: 25 },
    { name: "Museums", value: 15 },
    { name: "Cultural Sites", value: 15 },
  ];

  const COLORS = ["#16a34a", "#facc15", "#3b82f6", "#ef4444"];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back, {currentUser?.username || "Guest"}! 👋
          </h2>
          <p className="mt-2 text-gray-600">
            Here’s the latest tourism statistics and insights.
          </p>
        </div>
        {/* Manual refresh button (optional) */}
        {/* <button
          onClick={refreshUser}
          className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700"
        >
          Refresh
        </button> */}
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <Users className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Visitors</p>
            <p className="text-xl font-bold">12,450</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Map className="text-yellow-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Attractions</p>
            <p className="text-xl font-bold">38</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <DollarSign className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <p className="text-xl font-bold">$245K</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-lg">
            <Calendar className="text-red-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Upcoming Events</p>
            <p className="text-xl font-bold">12</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Visitors Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitorStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Popular Attractions</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={attractionStats}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#16a34a"
                label
              >
                {attractionStats.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
