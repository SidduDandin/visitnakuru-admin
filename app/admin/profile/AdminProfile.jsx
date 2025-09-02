"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "../../../components/SidebarLayout";

export default function AdminProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // 🔄 Fetch current user
  const refreshUser = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setFormData(data);
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      id: user?.id,
    });
  };

  // ✅ Update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/update-profile`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      const result = await res.json();

      if (res.ok) {
        setUser(result.user);
        setFormData(result.user);
        setEditing(false);
        await refreshUser(); // 🔄 ensure fresh data
        alert("Profile updated successfully!");
      } else {
        alert(result.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error submitting profile:", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10">No profile found.</p>;

  return (
    <SidebarLayout user={user} refreshUser={refreshUser}>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Profile</h1>

        {!editing ? (
          <>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.username ? user.username[0].toUpperCase() : "?"}
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {user.username}
                </p>
                <p className="text-gray-600">{user.email}</p>
                {user.role && (
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                    {user.role}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-lg p-2"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  setFormData(user);
                }}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </SidebarLayout>
  );
}
