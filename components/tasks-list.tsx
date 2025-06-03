"use client"

import { useState, useMemo } from "react"
import { AlertCircle, CheckCircle, Clock, Eye, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface SubTask {
  id: string
  title: string
  description: string
  dueDate: string
  status: "Not Started" | "In Progress" | "On Hold" | "Waiting" | "Completed" | "Overdue"
  priority: "High" | "Medium" | "Low"
  assignedTo: string
}

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: "Not Started" | "In Progress" | "On Hold" | "Waiting" | "Completed" | "Overdue"
  priority: "High" | "Medium" | "Low"
  assignedTo: string
  source: "QOP" | "Issue Log" | "1-1 Meeting" | "Team Meeting" | "Personal"
  subtasks: SubTask[]
}

interface Project {
  id: string
  title: string
  description: string
  dueDate: string
  status: "Not Started" | "In Progress" | "On Hold" | "Waiting" | "Completed" | "Overdue"
  priority: "High" | "Medium" | "Low"
  tasks: Task[]
}

interface TasksListProps {
  type: "personal" | "team"
  onAddItem?: (type: "project" | "task" | "subtask", parentId: string | null) => void
}

type SubtaskFilter = "all" | "with-subtasks" | "without-subtasks"
type SortOption = "priority-high" | "priority-low" | "date-asc" | "date-desc" | "none"

export function TasksList({ type, onAddItem }: TasksListProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [subtasksModalOpen, setSubtasksModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [subtaskFilter, setSubtaskFilter] = useState<SubtaskFilter>("all")
  const [sortOption, setSortOption] = useState<SortOption>("none")

  const personalProjects: Project[] = [
    {
      id: "project-1",
      title: "Q2 Performance Review",
      description: "Complete all Q2 performance review activities",
      dueDate: "2025-05-30",
      status: "In Progress",
      priority: "High",
      tasks: [
        {
          id: "task-1",
          title: "Complete Q2 performance metrics",
          description: "Review team performance metrics and prepare summary report",
          dueDate: "2025-05-15",
          status: "In Progress",
          priority: "High",
          assignedTo: "You",
          source: "QOP",
          subtasks: [
            {
              id: "subtask-1-1",
              title: "Gather team metrics",
              description: "Collect all team performance data from the system",
              dueDate: "2025-05-10",
              status: "Completed",
              priority: "Medium",
              assignedTo: "You",
            },
            {
              id: "subtask-1-2",
              title: "Analyze performance trends",
              description: "Identify key trends and patterns in the performance data",
              dueDate: "2025-05-12",
              status: "In Progress",
              priority: "Medium",
              assignedTo: "You",
            },
            {
              id: "subtask-1-3",
              title: "Draft summary report",
              description: "Create initial draft of the performance summary report",
              dueDate: "2025-05-14",
              status: "Not Started",
              priority: "High",
              assignedTo: "You",
            },
          ],
        },
        {
          id: "task-2",
          title: "Schedule review meetings",
          description: "Set up individual review meetings with team members",
          dueDate: "2025-05-20",
          status: "Not Started",
          priority: "Medium",
          assignedTo: "You",
          source: "QOP",
          subtasks: [
            {
              id: "subtask-2-1",
              title: "Prepare meeting agenda",
              description: "Create standardized agenda for review meetings",
              dueDate: "2025-05-16",
              status: "Not Started",
              priority: "Low",
              assignedTo: "You",
            },
            {
              id: "subtask-2-2",
              title: "Send calendar invites",
              description: "Schedule and send meeting invites to all team members",
              dueDate: "2025-05-17",
              status: "Not Started",
              priority: "Medium",
              assignedTo: "You",
            },
          ],
        },
      ],
    },
    {
      id: "project-2",
      title: "Website Performance Optimization",
      description: "Improve website loading times and user experience",
      dueDate: "2025-06-15",
      status: "In Progress",
      priority: "High",
      tasks: [
        {
          id: "task-3",
          title: "Resolve website performance issue",
          description: "Investigate and fix the loading time issues on the product page",
          dueDate: "2025-05-08",
          status: "Overdue",
          priority: "High",
          assignedTo: "You",
          source: "Issue Log",
          subtasks: [
            {
              id: "subtask-3-1",
              title: "Run performance audit",
              description: "Use Lighthouse to identify performance bottlenecks",
              dueDate: "2025-05-05",
              status: "Completed",
              priority: "High",
              assignedTo: "You",
            },
            {
              id: "subtask-3-2",
              title: "Optimize images",
              description: "Compress and resize images to improve loading time",
              dueDate: "2025-05-06",
              status: "Overdue",
              priority: "Medium",
              assignedTo: "You",
            },
            {
              id: "subtask-3-3",
              title: "Implement lazy loading",
              description: "Add lazy loading for below-the-fold content",
              dueDate: "2025-05-07",
              status: "Not Started",
              priority: "Medium",
              assignedTo: "You",
            },
          ],
        },
        {
          id: "task-4",
          title: "Update caching policy",
          description: "Implement better caching strategy for static assets",
          dueDate: "2025-05-25",
          status: "Not Started",
          priority: "Medium",
          assignedTo: "You",
          source: "Issue Log",
          subtasks: [],
        },
      ],
    },
    {
      id: "project-3",
      title: "Marketing Campaign Analysis",
      description: "Analyze Q1 marketing campaign results and plan for Q3",
      dueDate: "2025-05-28",
      status: "Not Started",
      priority: "Medium",
      tasks: [
        {
          id: "task-5",
          title: "Review marketing campaign results",
          description: "Analyze Q1 marketing campaign performance and document learnings",
          dueDate: "2025-05-20",
          status: "Not Started",
          priority: "Low",
          assignedTo: "You",
          source: "Team Meeting",
          subtasks: [],
        },
      ],
    },
  ]

  const teamProjects: Project[] = [
    {
      id: "team-project-1",
      title: "Q3 Planning",
      description: "Complete all Q3 planning activities and documentation",
      dueDate: "2025-06-10",
      status: "In Progress",
      priority: "High",
      tasks: [
        {
          id: "team-task-1",
          title: "Finalize Q3 planning document",
          description: "Complete the Q3 planning document with input from all team members",
          dueDate: "2025-05-25",
          status: "In Progress",
          priority: "High",
          assignedTo: "Rahul Sharma",
          source: "QOP",
          subtasks: [
            {
              id: "team-subtask-1-1",
              title: "Collect department goals",
              description: "Gather Q3 goals from each department head",
              dueDate: "2025-05-20",
              status: "In Progress",
              priority: "High",
              assignedTo: "Rahul Sharma",
            },
            {
              id: "team-subtask-1-2",
              title: "Draft resource allocation plan",
              description: "Create resource allocation plan for Q3 projects",
              dueDate: "2025-05-22",
              status: "Not Started",
              priority: "Medium",
              assignedTo: "Neha Singh",
            },
          ],
        },
        {
          id: "team-task-2",
          title: "Schedule planning workshops",
          description: "Organize cross-functional planning workshops for Q3",
          dueDate: "2025-05-30",
          status: "Not Started",
          priority: "Medium",
          assignedTo: "Priya Patel",
          source: "QOP",
          subtasks: [],
        },
      ],
    },
    {
      id: "team-project-2",
      title: "Customer Feedback System",
      description: "Implement new customer feedback collection and analysis system",
      dueDate: "2025-06-30",
      status: "Not Started",
      priority: "Medium",
      tasks: [
        {
          id: "team-task-3",
          title: "Implement new customer feedback system",
          description: "Set up and test the new customer feedback collection system",
          dueDate: "2025-05-18",
          status: "Not Started",
          priority: "Medium",
          assignedTo: "Priya Patel",
          source: "QOP",
          subtasks: [
            {
              id: "team-subtask-3-1",
              title: "Research feedback tools",
              description: "Evaluate available feedback collection tools and platforms",
              dueDate: "2025-05-10",
              status: "Not Started",
              priority: "Medium",
              assignedTo: "Priya Patel",
            },
            {
              id: "team-subtask-3-2",
              title: "Design feedback form",
              description: "Create customer feedback form with UX team",
              dueDate: "2025-05-15",
              status: "Not Started",
              priority: "Low",
              assignedTo: "Vikram Mehta",
            },
          ],
        },
      ],
    },
    {
      id: "team-project-3",
      title: "Server Infrastructure",
      description: "Upgrade and stabilize server infrastructure",
      dueDate: "2025-05-15",
      status: "Overdue",
      priority: "High",
      tasks: [
        {
          id: "team-task-4",
          title: "Resolve server outage issue",
          description: "Investigate and fix the recurring server outages",
          dueDate: "2025-05-07",
          status: "Overdue",
          priority: "High",
          assignedTo: "Amit Kumar",
          source: "Issue Log",
          subtasks: [
            {
              id: "team-subtask-4-1",
              title: "Analyze server logs",
              description: "Review server logs to identify cause of outages",
              dueDate: "2025-05-05",
              status: "Completed",
              priority: "High",
              assignedTo: "Amit Kumar",
            },
            {
              id: "team-subtask-4-2",
              title: "Implement monitoring alerts",
              description: "Set up proactive monitoring and alerts for server health",
              dueDate: "2025-05-06",
              status: "Overdue",
              priority: "High",
              assignedTo: "Amit Kumar",
            },
          ],
        },
      ],
    },
  ]

  const projects = type === "personal" ? personalProjects : teamProjects

  const getStatusIcon = (status: string) => {
    if (status === "Completed") return <CheckCircle className="h-4 w-4 text-green-500" />
    if (status === "Overdue") return <AlertCircle className="h-4 w-4 text-destructive" />
    if (status === "In Progress") return <Clock className="h-4 w-4 text-amber-500" />
    return <Clock className="h-4 w-4 text-muted-foreground" />
  }

  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    if (priority === "Medium") return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case "QOP":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Issue Log":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "1-1 Meeting":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      case "Team Meeting":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const handleViewSubtasks = (task: Task) => {
    setSelectedTask(task)
    setSubtasksModalOpen(true)
  }

  // Get all tasks from all projects
  const allTasks = projects.flatMap((project) =>
    project.tasks.map((task) => ({
      ...task,
      projectTitle: project.title,
      projectId: project.id,
    })),
  )

  // Apply filters and sorting
  const filteredAndSortedTasks = useMemo(() => {
    // First apply project filter
    let tasks = allTasks.filter((task) => !selectedProject || task.projectId === selectedProject)

    // Then apply subtask filter
    if (subtaskFilter === "with-subtasks") {
      tasks = tasks.filter((task) => task.subtasks.length > 0)
    } else if (subtaskFilter === "without-subtasks") {
      tasks = tasks.filter((task) => task.subtasks.length === 0)
    }

    // Then apply sorting
    return tasks.sort((a, b) => {
      switch (sortOption) {
        case "priority-high":
          // Sort by priority (High > Medium > Low)
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          )

        case "priority-low":
          // Sort by priority (Low > Medium > High)
          const priorityOrderReverse = { High: 1, Medium: 2, Low: 3 }
          return (
            priorityOrderReverse[b.priority as keyof typeof priorityOrderReverse] -
            priorityOrderReverse[a.priority as keyof typeof priorityOrderReverse]
          )

        case "date-asc":
          // Sort by due date (earliest first)
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()

        case "date-desc":
          // Sort by due date (latest first)
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()

        default:
          return 0
      }
    })
  }, [allTasks, selectedProject, subtaskFilter, sortOption])

  const getPriorityValue = (priority: string): number => {
    switch (priority) {
      case "High":
        return 3
      case "Medium":
        return 2
      case "Low":
        return 1
      default:
        return 0
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "personal" ? "My Tasks" : "Team Tasks"}</CardTitle>
        <CardDescription>
          {type === "personal"
            ? "Manage and track your assigned projects, tasks, and subtasks"
            : "Monitor projects, tasks, and subtasks assigned to your team members"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Filters and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Project Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Project:</span>
                <select
                  className="text-sm border rounded p-1"
                  value={selectedProject || ""}
                  onChange={(e) => setSelectedProject(e.target.value || null)}
                >
                  <option value="">All Projects</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtask Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Subtasks:</span>
                <select
                  className="text-sm border rounded p-1"
                  value={subtaskFilter}
                  onChange={(e) => setSubtaskFilter(e.target.value as SubtaskFilter)}
                >
                  <option value="all">All Tasks</option>
                  <option value="with-subtasks">With Subtasks</option>
                  <option value="without-subtasks">Without Subtasks</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <select
                  className="text-sm border rounded p-1"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                >
                  <option value="none">Default</option>
                  <option value="priority-high">Priority (High to Low)</option>
                  <option value="priority-low">Priority (Low to High)</option>
                  <option value="date-asc">Due Date (Earliest First)</option>
                  <option value="date-desc">Due Date (Latest First)</option>
                </select>
              </div>
            </div>

            <Button size="sm" onClick={() => onAddItem && onAddItem("project", null)}>
              <Plus className="h-4 w-4 mr-1" /> New Project
            </Button>
          </div>

          {/* Tasks Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTasks.length > 0 ? (
                  filteredAndSortedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{getStatusIcon(task.status)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{task.description}</div>
                          {task.subtasks.length > 0 && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {task.subtasks.length} subtask{task.subtasks.length > 1 ? "s" : ""}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{task.projectTitle}</TableCell>
                      <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getSourceColor(task.source)}>
                          {task.source}
                        </Badge>
                      </TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            {task.subtasks.length > 0 && (
                              <DropdownMenuItem onClick={() => handleViewSubtasks(task)}>
                                <Eye className="h-4 w-4 mr-2" /> View Subtasks
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => onAddItem && onAddItem("subtask", task.id)}>
                              Add Subtask
                            </DropdownMenuItem>
                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                            <DropdownMenuItem>Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                      No tasks match the current filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Subtasks Modal */}
        <Dialog open={subtasksModalOpen} onOpenChange={setSubtasksModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Subtasks for {selectedTask?.title}</DialogTitle>
              <DialogDescription>View and manage subtasks for this task</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Subtask</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTask?.subtasks.map((subtask) => (
                    <TableRow key={subtask.id}>
                      <TableCell>{getStatusIcon(subtask.status)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{subtask.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{subtask.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(subtask.dueDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getPriorityColor(subtask.priority)}>
                          {subtask.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{subtask.assignedTo}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Subtask</DropdownMenuItem>
                            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                            <DropdownMenuItem>Delete Subtask</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={() => setSubtasksModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
