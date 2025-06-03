import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface RecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivity({ className, ...props }: RecentActivityProps) {
  const activities = [
    {
      user: "John Doe",
      action: "completed task",
      item: "Update Q2 sales forecast",
      time: "2 hours ago",
    },
    {
      user: "Sarah Kim",
      action: "added a comment on",
      item: "Marketing campaign review",
      time: "3 hours ago",
    },
    {
      user: "Alex Chen",
      action: "created a new issue",
      item: "Website performance degradation",
      time: "5 hours ago",
    },
    {
      user: "Maria Garcia",
      action: "updated GPI metrics for",
      item: "Customer satisfaction score",
      time: "Yesterday",
    },
    {
      user: "Robert Johnson",
      action: "uploaded",
      item: "Q2 Operating Plan",
      time: "Yesterday",
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across your team</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 rounded-md border p-3">
              <div className="w-full space-y-1">
                <p className="text-sm font-medium leading-none break-words">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                  <span className="font-medium text-muted-foreground">"{activity.item}"</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
