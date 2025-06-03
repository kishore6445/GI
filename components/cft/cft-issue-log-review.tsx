"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Filter, Users, X } from "lucide-react"

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

// Mock user data
const currentUser = {
  id: "user-1",
  name: "John Doe",
  role: "Team Member",
  manager: "Michael Davis",
  managersManager: "David Wilson",
}

export function CFTIssueLogReview() {
  // State for selected team member filter
  const [selectedTeamMember, setSelectedTeamMember] = useState<string>("Self")

  // State for status filter
  const [statusFilter, setStatusFilter] = useState<string>("All")

  // State for assignee filter
  const [assigneeFilter, setAssigneeFilter] = useState<string>("All")

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
    {
      id: "#101",
      description: "Login page not responsive on mobile devices",
      loggedOn: "2024-04-05",
      loggedBy: "Sarah Lee",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: false,
      targetResolutionDate: "2024-04-10",
      closureDate: "2024-04-08",
      currentStatus: "Closed",
      isOverdue: false,
      teamMember: "Sarah Lee",
      tasks: [
        {
          id: "task-9",
          name: "Identify responsive design issues",
          completionCriteria: "All UI issues documented",
          assignedTo: "Sarah Lee",
          dueDate: "2024-04-06",
          status: "Completed",
          comments: "Found issues with media queries",
          isOverdue: false,
        },
        {
          id: "task-10",
          name: "Fix responsive design",
          completionCriteria: "Login page works on all devices",
          assignedTo: "James Miller",
          dueDate: "2024-04-08",
          status: "Completed",
          comments: "Updated CSS and tested on multiple devices",
          isOverdue: false,
        },
      ],
    },
    {
      id: "#105",
      description: "API rate limiting causing transaction failures",
      loggedOn: "2024-04-08",
      loggedBy: "James Miller",
      assignedManager: "David Wilson",
      assignedManagersManager: "Elizabeth Taylor",
      escalationRequired: false,
      targetResolutionDate: "2024-04-15",
      closureDate: null,
      currentStatus: "In Progress",
      isOverdue: true,
      teamMember: "James Miller",
      tasks: [
        {
          id: "task-11",
          name: "Analyze API usage patterns",
          completionCriteria: "Usage patterns documented",
          assignedTo: "James Miller",
          dueDate: "2024-04-10",
          status: "Completed",
          comments: "Found spikes during peak hours",
          isOverdue: false,
        },
        {
          id: "task-12",
          name: "Implement request batching",
          completionCriteria: "Batching system in place",
          assignedTo: "Robert Johnson",
          dueDate: "2024-04-12",
          status: "In Progress",
          comments: "Working on batching logic",
          isOverdue: true,
        },
        {
          id: "task-13",
          name: "Add caching layer",
          completionCriteria: "Cache implemented and tested",
          assignedTo: "Emily Chen",
          dueDate: "2024-04-14",
          status: "Not Started",
          comments: "",
          isOverdue: true,
        },
        {
          id: "task-14",
          name: "Update documentation",
          completionCriteria: "API usage docs updated",
          assignedTo: "Megan Clark",
          dueDate: "2024-04-15",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
      ],
    },
    // New issues added below
    {
      id: "#106",
      description: "Mobile app performance degradation on older devices",
      loggedOn: "2024-05-01",
      loggedBy: "Sarah Lee",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: false,
      targetResolutionDate: "2024-05-20",
      closureDate: null,
      currentStatus: "Open",
      isOverdue: false,
      teamMember: "Sarah Lee",
      tasks: [
        {
          id: "task-15",
          name: "Profile app performance on target devices",
          completionCriteria: "Performance metrics collected on 5 device types",
          assignedTo: "James Miller",
          dueDate: "2024-05-10",
          status: "In Progress",
          comments: "Started testing on Samsung Galaxy S8",
          isOverdue: false,
        },
        {
          id: "task-16",
          name: "Optimize image loading and caching",
          completionCriteria: "Reduce image load time by 40%",
          assignedTo: "Emily Chen",
          dueDate: "2024-05-15",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-17",
          name: "Implement lazy loading for list views",
          completionCriteria: "Scrolling performance improved to 60fps",
          assignedTo: "Sarah Lee",
          dueDate: "2024-05-18",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
      ],
    },
    {
      id: "#107",
      description: "Database query optimization needed for reports",
      loggedOn: "2024-04-25",
      loggedBy: "David Wilson",
      assignedManager: "David Wilson",
      assignedManagersManager: "Elizabeth Taylor",
      escalationRequired: false,
      targetResolutionDate: "2024-05-25",
      closureDate: null,
      currentStatus: "On Hold",
      isOverdue: false,
      teamMember: "Robert Johnson",
      tasks: [
        {
          id: "task-18",
          name: "Analyze slow-performing queries",
          completionCriteria: "Identify top 5 performance bottlenecks",
          assignedTo: "Robert Johnson",
          dueDate: "2024-05-05",
          status: "Completed",
          comments: "Found issues with joins on large tables",
          isOverdue: false,
        },
        {
          id: "task-19",
          name: "Implement database indexing improvements",
          completionCriteria: "Query time reduced by 50%",
          assignedTo: "James Miller",
          dueDate: "2024-05-15",
          status: "On Hold",
          comments: "Waiting for approval from DBA team",
          isOverdue: false,
        },
        {
          id: "task-20",
          name: "Refactor report generation logic",
          completionCriteria: "Reports generate in under 30 seconds",
          assignedTo: "Robert Johnson",
          dueDate: "2024-05-20",
          status: "On Hold",
          comments: "Dependent on task-19",
          isOverdue: false,
        },
      ],
    },
    {
      id: "#108",
      description: "Security vulnerability in user authentication flow",
      loggedOn: "2024-05-05",
      loggedBy: "Emily Chen",
      assignedManager: "David Wilson",
      assignedManagersManager: "Elizabeth Taylor",
      escalationRequired: true,
      targetResolutionDate: "2024-05-12",
      closureDate: null,
      currentStatus: "In Progress",
      isOverdue: false,
      teamMember: "Emily Chen",
      tasks: [
        {
          id: "task-21",
          name: "Conduct security audit of authentication code",
          completionCriteria: "All vulnerabilities identified and documented",
          assignedTo: "Emily Chen",
          dueDate: "2024-05-08",
          status: "Completed",
          comments: "Found XSS vulnerability in login form",
          isOverdue: false,
        },
        {
          id: "task-22",
          name: "Implement input sanitization",
          completionCriteria: "All user inputs properly sanitized",
          assignedTo: "James Miller",
          dueDate: "2024-05-10",
          status: "In Progress",
          comments: "Working on implementing DOMPurify",
          isOverdue: false,
        },
        {
          id: "task-23",
          name: "Update session management",
          completionCriteria: "Session tokens properly secured",
          assignedTo: "Emily Chen",
          dueDate: "2024-05-11",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-24",
          name: "Conduct penetration testing",
          completionCriteria: "No critical vulnerabilities found",
          assignedTo: "David Wilson",
          dueDate: "2024-05-12",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
      ],
    },
    {
      id: "#109",
      description: "Payment gateway integration for new vendor",
      loggedOn: "2024-04-20",
      loggedBy: "Megan Clark",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: false,
      targetResolutionDate: "2024-05-30",
      closureDate: null,
      currentStatus: "In Progress",
      isOverdue: false,
      teamMember: "Megan Clark",
      tasks: [
        {
          id: "task-25",
          name: "Set up vendor API credentials",
          completionCriteria: "Test API keys obtained and configured",
          assignedTo: "Megan Clark",
          dueDate: "2024-04-25",
          status: "Completed",
          comments: "Credentials received and stored securely",
          isOverdue: false,
        },
        {
          id: "task-26",
          name: "Implement payment processing flow",
          completionCriteria: "Basic payment processing working in test environment",
          assignedTo: "Robert Johnson",
          dueDate: "2024-05-10",
          status: "In Progress",
          comments: "Working on handling API responses",
          isOverdue: false,
        },
        {
          id: "task-27",
          name: "Implement error handling and retries",
          completionCriteria: "Robust error handling for all failure scenarios",
          assignedTo: "Megan Clark",
          dueDate: "2024-05-20",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-28",
          name: "Create reconciliation reports",
          completionCriteria: "Daily reconciliation reports implemented",
          assignedTo: "Sarah Lee",
          dueDate: "2024-05-25",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-29",
          name: "Conduct UAT with finance team",
          completionCriteria: "Finance team signs off on implementation",
          assignedTo: "Michael Davis",
          dueDate: "2024-05-30",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
      ],
    },
    {
      id: "#110",
      description: "Implement new product recommendation engine",
      loggedOn: "2024-04-15",
      loggedBy: "James Miller",
      assignedManager: "Michael Davis",
      assignedManagersManager: "David Wilson",
      escalationRequired: false,
      targetResolutionDate: "2024-06-15",
      closureDate: null,
      currentStatus: "In Progress",
      isOverdue: false,
      teamMember: "James Miller",
      tasks: [
        {
          id: "task-30",
          name: "Design recommendation algorithm",
          completionCriteria: "Algorithm design document approved",
          assignedTo: "James Miller",
          dueDate: "2024-04-30",
          status: "Completed",
          comments: "Collaborative filtering approach selected",
          isOverdue: false,
        },
        {
          id: "task-31",
          name: "Implement data collection pipeline",
          completionCriteria: "User behavior data being collected correctly",
          assignedTo: "Emily Chen",
          dueDate: "2024-05-15",
          status: "In Progress",
          comments: "Working on event tracking implementation",
          isOverdue: false,
        },
        {
          id: "task-32",
          name: "Develop recommendation API",
          completionCriteria: "API returns recommendations in under 200ms",
          assignedTo: "James Miller",
          dueDate: "2024-05-30",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-33",
          name: "Integrate recommendations into product pages",
          completionCriteria: "Recommendations displayed on all product pages",
          assignedTo: "Sarah Lee",
          dueDate: "2024-06-10",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
        {
          id: "task-34",
          name: "A/B test recommendation effectiveness",
          completionCriteria: "Test results show 10% increase in conversions",
          assignedTo: "Michael Davis",
          dueDate: "2024-06-15",
          status: "Not Started",
          comments: "",
          isOverdue: false,
        },
      ],
    },
  ])

  // State for filtered issues
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues)

  // Add these state variables after the other useState declarations
  const [viewingTasksForIssue, setViewingTasksForIssue] = useState<string | null>(null)
  const [newTask, setNewTask] = useState<Partial<Task> | null>(null)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // Filter issues when team member selection changes
  useEffect(() => {
    let filtered = [...issues]

    // Apply team member filter
    if (selectedTeamMember === "Self") {
      filtered = filtered.filter(
        (issue) => issue.loggedBy === currentUser.name || issue.assignedManager === currentUser.name,
      )
    } else if (selectedTeamMember !== "All") {
      filtered = filtered.filter((issue) => issue.teamMember === selectedTeamMember)
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((issue) => issue.currentStatus === statusFilter)
    }

    // Apply assignee filter for tasks
    if (assigneeFilter !== "All") {
      filtered = filtered.filter((issue) => issue.tasks.some((task) => task.assignedTo === assigneeFilter))
    }

    setFilteredIssues(filtered)
  }, [selectedTeamMember, statusFilter, assigneeFilter, issues])

  // Team members for dropdown
  const teamMembers = [
    { id: "sarah", name: "Sarah Lee" },
    { id: "james", name: "James Miller" },
    { id: "megan", name: "Megan Clark" },
    { id: "robert", name: "Robert Johnson" },
    { id: "emily", name: "Emily Chen" },
    { id: "michael", name: "Michael Davis" },
  ]

  // Reset filters
  const resetFilters = () => {
    setSelectedTeamMember("Self")
    setStatusFilter("All")
    setAssigneeFilter("All")
  }

  // Add these functions after the other function declarations
  const viewTasks = (issueId: string) => {
    console.log("Viewing tasks for issue:", issueId)
    setViewingTasksForIssue(issueId)
  }

  const closeTaskView = () => {
    setViewingTasksForIssue(null)
    setNewTask(null)
    setEditingTask(null)
  }

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

  const startEditTask = (task: Task) => {
    setEditingTask(task)
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

  const toggleIssueExpand = (issueId: string) => {
    console.log("Details clicked for issue:", issueId)
    // Implement your details logic here
  }

  return (
    <div className="space-y-6">
      {/* Project Performance Indicators Section */}
      <Card>
        <CardHeader className="border-b border-brand-primary/10">
          <div>
            <CardTitle className="text-brand-primary">Issue Log Management</CardTitle>
            <CardDescription>Track and manage issues, tasks, and their resolution status</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium whitespace-nowrap">Team Member:</span>
                <select
                  className="p-2 border rounded-md flex-grow"
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

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium whitespace-nowrap">Status:</span>
                <select
                  className="p-2 border rounded-md flex-grow"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Closed">Closed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium whitespace-nowrap">Assignee:</span>
                <select
                  className="p-2 border rounded-md flex-grow"
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                >
                  <option value="All">All Assignees</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-1 whitespace-nowrap" onClick={resetFilters}>
              <X className="h-4 w-4" />
              Reset Filters
            </Button>
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
                {filteredIssues.length > 0 ? (
                  filteredIssues.map((issue) => (
                    <tr
                      key={issue.id}
                      className={
                        issue.isOverdue && issue.currentStatus !== "Closed" && issue.currentStatus !== "Cancelled"
                          ? "bg-red-50 border-red-300"
                          : issue.currentStatus === "Closed" || issue.currentStatus === "Cancelled"
                            ? "bg-green-50 border-green-300"
                            : ""
                      }
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
                        className={`border p-2 ${
                          issue.isOverdue && issue.currentStatus !== "Closed" && issue.currentStatus !== "Cancelled"
                            ? "text-red-600 font-medium"
                            : ""
                        }`}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="border p-4 text-center text-muted-foreground">
                      No issues found matching the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
