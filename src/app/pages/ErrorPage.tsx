import { Link, useRouteError, isRouteErrorResponse } from "react-router";
import { Home, ArrowLeft, AlertTriangle } from "lucide-react";
import { useState } from "react";

export function ErrorPage() {
  const error = useRouteError();
  const [showDetails, setShowDetails] = useState(false);

  if (isRouteErrorResponse(error) && error.status === 302) {
    throw error;
  }

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  let details = "";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || "An error occurred.";
  } else if (error instanceof Error) {
    message = error.message;
    details = error.stack || "";
  } else if (typeof error === "string") {
    message = error;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="size-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="size-10 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {message}
          </p>

          {details && (
            <div className="text-left">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm text-[#00c0ff] hover:underline mb-2"
              >
                {showDetails ? "Hide details" : "Show details"}
              </button>
              {showDetails && (
                <pre className="mt-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs text-gray-800 dark:text-gray-300 overflow-x-auto text-left whitespace-pre-wrap break-words max-h-64 overflow-y-auto border border-gray-200 dark:border-gray-700">
                  {details}
                </pre>
              )}
            </div>
          )}
        </div>

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
      </div>
    </div>
  );
}
