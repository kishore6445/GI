"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  parentType?: "project" | "task" | null
  parentId?: string | null
}

export function AddTaskDialog({ open, onOpenChange, parentType = null, parentId = null }: AddTaskDialogProps) {
  const [taskType, setTaskType] = useState<"project" | "task" | "subtask">(
    parentType === "project" ? "task" : parentType === "task" ? "subtask" : "project",
  )
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [status, setStatus] = useState("Not Started")
  const [source, setSource] = useState("QOP")
  const [assignedTo, setAssignedTo] = useState("")
  const [date, setDate] = useState<Date>()
  const [project, setProject] = useState("")
  const [parentTask, setParentTask] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setTitle("")
      setDescription("")
      setPriority("Medium")
      setStatus("Not Started")
      setSource("QOP")
      setAssignedTo("")
      setDate(undefined)
      setProject("")
      setParentTask("")

      // Set default task type based on parent
      if (parentType === "project") {
        setTaskType("task")
      } else if (parentType === "task") {
        setTaskType("subtask")
      } else {
        setTaskType("project")
      }
    }
  }, [open, parentType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Reset form and close dialog
    setTitle("")
    setDescription("")
    setPriority("Medium")
    setStatus("Not Started")
    setSource("QOP")
    setAssignedTo("")
    setDate(undefined)
    setProject("")
    setParentTask("")
    setIsSubmitting(false)
    onOpenChange(false)

    // In a real app, you would save the task to your database here
  }

  // Mock data for projects and tasks
  const projects = [
    { id: "project-1", title: "Q2 Performance Review" },
    { id: "project-2", title: "Website Performance Optimization" },
    { id: "project-3", title: "Marketing Campaign Analysis" },
  ]

  const tasks = [
    { id: "task-1", title: "Complete Q2 performance metrics", projectId: "project-1" },
    { id: "task-2", title: "Schedule review meetings", projectId: "project-1" },
    { id: "task-3", title: "Resolve website performance issue", projectId: "project-2" },
    { id: "task-4", title: "Update caching policy", projectId: "project-2" },
    { id: "task-5", title: "Review marketing campaign results", projectId: "project-3" },
  ]

  // Filter tasks based on selected project
  const filteredTasks = tasks.filter((task) => task.projectId === project)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {taskType === "project" ? "Add New Project" : taskType === "task" ? "Add New Task" : "Add New Subtask"}
            </DialogTitle>
            <DialogDescription>
              {taskType === "project"
                ? "Create a new project to organize related tasks."
                : taskType === "task"
                  ? "Create a new task within a project."
                  : "Create a new subtask to break down a larger task."}
            </DialogDescription>
          </DialogHeader>

          {/* Task Type Selection (only show if not predetermined by parent) */}
          {!parentType && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Type</Label>
                <RadioGroup
                  defaultValue={taskType}
                  onValueChange={(value) => setTaskType(value as "project" | "task" | "subtask")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="project" id="project" />
                    <Label htmlFor="project" className="cursor-pointer">
                      Project
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="task" id="task" />
                    <Label htmlFor="task" className="cursor-pointer">
                      Task
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="subtask" id="subtask" />
                    <Label htmlFor="subtask" className="cursor-pointer">
                      Subtask
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="grid gap-4 py-4">
            {/* Project Selection (for tasks and subtasks) */}
            {taskType !== "project" && !parentId && (
              <div className="grid gap-2">
                <Label htmlFor="project">Project</Label>
                <Select value={project} onValueChange={setProject} required>
                  <SelectTrigger id="project">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Parent Task Selection (for subtasks) */}
            {taskType === "subtask" && !parentId && project && (
              <div className="grid gap-2">
                <Label htmlFor="parent-task">Parent Task</Label>
                <Select value={parentTask} onValueChange={setParentTask} required>
                  <SelectTrigger id="parent-task">
                    <SelectValue placeholder="Select parent task" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredTasks.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Title */}
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${taskType} title`}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={`Enter ${taskType} description`}
                required
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                    <SelectItem value="Waiting">Waiting</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Source and Due Date */}
            <div className="grid grid-cols-2 gap-4">
              {/* Only show source for tasks and subtasks */}
              {taskType !== "project" && (
                <div className="grid gap-2">
                  <Label htmlFor="source">Source</Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger id="source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QOP">QOP</SelectItem>
                      <SelectItem value="Issue Log">Issue Log</SelectItem>
                      <SelectItem value="1-1 Meeting">1-1 Meeting</SelectItem>
                      <SelectItem value="Team Meeting">Team Meeting</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className={`grid gap-2 ${taskType === "project" ? "col-span-2" : ""}`}>
                <Label htmlFor="due-date">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Assignee (only for tasks and subtasks) */}
            {taskType !== "project" && (
              <div className="grid gap-2">
                <Label htmlFor="assigned-to">Assigned To</Label>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger id="assigned-to">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="me">Me</SelectItem>
                    <SelectItem value="Rahul Sharma">Rahul Sharma</SelectItem>
                    <SelectItem value="Priya Patel">Priya Patel</SelectItem>
                    <SelectItem value="Amit Kumar">Amit Kumar</SelectItem>
                    <SelectItem value="Neha Singh">Neha Singh</SelectItem>
                    <SelectItem value="Vikram Mehta">Vikram Mehta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? `Creating...`
                : `Create ${taskType === "project" ? "Project" : taskType === "task" ? "Task" : "Subtask"}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
