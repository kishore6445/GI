"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { ExecutionFPISection } from "@/components/execution/execution-fpi-section"

export default function FPIPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="Financial Performance Indicators" text="" />
      <ExecutionFPISection />
    </div>
  )
}
