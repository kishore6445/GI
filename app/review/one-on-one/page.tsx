"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { CFTFPISection } from "@/components/cft/cft-fpi-section"
import { GPISection } from "@/components/one-on-one/gpi-section"
import { IssueLogSection } from "@/components/one-on-one/issue-log-section"
import { ActionReviewSection } from "@/components/one-on-one/action-review-section"
import { PPISection } from "@/components/one-on-one/ppi-section"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlusCircle,
  Calendar,
  ChevronLeft,
  X,
  MoreHorizontal,
  Clock,
  User,
  FileText,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export default function OneOnOnePage() {
  // State for view management
  const [view, setView] = useState("meetings") // "meetings", "meeting-details", "new-meeting"
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [activeTab, setActiveTab] = useState("fpi")
  const [showAddActionForm, setShowAddActionForm] = useState(false)
  const [showAddDecisionForm, setShowAddDecisionForm] = useState(false)

  // State for new meeting form
  const [newMeeting, setNewMeeting] = useState({
    type: "weekly",
    date: new Date().toISOString().slice(0, 16),
    manager: "Vikram Kumar",
    member: "",
  })

  // State for new action item
  const [newAction, setNewAction] = useState({
    title: "",
    assignedTo: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    priority: "medium",
    completionCriteria: "",
  })

  // State for new decision
  const [newDecision, setNewDecision] = useState("")

  // Sample meetings data with enhanced structure
  const [meetings, setMeetings] = useState([
    {
      id: "meeting-1",
      type: "Weekly Review",
      date: "2025-01-15T10:00",
      manager: "Vikram Kumar",
      member: "Ananya Sharma",
      memberAvatar: "/placeholder.svg?height=32&width=32&text=AS",
      status: "completed",
      duration: "45 min",
      notes:
        "Discussed progress on the mobile app project. Ananya has completed the UI design for the login screen and is moving forward with the dashboard components.",
      decisions: ["Proceed with the current design direction", "Schedule a review with the product team next week"],
      actionItems: [
        {
          id: "action-1",
          title: "Complete dashboard UI design",
          assignedTo: "Ananya Sharma",
          dueDate: "2025-01-20",
          priority: "high",
          status: "In Progress",
          completionCriteria: "All dashboard screens designed and uploaded to Figma",
        },
        {
          id: "action-2",
          title: "Review API documentation",
          assignedTo: "Vikram Kumar",
          dueDate: "2025-01-18",
          priority: "medium",
          status: "Not Started",
          completionCriteria: "Provide feedback on API endpoints and data structure",
        },
      ],
    },
    {
      id: "meeting-2",
      type: "Monthly Review",
      date: "2024-12-30T14:00",
      manager: "Vikram Kumar",
      member: "Rahul Patel",
      memberAvatar: "/placeholder.svg?height=32&width=32&text=RP",
      status: "completed",
      duration: "60 min",
      notes:
        "Reviewed monthly performance metrics. Rahul exceeded targets in customer satisfaction and delivered all sprint commitments on time.",
      decisions: ["Increase focus on API performance optimization", "Schedule training for new team members"],
      actionItems: [
        {
          id: "action-3",
          title: "Optimize database queries",
          assignedTo: "Rahul Patel",
          dueDate: "2025-01-10",
          priority: "high",
          status: "Completed",
          completionCriteria: "Reduce query execution time by 30%",
        },
      ],
    },
    {
      id: "meeting-3",
      type: "Weekly Review",
      date: "2025-01-08T11:00",
      manager: "Vikram Kumar",
      member: "Priya Singh",
      memberAvatar: "/placeholder.svg?height=32&width=32&text=PS",
      status: "completed",
      duration: "30 min",
      notes:
        "Discussed customer feedback on the new feature release. Overall positive response with some minor UI improvement suggestions.",
      decisions: ["Implement suggested UI improvements", "Prepare for next feature release"],
      actionItems: [
        {
          id: "action-4",
          title: "Address customer feedback",
          assignedTo: "Priya Singh",
          dueDate: "2025-01-15",
          priority: "medium",
          status: "In Progress",
          completionCriteria: "Document and prioritize feedback items",
        },
        {
          id: "action-5",
          title: "Update release documentation",
          assignedTo: "Priya Singh",
          dueDate: "2025-01-12",
          priority: "low",
          status: "Not Started",
          completionCriteria: "Complete user guide and release notes",
        },
      ],
    },
  ])

  // Team members list
  const teamMembers = [
    { id: "ananya", name: "Ananya Sharma", avatar: "/placeholder.svg?height=32&width=32&text=AS" },
    { id: "rahul", name: "Rahul Patel", avatar: "/placeholder.svg?height=32&width=32&text=RP" },
    { id: "priya", name: "Priya Singh", avatar: "/placeholder.svg?height=32&width=32&text=PS" },
    { id: "deepak", name: "Deepak Verma", avatar: "/placeholder.svg?height=32&width=32&text=DV" },
    { id: "neha", name: "Neha Gupta", avatar: "/placeholder.svg?height=32&width=32&text=NG" },
    { id: "arjun", name: "Arjun Reddy", avatar: "/placeholder.svg?height=32&width=32&text=AR" },
  ]

  // Performance tabs with icons and descriptions
  const performanceTabs = [
    {
      id: "fpi",
      label: "Financial",
      icon: "💰",
      description: "Revenue & costs",
      color: "bg-emerald-50 text-emerald-700",
    },
    { id: "ppi", label: "Projects", icon: "📊", description: "Project status", color: "bg-blue-50 text-blue-700" },
    { id: "gpi", label: "Goals", icon: "🎯", description: "KPIs & objectives", color: "bg-amber-50 text-amber-700" },
    { id: "issues", label: "Issues", icon: "⚠️", description: "Open issues", color: "bg-red-50 text-red-700" },
    { id: "actions", label: "Actions", icon: "✅", description: "Follow-ups", color: "bg-purple-50 text-purple-700" },
  ]

  // Function to handle creating a new meeting
  const handleCreateMeeting = () => {
    if (!newMeeting.member || !newMeeting.date) {
      toast({
        title: "Missing required fields",
        description: "Please select a team member and meeting date.",
        variant: "destructive",
      })
      return
    }

    const selectedTeamMember = teamMembers.find((m) => m.name === newMeeting.member)
    const meeting = {
      id: `meeting-${Date.now()}`,
      type:
        newMeeting.type === "weekly"
          ? "Weekly Review"
          : newMeeting.type === "monthly"
            ? "Monthly Review"
            : "Daily Huddle",
      date: newMeeting.date,
      manager: newMeeting.manager,
      member: newMeeting.member,
      memberAvatar: selectedTeamMember?.avatar || "/placeholder.svg?height=32&width=32&text=??",
      status: "scheduled",
      duration: "45 min",
      notes: "",
      decisions: [],
      actionItems: [],
    }

    const updatedMeetings = [meeting, ...meetings]
    setMeetings(updatedMeetings)
    setSelectedMeeting(meeting)
    setView("meeting-details")
    setActiveTab("fpi")

    setNewMeeting({
      type: "weekly",
      date: new Date().toISOString().slice(0, 16),
      manager: "Vikram Kumar",
      member: "",
    })

    toast({
      title: "Meeting created",
      description: "The meeting has been successfully created.",
    })
  }

  // Function to add a decision
  const handleAddDecision = () => {
    if (!newDecision.trim()) return

    const updatedMeeting = {
      ...selectedMeeting,
      decisions: [...selectedMeeting.decisions, newDecision],
    }

    setMeetings(meetings.map((m) => (m.id === selectedMeeting.id ? updatedMeeting : m)))
    setSelectedMeeting(updatedMeeting)
    setNewDecision("")
    setShowAddDecisionForm(false)

    toast({
      title: "Decision added",
      description: "The decision has been added to the meeting.",
    })
  }

  // Function to remove a decision
  const handleRemoveDecision = (index) => {
    const updatedDecisions = [...selectedMeeting.decisions]
    updatedDecisions.splice(index, 1)

    const updatedMeeting = {
      ...selectedMeeting,
      decisions: updatedDecisions,
    }

    setMeetings(meetings.map((m) => (m.id === selectedMeeting.id ? updatedMeeting : m)))
    setSelectedMeeting(updatedMeeting)
  }

  // Function to add an action item
  const handleAddAction = () => {
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
      status: "Not Started",
    }

    const updatedMeeting = {
      ...selectedMeeting,
      actionItems: [...selectedMeeting.actionItems, actionToAdd],
    }

    setMeetings(meetings.map((m) => (m.id === selectedMeeting.id ? updatedMeeting : m)))
    setSelectedMeeting(updatedMeeting)

    setNewAction({
      title: "",
      assignedTo: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      priority: "medium",
      completionCriteria: "",
    })

    setShowAddActionForm(false)

    toast({
      title: "Action item added",
      description: "The action item has been added to the meeting.",
    })
  }

  // Function to update action item status
  const handleUpdateActionStatus = (actionId, newStatus) => {
    const updatedActionItems = selectedMeeting.actionItems.map((action) =>
      action.id === actionId ? { ...action, status: newStatus } : action,
    )

    const updatedMeeting = {
      ...selectedMeeting,
      actionItems: updatedActionItems,
    }

    setMeetings(meetings.map((m) => (m.id === selectedMeeting.id ? updatedMeeting : m)))
    setSelectedMeeting(updatedMeeting)

    toast({
      title: "Status updated",
      description: "The action item status has been updated.",
    })
  }

  // Function to remove an action item
  const handleRemoveAction = (actionId) => {
    const updatedActionItems = selectedMeeting.actionItems.filter((action) => action.id !== actionId)

    const updatedMeeting = {
      ...selectedMeeting,
      actionItems: updatedActionItems,
    }

    setMeetings(meetings.map((m) => (m.id === selectedMeeting.id ? updatedMeeting : m)))
    setSelectedMeeting(updatedMeeting)

    toast({
      title: "Action item removed",
      description: "The action item has been removed from the meeting.",
    })
  }

  // Function to update meeting notes
  const handleUpdateNotes = (notes) => {
    const updatedMeeting = {
      ...selectedMeeting,
      notes,
    }

    setMeetings(meetings.map((m) => (m.id === selectedMeeting.id ? updatedMeeting : m)))
    setSelectedMeeting(updatedMeeting)
  }

  // Helper functions
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const formatDateShort = (dateString) => {
    const options = { month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const getPriorityBadge = (priority) => {
    const variants = {
      high: "bg-red-100 text-red-800 border-red-200",
      medium: "bg-amber-100 text-amber-800 border-amber-200",
      low: "bg-green-100 text-green-800 border-green-200",
    }
    const icons = {
      high: <BookmarkCheck className="h-3 w-3 mr-1" />,
      medium: <Bookmark className="h-3 w-3 mr-1" />,
      low: <Bookmark className="h-3 w-3 mr-1" />,
    }
    return (
      <Badge className={`${variants[priority]} border flex items-center`}>
        {icons[priority]}
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status) => {
    const variants = {
      Completed: "bg-green-100 text-green-800 border-green-200",
      "In Progress": "bg-blue-100 text-blue-800 border-blue-200",
      "Not Started": "bg-gray-100 text-gray-800 border-gray-200",
    }
    const icons = {
      Completed: <CheckCircle2 className="h-3 w-3 mr-1" />,
      "In Progress": <Clock className="h-3 w-3 mr-1" />,
      "Not Started": <AlertCircle className="h-3 w-3 mr-1" />,
    }
    return (
      <Badge className={`${variants[status]} border flex items-center`}>
        {icons[status]}
        {status}
      </Badge>
    )
  }

  const getMeetingStatusBadge = (status) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    }
    const icons = {
      completed: <CheckCircle2 className="h-3 w-3 mr-1" />,
      scheduled: <Calendar className="h-3 w-3 mr-1" />,
      cancelled: <X className="h-3 w-3 mr-1" />,
    }
    return (
      <Badge className={`${variants[status]} border flex items-center`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getActiveTabColor = (tabId) => {
    const tab = performanceTabs.find((t) => t.id === tabId)
    return tab ? tab.color : ""
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <DashboardHeader
        heading="1-on-1 Review Meetings"
        text="Conduct and document one-on-one meetings with team members"
      />

      {/* Meetings List View */}
      {view === "meetings" && (
        <div className="flex-1 overflow-hidden w-full">
          <div className="h-full p-8 max-w-none">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Meeting History</h2>
                <p className="text-gray-600 mt-1">Review past meetings and create new ones</p>
              </div>
              <Button
                onClick={() => setView("new-meeting")}
                size="lg"
                className="gap-2 bg-brand-primary hover:bg-brand-primary/90"
              >
                <PlusCircle className="h-4 w-4" />
                New Meeting
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {meetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-brand-primary bg-white overflow-hidden"
                  onClick={() => {
                    setSelectedMeeting(meeting)
                    setView("meeting-details")
                  }}
                >
                  <div
                    className={`h-1 w-full ${meeting.status === "completed" ? "bg-green-500" : meeting.status === "scheduled" ? "bg-blue-500" : "bg-red-500"}`}
                  ></div>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        {getMeetingStatusBadge(meeting.status)}
                        <Badge variant="outline" className="text-xs border-gray-300">
                          {meeting.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {meeting.duration}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-brand-primary/20">
                        <AvatarImage src={meeting.memberAvatar || "/placeholder.svg"} alt={meeting.member} />
                        <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                          {meeting.member
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate text-brand-primary">{meeting.member}</CardTitle>
                        <CardDescription className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3" />
                          {formatDate(meeting.date)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {meeting.notes || "No meeting notes recorded yet."}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2 py-1 rounded-full">
                            <CheckCircle2 className="h-3 w-3" />
                            {meeting.actionItems.length} actions
                          </span>
                          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            <FileText className="h-3 w-3" />
                            {meeting.decisions.length} decisions
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {meetings.length === 0 && (
              <Card className="text-center p-12">
                <div className="text-gray-400 mb-4">
                  <Calendar className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
                <p className="text-gray-600 mb-4">Create your first 1-on-1 meeting to get started.</p>
                <Button onClick={() => setView("new-meeting")} className="bg-brand-primary hover:bg-brand-primary/90">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Meeting
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* New Meeting Form */}
      {view === "new-meeting" && (
        <div className="flex-1 overflow-auto bg-white w-full">
          <div className="p-8">
            <Button variant="ghost" className="mb-6 gap-2" onClick={() => setView("meetings")}>
              <ChevronLeft className="h-4 w-4" />
              Back to Meetings
            </Button>

            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Create New Meeting</h2>
                <p className="text-gray-600 mt-2">Schedule a new 1-on-1 meeting with your team member</p>
              </div>

              <Card className="border-brand-primary/20 shadow-lg">
                <div className="h-1 w-full bg-brand-primary"></div>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="meeting-type" className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-brand-primary" />
                        Meeting Type
                      </Label>
                      <Select
                        value={newMeeting.type}
                        onValueChange={(value) => setNewMeeting({ ...newMeeting, type: value })}
                      >
                        <SelectTrigger id="meeting-type" className="h-11 border-gray-300 focus:border-brand-primary">
                          <SelectValue placeholder="Select meeting type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily Huddle</SelectItem>
                          <SelectItem value="weekly">Weekly Review</SelectItem>
                          <SelectItem value="monthly">Monthly Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meeting-date" className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4 text-brand-primary" />
                        Meeting Date & Time
                      </Label>
                      <Input
                        id="meeting-date"
                        type="datetime-local"
                        className="h-11 border-gray-300 focus:border-brand-primary"
                        value={newMeeting.date}
                        onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="manager-name" className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-brand-primary" />
                        Manager Name
                      </Label>
                      <Input id="manager-name" className="h-11 bg-gray-50" value={newMeeting.manager} disabled />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="member-name" className="text-sm font-medium flex items-center gap-2">
                        <User className="h-4 w-4 text-brand-primary" />
                        Team Member
                      </Label>
                      <Select
                        value={newMeeting.member}
                        onValueChange={(value) => setNewMeeting({ ...newMeeting, member: value })}
                      >
                        <SelectTrigger id="member-name" className="h-11 border-gray-300 focus:border-brand-primary">
                          <SelectValue placeholder="Select team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.name}>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                                    {member.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                {member.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setView("meetings")} className="border-gray-300">
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateMeeting}
                      size="lg"
                      className="bg-brand-primary hover:bg-brand-primary/90"
                    >
                      Create Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Details View (Full Height Split Screen) */}
      {view === "meeting-details" && selectedMeeting && (
        <div className="flex-1 flex overflow-hidden bg-white w-full" style={{ height: "calc(100vh - 120px)" }}>
          {/* Left Panel - Meeting Details (35% width) */}
          <div className="w-[35%] flex flex-col border-r border-gray-200 bg-gray-50 min-w-[420px]">
            {/* Compact Header */}
            <div className="flex-shrink-0 p-4 bg-white border-b border-gray-200">
              <Button variant="ghost" className="mb-3 gap-2" onClick={() => setView("meetings")}>
                <ChevronLeft className="h-4 w-4" />
                Back to Meetings
              </Button>

              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border-2 border-brand-primary/20">
                  <AvatarImage src={selectedMeeting.memberAvatar || "/placeholder.svg"} alt={selectedMeeting.member} />
                  <AvatarFallback className="bg-brand-primary/10 text-brand-primary">
                    {selectedMeeting.member
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-brand-primary">{selectedMeeting.member}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-3 w-3" />
                      {formatDate(selectedMeeting.date)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="h-3 w-3" />
                      {selectedMeeting.duration}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {getMeetingStatusBadge(selectedMeeting.status)}
                    <Badge variant="outline" className="text-xs border-gray-300">
                      {selectedMeeting.type}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Meeting Notes */}
              <Card className="border-l-4 border-l-blue-500 shadow-sm">
                <CardHeader className="pb-2 bg-blue-50/50">
                  <CardTitle className="flex items-center gap-2 text-base text-blue-700">
                    <FileText className="h-4 w-4" />
                    Meeting Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-3">
                  <Textarea
                    placeholder="Enter meeting notes and discussion points..."
                    className="min-h-[80px] resize-none text-sm border-gray-300 focus:border-blue-500"
                    value={selectedMeeting.notes}
                    onChange={(e) => handleUpdateNotes(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Decisions */}
              <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardHeader className="pb-2 bg-green-50/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-base text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      Decisions ({selectedMeeting.decisions.length})
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowAddDecisionForm(true)}
                      className="border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <PlusCircle className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 pt-3">
                  {showAddDecisionForm && (
                    <div className="flex gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                      <Input
                        placeholder="Enter decision..."
                        value={newDecision}
                        onChange={(e) => setNewDecision(e.target.value)}
                        className="text-sm border-green-200 focus:border-green-500"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddDecision()
                          }
                        }}
                      />
                      <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleAddDecision}>
                        Add
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setShowAddDecisionForm(false)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  {selectedMeeting.decisions.length > 0 ? (
                    <div className="space-y-2">
                      {selectedMeeting.decisions.map((decision, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2 bg-white rounded-lg border border-gray-200 group hover:border-green-300 hover:bg-green-50/30 transition-colors"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span className="flex-1 text-sm">{decision}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleRemoveDecision(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 bg-gray-50/50 rounded-lg border border-dashed border-gray-300">
                      <CheckCircle2 className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No decisions recorded yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card className="border-l-4 border-l-purple-500 shadow-sm">
                <CardHeader className="pb-2 bg-purple-50/50">
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2 text-base text-purple-700">
                      <AlertCircle className="h-4 w-4" />
                      Action Items ({selectedMeeting.actionItems.length})
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowAddActionForm(true)}
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <PlusCircle className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  {showAddActionForm && (
                    <Card className="border-purple-200 bg-purple-50/50 shadow-sm">
                      <CardContent className="p-3 space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="action-title" className="text-sm font-medium text-purple-700">
                            Action Title
                          </Label>
                          <Input
                            id="action-title"
                            value={newAction.title}
                            onChange={(e) => setNewAction({ ...newAction, title: e.target.value })}
                            placeholder="Enter action title"
                            className="text-sm border-purple-200 focus:border-purple-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label htmlFor="assigned-to" className="text-sm font-medium text-purple-700">
                              Assigned To
                            </Label>
                            <Select
                              value={newAction.assignedTo}
                              onValueChange={(value) => setNewAction({ ...newAction, assignedTo: value })}
                            >
                              <SelectTrigger
                                id="assigned-to"
                                className="text-sm border-purple-200 focus:border-purple-500"
                              >
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

                          <div className="space-y-1">
                            <Label htmlFor="due-date" className="text-sm font-medium text-purple-700">
                              Due Date
                            </Label>
                            <Input
                              id="due-date"
                              type="date"
                              value={newAction.dueDate}
                              onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                              className="text-sm border-purple-200 focus:border-purple-500"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="priority" className="text-sm font-medium text-purple-700">
                            Priority
                          </Label>
                          <Select
                            value={newAction.priority}
                            onValueChange={(value) => setNewAction({ ...newAction, priority: value })}
                          >
                            <SelectTrigger id="priority" className="text-sm border-purple-200 focus:border-purple-500">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="completion-criteria" className="text-sm font-medium text-purple-700">
                            Completion Criteria
                          </Label>
                          <Textarea
                            id="completion-criteria"
                            value={newAction.completionCriteria}
                            onChange={(e) => setNewAction({ ...newAction, completionCriteria: e.target.value })}
                            placeholder="What defines this task as complete?"
                            className="resize-none text-sm border-purple-200 focus:border-purple-500"
                            rows={2}
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setShowAddActionForm(false)}>
                            Cancel
                          </Button>
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={handleAddAction}>
                            Add Action
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedMeeting.actionItems.length > 0 ? (
                    <div className="space-y-2">
                      {selectedMeeting.actionItems.map((action) => (
                        <Card
                          key={action.id}
                          className={`hover:shadow-sm transition-shadow border-l-4 ${
                            action.priority === "high"
                              ? "border-l-red-500"
                              : action.priority === "medium"
                                ? "border-l-amber-500"
                                : "border-l-green-500"
                          }`}
                        >
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1 text-sm">{action.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                                    <User className="h-3 w-3" />
                                    {action.assignedTo}
                                  </span>
                                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-full">
                                    <Calendar className="h-3 w-3" />
                                    Due {formatDateShort(action.dueDate)}
                                  </span>
                                </div>
                                {action.completionCriteria && (
                                  <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-1 rounded">
                                    <span className="font-medium">Success criteria:</span> {action.completionCriteria}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center gap-1 ml-3">
                                {getPriorityBadge(action.priority)}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="p-1">
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateActionStatus(action.id, "Not Started")}
                                    >
                                      Mark as Not Started
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleUpdateActionStatus(action.id, "In Progress")}
                                    >
                                      Mark as In Progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleUpdateActionStatus(action.id, "Completed")}>
                                      Mark as Completed
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => handleRemoveAction(action.id)}
                                    >
                                      Remove Action
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>

                            <div className="flex justify-start">{getStatusBadge(action.status)}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 bg-gray-50/50 rounded-lg border border-dashed border-gray-300">
                      <AlertCircle className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">No action items recorded yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - Performance Tabs (65% width) */}
          <div className="w-[65%] flex flex-col overflow-hidden bg-white">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-full">
              {/* Compact Tab Navigation */}
              <div className="flex-shrink-0 border-b border-gray-200 bg-white shadow-sm">
                <TabsList className="w-full justify-start p-0 h-auto bg-transparent">
                  {performanceTabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className={`flex-1 py-4 px-4 data-[state=active]:bg-white data-[state=active]:border-b-3 data-[state=active]:border-b-brand-primary rounded-none border-b-3 border-b-transparent hover:bg-gray-50 transition-all duration-200`}
                    >
                      <div className="text-center">
                        <div className="text-lg mb-1">{tab.icon}</div>
                        <div
                          className={`text-sm font-semibold mb-1 ${tab.id === activeTab ? "text-brand-primary" : "text-gray-700"}`}
                        >
                          {tab.label}
                        </div>
                        <div className="text-xs text-gray-500 leading-tight">{tab.description}</div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Content - Full Height */}
              <div className="flex-1 overflow-hidden">
                <TabsContent value="fpi" className="h-full m-0 p-0">
                  <CFTFPISection />
                </TabsContent>
                <TabsContent value="ppi" className="h-full m-0 p-0 bg-gray-50/30">
                  <div className="h-full p-6 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm border h-full">
                      <div className="p-4">
                        <PPISection />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="gpi" className="h-full m-0 p-0 bg-gray-50/30">
                  <div className="h-full p-6 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm border h-full">
                      <div className="p-4">
                        <GPISection />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="issues" className="h-full m-0 p-0 bg-gray-50/30">
                  <div className="h-full p-6 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm border h-full">
                      <div className="p-4">
                        <IssueLogSection />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="actions" className="h-full m-0 p-0 bg-gray-50/30">
                  <div className="h-full p-6 overflow-auto">
                    <div className="bg-white rounded-lg shadow-sm border h-full">
                      <div className="p-4">
                        <ActionReviewSection />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}
