"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PPISection() {
  const [selectedMember, setSelectedMember] = useState("Ananya Sharma")

  // Project data with weekly tasks including assignee and status
  const projects = [
    {
      id: "proj-1",
      name: "Mobile App Development",
      manager: "Vikram Kumar",
      timeline: "On Track",
      completion: 65,
      priority: "High",
      status: "On Track",
      weeklyTasks: {
        week1: [
          { task: "UI wireframes", assignee: "Ananya Sharma", status: "Completed" },
          { task: "User research", assignee: "Priya Singh", status: "In Progress" },
        ],
        week2: [
          { task: "Design mockups", assignee: "Rahul Patel", status: "Not Started" },
          { task: "Prototype", assignee: "Ananya Sharma", status: "In Progress" },
        ],
        week3: [
          { task: "API integration", assignee: "Deepak Verma", status: "Not Started" },
          { task: "Testing", assignee: "Vikram Kumar", status: "Not Started" },
        ],
        week4: [
          { task: "Bug fixes", assignee: "Rahul Patel", status: "Not Started" },
          { task: "Deployment prep", assignee: "Deepak Verma", status: "Not Started" },
        ],
      },
    },
    {
      id: "proj-2",
      name: "Website Redesign",
      manager: "Priya Singh",
      timeline: "At Risk",
      completion: 40,
      priority: "Medium",
      status: "At Risk",
      weeklyTasks: {
        week1: [
          { task: "Content audit", assignee: "Priya Singh", status: "Completed" },
          { task: "Sitemap", assignee: "Ananya Sharma", status: "Completed" },
        ],
        week2: [
          { task: "Design system", assignee: "Rahul Patel", status: "In Progress" },
          { task: "Components", assignee: "Vikram Kumar", status: "Not Started" },
        ],
        week3: [
          { task: "Page layouts", assignee: "Ananya Sharma", status: "Not Started" },
          { task: "Responsive design", assignee: "Priya Singh", status: "Not Started" },
        ],
        week4: [
          { task: "Content migration", assignee: "Deepak Verma", status: "Not Started" },
          { task: "SEO optimization", assignee: "Vikram Kumar", status: "Not Started" },
        ],
      },
    },
    {
      id: "proj-3",
      name: "CRM Integration",
      manager: "Deepak Verma",
      timeline: "Delayed",
      completion: 30,
      priority: "Critical",
      status: "Delayed",
      weeklyTasks: {
        week1: [
          { task: "Requirements analysis", assignee: "Deepak Verma", status: "Completed" },
          { task: "Data mapping", assignee: "Vikram Kumar", status: "In Progress" },
        ],
        week2: [
          { task: "API documentation", assignee: "Rahul Patel", status: "Not Started" },
          { task: "Schema design", assignee: "Ananya Sharma", status: "Not Started" },
        ],
        week3: [
          { task: "Integration testing", assignee: "Priya Singh", status: "Not Started" },
          { task: "Data validation", assignee: "Deepak Verma", status: "Not Started" },
        ],
        week4: [
          { task: "User training", assignee: "Vikram Kumar", status: "Not Started" },
          { task: "Go-live preparation", assignee: "Rahul Patel", status: "Not Started" },
        ],
      },
    },
    {
      id: "proj-4",
      name: "Analytics Dashboard",
      manager: "Vikram Kumar",
      timeline: "On Track",
      completion: 80,
      priority: "High",
      status: "On Track",
      weeklyTasks: {
        week1: [
          { task: "Data source setup", assignee: "Vikram Kumar", status: "Completed" },
          { task: "KPI definition", assignee: "Ananya Sharma", status: "Completed" },
        ],
        week2: [
          { task: "Chart implementation", assignee: "Rahul Patel", status: "Completed" },
          { task: "Filters", assignee: "Priya Singh", status: "Completed" },
        ],
        week3: [
          { task: "Performance optimization", assignee: "Deepak Verma", status: "In Progress" },
          { task: "Testing", assignee: "Vikram Kumar", status: "In Progress" },
        ],
        week4: [
          { task: "User acceptance", assignee: "Ananya Sharma", status: "Not Started" },
          { task: "Documentation", assignee: "Priya Singh", status: "Not Started" },
        ],
      },
    },
    {
      id: "proj-5",
      name: "Security Audit",
      manager: "Rahul Patel",
      timeline: "Completed",
      completion: 100,
      priority: "Critical",
      status: "Completed",
      weeklyTasks: {
        week1: [
          { task: "Vulnerability scan", assignee: "Rahul Patel", status: "Completed" },
          { task: "Risk assessment", assignee: "Deepak Verma", status: "Completed" },
        ],
        week2: [
          { task: "Penetration testing", assignee: "Vikram Kumar", status: "Completed" },
          { task: "Code review", assignee: "Ananya Sharma", status: "Completed" },
        ],
        week3: [
          { task: "Report generation", assignee: "Priya Singh", status: "Completed" },
          { task: "Recommendations", assignee: "Rahul Patel", status: "Completed" },
        ],
        week4: [
          { task: "Implementation plan", assignee: "Deepak Verma", status: "Completed" },
          { task: "Final review", assignee: "Vikram Kumar", status: "Completed" },
        ],
      },
    },
  ]

  // Get status color for projects
  const getProjectStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "At Risk":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Delayed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "On Hold":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "High":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Get task status color
  const getTaskStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Not Started":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b border-brand-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-brand-primary">Project Performance Indicators</CardTitle>
              <CardDescription>Track project performance and weekly tasks</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="weekly-tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly-tasks">Weekly Tasks</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="weekly-tasks" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Project Name</TableHead>
                      <TableHead>Week 1</TableHead>
                      <TableHead>Week 2</TableHead>
                      <TableHead>Week 3</TableHead>
                      <TableHead>Week 4</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span className="font-semibold">{project.name}</span>
                            <span className="text-xs text-muted-foreground">Manager: {project.manager}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {project.weeklyTasks.week1.map((taskItem, index) => (
                              <div key={index} className="text-sm p-2 bg-gray-50 rounded border">
                                <div className="font-medium text-gray-900 mb-1">• {taskItem.task}</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600">Assignee: {taskItem.assignee}</span>
                                  <Badge variant="outline" className={`text-xs ${getTaskStatusColor(taskItem.status)}`}>
                                    {taskItem.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {project.weeklyTasks.week2.map((taskItem, index) => (
                              <div key={index} className="text-sm p-2 bg-gray-50 rounded border">
                                <div className="font-medium text-gray-900 mb-1">• {taskItem.task}</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600">Assignee: {taskItem.assignee}</span>
                                  <Badge variant="outline" className={`text-xs ${getTaskStatusColor(taskItem.status)}`}>
                                    {taskItem.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {project.weeklyTasks.week3.map((taskItem, index) => (
                              <div key={index} className="text-sm p-2 bg-gray-50 rounded border">
                                <div className="font-medium text-gray-900 mb-1">• {taskItem.task}</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600">Assignee: {taskItem.assignee}</span>
                                  <Badge variant="outline" className={`text-xs ${getTaskStatusColor(taskItem.status)}`}>
                                    {taskItem.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-2">
                            {project.weeklyTasks.week4.map((taskItem, index) => (
                              <div key={index} className="text-sm p-2 bg-gray-50 rounded border">
                                <div className="font-medium text-gray-900 mb-1">• {taskItem.task}</div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-600">Assignee: {taskItem.assignee}</span>
                                  <Badge variant="outline" className={`text-xs ${getTaskStatusColor(taskItem.status)}`}>
                                    {taskItem.status}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Completion</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span className="font-semibold">{project.name}</span>
                            <span className="text-xs text-muted-foreground">Manager: {project.manager}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getProjectStatusColor(project.timeline)}>
                            {project.timeline}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={project.completion} className="w-16 h-2" />
                            <span className="text-sm font-medium">{project.completion}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getProjectStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
