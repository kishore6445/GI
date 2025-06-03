import { DashboardHeader } from "@/components/dashboard-header"
import { AdminSettings } from "@/components/admin/admin-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Admin Settings"
        description="Configure system settings and manage application preferences"
      />
      <AdminSettings />
    </div>
  )
}
