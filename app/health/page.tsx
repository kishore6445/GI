export default function HealthCheck() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">GI Software Dashboard</h1>
          <p className="text-gray-600 mb-4">Application is running successfully!</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>Build Time: {new Date().toISOString()}</p>
            <p>Environment: {process.env.NODE_ENV}</p>
            <p>Version: 1.0.0</p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href="/"
            className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </a>
          <a
            href="/review/one-on-one"
            className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            One-on-One Reviews
          </a>
          <a
            href="/planning/aop"
            className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
          >
            AOP Planning
          </a>
        </div>
      </div>
    </div>
  )
}
