import { Link } from "react-router";
import { Home, ArrowLeft, Search } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="size-24 bg-gradient-to-br from-[#00c0ff]/10 to-[#043570]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="size-12 text-[#00c0ff]" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00c0ff] hover:bg-[#00a8e0] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#00c0ff]/20"
          >
            <Home className="size-5" />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="size-5" />
            Go Back
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          If you believe this is an error, please contact support.
        </p>
      </div>
    </div>
  );
}
