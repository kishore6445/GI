import { DashboardHeader } from "@/components/dashboard-header"
import { GPITracker } from "@/components/gpi/gpi-tracker"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GPIPage() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader
        heading="My GPIs / Activities"
        text="Track and update your performance metrics based on quarterly goals"
      />

      <Tabs defaultValue="weekly" className="space-y-6">
        <TabsList>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="weekly" className="space-y-4">
          <GPITracker period="weekly" />
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <GPITracker period="monthly" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
