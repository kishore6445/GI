import { DashboardHeader } from "@/components/dashboard-header"
import { QOPUploader } from "@/components/qop/qop-uploader"
import { QOPFileHistory } from "@/components/qop/qop-file-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function QOPPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader
        heading="Quarterly Operating Plan (QOP)"
        text="Upload and manage your Quarterly Operating Plan files"
      />

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="upload" className="h-full flex flex-col">
          <TabsList>
            <TabsTrigger value="upload">Upload QOP</TabsTrigger>
            <TabsTrigger value="history">File History</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="flex-1 overflow-hidden">
            <QOPUploader />
          </TabsContent>
          <TabsContent value="history" className="flex-1 overflow-auto">
            <QOPFileHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
