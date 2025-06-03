export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Deployment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">Your GI Software application is working correctly.</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Build completed at: {new Date().toISOString()}</p>
          <p className="text-sm text-gray-500">Domain: 7777.arkportal.in</p>
        </div>
      </div>
    </div>
  )
}
