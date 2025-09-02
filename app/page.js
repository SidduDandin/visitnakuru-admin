import Header from '../components/Header';
import Footer from '../components/Footer';
import { cookies } from 'next/headers';


async function getUserFromCookie() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return { id: data.id, username: data.username };
  } catch (e) {
    return null;
  }
}

export default async function Home() {
  const user = await getUserFromCookie();

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} />
      <main className="flex-grow max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold">Welcome to the Admin Portal</h2>
        <p className="mt-4">Use the login page to access the admin dashboard.</p>
      </main>
      <Footer />
    </div>
  );
}
