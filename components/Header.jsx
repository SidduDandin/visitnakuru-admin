'use client';
import { useRouter } from 'next/navigation';

export default function Header({ user }) {
  const router = useRouter();

  async function handleLogout() {
    try {
     await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
  method: "POST",
  credentials: "include",
});
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      router.push("/admin-login"); // ✅ redirect to login page
    }
  }

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-r from-green-700 via-green-600 to-yellow-400">
            A
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            Visit<span className="text-green-700">Nakuru</span>
          </h1>
        </div>

        {/* Navigation + User */}
        <nav className="flex items-center gap-6 text-gray-800 font-medium">
          {user ? (
            <>
              <span className="hidden sm:inline text-gray-600">
                Hello, <span className="font-semibold">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-700 via-green-600 to-yellow-400 hover:opacity-90 transition"
              >
                Logout
              </button>
            </>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
