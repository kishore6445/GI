"use client"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export function FPISection() {
  const [selectedMember, setSelectedMember] = useState("Ananya Sharma")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [fpiData, setFpiData] = useState([
    {
      id: 1,
      name: "Revenue",
      lastMonthTarget: "$250,000",
      lastMonthActual: "$245,000",
      nextMonthPlan: "$260,000",
      ytdTarget: "$1,000,000",
      ytdActual: "$980,000",
      annualTarget: "$3,000,000",
    },
    {
      id: 2,
      name: "Profit Margin",
      lastMonthTarget: "15%",
      lastMonthActual: "14.2%",
      nextMonthPlan: "15.5%",
      ytdTarget: "15%",
      ytdActual: "14.5%",
      annualTarget: "16%",
    },
    {
      id: 3,
      name: "Cost Reduction",
      lastMonthTarget: "5%",
      lastMonthActual: "4.2%",
      nextMonthPlan: "5.5%",
      ytdTarget: "5%",
      ytdActual: "4.8%",
      annualTarget: "7%",
    },
    {
      id: 4,
      name: "Customer Acquisition",
      lastMonthTarget: "120",
      lastMonthActual: "105",
      nextMonthPlan: "130",
      ytdTarget: "500",
      ytdActual: "480",
      annualTarget: "1,500",
    },
  ])

  // New FPI state
  const [newFpi, setNewFpi] = useState({
    name: "",
    lastMonthTarget: "",
    lastMonthActual: "",
    nextMonthPlan: "",
    ytdTarget: "",
    ytdActual: "",
    annualTarget: "",
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

  // Handle input change
  const handleInputChange = (id, field, value) => {
    setFpiData(fpiData.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // Save changes
  const saveChanges = () => {
    // In a real app, this would save to a database
    console.log("Saving FPI data:", fpiData)

    toast({
      title: "Changes saved",
      description: "FPI data has been updated successfully.",
      variant: "success",
    })
  }

  // Add new FPI
  const addNewFpi = () => {
    // Validate required fields
    if (!newFpi.name || !newFpi.lastMonthTarget || !newFpi.annualTarget) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new FPI with unique ID
    const newId = Math.max(...fpiData.map((item) => item.id)) + 1
    const fpiToAdd = {
      ...newFpi,
      id: newId,
    }

    // Add to FPI list
    setFpiData([...fpiData, fpiToAdd])

    // Reset form and close dialog
    setNewFpi({
      name: "",
      lastMonthTarget: "",
      lastMonthActual: "",
      nextMonthPlan: "",
      ytdTarget: "",
      ytdActual: "",
      annualTarget: "",
    })
    setIsAddDialogOpen(false)

    toast({
      title: "FPI added",
      description: "The new FPI has been successfully added.",
      variant: "success",
    })
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Financial Performance Indicators</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="member-select" className="text-sm font-medium">
            Select Member:
          </label>
          <select
            id="member-select"
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">FPI</th>
              <th className="border p-2 text-left">Last Month Target</th>
              <th className="border p-2 text-left">Last Month Actual</th>
              <th className="border p-2 text-left">Next Month Plan</th>
              <th className="border p-2 text-left">YTD Target</th>
              <th className="border p-2 text-left">YTD Actual</th>
              <th className="border p-2 text-left">Annual Target</th>
            </tr>
          </thead>
          <tbody>
            {fpiData.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.lastMonthTarget}</td>
                <td className="border p-2">{item.lastMonthActual}</td>
                <td className="border p-2">{item.nextMonthPlan}</td>
                <td className="border p-2">{item.ytdTarget}</td>
                <td className="border p-2">{item.ytdActual}</td>
                <td className="border p-2">{item.annualTarget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* No buttons in review mode */}

      {/* No dialog in review mode */}
    </div>
  )
}
