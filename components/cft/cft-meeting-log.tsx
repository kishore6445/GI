"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, Calendar, User, ChevronDown, ChevronUp, Edit, Eye, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
}

export function CFTMeetingLog() {
  const [showNewMeetingForm, setShowNewMeetingForm] = useState(false)
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
        },
        {
          id: "action-2",
          title: "Prepare CRM implementation revised timeline",
          assignedTo: "Maria Garcia",
          dueDate: "2025-05-12",
          priority: "High",
          status: "Not Started",
        },
        {
          id: "action-3",
          title: "Schedule technical review meeting",
          assignedTo: "Alex Chen",
          dueDate: "2025-05-15",
          priority: "Medium",
          status: "Not Started",
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
        },
        {
          id: "action-5",
          title: "Revise marketing budget allocation",
          assignedTo: "Sarah Kim",
          dueDate: "2025-05-07",
          priority: "Medium",
          status: "In Progress",
        },
        {
          id: "action-6",
          title: "Set up weekly check-in calendar invites",
          assignedTo: "John Doe",
          dueDate: "2025-05-03",
          priority: "Low",
          status: "Completed",
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
        },
        {
          id: "action-8",
          title: "Communicate feature release delay to stakeholders",
          assignedTo: "Sarah Kim",
          dueDate: "2025-05-07",
          priority: "Medium",
          status: "Not Started",
        },
      ],
    },
  ])

  const [expandedMeetings, setExpandedMeetings] = useState<string[]>([])
  const [editingMeetingId, setEditingMeetingId] = useState<string | null>(null)

  const toggleMeetingExpand = (meetingId: string) => {
    setExpandedMeetings((prev) =>
      prev.includes(meetingId) ? prev.filter((id) => id !== meetingId) : [...prev, meetingId],
    )
  }

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

  const handleEditMeeting = (meetingId: string) => {
    setEditingMeetingId(meetingId)

    // Find the meeting tab and click it first (if not already active)
    const meetingLogTab =
      document.querySelector('[data-state="active"][value="meeting-log"]') ||
      document.querySelector('[value="meeting-log"]')
    if (meetingLogTab) {
      ;(meetingLogTab as HTMLElement).click()
    }

    // Then find the "new" tab within the meeting log and click it
    setTimeout(() => {
      const newMeetingTab = document.querySelector('[value="new"]')
      if (newMeetingTab) {
        ;(newMeetingTab as HTMLElement).click()
      }
    }, 100)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brand-primary">Meeting Log</h2>

      <Tabs defaultValue="meetings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="meetings">Previous Meetings</TabsTrigger>
          <TabsTrigger value="new">New Meeting</TabsTrigger>
        </TabsList>

        <TabsContent value="meetings" className="space-y-4">
          {meetings.length > 0 ? (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <Card key={meeting.id} className="overflow-hidden">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleMeetingExpand(meeting.id)}
                  >
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
                      {expandedMeetings.includes(meeting.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>

                  {expandedMeetings.includes(meeting.id) && (
                    <CardContent className="border-t">
                      <div className="grid gap-4 py-2">
                        <div>
                          <h3 className="font-medium mb-2">Participants</h3>
                          <div className="flex flex-wrap gap-2">
                            {meeting.participants.map((participant, index) => (
                              <Badge key={index} variant="secondary">
                                <User className="h-3 w-3 mr-1" />
                                {participant}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Meeting Notes</h3>
                          <p className="text-sm text-muted-foreground">{meeting.notes}</p>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Decisions</h3>
                          <ul className="list-disc list-inside text-sm text-muted-foreground">
                            {meeting.decisions.map((decision, index) => (
                              <li key={index}>{decision}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Action Items</h3>
                          <div className="space-y-2">
                            {meeting.actionItems.map((action) => (
                              <div key={action.id} className="border rounded-md p-3 bg-muted/20">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="font-medium">{action.title}</div>
                                    <div className="text-sm text-muted-foreground">
                                      Assigned to: {action.assignedTo}
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Badge variant="outline" className={getPriorityColor(action.priority)}>
                                      {action.priority}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(action.status)}>
                                      {action.status}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="text-sm mt-2">Due: {new Date(action.dueDate).toLocaleDateString()}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditMeeting(meeting.id)
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="hidden md:inline">Edit</span>
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <p className="text-muted-foreground mb-4">No meetings have been recorded yet.</p>
                <Button variant="brand" className="gap-1" onClick={() => setShowNewMeetingForm(true)}>
                  <PlusCircle className="h-4 w-4" />
                  Create Your First Meeting
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="new">
          <NewMeetingForm editingMeetingId={editingMeetingId} meetings={meetings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NewMeetingForm({
  editingMeetingId = null,
  meetings = [],
}: { editingMeetingId?: string | null; meetings?: Meeting[] }) {
  // Find the meeting being edited (if any)
  const meetingToEdit = editingMeetingId ? meetings.find((m) => m.id === editingMeetingId) : null

  const [meetingType, setMeetingType] = useState(meetingToEdit?.type || "")
  const [meetingDate, setMeetingDate] = useState(meetingToEdit?.date || new Date().toISOString().slice(0, 16))
  const [meetingNotes, setMeetingNotes] = useState(meetingToEdit?.notes || "")

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    meetingToEdit?.participants.map((p) => teamMembers.find((tm) => tm.name === p)?.id).filter(Boolean) || [],
  )

  const [decisions, setDecisions] = useState<string[]>(meetingToEdit?.decisions.length ? meetingToEdit.decisions : [""])

  const [actionItems, setActionItems] = useState<
    {
      title: string
      assignedTo: string
      dueDate: string
      priority: string
      completionCriteria: string
    }[]
  >(
    meetingToEdit?.actionItems.length
      ? meetingToEdit.actionItems.map((item) => ({
          title: item.title || "",
          assignedTo: item.assignedTo || "",
          dueDate: item.dueDate || "",
          priority: item.priority || "Medium",
          completionCriteria: "",
        }))
      : [
          {
            title: "",
            assignedTo: "",
            dueDate: "",
            priority: "Medium",
            completionCriteria: "",
          },
        ],
  )

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

  const addDecision = () => {
    setDecisions([...decisions, ""])
  }

  const updateDecision = (index: number, value: string) => {
    const updatedDecisions = [...decisions]
    updatedDecisions[index] = value
    setDecisions(updatedDecisions)
  }

  const removeDecision = (index: number) => {
    if (decisions.length > 1) {
      const updatedDecisions = [...decisions]
      updatedDecisions.splice(index, 1)
      setDecisions(updatedDecisions)
    }
  }

  const addActionItem = () => {
    setActionItems([
      ...actionItems,
      {
        title: "",
        assignedTo: "",
        dueDate: "",
        priority: "Medium",
        completionCriteria: "",
      },
    ])
  }

  const updateActionItem = (index: number, field: string, value: string) => {
    const updatedActionItems = [...actionItems]
    updatedActionItems[index] = {
      ...updatedActionItems[index],
      [field]: value,
    }
    setActionItems(updatedActionItems)
  }

  const removeActionItem = (index: number) => {
    if (actionItems.length > 1) {
      const updatedActionItems = [...actionItems]
      updatedActionItems.splice(index, 1)
      setActionItems(updatedActionItems)
    }
  }

  return (
    <Card>
      <CardHeader className="border-b border-brand-primary/10">
        <CardTitle className="text-brand-primary">New Meeting</CardTitle>
        <CardDescription>Record details of a Cross-Functional Team meeting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
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

        <div className="space-y-2">
          <label htmlFor="meeting-notes" className="text-sm font-medium">
            Meeting Notes / Discussion Summary *
          </label>
          <textarea
            id="meeting-notes"
            className="w-full p-2 border rounded-md min-h-[100px]"
            placeholder="Enter meeting notes and discussion points..."
            value={meetingNotes}
            onChange={(e) => setMeetingNotes(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Decisions Taken *</label>
            <Button size="sm" variant="outline" className="gap-1" onClick={addDecision}>
              <PlusCircle className="h-3 w-3" />
              Add Decision
            </Button>
          </div>
          <div className="space-y-2">
            {decisions.map((decision, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={decision}
                  onChange={(e) => updateDecision(index, e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Enter decision..."
                />
                {decisions.length > 1 && (
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 text-red-500 hover:text-red-700"
                    onClick={() => removeDecision(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">New Action Items</label>
            <Button size="sm" variant="outline" className="gap-1" onClick={addActionItem}>
              <PlusCircle className="h-3 w-3" />
              Add Action Item
            </Button>
          </div>

          {actionItems.map((item, index) => (
            <div key={index} className="border rounded-md p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Action Item #{index + 1}</h4>
                {actionItems.length > 1 && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeActionItem(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor={`action-title-${index}`} className="text-sm font-medium">
                    Action Title *
                  </label>
                  <input
                    type="text"
                    id={`action-title-${index}`}
                    value={item.title}
                    onChange={(e) => updateActionItem(index, "title", e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter action title"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor={`assigned-to-${index}`} className="text-sm font-medium">
                    Assigned To *
                  </label>
                  <select
                    id={`assigned-to-${index}`}
                    value={item.assignedTo}
                    onChange={(e) => updateActionItem(index, "assignedTo", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="" disabled>
                      Select assignee
                    </option>
                    <option value="self">Self (John Doe)</option>
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor={`due-date-${index}`} className="text-sm font-medium">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    id={`due-date-${index}`}
                    value={item.dueDate}
                    onChange={(e) => updateActionItem(index, "dueDate", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor={`priority-${index}`} className="text-sm font-medium">
                    Priority
                  </label>
                  <select
                    id={`priority-${index}`}
                    value={item.priority}
                    onChange={(e) => updateActionItem(index, "priority", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`completion-criteria-${index}`} className="text-sm font-medium">
                  Completion Criteria
                </label>
                <textarea
                  id={`completion-criteria-${index}`}
                  value={item.completionCriteria}
                  onChange={(e) => updateActionItem(index, "completionCriteria", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="What defines this task as complete?"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <div className="flex justify-end gap-2 p-6 border-t">
        <Button variant="outline">Cancel</Button>
        <Button variant="brand">{editingMeetingId ? "Update Meeting" : "Save Meeting"}</Button>
      </div>
    </Card>
  )
}
