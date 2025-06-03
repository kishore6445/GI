"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Edit, BarChart, Clock3, Flag, CheckSquare } from "lucide-react"
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

export function CFTPPISection() {
  // State for project status filter
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>("All")

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

  // State for filtered projects
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)

  // Filter projects when status filter changes
  useEffect(() => {
    if (projectStatusFilter === "All") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.status === projectStatusFilter))
    }
  }, [projectStatusFilter, projects])

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

  // Start editing a project
  const startEditProject = (project: Project) => {
    setEditingProject({ ...project })
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

  return (
    <div className="space-y-6">
      {/* Projects Section */}
      <Card>
        <CardHeader className="border-b border-brand-primary/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-brand-primary">Projects</CardTitle>
              <CardDescription>Track and manage project performance and actions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium whitespace-nowrap">Status:</span>
              <select
                className="p-2 border rounded-md"
                value={projectStatusFilter}
                onChange={(e) => setProjectStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="On Track">On Track</option>
                <option value="At Risk">At Risk</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
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
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">No projects found matching the current filter.</div>
          )}
        </CardContent>
      </Card>

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
    </div>
  )
}
