"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PlusCircle, Search, Filter, Calendar, User, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OneOnOneList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [memberFilter, setMemberFilter] = useState("All")

  // Sample meeting data
  const meetings = [
    {
      id: 1,
      date: "2025-05-10",
      time: "10:00 AM",
      member: "Ananya Sharma",
      type: "Weekly Review",
      status: "Completed",
      notes: "Discussed project progress and blockers",
      actions: 3,
    },
    {
      id: 2,
      date: "2025-05-08",
      time: "2:30 PM",
      member: "Rahul Patel",
      type: "Monthly Review",
      status: "Completed",
      notes: "Performance review and goal setting for next month",
      actions: 5,
    },
    {
      id: 3,
      date: "2025-05-15",
      time: "11:00 AM",
      member: "Priya Singh",
      type: "Weekly Review",
      status: "Scheduled",
      notes: "",
      actions: 0,
    },
    {
      id: 4,
      date: "2025-05-17",
      time: "9:30 AM",
      member: "Deepak Verma",
      type: "Weekly Review",
      status: "Scheduled",
      notes: "",
      actions: 0,
    },
    {
      id: 5,
      date: "2025-05-05",
      time: "3:00 PM",
      member: "Neha Gupta",
      type: "Weekly Review",
      status: "Completed",
      notes: "Discussed customer feedback and improvement areas",
      actions: 2,
    },
    {
      id: 6,
      date: "2025-05-03",
      time: "10:30 AM",
      member: "Arjun Reddy",
      type: "Weekly Review",
      status: "Completed",
      notes: "Code review and technical debt discussion",
      actions: 4,
    },
  ]

  // Team members list
  const teamMembers = [
    { id: "sarah", name: "Ananya Sharma" },
    { id: "alex", name: "Rahul Patel" },
    { id: "maria", name: "Priya Singh" },
    { id: "robert", name: "Deepak Verma" },
    { id: "neha", name: "Neha Gupta" },
    { id: "arjun", name: "Arjun Reddy" },
  ]

  // Filter meetings based on search term and filters
  const filteredMeetings = meetings.filter((meeting) => {
    const matchesSearch =
      meeting.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "All" || meeting.status === statusFilter
    const matchesMember = memberFilter === "All" || meeting.member === memberFilter

    return matchesSearch && matchesStatus && matchesMember
  })

  // Sort meetings by date (most recent first)
  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Button className="gap-1 w-full sm:w-auto" onClick={() => {}}>
          <PlusCircle className="h-4 w-4" />
          Schedule New Meeting
        </Button>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search meetings..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground hidden sm:inline">Filter:</span>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-9 w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={memberFilter} onValueChange={setMemberFilter}>
              <SelectTrigger className="h-9 w-[150px]">
                <SelectValue placeholder="Team Member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Members</SelectItem>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.name}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedMeetings.map((meeting) => (
          <Card key={meeting.id} className="overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                  </span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(meeting.status)}`}>
                  {meeting.status}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{meeting.member}</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{meeting.type}</span>
              </div>
              {meeting.notes && (
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground line-clamp-2">{meeting.notes}</p>
                </div>
              )}
              <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {meeting.actions > 0 ? `${meeting.actions} action items` : "No action items"}
                </div>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedMeetings.length === 0 && (
        <div className="text-center p-8 border rounded-md">
          <p className="text-muted-foreground">No meetings found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
