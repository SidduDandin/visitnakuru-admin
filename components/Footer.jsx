export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-6 mt-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm">© {new Date().getFullYear()} Admin Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}
