import type { Metadata } from "next"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { TeamPerformance } from "@/components/team-performance"

export const metadata: Metadata = {
  title: "GI Software - Performance Dashboard",
  description: "Performance management dashboard",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency fallback content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GI Software Dashboard</h1>
          <p className="text-gray-600">Performance Management System</p>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Overview />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <TeamPerformance className="col-span-4" />
                <RecentActivity className="col-span-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
