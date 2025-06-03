import { DashboardHeader } from "@/components/dashboard-header"
import { TasksPage } from "@/components/tasks/tasks-page"

export default function TasksRoute() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardHeader heading="Task Management" text="Create, assign, and track tasks for yourself and your team" />
      <TasksPage />
    </div>
  )
}
