"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Filter, Plus, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function ActionReviewSection() {
  const [selectedMember, setSelectedMember] = useState("Ananya Sharma")
  const [actions, setActions] = useState([
    {
      id: 1,
      action: "Investigate server performance issues",
      source: "Issue Log",
      dueDate: "2025-05-10",
      status: "In Progress",
      assignedTo: "Rahul Patel",
      comments: "Identified potential memory leak",
    },
    {
      id: 2,
      action: "Fix data sync issue with CRM",
      source: "1-1 Meeting",
      dueDate: "2025-05-05",
      status: "In Progress",
      assignedTo: "Ananya Sharma",
      comments: "Waiting for API access from vendor",
    },
    {
      id: 3,
      action: "Update customer onboarding documentation",
      source: "Team Meeting",
      dueDate: "2025-05-15",
      status: "Not Started",
      assignedTo: "Ananya Sharma",
      comments: "",
    },
    {
      id: 4,
      action: "Prepare quarterly performance report",
      source: "1-1 Meeting",
      dueDate: "2025-05-20",
      status: "Not Started",
      assignedTo: "Priya Singh",
      comments: "",
    },
    {
      id: 5,
      action: "Review new feature requirements",
      source: "Team Meeting",
      dueDate: "2025-05-08",
      status: "Completed",
      assignedTo: "Ananya Sharma",
      comments: "Requirements document finalized and shared with team",
    },
  ])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [assigneeFilter, setAssigneeFilter] = useState("All")

  // New action state
  const [newAction, setNewAction] = useState({
    action: "",
    assignedTo: "Ananya Sharma",
    dueDate: "",
    status: "Not Started",
    comments: "",
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

  // Function to determine if a task is overdue
  const isOverdue = (dueDate) => {
    const today = new Date()
    const due = new Date(dueDate)
    return due < today && dueDate !== "Completed"
  }

  // Function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "In Progress":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "Not Started":
        return <Badge className="bg-gray-500 hover:bg-gray-600">{status}</Badge>
      case "Overdue":
        return <Badge className="bg-red-500 hover:bg-red-600">{status}</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Function to handle editing an action
  const handleEdit = (action) => {
    setCurrentAction(action)
    setIsEditDialogOpen(true)
  }

  // Function to handle completing an action
  const handleComplete = (action) => {
    // Update the action status to completed
    const updatedActions = actions.map((a) => (a.id === action.id ? { ...a, status: "Completed" } : a))
    setActions(updatedActions)

    toast({
      title: "Action completed",
      description: "The action has been marked as completed.",
      variant: "success",
    })
  }

  // Function to save edited action
  const saveEditedAction = () => {
    if (!currentAction) return

    const updatedActions = actions.map((action) => (action.id === currentAction.id ? currentAction : action))
    setActions(updatedActions)
    setIsEditDialogOpen(false)

    toast({
      title: "Action updated",
      description: "The action has been successfully updated.",
    })
  }

  // Function to add a new action
  const addNewAction = () => {
    // Validate required fields
    if (!newAction.action || !newAction.dueDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new action with unique ID
    const newId = Math.max(...actions.map((a) => a.id)) + 1
    const actionToAdd = {
      ...newAction,
      id: newId,
      comments: newAction.comments || "",
    }

    // Add to actions list
    setActions([...actions, actionToAdd])

    // Reset form and close dialog
    setNewAction({
      action: "",
      assignedTo: "Ananya Sharma",
      dueDate: "",
      status: "Not Started",
      comments: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Action added",
      description: "The new action has been successfully added.",
      variant: "success",
    })
  }

  // Filter actions based on search term and filters
  const filteredActions = actions.filter((action) => {
    const matchesSearch =
      action.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.comments.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || action.status === statusFilter
    const matchesAssignee = assigneeFilter === "All" || action.assignedTo === assigneeFilter

    return matchesSearch && matchesStatus && matchesAssignee
  })

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Action Review</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="member-select-actions" className="text-sm font-medium">
            Select Member:
          </label>
          <select
            id="member-select-actions"
            className="p-2 border rounded-md"
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-4 border-b flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search actions..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-[120px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Assignees</SelectItem>
              {teamMembers.map((member) => (
                <SelectItem key={member.id} value={member.name}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Task</th>
              <th className="border p-2 text-left">Due Date</th>
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Assigned To</th>
              <th className="border p-2 text-left">Comments</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredActions.map((action) => (
              <tr
                key={action.id}
                className={isOverdue(action.dueDate) && action.status !== "Completed" ? "bg-red-50" : ""}
              >
                <td className="border p-2">{action.action}</td>
                <td className="border p-2">{action.dueDate}</td>
                <td className="border p-2">
                  <select
                    className="w-full p-1 border rounded"
                    value={action.status}
                    onChange={(e) => {
                      const updatedActions = actions.map((a) =>
                        a.id === action.id ? { ...a, status: e.target.value } : a,
                      )
                      setActions(updatedActions)
                    }}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Waiting">Waiting</option>
                  </select>
                </td>
                <td className="border p-2">
                  <select
                    className="w-full p-1 border rounded"
                    value={action.assignedTo}
                    onChange={(e) => {
                      const updatedActions = actions.map((a) =>
                        a.id === action.id ? { ...a, assignedTo: e.target.value } : a,
                      )
                      setActions(updatedActions)
                    }}
                  >
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.name}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    placeholder="Add comment..."
                    value={action.comments}
                    onChange={(e) => {
                      const updatedActions = actions.map((a) =>
                        a.id === action.id ? { ...a, comments: e.target.value } : a,
                      )
                      setActions(updatedActions)
                    }}
                  />
                </td>
                <td className="border p-2">
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(action)}>
                      Reassign
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleComplete(action)}
                      disabled={action.status === "Completed"}
                    >
                      Close
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Action Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Action</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-action">
                Action <span className="text-red-500">*</span>
              </Label>
              <Input
                id="new-action"
                value={newAction.action}
                onChange={(e) => setNewAction({ ...newAction, action: e.target.value })}
                placeholder="Enter action description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-assignee">Assignee</Label>
                <Select
                  value={newAction.assignedTo}
                  onValueChange={(value) => setNewAction({ ...newAction, assignedTo: value })}
                >
                  <SelectTrigger id="new-assignee">
                    <SelectValue placeholder="Select assignee" />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-dueDate">
                  Due Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="new-dueDate"
                  type="date"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-status">Status</Label>
                <Select
                  value={newAction.status}
                  onValueChange={(value) => setNewAction({ ...newAction, status: value })}
                >
                  <SelectTrigger id="new-status">
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
            <div className="grid gap-2">
              <Label htmlFor="new-comments">Comments</Label>
              <Textarea
                id="new-comments"
                value={newAction.comments}
                onChange={(e) => setNewAction({ ...newAction, comments: e.target.value })}
                placeholder="Add any additional comments or context"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={addNewAction} className="gap-1">
              <Plus className="h-4 w-4" />
              Add Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Action Dialog */}
      {currentAction && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Action</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="action">Action</Label>
                <Input
                  id="action"
                  value={currentAction.action}
                  onChange={(e) => setCurrentAction({ ...currentAction, action: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    value={currentAction.assignedTo}
                    onValueChange={(value) => setCurrentAction({ ...currentAction, assignedTo: value })}
                  >
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Select assignee" />
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
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={currentAction.dueDate}
                    onChange={(e) => setCurrentAction({ ...currentAction, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentAction.status}
                    onValueChange={(value) => setCurrentAction({ ...currentAction, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Waiting">Waiting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  value={currentAction.comments}
                  onChange={(e) => setCurrentAction({ ...currentAction, comments: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={saveEditedAction}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
