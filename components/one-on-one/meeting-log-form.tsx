"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MeetingLogFormProps {
  isNewMeeting?: boolean
  existingMeeting?: any
  onComplete?: () => void
}

export function MeetingLogForm({ isNewMeeting = false, existingMeeting, onComplete }: MeetingLogFormProps) {
  const [showActionDialog, setShowActionDialog] = useState(false)
  const [meetingData, setMeetingData] = useState({
    meetingType: existingMeeting?.meetingType || "weekly",
    meetingDate: existingMeeting?.meetingDate || new Date().toISOString().slice(0, 16),
    managerName: "Vikram Kumar", // Current user
    memberName: existingMeeting?.memberName || "",
    meetingNotes: existingMeeting?.meetingNotes || "",
    decisions: existingMeeting?.decisions || [],
    actionItems: existingMeeting?.actionItems || [],
  })

  const [newDecision, setNewDecision] = useState("")
  const [newAction, setNewAction] = useState({
    title: "",
    assignedTo: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), // Default to 1 week from now
    priority: "medium",
    completionCriteria: "",
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

  // Add a decision to the list
  const addDecision = () => {
    if (!newDecision.trim()) return
    setMeetingData({
      ...meetingData,
      decisions: [...meetingData.decisions, newDecision],
    })
    setNewDecision("")
  }

  // Remove a decision from the list
  const removeDecision = (index: number) => {
    const updatedDecisions = [...meetingData.decisions]
    updatedDecisions.splice(index, 1)
    setMeetingData({
      ...meetingData,
      decisions: updatedDecisions,
    })
  }

  // Add an action item
  const addActionItem = () => {
    if (!newAction.title || !newAction.assignedTo || !newAction.dueDate) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields for the action item.",
        variant: "destructive",
      })
      return
    }

    const actionToAdd = {
      id: `action-${Date.now()}`,
      ...newAction,
      status: "To Do",
      createdAt: new Date().toISOString(),
    }

    setMeetingData({
      ...meetingData,
      actionItems: [...meetingData.actionItems, actionToAdd],
    })

    setNewAction({
      title: "",
      assignedTo: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      priority: "medium",
      completionCriteria: "",
    })

    setShowActionDialog(false)
  }

  // Remove an action item
  const removeActionItem = (id: string) => {
    setMeetingData({
      ...meetingData,
      actionItems: meetingData.actionItems.filter((item) => item.id !== id),
    })
  }

  // Save the meeting
  const saveMeeting = () => {
    if (!meetingData.memberName || !meetingData.meetingDate) {
      toast({
        title: "Missing required fields",
        description: "Please select a team member and meeting date.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save to a database
    console.log("Saving meeting:", meetingData)

    toast({
      title: "Meeting saved",
      description: "The meeting details have been saved successfully.",
      variant: "success",
    })

    if (onComplete) {
      onComplete()
    }
  }

  return (
    <Card className="space-y-4 p-4 border rounded-lg bg-card">
      <h3 className="text-lg font-medium">Meeting Details</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="meeting-type" className="text-sm font-medium">
            Meeting Type
          </label>
          <select
            id="meeting-type"
            className="w-full p-2 border rounded-md"
            value={meetingData.meetingType}
            onChange={(e) => setMeetingData({ ...meetingData, meetingType: e.target.value })}
          >
            <option value="daily">Daily Huddle</option>
            <option value="weekly">Weekly Review</option>
            <option value="monthly">Monthly Review</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="meeting-date" className="text-sm font-medium">
            Meeting Date & Time
          </label>
          <input
            type="datetime-local"
            id="meeting-date"
            className="w-full p-2 border rounded-md"
            value={meetingData.meetingDate}
            onChange={(e) => setMeetingData({ ...meetingData, meetingDate: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="manager-name" className="text-sm font-medium">
            Manager Name
          </label>
          <input
            type="text"
            id="manager-name"
            className="w-full p-2 border rounded-md"
            value={meetingData.managerName}
            disabled
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="member-name" className="text-sm font-medium">
            Member Name
          </label>
          <select
            id="member-name"
            className="w-full p-2 border rounded-md"
            value={meetingData.memberName}
            onChange={(e) => setMeetingData({ ...meetingData, memberName: e.target.value })}
          >
            <option value="">Select team member</option>
            {teamMembers.map((member) => (
              <option key={member.id} value={member.name}>
                {member.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="meeting-notes" className="text-sm font-medium">
          Meeting Notes / Discussion Summary
        </label>
        <textarea
          id="meeting-notes"
          className="w-full p-2 border rounded-md min-h-[100px]"
          placeholder="Enter meeting notes and discussion points..."
          value={meetingData.meetingNotes}
          onChange={(e) => setMeetingData({ ...meetingData, meetingNotes: e.target.value })}
        />
      </div>

      {/* Decisions Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Decisions Taken</label>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md"
            placeholder="Add a decision..."
            value={newDecision}
            onChange={(e) => setNewDecision(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addDecision()
              }
            }}
          />
          <Button onClick={addDecision} size="sm">
            Add
          </Button>
        </div>
        <ul className="space-y-2 list-disc list-inside">
          {meetingData.decisions.map((decision, index) => (
            <li key={index} className="flex items-center justify-between group">
              <span>{decision}</span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeDecision(index)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Items Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Action Items</label>
          <Button size="sm" variant="outline" className="gap-1" onClick={() => setShowActionDialog(true)}>
            <PlusCircle className="h-3 w-3" />
            Add Action
          </Button>
        </div>

        {meetingData.actionItems.length > 0 ? (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Action</th>
                  <th className="p-2 text-left">Assigned To</th>
                  <th className="p-2 text-left">Due Date</th>
                  <th className="p-2 text-left">Priority</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetingData.actionItems.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">{item.assignedTo}</td>
                    <td className="p-2">{new Date(item.dueDate).toLocaleDateString()}</td>
                    <td className="p-2 capitalize">{item.priority}</td>
                    <td className="p-2">
                      <Button variant="ghost" size="sm" onClick={() => removeActionItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-4 border rounded-md text-muted-foreground">No action items added yet</div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button onClick={saveMeeting}>Save Meeting</Button>
      </div>

      {/* Add Action Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Action Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="action-title">Action Title</Label>
              <Input
                id="action-title"
                value={newAction.title}
                onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                placeholder="Enter action title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assigned-to">Assigned To</Label>
              <Select
                value={newAction.assignedTo}
                onValueChange={(value) => setNewAction({ ...newAction, assignedTo: value })}
              >
                <SelectTrigger id="assigned-to">
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member.id} value={member.name}>
                      {member.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Vikram Kumar">Self (Vikram Kumar)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newAction.priority}
                  onValueChange={(value) => setNewAction({ ...newAction, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="completion-criteria">Completion Criteria</Label>
              <Textarea
                id="completion-criteria"
                value={newAction.completionCriteria}
                onChange={(e) => setNewAction({ ...newAction, completionCriteria: e.target.value })}
                placeholder="What defines this task as complete?"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowActionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={addActionItem}>Add Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
