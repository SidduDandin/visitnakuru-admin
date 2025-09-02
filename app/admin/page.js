// app/admin/page.jsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SidebarLayout from "../../components/SidebarLayout";
import DashboardContent from "../../components/DashboardContent";

async function getUser() {
  try {
    // Forward all cookies to backend
    const cookieHeader = cookies()
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/me`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store", // ensure fresh data
    });

    if (!res.ok) {
      console.error("Backend returned non-OK status:", res.status);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

export default async function AdminPage() {
  const user = await getUser();

  // ✅ Server-side redirect if not logged in
  if (!user) {
    redirect("/admin-login");
  }

  // Render dashboard for authenticated user
  return (
    <SidebarLayout user={user}>
      <DashboardContent user={user} />
    </SidebarLayout>
  );
}
