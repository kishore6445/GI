"use client"

import React, { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CFTGPISection } from "@/components/cft/cft-gpi-section"
import { PPISection } from "@/components/one-on-one/ppi-section"
import { CFTIssueLogReview } from "@/components/cft/cft-issue-log-review"
import { CFTActionReview } from "@/components/cft/cft-action-review"
import { CFTFPISection } from "@/components/cft/cft-fpi-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronDown, PlusCircle, Trash2, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Meeting {
  id: string
  type: string
  date: string
  manager: string
  participants: string[]
  notes: string
  decisions: string[]
  actionItems: ActionItem[]
}

interface ActionItem {
  id: string
  title: string
  assignedTo: string
  dueDate: string
  priority: "High" | "Medium" | "Low"
  status: "Not Started" | "In Progress" | "Completed"
  completionCriteria: string
}

export default function CFTReviewPage() {
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null)
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false)
  const [justCreatedMeeting, setJustCreatedMeeting] = useState<Meeting | null>(null)
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "meeting-1",
      type: "Weekly Review",
      date: "2025-05-05T10:00:00",
      manager: "John Doe",
      participants: ["Sarah Kim", "Alex Chen", "Maria Garcia"],
      notes:
        "Discussed Q2 performance metrics and identified areas for improvement. Team raised concerns about the new CRM implementation timeline.",
      decisions: [
        "Adjust Q2 targets for customer satisfaction based on recent feedback",
        "Allocate additional resources to the CRM implementation team",
        "Schedule a dedicated technical review for the new product features",
      ],
      actionItems: [
        {
          id: "action-1",
          title: "Update Q2 performance targets in the system",
          assignedTo: "John Doe",
          dueDate: "2025-05-10",
          priority: "High",
          status: "In Progress",
          completionCriteria: "Targets updated in the system",
        },
        {
          id: "action-2",
          title: "Prepare CRM implementation revised timeline",
          assignedTo: "Maria Garcia",
          dueDate: "2025-05-12",
          priority: "High",
          status: "Not Started",
          completionCriteria: "Timeline document drafted",
        },
        {
          id: "action-3",
          title: "Schedule technical review meeting",
          assignedTo: "Alex Chen",
          dueDate: "2025-05-15",
          priority: "Medium",
          status: "Not Started",
          completionCriteria: "Meeting invite sent",
        },
      ],
    },
    {
      id: "meeting-2",
      type: "Monthly Review",
      date: "2025-04-28T14:00:00",
      manager: "John Doe",
      participants: ["Sarah Kim", "Alex Chen", "Maria Garcia", "Robert Johnson"],
      notes:
        "End of month review for April. Reviewed all KPIs and discussed plans for May. Product team presented the roadmap for Q2.",
      decisions: [
        "Approve the product roadmap for Q2",
        "Increase marketing budget for the new product launch",
        "Implement weekly check-ins for the critical projects",
      ],
      actionItems: [
        {
          id: "action-4",
          title: "Finalize Q2 product roadmap document",
          assignedTo: "Alex Chen",
          dueDate: "2025-05-05",
          priority: "High",
          status: "Completed",
          completionCriteria: "Document finalized and approved",
        },
        {
          id: "action-5",
          title: "Revise marketing budget allocation",
          assignedTo: "Sarah Kim",
          dueDate: "2025-05-07",
          priority: "Medium",
          status: "In Progress",
          completionCriteria: "Budget allocation revised",
        },
        {
          id: "action-6",
          title: "Set up weekly check-in calendar invites",
          assignedTo: "John Doe",
          dueDate: "2025-05-03",
          priority: "Low",
          status: "Completed",
          completionCriteria: "Calendar invites sent",
        },
      ],
    },
    {
      id: "meeting-3",
      type: "Daily Huddle",
      date: "2025-05-07T09:00:00",
      manager: "John Doe",
      participants: ["Sarah Kim", "Alex Chen", "Maria Garcia"],
      notes: "Quick sync on daily priorities and blockers. Discussed the server outage incident from yesterday.",
      decisions: ["Prioritize server stability fixes", "Postpone the feature release scheduled for today"],
      actionItems: [
        {
          id: "action-7",
          title: "Investigate root cause of server outage",
          assignedTo: "Alex Chen",
          dueDate: "2025-05-08",
          priority: "High",
          status: "In Progress",
          completionCriteria: "Root cause identified",
        },
        {
          id: "action-8",
          title: "Communicate feature release delay to stakeholders",
          assignedTo: "Sarah Kim",
          dueDate: "2025-05-07",
          priority: "Medium",
          status: "Not Started",
          completionCriteria: "Stakeholders notified",
        },
      ],
    },
  ])

  // Find the selected meeting
  const selectedMeeting = meetings.find((meeting) => meeting.id === selectedMeetingId)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Daily Huddle":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Weekly Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Monthly Review":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
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

  const handleSelectMeeting = (meetingId: string) => {
    setSelectedMeetingId(meetingId)
    setIsCreatingMeeting(false)
  }

  const handleNewMeeting = () => {
    setIsCreatingMeeting(true)
    setSelectedMeetingId(null)
    setJustCreatedMeeting(null)
  }

  const handleBackToList = () => {
    setSelectedMeetingId(null)
    setIsCreatingMeeting(false)
    setJustCreatedMeeting(null)
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [modalPosition, setModalPosition] = useState({ x: 50, y: 50 })
  const [modalSize, setModalSize] = useState({ width: 500, height: 600 })

  // Update meeting in the meetings array
  const updateMeeting = (updatedMeeting: Meeting) => {
    setMeetings((prev) => prev.map((meeting) => (meeting.id === updatedMeeting.id ? updatedMeeting : meeting)))
  }

  // If no meeting is selected and not creating a new meeting, show only the meeting list
  if (!selectedMeetingId && !isCreatingMeeting) {
    return (
      <div className="flex flex-col h-screen">
        <DashboardHeader
          heading="Cross-Functional Team Review"
          text="Review and manage cross-functional team activities and performance"
        />

        <div className="flex-1 overflow-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-brand-primary">Meeting Log</h2>
            <Button variant="brand" className="gap-1" onClick={handleNewMeeting}>
              <PlusCircle className="h-4 w-4" />
              New Meeting
            </Button>
          </div>

          <div className="space-y-4">
            {meetings.map((meeting) => (
              <Card key={meeting.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between p-4" onClick={() => handleSelectMeeting(meeting.id)}>
                  <div className="flex items-center gap-4">
                    <Badge className={getTypeColor(meeting.type)}>{meeting.type}</Badge>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(meeting.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{meeting.manager}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{meeting.actionItems.length} Actions</Badge>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // If creating a new meeting, show only the meeting form (no split screen)
  if (isCreatingMeeting) {
    return (
      <div className="flex flex-col h-screen">
        <DashboardHeader
          heading="Cross-Functional Team Review"
          text="Review and manage cross-functional team activities and performance"
        />

        <div className="flex-1 overflow-auto p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-brand-primary">New Meeting</h2>
              <Button variant="outline" size="sm" onClick={handleBackToList}>
                Back to Meeting List
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <NewMeetingForm
                  onComplete={(newMeeting) => {
                    // Add the new meeting to the meetings array
                    setMeetings((prev) => [newMeeting, ...prev])
                    setIsCreatingMeeting(false)
                    setJustCreatedMeeting(newMeeting)
                    setSelectedMeetingId(newMeeting.id)
                  }}
                  onCancel={handleBackToList}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // If a meeting is selected or just created, show the split screen
  if (selectedMeetingId || justCreatedMeeting) {
    const currentMeeting = justCreatedMeeting || selectedMeeting

    // Full-width Performance Tabs
    return (
      <div className="flex flex-col h-screen">
        <DashboardHeader
          heading="Cross-Functional Team Review"
          text="Review and manage cross-functional team activities and performance"
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold text-brand-primary">Performance Indicators</h2>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
              Meeting Log
            </Button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs defaultValue="fpi" className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="flex justify-between px-4 pt-2">
                <TabsTrigger value="fpi" className="flex-1">
                  FPI
                </TabsTrigger>
                <TabsTrigger value="ppi" className="flex-1">
                  PPI
                </TabsTrigger>
                <TabsTrigger value="gpi" className="flex-1">
                  GPI
                </TabsTrigger>
                <TabsTrigger value="issues" className="flex-1">
                  Issues
                </TabsTrigger>
                <TabsTrigger value="actions" className="flex-1">
                  Actions
                </TabsTrigger>
              </TabsList>
              <div className="flex-1 overflow-hidden">
                <TabsContent value="gpi" className="h-full overflow-auto p-4 m-0">
                  <CFTGPISection />
                </TabsContent>
                <TabsContent value="fpi" className="h-full overflow-auto p-4 m-0">
                  <CFTFPISection />
                </TabsContent>
                <TabsContent value="ppi" className="h-full overflow-auto p-4 m-0">
                  <PPISection />
                </TabsContent>
                <TabsContent value="issues" className="h-full overflow-auto p-4 m-0">
                  <CFTIssueLogReview />
                </TabsContent>
                <TabsContent value="actions" className="h-full overflow-auto p-4 m-0">
                  <CFTActionReview />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>

        {/* Draggable Meeting Log Modal */}
        {modalOpen && (
          <DraggableMeetingModal
            meetings={meetings}
            onClose={() => setModalOpen(false)}
            position={modalPosition}
            onPositionChange={setModalPosition}
            size={modalSize}
            onSizeChange={setModalSize}
            onSelectMeeting={handleSelectMeeting}
            onNewMeeting={handleNewMeeting}
            selectedMeetingId={selectedMeetingId}
            currentMeeting={justCreatedMeeting || selectedMeeting}
            onUpdateMeeting={updateMeeting}
          />
        )}
      </div>
    )
  }

  return null
}

function NewMeetingForm({ onComplete, onCancel }: { onComplete?: (meeting: any) => void; onCancel?: () => void }) {
  const [meetingType, setMeetingType] = useState("")
  const [meetingDate, setMeetingDate] = useState(new Date().toISOString().slice(0, 16))
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])

  const teamMembers = [
    { id: "sarah", name: "Sarah Kim" },
    { id: "alex", name: "Alex Chen" },
    { id: "maria", name: "Maria Garcia" },
    { id: "robert", name: "Robert Johnson" },
    { id: "david", name: "David Wilson" },
    { id: "jennifer", name: "Jennifer Lee" },
    { id: "michael", name: "Michael Brown" },
  ]

  const toggleParticipant = (participantId: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(participantId) ? prev.filter((id) => id !== participantId) : [...prev, participantId],
    )
  }

  const handleSave = () => {
    // Create the new meeting object
    const newMeeting = {
      id: `meeting-${Date.now()}`,
      type: meetingType,
      date: meetingDate,
      manager: "John Doe", // Current user
      participants: selectedParticipants.map((id) => teamMembers.find((m) => m.id === id)?.name || ""),
      notes: "", // Empty initially
      decisions: [], // Empty initially
      actionItems: [],
    }

    if (onComplete) {
      onComplete(newMeeting)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="meeting-type" className="text-sm font-medium">
            Meeting Type *
          </label>
          <select
            id="meeting-type"
            className="w-full p-2 border rounded-md"
            value={meetingType}
            onChange={(e) => setMeetingType(e.target.value)}
          >
            <option value="" disabled>
              Select meeting type
            </option>
            <option value="Daily Huddle">Daily Huddle</option>
            <option value="Weekly Review">Weekly Review</option>
            <option value="Monthly Review">Monthly Review</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="meeting-date" className="text-sm font-medium">
            Meeting Date & Time *
          </label>
          <input
            type="datetime-local"
            id="meeting-date"
            className="w-full p-2 border rounded-md"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="manager-name" className="text-sm font-medium">
            Manager Name *
          </label>
          <input
            type="text"
            id="manager-name"
            className="w-full p-2 border rounded-md"
            defaultValue="John Doe"
            disabled
          />
          <p className="text-xs text-muted-foreground">Auto-filled with your name</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Participants *</label>
          <div className="border rounded-md p-3 max-h-32 overflow-y-auto">
            <div className="grid grid-cols-2 gap-2">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`participant-${member.id}`}
                    checked={selectedParticipants.includes(member.id)}
                    onChange={() => toggleParticipant(member.id)}
                    className="rounded"
                  />
                  <label htmlFor={`participant-${member.id}`} className="text-sm">
                    {member.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="brand" onClick={handleSave}>
          Create Meeting
        </Button>
      </div>
    </div>
  )
}

function ActionItemsManagement({
  meeting,
  onUpdateMeeting,
}: {
  meeting: Meeting
  onUpdateMeeting: (meeting: Meeting) => void
}) {
  const [actionItems, setActionItems] = useState(meeting.actionItems || [])
  const [decisions, setDecisions] = useState(meeting.decisions.length > 0 ? meeting.decisions : [""])
  const [notes, setNotes] = useState(meeting.notes || "")
  const [newActionItem, setNewActionItem] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
    completionCriteria: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const teamMembers = [
    { id: "sarah", name: "Sarah Kim" },
    { id: "alex", name: "Alex Chen" },
    { id: "maria", name: "Maria Garcia" },
    { id: "robert", name: "Robert Johnson" },
    { id: "david", name: "David Wilson" },
    { id: "jennifer", name: "Jennifer Lee" },
    { id: "michael", name: "Michael Brown" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getStatusColor = (status: string) => {
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

  const addActionItem = () => {
    if (newActionItem.title.trim() === "") return

    const actionItem = {
      id: `action-${Date.now()}`,
      title: newActionItem.title,
      assignedTo:
        newActionItem.assignedTo === "self"
          ? "John Doe"
          : teamMembers.find((m) => m.id === newActionItem.assignedTo)?.name || "",
      dueDate: newActionItem.dueDate,
      priority: newActionItem.priority as "High" | "Medium" | "Low",
      status: "Not Started" as "Not Started" | "In Progress" | "Completed",
      completionCriteria: newActionItem.completionCriteria,
    }

    const updatedActionItems = [...actionItems, actionItem]
    setActionItems(updatedActionItems)

    // Update the meeting
    const updatedMeeting = {
      ...meeting,
      actionItems: updatedActionItems,
      notes,
      decisions: decisions.filter((d) => d.trim() !== ""),
    }
    onUpdateMeeting(updatedMeeting)

    setNewActionItem({
      title: "",
      assignedTo: "",
      dueDate: "",
      priority: "Medium",
      completionCriteria: "",
    })
    setShowAddForm(false)
  }

  const updateActionStatus = (actionId: string, newStatus: "Not Started" | "In Progress" | "Completed") => {
    const updatedActionItems = actionItems.map((action) =>
      action.id === actionId ? { ...action, status: newStatus } : action,
    )
    setActionItems(updatedActionItems)

    // Update the meeting
    const updatedMeeting = {
      ...meeting,
      actionItems: updatedActionItems,
      notes,
      decisions: decisions.filter((d) => d.trim() !== ""),
    }
    onUpdateMeeting(updatedMeeting)
  }

  const removeActionItem = (actionId: string) => {
    const updatedActionItems = actionItems.filter((action) => action.id !== actionId)
    setActionItems(updatedActionItems)

    // Update the meeting
    const updatedMeeting = {
      ...meeting,
      actionItems: updatedActionItems,
      notes,
      decisions: decisions.filter((d) => d.trim() !== ""),
    }
    onUpdateMeeting(updatedMeeting)
  }

  const addDecision = () => {
    setDecisions([...decisions, ""])
  }

  const updateDecision = (index: number, value: string) => {
    const updatedDecisions = [...decisions]
    updatedDecisions[index] = value
    setDecisions(updatedDecisions)

    // Update the meeting
    const updatedMeeting = {
      ...meeting,
      actionItems,
      notes,
      decisions: updatedDecisions.filter((d) => d.trim() !== ""),
    }
    onUpdateMeeting(updatedMeeting)
  }

  const removeDecision = (index: number) => {
    if (decisions.length > 1) {
      const updatedDecisions = [...decisions]
      updatedDecisions.splice(index, 1)
      setDecisions(updatedDecisions)

      // Update the meeting
      const updatedMeeting = {
        ...meeting,
        actionItems,
        notes,
        decisions: updatedDecisions.filter((d) => d.trim() !== ""),
      }
      onUpdateMeeting(updatedMeeting)
    }
  }

  const updateNotes = (newNotes: string) => {
    setNotes(newNotes)

    // Update the meeting
    const updatedMeeting = {
      ...meeting,
      actionItems,
      notes: newNotes,
      decisions: decisions.filter((d) => d.trim() !== ""),
    }
    onUpdateMeeting(updatedMeeting)
  }

  return (
    <div className="space-y-4">
      {/* Meeting Information */}
      <div className="bg-muted/20 p-3 rounded-md">
        <div className="flex items-center gap-2 mb-1">
          <Badge className="bg-blue-100 text-blue-800">{meeting.type}</Badge>
          <span className="text-sm">{new Date(meeting.date).toLocaleDateString()}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {meeting.manager} | {meeting.participants.join(", ")}
        </div>
      </div>

      {/* Meeting Notes */}
      <div>
        <h4 className="font-medium text-sm mb-2">Meeting Notes</h4>
        <textarea
          className="w-full p-2 border rounded-md text-sm"
          rows={3}
          placeholder="Enter meeting notes..."
          value={notes}
          onChange={(e) => updateNotes(e.target.value)}
        />
      </div>

      {/* Decisions */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm">Decisions</h4>
          <Button size="sm" variant="outline" className="gap-1 h-7 text-xs" onClick={addDecision}>
            <PlusCircle className="h-3 w-3" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {decisions.map((decision, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={decision}
                onChange={(e) => updateDecision(index, e.target.value)}
                className="flex-1 p-2 border rounded-md text-sm"
                placeholder="Enter decision..."
              />
              {decisions.length > 1 && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                  onClick={() => removeDecision(index)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Action Items */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-sm">Action Items ({actionItems.length})</h4>
          <Button
            size="sm"
            variant="outline"
            className="gap-1 h-7 text-xs"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <PlusCircle className="h-3 w-3" />
            {showAddForm ? "Cancel" : "Add Action"}
          </Button>
        </div>

        {/* Add New Action Item Form */}
        {showAddForm && (
          <div className="border rounded-md p-3 bg-muted/10 mb-3">
            <div className="space-y-2">
              <input
                type="text"
                value={newActionItem.title}
                onChange={(e) => setNewActionItem((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="Action item title..."
              />
              <div className="grid gap-2 grid-cols-3">
                <select
                  value={newActionItem.assignedTo}
                  onChange={(e) => setNewActionItem((prev) => ({ ...prev, assignedTo: e.target.value }))}
                  className="p-2 border rounded-md text-sm"
                >
                  <option value="" disabled>
                    Assign to...
                  </option>
                  <option value="self">Self (John Doe)</option>
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newActionItem.dueDate}
                  onChange={(e) => setNewActionItem((prev) => ({ ...prev, dueDate: e.target.value }))}
                  className="p-2 border rounded-md text-sm"
                />
                <select
                  value={newActionItem.priority}
                  onChange={(e) => setNewActionItem((prev) => ({ ...prev, priority: e.target.value }))}
                  className="p-2 border rounded-md text-sm"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <textarea
                value={newActionItem.completionCriteria}
                onChange={(e) => setNewActionItem((prev) => ({ ...prev, completionCriteria: e.target.value }))}
                className="w-full p-2 border rounded-md text-sm"
                placeholder="Completion criteria (optional)..."
                rows={2}
              />
              <div className="flex justify-end">
                <Button size="sm" variant="brand" onClick={addActionItem}>
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Action Items */}
        <div className="space-y-2">
          {actionItems.map((action) => (
            <div key={action.id} className="border rounded-md p-3 bg-background">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{action.title}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {action.assignedTo} | {new Date(action.dueDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-1 ml-2">
                  <Badge className={`${getPriorityColor(action.priority)} text-xs`}>{action.priority}</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <select
                  value={action.status}
                  onChange={(e) => updateActionStatus(action.id, e.target.value as any)}
                  className="text-xs p-1 border rounded flex-1 mr-2"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500 hover:text-red-700 h-7 w-7"
                  onClick={() => removeActionItem(action.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {actionItems.length === 0 && (
          <div className="text-center py-4 text-muted-foreground text-sm">
            No action items yet. Add one above to get started.
          </div>
        )}
      </div>
    </div>
  )
}

function DraggableMeetingModal({
  meetings,
  onClose,
  position,
  onPositionChange,
  size,
  onSizeChange,
  onSelectMeeting,
  onNewMeeting,
  selectedMeetingId,
  currentMeeting,
  onUpdateMeeting,
}: {
  meetings: Meeting[]
  onClose: () => void
  position: { x: number; y: number }
  onPositionChange: (pos: { x: number; y: number }) => void
  size: { width: number; height: number }
  onSizeChange: (size: { width: number; height: number }) => void
  onSelectMeeting: (id: string) => void
  onNewMeeting: () => void
  selectedMeetingId: string | null
  currentMeeting: Meeting | null
  onUpdateMeeting: (meeting: Meeting) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsResizing(true)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      onPositionChange({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x
      const deltaY = e.clientY - resizeStart.y
      onSizeChange({
        width: Math.max(400, resizeStart.width + deltaX),
        height: Math.max(300, resizeStart.height + deltaY),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, resizeStart])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Daily Huddle":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Weekly Review":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Monthly Review":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div
      className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-50 overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div
        className="flex items-center justify-between p-3 border-b bg-gray-50 cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <h3 className="font-semibold">Meeting Log</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onNewMeeting}>
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </div>
      </div>

      <div className="p-3 overflow-y-auto" style={{ height: `${size.height - 60}px` }}>
        <div className="space-y-2">
          {meetings.map((meeting) => (
            <Card
              key={meeting.id}
              className={`cursor-pointer transition-all hover:shadow-md p-2 ${
                selectedMeetingId === meeting.id ? "ring-2 ring-brand-primary bg-brand-primary/5" : ""
              }`}
              onClick={() => onSelectMeeting(meeting.id)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className={getTypeColor(meeting.type)} variant="secondary">
                    {meeting.type}
                  </Badge>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(meeting.date)}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <User className="h-3 w-3" />
                    {meeting.manager}
                  </div>
                </div>
                <div className="text-xs text-gray-500">{meeting.actionItems.length} action items</div>
              </div>
            </Card>
          ))}
        </div>

        {currentMeeting && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium text-sm mb-2">Selected Meeting</h4>
            <ActionItemsManagement meeting={currentMeeting} onUpdateMeeting={onUpdateMeeting} />
          </div>
        )}
      </div>

      {/* Resize handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400"
        onMouseDown={handleResizeMouseDown}
        style={{
          background:
            "linear-gradient(-45deg, transparent 30%, #666 30%, #666 40%, transparent 40%, transparent 60%, #666 60%, #666 70%, transparent 70%)",
        }}
      />
    </div>
  )
}
