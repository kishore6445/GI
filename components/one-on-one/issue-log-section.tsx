"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Plus, X } from "lucide-react"

// Define task interface
interface Task {
  id: string
  description: string
  status: "Not Started" | "In Progress" | "Completed"
  assignedTo: string
  dueDate: string
  createdAt: string
}

// Define issue interface
interface Issue {
  id: string
  date: string
  description: string
  loggedBy: string
  assignedManager: string
  resolutionDate: string
  status: string
  tasksCompleted: string
  member: string
  tasks: Task[]
}

// Add a function to check if a task is overdue
const isTaskOverdue = (dueDate: string) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to beginning of day for accurate comparison
  const taskDueDate = new Date(dueDate)
  return taskDueDate < today
}

// Add a function to check if an issue has overdue tasks
const hasOverdueTasks = (issue: Issue) => {
  return issue.tasks.some((task) => isTaskOverdue(task.dueDate) && task.status !== "Completed")
}

export function IssueLogSection() {
  const [selectedMember, setSelectedMember] = useState("Ananya Sharma")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isTasksDialogOpen, setIsTasksDialogOpen] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false)

  // New issue state
  const [newIssue, setNewIssue] = useState({
    description: "",
    loggedBy: "Vikram Kumar", // Current user
    assignedManager: "Vikram Kumar",
    resolutionDate: "",
    status: "Open",
    member: "Ananya Sharma",
  })

  // New task state
  const [newTask, setNewTask] = useState({
    description: "",
    status: "Not Started" as "Not Started" | "In Progress" | "Completed",
    assignedTo: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  })

  // Team members list
  const teamMembers = [
    { id: "sarah", name: "Ananya Sharma" },
    { id: "alex", name: "Rahul Patel" },
    { id: "maria", name: "Priya Singh" },
    { id: "robert", name: "Deepak Verma" },
    { id: "neha", name: "Neha Gupta" },
    { id: "arjun", name: "Arjun Reddy" },
  ]

  // Sample issue data with tasks
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "issue-1",
      date: "2025-05-02",
      description: "Website performance degradation",
      loggedBy: "Rahul Patel",
      assignedManager: "Vikram Kumar",
      resolutionDate: "2025-05-10",
      status: "In Progress",
      tasksCompleted: "2/3",
      member: "Ananya Sharma",
      tasks: [
        {
          id: "task-1-1",
          description: "Run performance audit on homepage",
          status: "Completed",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-05-05",
          createdAt: "2025-05-02",
        },
        {
          id: "task-1-2",
          description: "Optimize image loading",
          status: "Completed",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-05-07",
          createdAt: "2025-05-02",
        },
        {
          id: "task-1-3",
          description: "Implement lazy loading for below-the-fold content",
          status: "In Progress",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-05-09",
          createdAt: "2025-05-03",
        },
      ],
    },
    {
      id: "issue-2",
      date: "2025-04-25",
      description: "Customer data sync failure",
      loggedBy: "Priya Singh",
      assignedManager: "Vikram Kumar",
      resolutionDate: "2025-05-05",
      status: "Open",
      tasksCompleted: "1/4",
      member: "Ananya Sharma",
      tasks: [
        {
          id: "task-2-1",
          description: "Investigate database connection issues",
          status: "Completed",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-04-28",
          createdAt: "2025-04-25",
        },
        {
          id: "task-2-2",
          description: "Fix API endpoint for data synchronization",
          status: "In Progress",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-05-02",
          createdAt: "2025-04-26",
        },
        {
          id: "task-2-3",
          description: "Update error handling for sync failures",
          status: "Not Started",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-05-04",
          createdAt: "2025-04-26",
        },
        {
          id: "task-2-4",
          description: "Document sync process for team reference",
          status: "Not Started",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-05-05",
          createdAt: "2025-04-27",
        },
      ],
    },
    {
      id: "issue-3",
      date: "2025-04-18",
      description: "Email notification delay",
      loggedBy: "Ananya Sharma",
      assignedManager: "Vikram Kumar",
      resolutionDate: "2025-04-30",
      status: "Closed",
      tasksCompleted: "3/3",
      member: "Ananya Sharma",
      tasks: [
        {
          id: "task-3-1",
          description: "Diagnose email queue processing issue",
          status: "Completed",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-04-22",
          createdAt: "2025-04-18",
        },
        {
          id: "task-3-2",
          description: "Optimize email sending process",
          status: "Completed",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-04-25",
          createdAt: "2025-04-19",
        },
        {
          id: "task-3-3",
          description: "Implement monitoring for email queue",
          status: "Completed",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-04-28",
          createdAt: "2025-04-20",
        },
      ],
    },
    {
      id: "issue-4",
      date: "2025-05-05",
      description: "Mobile app crash on login",
      loggedBy: "Deepak Verma",
      assignedManager: "Vikram Kumar",
      resolutionDate: "2025-05-12",
      status: "In Progress",
      tasksCompleted: "1/2",
      member: "Rahul Patel",
      tasks: [
        {
          id: "task-4-1",
          description: "Analyze crash logs from user devices",
          status: "Completed",
          assignedTo: "Rahul Patel",
          dueDate: "2025-05-07",
          createdAt: "2025-05-05",
        },
        {
          id: "task-4-2",
          description: "Fix authentication flow in mobile app",
          status: "In Progress",
          assignedTo: "Rahul Patel",
          dueDate: "2025-05-10",
          createdAt: "2025-05-06",
        },
      ],
    },
    {
      id: "issue-5",
      date: "2025-04-30",
      description: "Payment gateway integration error",
      loggedBy: "Neha Gupta",
      assignedManager: "Vikram Kumar",
      resolutionDate: "2025-05-07",
      status: "On Hold",
      tasksCompleted: "0/3",
      member: "Priya Singh",
      tasks: [
        {
          id: "task-5-1",
          description: "Contact payment gateway provider for API access",
          status: "Not Started",
          assignedTo: "Priya Singh",
          dueDate: "2025-05-02",
          createdAt: "2025-04-30",
        },
        {
          id: "task-5-2",
          description: "Update integration code with new API endpoints",
          status: "Not Started",
          assignedTo: "Priya Singh",
          dueDate: "2025-05-05",
          createdAt: "2025-04-30",
        },
        {
          id: "task-5-3",
          description: "Test payment flow with various payment methods",
          status: "Not Started",
          assignedTo: "Priya Singh",
          dueDate: "2025-05-07",
          createdAt: "2025-04-30",
        },
      ],
    },
  ])

  // Filter issues by selected member
  const filteredIssues = issues.filter((issue) => issue.member === selectedMember)

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-100 text-red-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Closed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get row background color
  const getRowBgColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-50"
      case "Closed":
        return "bg-green-50"
      default:
        return ""
    }
  }

  // Get task status icon
  const getTaskStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Not Started":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      default:
        return null
    }
  }

  // Get task status badge
  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>
      case "Not Started":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Not Started</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Add new issue
  const addNewIssue = () => {
    // Validate required fields
    if (!newIssue.description || !newIssue.resolutionDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new issue with unique ID and current date
    const newId = `issue-${Date.now()}`
    const today = new Date().toISOString().slice(0, 10)
    const issueToAdd: Issue = {
      ...newIssue,
      id: newId,
      date: today,
      tasksCompleted: "0/0",
      tasks: [],
    }

    // Add to issues list
    setIssues([...issues, issueToAdd])

    // Reset form and close dialog
    setNewIssue({
      description: "",
      loggedBy: "Vikram Kumar",
      assignedManager: "Vikram Kumar",
      resolutionDate: "",
      status: "Open",
      member: selectedMember,
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Issue added",
      description: "The new issue has been successfully added.",
      variant: "success",
    })
  }

  // Update issue status
  const updateIssueStatus = (id: string, status: string) => {
    const updatedIssues = issues.map((issue) => (issue.id === id ? { ...issue, status } : issue))
    setIssues(updatedIssues)
  }

  // Open tasks dialog
  const openTasksDialog = (issue: Issue) => {
    setSelectedIssue(issue)
    setIsTasksDialogOpen(true)
  }

  // Add new task to issue
  const addNewTask = () => {
    // Validate required fields
    if (!newTask.description || !newTask.assignedTo || !newTask.dueDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields for the task.",
        variant: "destructive",
      })
      return
    }

    if (!selectedIssue) return

    // Create new task
    const task: Task = {
      id: `task-${Date.now()}`,
      description: newTask.description,
      status: newTask.status,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    // Add task to selected issue
    const updatedIssue = {
      ...selectedIssue,
      tasks: [...selectedIssue.tasks, task],
    }

    // Update tasksCompleted count
    const completedTasks = updatedIssue.tasks.filter((t) => t.status === "Completed").length
    updatedIssue.tasksCompleted = `${completedTasks}/${updatedIssue.tasks.length}`

    // Update issues list
    const updatedIssues = issues.map((issue) => (issue.id === selectedIssue.id ? updatedIssue : issue))
    setIssues(updatedIssues)
    setSelectedIssue(updatedIssue)

    // Reset form and close dialog
    setNewTask({
      description: "",
      status: "Not Started",
      assignedTo: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    })
    setIsAddTaskDialogOpen(false)

    toast({
      title: "Task added",
      description: "The task has been added to the issue.",
      variant: "success",
    })
  }

  // Update task status
  const updateTaskStatus = (taskId: string, status: "Not Started" | "In Progress" | "Completed") => {
    if (!selectedIssue) return

    // Update task status
    const updatedTasks = selectedIssue.tasks.map((task) => (task.id === taskId ? { ...task, status } : task))

    // Update tasksCompleted count
    const completedTasks = updatedTasks.filter((t) => t.status === "Completed").length

    // Update selected issue
    const updatedIssue = {
      ...selectedIssue,
      tasks: updatedTasks,
      tasksCompleted: `${completedTasks}/${updatedTasks.length}`,
    }

    // Update issues list
    const updatedIssues = issues.map((issue) => (issue.id === selectedIssue.id ? updatedIssue : issue))
    setIssues(updatedIssues)
    setSelectedIssue(updatedIssue)

    toast({
      title: "Task updated",
      description: "The task status has been updated.",
      variant: "success",
    })
  }

  // Delete task
  const deleteTask = (taskId: string) => {
    if (!selectedIssue) return

    // Remove task
    const updatedTasks = selectedIssue.tasks.filter((task) => task.id !== taskId)

    // Update tasksCompleted count
    const completedTasks = updatedTasks.filter((t) => t.status === "Completed").length

    // Update selected issue
    const updatedIssue = {
      ...selectedIssue,
      tasks: updatedTasks,
      tasksCompleted: `${completedTasks}/${updatedTasks.length}`,
    }

    // Update issues list
    const updatedIssues = issues.map((issue) => (issue.id === selectedIssue.id ? updatedIssue : issue))
    setIssues(updatedIssues)
    setSelectedIssue(updatedIssue)

    toast({
      title: "Task deleted",
      description: "The task has been removed from the issue.",
      variant: "success",
    })
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Issue Log Review</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="member-select-issues" className="text-sm font-medium">
            Select Issue Log for:
          </label>
          <select
            id="member-select-issues"
            className="p-2 border rounded-md"
            value={selectedMember}
            onChange={(e) => {
              setSelectedMember(e.target.value)
              setNewIssue({ ...newIssue, member: e.target.value })
            }}
          >
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Date</th>
              <th className="border p-2 text-left">Issue Description</th>
              <th className="border p-2 text-left">Logged By</th>
              <th className="border p-2 text-left">Assigned Manager</th>
              <th className="border p-2 text-left">Resolution Required By</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Tasks</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <tr key={issue.id} className={getRowBgColor(issue.status)}>
                  <td className="border p-2">{issue.date}</td>
                  <td className="border p-2">{issue.description}</td>
                  <td className="border p-2">{issue.loggedBy}</td>
                  <td className="border p-2">{issue.assignedManager}</td>
                  <td className="border p-2">{issue.resolutionDate}</td>
                  <td className="border p-2">
                    <select
                      className="w-full p-1 border rounded"
                      defaultValue={issue.status}
                      onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Closed">Closed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="border p-2">
                    <div className="flex items-center gap-2">
                      {issue.tasksCompleted}
                      {hasOverdueTasks(issue) && <Badge className="bg-red-500 text-white text-xs">Overdue</Badge>}
                    </div>
                  </td>
                  <td className="border p-2">
                    <Button size="sm" variant="outline" onClick={() => openTasksDialog(issue)}>
                      View/Add Tasks
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="border p-4 text-center text-muted-foreground">
                  No issues found for {selectedMember}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Issue Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Issue</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="issue-description">
                Issue Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="issue-description"
                value={newIssue.description}
                onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                placeholder="Describe the issue in detail"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="logged-by">Logged By</Label>
                <Input id="logged-by" value={newIssue.loggedBy} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assigned-manager">Assigned Manager</Label>
                <Input id="assigned-manager" value={newIssue.assignedManager} disabled />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="resolution-date">
                  Resolution Required By <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="resolution-date"
                  type="date"
                  value={newIssue.resolutionDate}
                  onChange={(e) => setNewIssue({ ...newIssue, resolutionDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="issue-status">Status</Label>
                <Select value={newIssue.status} onValueChange={(value) => setNewIssue({ ...newIssue, status: value })}>
                  <SelectTrigger id="issue-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="issue-member">Assigned To</Label>
              <Select value={newIssue.member} onValueChange={(value) => setNewIssue({ ...newIssue, member: value })}>
                <SelectTrigger id="issue-member">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewIssue}>Add Issue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View/Add Tasks Dialog */}
      <Dialog open={isTasksDialogOpen} onOpenChange={setIsTasksDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Tasks for Issue: {selectedIssue?.description}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Status: <Badge className={getStatusColor(selectedIssue?.status || "")}>{selectedIssue?.status}</Badge>
                </p>
                <p className="text-sm text-muted-foreground">Resolution by: {selectedIssue?.resolutionDate}</p>
              </div>
              <Button size="sm" onClick={() => setIsAddTaskDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add Task
              </Button>
            </div>

            {selectedIssue?.tasks && selectedIssue.tasks.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Description</th>
                      <th className="p-2 text-left">Assigned To</th>
                      <th className="p-2 text-left">Due Date</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedIssue.tasks.map((task) => (
                      <tr key={task.id} className="border-t">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {getTaskStatusIcon(task.status)}
                            {getTaskStatusBadge(task.status)}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            {task.description}
                            {isTaskOverdue(task.dueDate) && task.status !== "Completed" && (
                              <Badge className="bg-red-500 text-white">Overdue</Badge>
                            )}
                          </div>
                        </td>
                        <td className="p-2">{task.assignedTo}</td>
                        <td className="p-2">{new Date(task.dueDate).toLocaleDateString()}</td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <Select
                              value={task.status}
                              onValueChange={(value) =>
                                updateTaskStatus(task.id, value as "Not Started" | "In Progress" | "Completed")
                              }
                            >
                              <SelectTrigger className="h-8 w-[130px]">
                                <SelectValue placeholder="Update status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Not Started">Not Started</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => deleteTask(task.id)}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center p-4 border rounded-md">
                <p className="text-muted-foreground">No tasks found for this issue.</p>
                <p className="text-sm text-muted-foreground mt-1">Click "Add Task" to create a new task.</p>
              </div>
            )}

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsTasksDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Task Dialog */}
      <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-description">
                Task Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="task-description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Describe what needs to be done"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="task-assigned-to">
                  Assigned To <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={newTask.assignedTo}
                  onValueChange={(value) => setNewTask({ ...newTask, assignedTo: value })}
                >
                  <SelectTrigger id="task-assigned-to">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="Vikram Kumar">Vikram Kumar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-due-date">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="task-due-date"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-status">Status</Label>
              <Select
                value={newTask.status}
                onValueChange={(value) => setNewTask({ ...newTask, status: value as any })}
              >
                <SelectTrigger id="task-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addNewTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
