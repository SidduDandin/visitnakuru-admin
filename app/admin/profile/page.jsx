


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminProfilePage from "./AdminProfile"; // your client component with useState/useEffect

export default function AdminProfileclientPage() {
  const token = cookies().get("token");

  // Redirect if not logged in
  if (!token) {
    redirect("/admin-login");
  }

  // Render client component
  return <AdminProfilePage />;
}