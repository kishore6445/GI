import { DashboardHeader } from "@/components/dashboard-header"
import { ReviewGPITracker } from "@/components/review/review-gpi-tracker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReviewGPIPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="GPI / Activities Review" text="Review and analyze performance metrics across weeks" />

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="space-y-4">
          <ReviewGPITracker period="weekly" />
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <ReviewGPITracker period="monthly" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
