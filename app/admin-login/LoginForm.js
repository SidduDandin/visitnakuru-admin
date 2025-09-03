'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverErr, setServerErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

  function validateForm() {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Username is required';
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerErr('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      setLoading(true);
      const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // ✅ important for cookies
      });

      const data = await res.json();

      if (!res.ok) {
        setServerErr(data.error || 'Login failed');
        return;
      }

      router.push('/admin');
    } catch (e) {
      setServerErr('Network error, please try again');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-100">
          {/* Logo / Branding */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="/visitnakuru.jpg" // ✅ must be in /public
              alt="Visit Nakuru Logo"
              className="h-20 w-20 object-contain rounded-full shadow-md"
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
              Admin Portal
            </h2>
            <p className="text-sm text-gray-500">
              Secure login for administrators
            </p>
          </div>

          {/* Server Error */}
          {serverErr && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-md">
              {serverErr}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-xl outline-none ${
                    errors.username
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                  } focus:ring-2`}
                  placeholder="Username"
                  aria-label="Username"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={`w-full pl-10 pr-4 py-2 border rounded-xl outline-none ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                  } focus:ring-2`}
                  placeholder="Password"
                  aria-label="Password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-700 via-green-600 to-yellow-400 hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
