import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, Clock, ListTodo } from "lucide-react"

export function Overview() {
  const stats = [
    {
      title: "Total Tasks",
      value: "24",
      description: "Assigned this quarter",
      icon: <ListTodo className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Due Today",
      value: "3",
      description: "Tasks to complete",
      icon: <Clock className="h-4 w-4 text-amber-500" />,
    },
    {
      title: "Overdue",
      value: "2",
      description: "Requires attention",
      icon: <AlertCircle className="h-4 w-4 text-destructive" />,
    },
    {
      title: "Completed",
      value: "19",
      description: "This quarter",
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    },
  ]

  return (
    <>
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
