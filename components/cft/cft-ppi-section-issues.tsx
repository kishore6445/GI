"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlusCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  BarChart,
  Clock3,
  Flag,
  CheckSquare,
  Filter,
  Users,
} from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"

// Types for our data
interface Task {
  id: string
  name: string
  completionCriteria: string
  assignedTo: string
  dueDate: string
  status: "Not Started" | "In Progress" | "On Hold" | "Waiting" | "Completed" | "Cancelled"
  comments: string
  isOverdue: boolean
}

interface Issue {
  id: string
  description: string
  loggedOn: string
  loggedBy: string
  assignedManager: string
  assignedManagersManager?: string
  escalationRequired: boolean
  targetResolutionDate: string
  closureDate: string | null
  currentStatus: "Open" | "In Progress" | "On Hold" | "Closed" | "Cancelled"
  tasks: Task[]
  isOverdue: boolean
  projectId?: string
  teamMember?: string // To track which team member this issue belongs to
}

interface ProjectAction {
  id: string
  name: string
  assignedTo: string
  dueDate: string
  status: "Not Started" | "In Progress" | "On Hold" | "Waiting" | "Completed"
}

interface Project {
  id: string
  name: string
  manager: string
  timeline: "On Track" | "At Risk" | "Delayed"
  completion: number
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "On Track" | "At Risk" | "Delayed" | "Completed" | "On Hold"
  actions: ProjectAction[]
}

// Mock user data
const currentUser = {
  id: "user-1",
  name: "John Doe",
  role: "Team Member",
  manager: "Michael Davis",
  managersManager: "David Wilson",
}

export function CFTPPISectionIssues() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<string>("issue-list")

  // State for selected team member filter
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("Self")

  // State for issues
  const [issues, setIssues] = useState<Issue[]>([
    {
      id: "#104",
      description: "A system outage is currently impacting multiple users.",
      loggedOn: "2024-04-18",
      loggedBy: "Emily Chen",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: false,
      targetResolutionDate: "2024-04-22",
      closureDate: null,
      currentStatus: "In Progress",
      isOverdue: false,
      teamMember: "Emily Chen",
      tasks: [
        {
          id: "task-1",
          name: "Diagnose outage cause",
          completionCriteria: "Root cause identified and documented",
          assignedTo: "Sarah Lee",
          dueDate: "2024-04-19",
          status: "In Progress",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-2",
          name: "Restore system functionality",
          completionCriteria: "All systems back online and operational",
          assignedTo: "James Miller",
          dueDate: "2024-04-20",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-3",
          name: "Verify user access restoration",
          completionCriteria: "All users can access the system normally",
          assignedTo: "Megan Clark",
          dueDate: "2024-04-21",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
      ],
    },
    {
      id: "#103",
      description: "Customer data sync failure between CRM and billing system",
      loggedOn: "2024-04-15",
      loggedBy: "Robert Johnson",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: true,
      targetResolutionDate: "2024-04-17",
      closureDate: null,
      currentStatus: "Open",
      isOverdue: true,
      teamMember: "Robert Johnson",
      tasks: [
        {
          id: "task-4",
          name: "Investigate sync failure",
          completionCriteria: "Identify cause of sync failure",
          assignedTo: "James Miller",
          dueDate: "2024-04-16",
          status: "In Progress",
          comments: "API connection issue identified",
          isOverdue: true,
        },
        {
          id: "task-5",
          name: "Fix data inconsistencies",
          completionCriteria: "All customer data consistent across systems",
          assignedTo: "Sarah Lee",
          dueDate: "2024-04-17",
          status: "Not Started",
          comments: "",
          isOverdue: true,
        },
      ],
    },
    {
      id: "#102",
      description: "Email notification system delay affecting customer communications",
      loggedOn: "2024-04-10",
      loggedBy: "Megan Clark",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: false,
      targetResolutionDate: "2024-04-14",
      closureDate: "2024-04-13",
      currentStatus: "Closed",
      isOverdue: false,
      teamMember: "Megan Clark",
      tasks: [
        {
          id: "task-6",
          name: "Diagnose email delay cause",
          completionCriteria: "Root cause identified",
          assignedTo: "James Miller",
          dueDate: "2024-04-11",
          status: "Completed",
          comments: "SMTP server configuration issue",
          isOverdue: false,
        },
        {
          id: "task-7",
          name: "Implement fix for email delays",
          completionCriteria: "Emails sending within 1 minute",
          assignedTo: "Sarah Lee",
          dueDate: "2024-04-12",
          status: "Completed",
          comments: "Reconfigured SMTP settings and increased server capacity",
          isOverdue: false,
        },
        {
          id: "task-8",
          name: "Verify email delivery times",
          completionCriteria: "Confirm normal delivery times for 24 hours",
          assignedTo: "Megan Clark",
          dueDate: "2024-04-13",
          status: "Completed",
          comments: "All emails delivering within expected timeframes",
          isOverdue: false,
        },
      ],
    },
  ])

  // State for filtered issues
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues)

  // Filter issues when team member selection changes
  useEffect(() => {
    if (selectedTeamMember === "Self") {
      setFilteredIssues(
        issues.filter((issue) => issue.loggedBy === currentUser.name || issue.assignedManager === currentUser.name),
      )
    } else if (selectedTeamMember === "All") {
      setFilteredIssues(issues)
    } else {
      setFilteredIssues(issues.filter((issue) => issue.teamMember === selectedTeamMember))
    }
  }, [selectedTeamMember, issues])

  // State for expanded issues and tasks
  const [expandedIssues, setExpandedIssues] = useState<string[]>([])
  const [viewingTasksForIssue, setViewingTasksForIssue] = useState<string | null>(null)
  const [newTask, setNewTask] = useState<Partial<Task> | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // State for new issue form
  const [showNewIssueForm, setShowNewIssueForm] = useState<boolean>(false)
  const [newIssue, setNewIssue] = useState<Partial<Issue>>({
    description: "",
    loggedBy: currentUser.name, // Default to current user
    assignedManager: "",
    escalationRequired: false,
    targetResolutionDate: new Date().toISOString().split("T")[0],
    currentStatus: "Open",
    tasks: [],
    teamMember: currentUser.name,
  })

  // State for projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      name: "Mobile App Development",
      manager: "Vikram Kumar",
      timeline: "On Track",
      completion: 65,
      priority: "High",
      status: "On Track",
      actions: [
        {
          id: "action-1",
          name: "Complete UI design",
          assignedTo: "Ananya Sharma",
          dueDate: "2024-05-25",
          status: "In Progress",
        },
        {
          id: "action-2",
          name: "Implement API integration",
          assignedTo: "Rahul Patel",
          dueDate: "2024-05-28",
          status: "Not Started",
        },
      ],
    },
    {
      id: "proj-2",
      name: "Website Redesign",
      manager: "Priya Singh",
      timeline: "At Risk",
      completion: 40,
      priority: "Medium",
      status: "At Risk",
      actions: [
        {
          id: "action-3",
          name: "Finalize design mockups",
          assignedTo: "Deepak Verma",
          dueDate: "2024-05-20",
          status: "In Progress",
        },
        {
          id: "action-4",
          name: "Content migration",
          assignedTo: "Neha Gupta",
          dueDate: "2024-05-30",
          status: "Not Started",
        },
      ],
    },
  ])

  // State for editing project
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showNewProjectForm, setShowNewProjectForm] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<Partial<Project>>({
    name: "",
    manager: "",
    timeline: "On Track",
    completion: 0,
    priority: "Medium",
    status: "On Track",
    actions: [],
  })

  // State for editing project action
  const [editingAction, setEditingAction] = useState<ProjectAction | null>(null)
  const [showNewActionForm, setShowNewActionForm] = useState<{ show: boolean; projectId: string | null }>({
    show: false,
    projectId: null,
  })
  const [newAction, setNewAction] = useState<Partial<ProjectAction>>({
    name: "",
    assignedTo: "",
    dueDate: new Date().toISOString().split("T")[0],
    status: "Not Started",
  })

  // State for action review
  const [actionReviewTasks, setActionReviewTasks] = useState<Task[]>([])

  // State for action review details
  const [viewingActionDetails, setViewingActionDetails] = useState<{ issueId: string; taskId: string } | null>(null)
  const [actionComment, setActionComment] = useState<string>("")
  const [reassignTo, setReassignTo] = useState<string>("")
  const [closureNote, setClosureNote] = useState<string>("")
  const [actionFilter, setActionFilter] = useState<{ assignee: string; status: string }>({
    assignee: "All",
    status: "All",
  })

  // Populate action review tasks
  useEffect(() => {
    const allTasks: Task[] = []
    issues.forEach((issue) => {
      issue.tasks.forEach((task) => {
        allTasks.push({ ...task, issueId: issue.id })
      })
    })
    setActionReviewTasks(allTasks)
  }, [issues])

  // Toggle issue expansion
  const toggleIssueExpand = (issueId: string) => {
    setExpandedIssues((prev) => (prev.includes(issueId) ? prev.filter((id) => id !== issueId) : [...prev, issueId]))
  }

  // View tasks for an issue
  const viewTasks = (issueId: string) => {
    console.log("Viewing tasks for issue:", issueId)
    setViewingTasksForIssue(issueId)
  }

  // Close task view
  const closeTaskView = () => {
    setViewingTasksForIssue(null)
    setNewTask(null)
    setEditingTask(null)
  }

  // Start adding a new task
  const startAddTask = (issueId: string) => {
    setNewTask({
      name: "",
      completionCriteria: "",
      assignedTo: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Not Started",
      comments: "",
    })
  }

  // Save new task
  const saveNewTask = (issueId: string) => {
    if (!newTask?.name || !newTask.assignedTo || !newTask.dueDate) return

    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        const newTaskId = `task-${Date.now()}`
        const taskToAdd: Task = {
          id: newTaskId,
          name: newTask.name || "",
          completionCriteria: newTask.completionCriteria || "",
          assignedTo: newTask.assignedTo || "",
          dueDate: newTask.dueDate || "",
          status: (newTask.status as Task["status"]) || "Not Started",
          comments: newTask.comments || "",
          isOverdue: new Date(newTask.dueDate || "") < new Date(),
        }

        return {
          ...issue,
          tasks: [...issue.tasks, taskToAdd],
        }
      }
      return issue
    })

    setIssues(updatedIssues)
    setNewTask(null)
  }

  // Start editing a task
  const startEditTask = (task: Task) => {
    setEditingTask(task)
  }

  // Save edited task
  const saveEditedTask = (issueId: string) => {
    if (!editingTask) return

    // Check if current user is the assignee (for role-based permissions)
    if (
      editingTask.status !== issues.find((i) => i.id === issueId)?.tasks.find((t) => t.id === editingTask.id)?.status
    ) {
      if (editingTask.assignedTo !== currentUser.name) {
        alert("Only the assignee can change the task status.")
        return
      }
    }

    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        const updatedTasks = issue.tasks.map((task) => (task.id === editingTask.id ? editingTask : task))

        return {
          ...issue,
          tasks: updatedTasks,
        }
      }
      return issue
    })

    setIssues(updatedIssues)
    setEditingTask(null)
  }

  // Update issue status
  const updateIssueStatus = (issueId: string, newStatus: Issue["currentStatus"]) => {
    // Check if current user is the assigned manager (for role-based permissions)
    const issue = issues.find((i) => i.id === issueId)
    if (issue && issue.assignedManager !== currentUser.name && currentUser.role !== "Manager") {
      alert("Only the assigned manager can change the issue status.")
      return
    }

    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        const closureDate =
          newStatus === "Closed" || newStatus === "Cancelled"
            ? new Date().toISOString().split("T")[0]
            : issue.closureDate

        return {
          ...issue,
          currentStatus: newStatus,
          closureDate,
        }
      }
      return issue
    })

    setIssues(updatedIssues)
  }

  // Toggle escalation required
  const toggleEscalation = (issueId: string) => {
    const updatedIssues = issues.map((issue) => {
      if (issue.id === issueId) {
        // If escalation is being turned on, assign to manager's manager
        const newEscalationStatus = !issue.escalationRequired
        return {
          ...issue,
          escalationRequired: newEscalationStatus,
          assignedManager: newEscalationStatus
            ? issue.assignedManagersManager || issue.assignedManager
            : issue.assignedManager,
        }
      }
      return issue
    })

    setIssues(updatedIssues)
  }

  // Save new issue
  const saveNewIssue = () => {
    if (!newIssue.description || !newIssue.assignedManager || !newIssue.targetResolutionDate) return

    const issueId = `#${100 + issues.length + 1}`
    const issueToAdd: Issue = {
      id: issueId,
      description: newIssue.description || "",
      loggedOn: new Date().toISOString().split("T")[0],
      loggedBy: newIssue.loggedBy || currentUser.name,
      assignedManager: newIssue.assignedManager || "",
      assignedManagersManager: getManagersManager(newIssue.assignedManager || ""),
      escalationRequired: newIssue.escalationRequired || false,
      targetResolutionDate: newIssue.targetResolutionDate || "",
      closureDate: null,
      currentStatus: (newIssue.currentStatus as Issue["currentStatus"]) || "Open",
      tasks: [],
      isOverdue: false,
      teamMember: newIssue.teamMember || currentUser.name,
    }

    setIssues([issueToAdd, ...issues])
    setShowNewIssueForm(false)
    setNewIssue({
      description: "",
      loggedBy: currentUser.name,
      assignedManager: "",
      escalationRequired: false,
      targetResolutionDate: new Date().toISOString().split("T")[0],
      currentStatus: "Open",
      tasks: [],
      teamMember: currentUser.name,
    })
  }

  // Helper function to get manager's manager
  const getManagersManager = (managerName: string) => {
    // In a real app, this would query a database or org chart
    // For now, we'll just return a fixed value
    return "David Wilson"
  }

  // Start editing a project
  const startEditProject = (project: Project) => {
    setEditingProject({ ...project })
  }

  // Save edited project
  const saveEditedProject = () => {
    if (!editingProject) return

    const updatedProjects = projects.map((project) => (project.id === editingProject.id ? editingProject : project))

    setProjects(updatedProjects)
    setEditingProject(null)
  }

  // Save new project
  const saveNewProject = () => {
    if (!newProject.name || !newProject.manager) return

    const projectToAdd: Project = {
      id: `proj-${Date.now()}`,
      name: newProject.name || "",
      manager: newProject.manager || "",
      timeline: (newProject.timeline as Project["timeline"]) || "On Track",
      completion: newProject.completion || 0,
      priority: (newProject.priority as Project["priority"]) || "Medium",
      status: (newProject.status as Project["status"]) || "On Track",
      actions: [],
    }

    setProjects([...projects, projectToAdd])
    setShowNewProjectForm(false)
    setNewProject({
      name: "",
      manager: "",
      timeline: "On Track",
      completion: 0,
      priority: "Medium",
      status: "On Track",
      actions: [],
    })
  }

  // Start editing an action
  const startEditAction = (action: ProjectAction, projectId: string) => {
    setEditingAction({ ...action })
  }

  // Save edited action
  const saveEditedAction = (projectId: string) => {
    if (!editingAction) return

    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedActions = project.actions.map((action) =>
          action.id === editingAction.id ? editingAction : action,
        )

        return {
          ...project,
          actions: updatedActions,
        }
      }
      return project
    })

    setProjects(updatedProjects)
    setEditingAction(null)
  }

  // Save new action
  const saveNewAction = () => {
    if (!newAction.name || !newAction.assignedTo || !newAction.dueDate || !showNewActionForm.projectId) return

    const actionToAdd: ProjectAction = {
      id: `action-${Date.now()}`,
      name: newAction.name || "",
      assignedTo: newAction.assignedTo || "",
      dueDate: newAction.dueDate || "",
      status: (newAction.status as ProjectAction["status"]) || "Not Started",
    }

    const updatedProjects = projects.map((project) => {
      if (project.id === showNewActionForm.projectId) {
        return {
          ...project,
          actions: [...project.actions, actionToAdd],
        }
      }
      return project
    })

    setProjects(updatedProjects)
    setShowNewActionForm({ show: false, projectId: null })
    setNewAction({
      name: "",
      assignedTo: "",
      dueDate: new Date().toISOString().split("T")[0],
      status: "Not Started",
    })
  }

  // Get status color for projects
  const getProjectStatusColor = (status: string) => {
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
  const getPriorityColor = (priority: string) => {
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

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"

    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
      case "Closed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "On Hold":
      case "Waiting":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Cancelled":
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
      case "Closed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "In Progress":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "On Hold":
      case "Waiting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Cancelled":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "Open":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Calculate completion status
  const getCompletionStatus = (tasks: Task[]) => {
    const completedTasks = tasks.filter((task) => task.status === "Completed").length
    return `${completedTasks}/${tasks.length} tasks completed`
  }

  // Check if any task is overdue
  const hasOverdueTasks = (tasks: Task[]) => {
    return tasks.some(
      (task) => task.status !== "Completed" && new Date(task.dueDate) < new Date() && task.dueDate !== "",
    )
  }

  // Team members for dropdown
  const teamMembers = [
    { id: "sarah", name: "Sarah Lee" },
    { id: "james", name: "James Miller" },
    { id: "megan", name: "Megan Clark" },
    { id: "robert", name: "Robert Johnson" },
    { id: "emily", name: "Emily Chen" },
    { id: "michael", name: "Michael Davis" },
  ]

  // Update the return statement to include the projects section before the issues section
  return (
    <div className="space-y-6">
      {/* Projects Section */}
      <Card>
        <CardHeader className="border-b border-brand-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-brand-primary">Projects</CardTitle>
              <CardDescription>Track and manage project performance and actions</CardDescription>
            </div>
            <Button variant="outline" className="gap-1" onClick={() => setShowNewProjectForm(true)}>
              <PlusCircle className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {projects.map((project) => (
            <Card key={project.id} className="mb-4 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>Manager: {project.manager}</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => startEditProject(project)}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Timeline:</span>
                      <Badge variant="outline" className={getProjectStatusColor(project.timeline)}>
                        {project.timeline}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Completion:</span>
                      <span className="text-sm">{project.completion}%</span>
                    </div>
                    <Progress value={project.completion} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Priority:</span>
                      <Badge variant="outline" className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Status:</span>
                      <Badge variant="outline" className={getProjectStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Project Actions</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1"
                      onClick={() => setShowNewActionForm({ show: true, projectId: project.id })}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Add Action
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-2 text-left">Action</th>
                          <th className="border p-2 text-left">Assigned To</th>
                          <th className="border p-2 text-left">Due Date</th>
                          <th className="border p-2 text-left">Status</th>
                          <th className="border p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.actions.map((action) => (
                          <tr key={action.id}>
                            <td className="border p-2">{action.name}</td>
                            <td className="border p-2">{action.assignedTo}</td>
                            <td className="border p-2">{formatDate(action.dueDate)}</td>
                            <td className="border p-2">
                              <Badge variant="outline" className={getStatusColor(action.status)}>
                                {action.status}
                              </Badge>
                            </td>
                            <td className="border p-2">
                              <Button variant="ghost" size="sm" onClick={() => startEditAction(action, project.id)}>
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      {/* Issues Section with Tabs */}
      <Card>
        <CardHeader className="border-b border-brand-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-brand-primary">Project Performance Indicators (PPI)</CardTitle>
              <CardDescription>Review and manage project issues and their resolution status</CardDescription>
            </div>
            <Button variant="outline" className="gap-1" onClick={() => setShowNewIssueForm(true)}>
              <PlusCircle className="h-4 w-4" />
              New Issue
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="issue-list" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="issue-list">Issue List</TabsTrigger>
              <TabsTrigger value="action-review">Action Review</TabsTrigger>
            </TabsList>

            {/* Issue List Tab */}
            <TabsContent value="issue-list" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Select Issue Log for:</span>
                  <select
                    className="p-2 border rounded-md"
                    value={selectedTeamMember}
                    onChange={(e) => setSelectedTeamMember(e.target.value)}
                  >
                    <option value="Self">Self</option>
                    <option value="All">All Team Members</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Filter by Status:</span>
                  <select className="p-2 border rounded-md">
                    <option value="All">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Issue List */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">ID</th>
                      <th className="border p-2 text-left">Description</th>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Assigned Manager</th>
                      <th className="border p-2 text-left">Target Resolution</th>
                      <th className="border p-2 text-left">Tasks</th>
                      <th className="border p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIssues.map((issue) => (
                      <tr
                        key={issue.id}
                        className={issue.isOverdue && issue.currentStatus !== "Closed" ? "bg-red-50" : ""}
                      >
                        <td className="border p-2 font-medium">{issue.id}</td>
                        <td className="border p-2">{issue.description}</td>
                        <td className="border p-2">
                          <Badge variant="outline" className={getStatusColor(issue.currentStatus)}>
                            {issue.currentStatus}
                          </Badge>
                        </td>
                        <td className="border p-2">{issue.assignedManager}</td>
                        <td
                          className="border p-2"
                          style={{
                            color: issue.isOverdue && issue.currentStatus !== "Closed" ? "red" : "inherit",
                          }}
                        >
                          {formatDate(issue.targetResolutionDate)}
                        </td>
                        <td className="border p-2">{getCompletionStatus(issue.tasks)}</td>
                        <td className="border p-2">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => toggleIssueExpand(issue.id)}>
                              Details
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => viewTasks(issue.id)}>
                              Tasks
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Action Review Tab */}
            <TabsContent value="action-review" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Filter by Assignee:</span>
                  <select
                    className="p-2 border rounded-md"
                    value={actionFilter.assignee}
                    onChange={(e) => setActionFilter({ ...actionFilter, assignee: e.target.value })}
                  >
                    <option value="All">All Assignees</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Filter by Status:</span>
                  <select
                    className="p-2 border rounded-md"
                    value={actionFilter.status}
                    onChange={(e) => setActionFilter({ ...actionFilter, status: e.target.value })}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Action Items</CardTitle>
                  <CardDescription>Review and manage all action items across issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-2 text-left">Issue ID</th>
                          <th className="border p-2 text-left">Task Name</th>
                          <th className="border p-2 text-left">Assigned To</th>
                          <th className="border p-2 text-left">Due Date</th>
                          <th className="border p-2 text-left">Status</th>
                          <th className="border p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issues.flatMap((issue) =>
                          issue.tasks
                            .filter(
                              (task) =>
                                (actionFilter.assignee === "All" || task.assignedTo === actionFilter.assignee) &&
                                (actionFilter.status === "All" || task.status === actionFilter.status),
                            )
                            .map((task) => (
                              <tr
                                key={`${issue.id}-${task.id}`}
                                className={task.isOverdue && task.status !== "Completed" ? "bg-red-50" : ""}
                              >
                                <td className="border p-2">{issue.id}</td>
                                <td className="border p-2">{task.name}</td>
                                <td className="border p-2">{task.assignedTo}</td>
                                <td
                                  className="border p-2"
                                  style={{ color: task.isOverdue && task.status !== "Completed" ? "red" : "inherit" }}
                                >
                                  {formatDate(task.dueDate)}
                                </td>
                                <td className="border p-2">
                                  <Badge variant="outline" className={getStatusColor(task.status)}>
                                    {task.status}
                                  </Badge>
                                </td>
                                <td className="border p-2">
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => setViewingActionDetails({ issueId: issue.id, taskId: task.id })}
                                    >
                                      Details
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        // Only the assignee can mark as complete
                                        if (task.assignedTo !== currentUser.name) {
                                          alert("Only the assignee can change the task status.")
                                          return
                                        }

                                        const updatedIssues = issues.map((i) => {
                                          if (i.id === issue.id) {
                                            const updatedTasks = i.tasks.map((t) =>
                                              t.id === task.id ? { ...t, status: "Completed" } : t,
                                            )
                                            return { ...i, tasks: updatedTasks }
                                          }
                                          return i
                                        })
                                        setIssues(updatedIssues)
                                      }}
                                      disabled={task.status === "Completed"}
                                    >
                                      Mark Complete
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Task View Modal */}
      {viewingTasksForIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Issue {viewingTasksForIssue}: Tasks</h2>
              <Button variant="ghost" size="sm" onClick={closeTaskView}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              {/* Task List */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Task Name</th>
                      <th className="border p-2 text-left">Completion Criteria</th>
                      <th className="border p-2 text-left">Assigned To</th>
                      <th className="border p-2 text-left">Due Date</th>
                      <th className="border p-2 text-left">Status</th>
                      <th className="border p-2 text-left">Comments</th>
                      <th className="border p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues
                      .find((i) => i.id === viewingTasksForIssue)
                      ?.tasks.map((task) => (
                        <tr key={task.id} className={task.isOverdue && task.status !== "Completed" ? "bg-red-50" : ""}>
                          <td className="border p-2">{task.name}</td>
                          <td className="border p-2">{task.completionCriteria}</td>
                          <td className="border p-2">{task.assignedTo}</td>
                          <td
                            className="border p-2"
                            style={{ color: task.isOverdue && task.status !== "Completed" ? "red" : "inherit" }}
                          >
                            {formatDate(task.dueDate)}
                          </td>
                          <td className="border p-2">
                            <Badge variant="outline" className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </td>
                          <td className="border p-2">{task.comments}</td>
                          <td className="border p-2">
                            <Button variant="ghost" size="sm" onClick={() => startEditTask(task)}>
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Add New Task Button */}
              {!newTask && !editingTask && (
                <div className="flex justify-end">
                  <Button variant="outline" className="gap-1" onClick={() => startAddTask(viewingTasksForIssue)}>
                    <PlusCircle className="h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              )}

              {/* New Task Form */}
              {newTask && (
                <div className="border p-4 rounded-md bg-muted/20">
                  <h3 className="font-medium mb-4">Add New Task</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Task Name *</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newTask.name || ""}
                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Completion Criteria</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newTask.completionCriteria || ""}
                        onChange={(e) => setNewTask({ ...newTask, completionCriteria: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Assigned To *</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newTask.assignedTo || ""}
                        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date *</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={newTask.dueDate || ""}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newTask.status || "Not Started"}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task["status"] })}
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Comments</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={newTask.comments || ""}
                        onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setNewTask(null)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => saveNewTask(viewingTasksForIssue)}
                      disabled={!newTask.name || !newTask.assignedTo || !newTask.dueDate}
                    >
                      Save Task
                    </Button>
                  </div>
                </div>
              )}

              {/* Edit Task Form */}
              {editingTask && (
                <div className="border p-4 rounded-md bg-muted/20">
                  <h3 className="font-medium mb-4">Edit Task</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Task Name *</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={editingTask.name}
                        onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Completion Criteria</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={editingTask.completionCriteria}
                        onChange={(e) => setEditingTask({ ...editingTask, completionCriteria: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Assigned To *</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={editingTask.assignedTo}
                        onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date *</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded-md"
                        value={editingTask.dueDate}
                        onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={editingTask.status}
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value as Task["status"] })}
                        disabled={
                          editingTask.assignedTo !== currentUser.name &&
                          editingTask.status !==
                            issues
                              .find((i) => i.id === viewingTasksForIssue)
                              ?.tasks.find((t) => t.id === editingTask.id)?.status
                        }
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Waiting">Waiting</option>
                        <option value="Completed">Completed</option>
                      </select>
                      {editingTask.assignedTo !== currentUser.name && (
                        <p className="text-xs text-red-500 mt-1">Only the assignee can change the status</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Comments</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={editingTask.comments}
                        onChange={(e) => setEditingTask({ ...editingTask, comments: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditingTask(null)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => saveEditedTask(viewingTasksForIssue)}
                      disabled={!editingTask.name || !editingTask.assignedTo || !editingTask.dueDate}
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Issue Modal */}
      {showNewIssueForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Issue</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowNewIssueForm(false)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Description *</label>
                <textarea
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  value={newIssue.description || ""}
                  onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
                  placeholder="Describe the issue..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logged By</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md bg-muted"
                    value={newIssue.loggedBy || currentUser.name}
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Auto-filled with your name</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assigned Manager *</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newIssue.assignedManager || ""}
                    onChange={(e) => setNewIssue({ ...newIssue, assignedManager: e.target.value })}
                  >
                    <option value="">Select manager</option>
                    {teamMembers
                      .filter((m) => m.name.includes("Manager") || m.name === "Michael Davis")
                      .map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Resolution Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={newIssue.targetResolutionDate || ""}
                    onChange={(e) => setNewIssue({ ...newIssue, targetResolutionDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newIssue.currentStatus || "Open"}
                    onChange={(e) =>
                      setNewIssue({ ...newIssue, currentStatus: e.target.value as Issue["currentStatus"] })
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Escalation Required:</label>
                <Switch
                  checked={newIssue.escalationRequired || false}
                  onCheckedChange={(checked) => setNewIssue({ ...newIssue, escalationRequired: checked })}
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowNewIssueForm(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={saveNewIssue}
                  disabled={!newIssue.description || !newIssue.assignedManager || !newIssue.targetResolutionDate}
                >
                  Create Issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Project</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditingProject(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Manager *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editingProject.manager}
                    onChange={(e) => setEditingProject({ ...editingProject, manager: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeline Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editingProject.timeline}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, timeline: e.target.value as Project["timeline"] })
                    }
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Completion Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full p-2 border rounded-md"
                    value={editingProject.completion}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        completion: Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0)),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editingProject.priority}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, priority: e.target.value as Project["priority"] })
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, status: e.target.value as Project["status"] })
                    }
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button onClick={saveEditedProject} disabled={!editingProject.name || !editingProject.manager}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {showNewProjectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Create New Project</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowNewProjectForm(false)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project Name *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newProject.name || ""}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Manager *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newProject.manager || ""}
                    onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timeline Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newProject.timeline || "On Track"}
                    onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value as Project["timeline"] })}
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Delayed">Delayed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Completion Percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full p-2 border rounded-md"
                    value={newProject.completion || 0}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        completion: Math.min(100, Math.max(0, Number.parseInt(e.target.value) || 0)),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newProject.priority || "Medium"}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as Project["priority"] })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={newProject.status || "On Track"}
                    onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project["status"] })}
                  >
                    <option value="On Track">On Track</option>
                    <option value="At Risk">At Risk</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowNewProjectForm(false)}>
                  Cancel
                </Button>
                <Button onClick={saveNewProject} disabled={!newProject.name || !newProject.manager}>
                  Create Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Action Modal */}
      {editingAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Edit Action</h2>
              <Button variant="ghost" size="sm" onClick={() => setEditingAction(null)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Action Name *</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={editingAction.name}
                  onChange={(e) => setEditingAction({ ...editingAction, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assigned To *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={editingAction.assignedTo}
                    onChange={(e) => setEditingAction({ ...editingAction, assignedTo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={editingAction.dueDate}
                    onChange={(e) => setEditingAction({ ...editingAction, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={editingAction.status}
                  onChange={(e) =>
                    setEditingAction({ ...editingAction, status: e.target.value as ProjectAction["status"] })
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setEditingAction(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const projectId = projects.find((p) => p.actions.some((a) => a.id === editingAction.id))?.id
                    if (projectId) saveEditedAction(projectId)
                  }}
                  disabled={!editingAction.name || !editingAction.assignedTo || !editingAction.dueDate}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Action Modal */}
      {showNewActionForm.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Action</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowNewActionForm({ show: false, projectId: null })}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Action Name *</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={newAction.name || ""}
                  onChange={(e) => setNewAction({ ...newAction, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assigned To *</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={newAction.assignedTo || ""}
                    onChange={(e) => setNewAction({ ...newAction, assignedTo: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Due Date *</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded-md"
                    value={newAction.dueDate || ""}
                    onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newAction.status || "Not Started"}
                  onChange={(e) => setNewAction({ ...newAction, status: e.target.value as ProjectAction["status"] })}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setShowNewActionForm({ show: false, projectId: null })}>
                  Cancel
                </Button>
                <Button
                  onClick={saveNewAction}
                  disabled={!newAction.name || !newAction.assignedTo || !newAction.dueDate}
                >
                  Add Action
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Details Modal */}
      {viewingActionDetails &&
        (() => {
          const issue = issues.find((i) => i.id === viewingActionDetails.issueId)
          const task = issue?.tasks.find((t) => t.id === viewingActionDetails.taskId)

          if (!issue || !task) return null

          return (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Action Item Details</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setViewingActionDetails(null)
                      setActionComment("")
                      setReassignTo("")
                      setClosureNote("")
                    }}
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Task Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-md">
                    <div>
                      <h3 className="font-medium mb-2">Task Information</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Issue:</span> {issue.id} - {issue.description}
                        </div>
                        <div>
                          <span className="font-medium">Task:</span> {task.name}
                        </div>
                        <div>
                          <span className="font-medium">Completion Criteria:</span> {task.completionCriteria}
                        </div>
                        <div>
                          <span className="font-medium">Status:</span>
                          <Badge variant="outline" className={`ml-2 ${getStatusColor(task.status)}`}>
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Assignment Information</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Assigned To:</span> {task.assignedTo}
                        </div>
                        <div>
                          <span className="font-medium">Due Date:</span> {formatDate(task.dueDate)}
                        </div>
                        <div>
                          <span className="font-medium">Overdue:</span> {task.isOverdue ? "Yes" : "No"}
                        </div>
                        <div>
                          <span className="font-medium">Comments:</span> {task.comments || "No comments"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Tabs */}
                  <Tabs defaultValue="comment" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="comment">Add Comment</TabsTrigger>
                      <TabsTrigger value="reassign">Reassign Task</TabsTrigger>
                      <TabsTrigger value="close">Close Task</TabsTrigger>
                    </TabsList>

                    {/* Comment Tab */}
                    <TabsContent value="comment" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Add Comment</label>
                        <textarea
                          className="w-full p-2 border rounded-md min-h-[100px]"
                          value={actionComment}
                          onChange={(e) => setActionComment(e.target.value)}
                          placeholder="Add your comments here..."
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            // Add comment to task
                            const updatedIssues = issues.map((i) => {
                              if (i.id === viewingActionDetails.issueId) {
                                const updatedTasks = i.tasks.map((t) => {
                                  if (t.id === viewingActionDetails.taskId) {
                                    const existingComments = t.comments ? t.comments + "\n\n" : ""
                                    return {
                                      ...t,
                                      comments:
                                        existingComments +
                                        `${currentUser.name} (${new Date().toLocaleDateString()}): ${actionComment}`,
                                    }
                                  }
                                  return t
                                })
                                return { ...i, tasks: updatedTasks }
                              }
                              return i
                            })

                            setIssues(updatedIssues)
                            setActionComment("")
                            alert("Comment added successfully!")
                          }}
                          disabled={!actionComment.trim()}
                        >
                          Add Comment
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Reassign Tab */}
                    <TabsContent value="reassign" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Reassign To</label>
                        <select
                          className="w-full p-2 border rounded-md"
                          value={reassignTo}
                          onChange={(e) => setReassignTo(e.target.value)}
                        >
                          <option value="">Select team member</option>
                          {teamMembers.map((member) => (
                            <option key={member.id} value={member.name}>
                              {member.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Reassignment Reason</label>
                        <textarea
                          className="w-full p-2 border rounded-md min-h-[100px]"
                          value={actionComment}
                          onChange={(e) => setActionComment(e.target.value)}
                          placeholder="Explain why this task is being reassigned..."
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            // Check permissions - only manager or current assignee can reassign
                            if (task.assignedTo !== currentUser.name && currentUser.role !== "Manager") {
                              alert("Only the current assignee or a manager can reassign this task.")
                              return
                            }

                            // Reassign task
                            const updatedIssues = issues.map((i) => {
                              if (i.id === viewingActionDetails.issueId) {
                                const updatedTasks = i.tasks.map((t) => {
                                  if (t.id === viewingActionDetails.taskId) {
                                    const existingComments = t.comments ? t.comments + "\n\n" : ""
                                    const reassignmentNote = `Task reassigned from ${t.assignedTo} to ${reassignTo} by ${currentUser.name} (${new Date().toLocaleDateString()}): ${actionComment}`

                                    return {
                                      ...t,
                                      assignedTo: reassignTo,
                                      comments: existingComments + reassignmentNote,
                                    }
                                  }
                                  return t
                                })
                                return { ...i, tasks: updatedTasks }
                              }
                              return i
                            })

                            setIssues(updatedIssues)
                            setActionComment("")
                            setReassignTo("")
                            alert("Task reassigned successfully!")
                            setViewingActionDetails(null)
                          }}
                          disabled={!reassignTo || !actionComment.trim()}
                        >
                          Reassign Task
                        </Button>
                      </div>
                    </TabsContent>

                    {/* Close Tab */}
                    <TabsContent value="close" className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Closure Note</label>
                        <textarea
                          className="w-full p-2 border rounded-md min-h-[100px]"
                          value={closureNote}
                          onChange={(e) => setClosureNote(e.target.value)}
                          placeholder="Provide details about task completion..."
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            // Check permissions
                            if (task.assignedTo !== currentUser.name) {
                              alert("Only the assignee can close this task.")
                              return
                            }

                            // Mark task as completed with closure note
                            const updatedIssues = issues.map((i) => {
                              if (i.id === viewingActionDetails.issueId) {
                                const updatedTasks = i.tasks.map((t) => {
                                  if (t.id === viewingActionDetails.taskId) {
                                    const existingComments = t.comments ? t.comments + "\n\n" : ""
                                    return {
                                      ...t,
                                      status: "Completed",
                                      comments:
                                        existingComments +
                                        `Task completed by ${currentUser.name} (${new Date().toLocaleDateString()}): ${closureNote}`,
                                    }
                                  }
                                  return t
                                })
                                return { ...i, tasks: updatedTasks }
                              }
                              return i
                            })

                            setIssues(updatedIssues)
                            setClosureNote("")
                            alert("Task marked as completed!")
                            setViewingActionDetails(null)
                          }}
                          disabled={!closureNote.trim()}
                        >
                          Mark as Completed
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            // Check permissions - only manager can cancel
                            if (currentUser.role !== "Manager") {
                              alert("Only a manager can cancel this task.")
                              return
                            }

                            // Cancel task
                            const updatedIssues = issues.map((i) => {
                              if (i.id === viewingActionDetails.issueId) {
                                const updatedTasks = i.tasks.map((t) => {
                                  if (t.id === viewingActionDetails.taskId) {
                                    const existingComments = t.comments ? t.comments + "\n\n" : ""
                                    return {
                                      ...t,
                                      status: "Cancelled",
                                      comments:
                                        existingComments +
                                        `Task cancelled by ${currentUser.name} (${new Date().toLocaleDateString()}): ${closureNote}`,
                                    }
                                  }
                                  return t
                                })
                                return { ...i, tasks: updatedTasks }
                              }
                              return i
                            })

                            setIssues(updatedIssues)
                            setClosureNote("")
                            alert("Task cancelled!")
                            setViewingActionDetails(null)
                          }}
                          disabled={!closureNote.trim()}
                        >
                          Cancel Task
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* Task History */}
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Task History</h3>
                    <div className="border rounded-md p-4 max-h-[200px] overflow-y-auto bg-muted/10">
                      {task.comments ? (
                        <div className="space-y-2">
                          {task.comments.split("\n\n").map((comment, index) => (
                            <div key={index} className="text-sm border-b pb-2 last:border-0">
                              {comment}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No history available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })()}
    </div>
  )
}
