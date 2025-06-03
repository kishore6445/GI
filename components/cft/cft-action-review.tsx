"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Edit, Filter, Search } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Sample data with Indian names
const initialActions = [
  {
    id: 1,
    action: "Create documentation for CRM workflows",
    source: "1-1 Meeting",
    assignee: "Rahul Patel",
    dueDate: "May 17, 2024",
    status: "In Progress",
    comments: "First draft completed, needs review",
  },
  {
    id: 2,
    action: "Set up access permissions for team members",
    source: "1-1 Meeting",
    assignee: "Current User",
    dueDate: "May 15, 2024",
    status: "To Do",
    comments: "No comments",
  },
  {
    id: 3,
    action: "Prepare training materials for new CRM system",
    source: "1-1 Meeting",
    assignee: "Rahul Patel",
    dueDate: "May 20, 2024",
    status: "To Do",
    comments: "No comments",
  },
  {
    id: 4,
    action: "Complete skills assessment by next week",
    source: "1-1 Meeting",
    assignee: "Ananya Sharma",
    dueDate: "Apr 22, 2024",
    status: "Completed",
    comments: "Assessment completed and submitted to HR",
  },
  {
    id: 5,
    action: "Draft marketing campaign proposal",
    source: "1-1 Meeting",
    assignee: "Ananya Sharma",
    dueDate: "Apr 30, 2024",
    status: "In Progress",
    comments: "Working on budget section",
  },
  {
    id: 6,
    action: "Document the synchronization issues",
    source: "1-1 Meeting",
    assignee: "Vikram Kumar",
    dueDate: "May 16, 2024",
    status: "To Do",
    comments: "No comments",
  },
  {
    id: 7,
    action: "Contact the database vendor for support",
    source: "1-1 Meeting",
    assignee: "Current User",
    dueDate: "May 16, 2024",
    status: "To Do",
    comments: "No comments",
  },
  {
    id: 8,
    action: "Create customer feedback survey",
    source: "CFT Meeting",
    assignee: "Ananya Sharma",
    dueDate: "May 22, 2024",
    status: "In Progress",
    comments: "Survey questions drafted, need final approval",
  },
  {
    id: 9,
    action: "Analyze Q1 performance data",
    source: "CFT Meeting",
    assignee: "Vikram Kumar",
    dueDate: "May 23, 2024",
    status: "To Do",
    comments: "No comments",
  },
  {
    id: 10,
    action: "Schedule CRM training",
    source: "CFT Meeting",
    assignee: "Priya Singh",
    dueDate: "May 25, 2024",
    status: "Completed",
    comments: "Training scheduled for May 25th at 10 AM",
  },
  {
    id: 11,
    action: "Update project documentation",
    source: "CFT Meeting",
    assignee: "Rahul Patel",
    dueDate: "May 10, 2024",
    status: "Overdue",
    comments: "Waiting for input from stakeholders",
  },
  {
    id: 12,
    action: "Prepare monthly report",
    source: "Task Assignment",
    assignee: "Deepak Verma",
    dueDate: "May 30, 2024",
    status: "To Do",
    comments: "No comments",
  },
]

// Team members with Indian names
const teamMembers = [
  "Current User",
  "Rahul Patel",
  "Ananya Sharma",
  "Vikram Kumar",
  "Priya Singh",
  "Deepak Verma",
  "Neha Gupta",
  "Arjun Reddy",
  "Kavita Desai",
  "Sanjay Mehta",
]

// Sources for dropdown
const sources = ["1-1 Meeting", "CFT Meeting", "Task Assignment", "Issue Log"]

export function CFTActionReview() {
  const [actions, setActions] = useState(initialActions)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [assigneeFilter, setAssigneeFilter] = useState("All")
  const [sourceFilter, setSourceFilter] = useState("All")

  // New action state
  const [newAction, setNewAction] = useState({
    action: "",
    source: "CFT Meeting",
    assignee: "Current User",
    dueDate: "",
    status: "To Do",
    comments: "",
  })

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
      case "To Do":
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
    setCurrentAction(action)
    setIsCompleteDialogOpen(true)
  }

  // Function to save edited action
  const saveEditedAction = (editedAction) => {
    setActions(actions.map((action) => (action.id === editedAction.id ? editedAction : action)))
    setIsEditDialogOpen(false)
    toast({
      title: "Action updated",
      description: "The action has been successfully updated.",
    })
  }

  // Function to mark action as complete
  const markActionComplete = (actionId, completionNotes) => {
    setActions(
      actions.map((action) =>
        action.id === actionId ? { ...action, status: "Completed", comments: completionNotes } : action,
      ),
    )
    setIsCompleteDialogOpen(false)
    toast({
      title: "Action completed",
      description: "The action has been marked as completed.",
      variant: "success",
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
      comments: newAction.comments || "No comments",
    }

    // Add to actions list
    setActions([...actions, actionToAdd])

    // Reset form and close dialog
    setNewAction({
      action: "",
      source: "CFT Meeting",
      assignee: "Current User",
      dueDate: "",
      status: "To Do",
      comments: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "Action added",
      description: "The new action has been successfully added.",
      variant: "success",
    })
  }

  // Function to handle opening the add dialog
  const handleAddAction = () => {
    // Set default due date to 7 days from now
    const defaultDueDate = new Date()
    defaultDueDate.setDate(defaultDueDate.getDate() + 7)

    // Format as MM/DD/YYYY
    const formattedDate = `${defaultDueDate.getMonth() + 1}/${defaultDueDate.getDate()}/${defaultDueDate.getFullYear()}`

    setNewAction({
      ...newAction,
      dueDate: formattedDate,
    })

    setIsAddDialogOpen(true)
  }

  // Filter actions based on search term and filters
  const filteredActions = actions.filter((action) => {
    const matchesSearch =
      action.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.comments.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || action.status === statusFilter
    const matchesAssignee = assigneeFilter === "All" || action.assignee === assigneeFilter
    const matchesSource = sourceFilter === "All" || action.source === sourceFilter

    return matchesSearch && matchesStatus && matchesAssignee && matchesSource
  })

  return (
    <Card>
      <CardHeader className="border-b border-brand-primary/10">
        <CardTitle className="text-brand-primary">Action Review</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
                <SelectItem value="To Do">To Do</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Assignees</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member} value={member}>
                    {member}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="h-8 w-[150px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sources</SelectItem>
                {sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredActions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    No actions found matching your filters
                  </TableCell>
                </TableRow>
              ) : (
                filteredActions.map((action) => (
                  <TableRow key={action.id} className={action.status === "Overdue" ? "bg-red-50" : ""}>
                    <TableCell className="font-medium">{action.action}</TableCell>
                    <TableCell>{action.source}</TableCell>
                    <TableCell className={action.assignee === "Current User" ? "font-semibold text-brand-primary" : ""}>
                      {action.assignee}
                    </TableCell>
                    <TableCell
                      className={
                        isOverdue(action.dueDate) && action.status !== "Completed" ? "text-red-600 font-medium" : ""
                      }
                    >
                      {action.dueDate}
                    </TableCell>
                    <TableCell>{getStatusBadge(action.status)}</TableCell>
                    <TableCell className="max-w-[200px] truncate" title={action.comments}>
                      {action.comments}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(action)}>
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        {action.status !== "Completed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleComplete(action)}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

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
                  defaultValue={currentAction.action}
                  onChange={(e) => setCurrentAction({ ...currentAction, action: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="source">Source</Label>
                  <Select
                    defaultValue={currentAction.source}
                    onValueChange={(value) => setCurrentAction({ ...currentAction, source: value })}
                  >
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select
                    defaultValue={currentAction.assignee}
                    onValueChange={(value) => setCurrentAction({ ...currentAction, assignee: value })}
                  >
                    <SelectTrigger id="assignee">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member} value={member}>
                          {member}
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
                    defaultValue={currentAction.dueDate}
                    onChange={(e) => setCurrentAction({ ...currentAction, dueDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={currentAction.status}
                    onValueChange={(value) => setCurrentAction({ ...currentAction, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea
                  id="comments"
                  defaultValue={currentAction.comments}
                  onChange={(e) => setCurrentAction({ ...currentAction, comments: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={() => saveEditedAction(currentAction)}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Complete Action Dialog */}
      {currentAction && (
        <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Complete Action</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="p-4 border rounded-md bg-gray-50">
                <p className="font-medium">{currentAction.action}</p>
                <p className="text-sm text-muted-foreground mt-1">Assigned to: {currentAction.assignee}</p>
                <p className="text-sm text-muted-foreground">Due: {currentAction.dueDate}</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="completionNotes">Completion Notes</Label>
                <Textarea
                  id="completionNotes"
                  placeholder="Add notes about how this action was completed..."
                  defaultValue={currentAction.comments !== "No comments" ? currentAction.comments : ""}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => markActionComplete(currentAction.id, document.getElementById("completionNotes").value)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}
