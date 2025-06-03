import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TeamPerformanceProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TeamPerformance({ className, ...props }: TeamPerformanceProps) {
  const metrics = [
    {
      name: "Revenue Growth",
      target: 15,
      actual: 12.5,
      unit: "%",
      status: "At Risk",
    },
    {
      name: "Customer Satisfaction",
      target: 90,
      actual: 92,
      unit: "%",
      status: "On Track",
    },
    {
      name: "Product Development",
      target: 100,
      actual: 65,
      unit: "%",
      status: "At Risk",
    },
    {
      name: "Employee Engagement",
      target: 85,
      actual: 87,
      unit: "%",
      status: "On Track",
    },
    {
      name: "Cost Reduction",
      target: 10,
      actual: 7.5,
      unit: "%",
      status: "At Risk",
    },
  ]

  const getProgressColor = (actual: number, target: number) => {
    const percentage = (actual / target) * 100
    if (percentage >= 100) return "bg-green-500"
    if (percentage >= 75) return "bg-amber-500"
    return "bg-red-500"
  }

  const getStatusColor = (status: string) => {
    if (status === "On Track") return "text-green-500"
    if (status === "At Risk") return "text-amber-500"
    return "text-red-500"
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>QOP Performance</CardTitle>
        <CardDescription>Q2 2025 Key Performance Indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-0.5 mb-2 sm:mb-0">
                  <p className="text-sm font-medium">{metric.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Target: {metric.target}
                    {metric.unit} | Actual: {metric.actual}
                    {metric.unit}
                  </p>
                </div>
                <p className={`text-sm font-medium ${getStatusColor(metric.status)}`}>{metric.status}</p>
              </div>
              <Progress
                value={(metric.actual / metric.target) * 100}
                className="h-2"
                indicatorClassName={getProgressColor(metric.actual, metric.target)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
