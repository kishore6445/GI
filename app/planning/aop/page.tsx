import { DashboardHeader } from "@/components/dashboard-header"
import { AOPUploader } from "@/components/aop/aop-uploader"
import { AOPFileHistory } from "@/components/aop/aop-file-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AOPPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        heading="Annual Operating Plan (AOP)"
        text="Upload and manage your Annual Operating Plan files"
      />

      <Tabs defaultValue="upload" className="flex-1">
        <TabsList>
          <TabsTrigger value="upload">Upload AOP</TabsTrigger>
          <TabsTrigger value="history">File History</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="mt-0 p-0">
          <AOPUploader />
        </TabsContent>
        <TabsContent value="history" className="mt-0 p-0">
          <AOPFileHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
