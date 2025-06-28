export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FCECDD] to-[#FFF4EE] text-center px-4">
      <div className="max-w-md space-y-6">
        <h1 className="text-6xl font-extrabold text-[#FF7601]">404</h1>
        <h2 className="text-2xl font-semibold text-[#00809D]">Page Not Found</h2>
        <p className="text-[#00809D]/70 text-sm">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block mt-4 bg-[#FF7601] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#e36000] transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
