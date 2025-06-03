"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react"

export function GPISection() {
  const [selectedMember, setSelectedMember] = useState("Ananya Sharma")
  const [viewMode, setViewMode] = useState("weekly") // "weekly" or "monthly"
  const [selectedGPI, setSelectedGPI] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentGPIIndex, setCurrentGPIIndex] = useState(0)

  // GPI list for filtering
  const [gpiList, setGpiList] = useState([
    "Customer Satisfaction",
    "Product Development",
    "Employee Engagement",
    "Market Share",
    "Innovation Rate",
  ])

  // Weekly tracking data
  const [allWeeklyTrackingData, setAllWeeklyTrackingData] = useState([
    {
      gpi: "Customer Satisfaction",
      dates: ["7-May-2024", "14-May-2024", "21-May-2024", "28-May-2024", "4-Jun-2024", "11-Jun-2024", "18-Jun-2024"],
      target: [10, 15, 20, 25, 30, 35, 40],
      actual: [12, 14, 0, 0, 0, 0, 0], // Only first two weeks have actual data
      cumulativeTarget: [10, 25, 45, 70, 100, 135, 175],
      cumulativeActual: [12, 26, 0, 0, 0, 0, 0],
      cumulativeDiff: [2, 1, 0, 0, 0, 0, 0],
    },
    {
      gpi: "Product Development",
      dates: ["7-May-2024", "14-May-2024", "21-May-2024", "28-May-2024", "4-Jun-2024", "11-Jun-2024", "18-Jun-2024"],
      target: [5, 10, 15, 20, 25, 30, 35],
      actual: [6, 9, 0, 0, 0, 0, 0],
      cumulativeTarget: [5, 15, 30, 50, 75, 105, 140],
      cumulativeActual: [6, 15, 0, 0, 0, 0, 0],
      cumulativeDiff: [1, 0, 0, 0, 0, 0, 0],
    },
    {
      gpi: "Employee Engagement",
      dates: ["7-May-2024", "14-May-2024", "21-May-2024", "28-May-2024", "4-Jun-2024", "11-Jun-2024", "18-Jun-2024"],
      target: [8, 12, 16, 20, 24, 28, 32],
      actual: [7, 13, 0, 0, 0, 0, 0],
      cumulativeTarget: [8, 20, 36, 56, 80, 108, 140],
      cumulativeActual: [7, 20, 0, 0, 0, 0, 0],
      cumulativeDiff: [-1, 0, 0, 0, 0, 0, 0],
    },
    {
      gpi: "Market Share",
      dates: ["7-May-2024", "14-May-2024", "21-May-2024", "28-May-2024", "4-Jun-2024", "11-Jun-2024", "18-Jun-2024"],
      target: [2, 4, 6, 8, 10, 12, 14],
      actual: [2, 5, 0, 0, 0, 0, 0],
      cumulativeTarget: [2, 6, 12, 20, 30, 42, 56],
      cumulativeActual: [2, 7, 0, 0, 0, 0, 0],
      cumulativeDiff: [0, 1, 0, 0, 0, 0, 0],
    },
    {
      gpi: "Innovation Rate",
      dates: ["7-May-2024", "14-May-2024", "21-May-2024", "28-May-2024", "4-Jun-2024", "11-Jun-2024", "18-Jun-2024"],
      target: [1, 2, 3, 4, 5, 6, 7],
      actual: [1, 1, 0, 0, 0, 0, 0],
      cumulativeTarget: [1, 3, 6, 10, 15, 21, 28],
      cumulativeActual: [1, 2, 0, 0, 0, 0, 0],
      cumulativeDiff: [0, -1, 0, 0, 0, 0, 0],
    },
  ])

  // Monthly tracking data (aggregated from weekly data)
  const [allMonthlyTrackingData, setAllMonthlyTrackingData] = useState([
    {
      gpi: "Customer Satisfaction",
      months: ["May 2024", "June 2024", "July 2024", "August 2024"],
      target: [70, 135, 200, 250],
      actual: [52, 0, 0, 0],
      cumulativeTarget: [70, 205, 405, 655],
      cumulativeActual: [52, 0, 0, 0],
      cumulativeDiff: [-18, 0, 0, 0],
    },
    {
      gpi: "Product Development",
      months: ["May 2024", "June 2024", "July 2024", "August 2024"],
      target: [50, 90, 130, 170],
      actual: [30, 0, 0, 0],
      cumulativeTarget: [50, 140, 270, 440],
      cumulativeActual: [30, 0, 0, 0],
      cumulativeDiff: [-20, 0, 0, 0],
    },
    {
      gpi: "Employee Engagement",
      months: ["May 2024", "June 2024", "July 2024", "August 2024"],
      target: [56, 104, 152, 200],
      actual: [40, 0, 0, 0],
      cumulativeTarget: [56, 160, 312, 512],
      cumulativeActual: [40, 0, 0, 0],
      cumulativeDiff: [-16, 0, 0, 0],
    },
    {
      gpi: "Market Share",
      months: ["May 2024", "June 2024", "July 2024", "August 2024"],
      target: [20, 44, 68, 92],
      actual: [14, 0, 0, 0],
      cumulativeTarget: [20, 64, 132, 224],
      cumulativeActual: [14, 0, 0, 0],
      cumulativeDiff: [-6, 0, 0, 0],
    },
    {
      gpi: "Innovation Rate",
      months: ["May 2024", "June 2024", "July 2024", "August 2024"],
      target: [10, 18, 26, 34],
      actual: [5, 0, 0, 0],
      cumulativeTarget: [10, 28, 54, 88],
      cumulativeActual: [5, 0, 0, 0],
      cumulativeDiff: [-5, 0, 0, 0],
    },
  ])

  // Filtered weekly tracking data
  const [weeklyTrackingData, setWeeklyTrackingData] = useState(allWeeklyTrackingData[0])

  // Filtered monthly tracking data
  const [monthlyTrackingData, setMonthlyTrackingData] = useState(allMonthlyTrackingData[0])

  // Update filtered data when GPI selection changes
  useEffect(() => {
    if (selectedGPI) {
      const filteredWeeklyData = allWeeklyTrackingData.find((data) => data.gpi === selectedGPI)
      const filteredMonthlyData = allMonthlyTrackingData.find((data) => data.gpi === selectedGPI)

      if (filteredWeeklyData) {
        setWeeklyTrackingData(filteredWeeklyData)
      }

      if (filteredMonthlyData) {
        setMonthlyTrackingData(filteredMonthlyData)
      }

      // Update current index
      const index = gpiList.findIndex((gpi) => gpi === selectedGPI)
      if (index !== -1) {
        setCurrentGPIIndex(index)
      }
    } else {
      // Default to current index GPI if none selected
      setWeeklyTrackingData(allWeeklyTrackingData[currentGPIIndex])
      setMonthlyTrackingData(allMonthlyTrackingData[currentGPIIndex])
      setSelectedGPI(gpiList[currentGPIIndex])
    }
  }, [selectedGPI, allWeeklyTrackingData, allMonthlyTrackingData, gpiList, currentGPIIndex])

  // Team members list
  const teamMembers = [
    { id: "sarah", name: "Ananya Sharma" },
    { id: "alex", name: "Rahul Patel" },
    { id: "maria", name: "Priya Singh" },
    { id: "robert", name: "Deepak Verma" },
    { id: "neha", name: "Neha Gupta" },
    { id: "arjun", name: "Arjun Reddy" },
  ]

  // Navigate to previous GPI
  const goToPreviousGPI = () => {
    const newIndex = (currentGPIIndex - 1 + gpiList.length) % gpiList.length
    setCurrentGPIIndex(newIndex)
    setSelectedGPI(gpiList[newIndex])
  }

  // Navigate to next GPI
  const goToNextGPI = () => {
    const newIndex = (currentGPIIndex + 1) % gpiList.length
    setCurrentGPIIndex(newIndex)
    setSelectedGPI(gpiList[newIndex])
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Goal Progress Indicators / Activities</h3>
        <div className="flex items-center gap-2">
          <label htmlFor="member-select-gpi" className="text-sm font-medium">
            Select Member:
          </label>
          <select
            id="member-select-gpi"
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

      {/* Mode toggle and GPI filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "weekly" ? "default" : "outline"}
            className="text-sm"
            onClick={() => setViewMode("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant={viewMode === "monthly" ? "default" : "outline"}
            className="text-sm"
            onClick={() => setViewMode("monthly")}
          >
            Monthly
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="h-4 w-4" />
            {selectedGPI ? `Filtered: ${selectedGPI}` : "Filter by GPI"}
          </Button>

          {selectedGPI && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSelectedGPI(null)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear filter</span>
            </Button>
          )}
        </div>
      </div>

      {/* GPI Filter dropdown */}
      {isFilterOpen && (
        <div className="border rounded-md p-4 bg-background shadow-md">
          <h4 className="text-sm font-medium mb-2">Filter by GPI</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {gpiList.map((gpi) => (
              <Button
                key={gpi}
                variant={selectedGPI === gpi ? "default" : "outline"}
                size="sm"
                className="justify-start"
                onClick={() => {
                  setSelectedGPI(gpi)
                  setIsFilterOpen(false)
                }}
              >
                {gpi}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Weekly tracking table */}
      {viewMode === "weekly" && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-4">
            {selectedGPI ? `${selectedGPI} - Weekly Performance Tracking` : "Weekly Performance Tracking"}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Metric</th>
                  {weeklyTrackingData.dates.map((date, index) => (
                    <th key={index} className="border p-2 text-center">
                      {date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Target</td>
                  {weeklyTrackingData.target.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Actual</td>
                  {weeklyTrackingData.actual.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Cumulative Target</td>
                  {weeklyTrackingData.cumulativeTarget.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Cumulative Actual</td>
                  {weeklyTrackingData.cumulativeActual.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Surplus / (Deficit)</td>
                  {weeklyTrackingData.cumulativeDiff.map((value, index) => (
                    <td
                      key={index}
                      className={`border p-2 text-center ${value >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {value > 0 ? `+${value}` : value || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Monthly tracking table */}
      {viewMode === "monthly" && (
        <div className="mt-4">
          <h4 className="text-md font-medium mb-4">
            {selectedGPI ? `${selectedGPI} - Monthly Performance Tracking` : "Monthly Performance Tracking"}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Metric</th>
                  {monthlyTrackingData.months.map((month, index) => (
                    <th key={index} className="border p-2 text-center">
                      {month}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 font-medium">Target</td>
                  {monthlyTrackingData.target.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2 font-medium">Actual</td>
                  {monthlyTrackingData.actual.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Cumulative Target</td>
                  {monthlyTrackingData.cumulativeTarget.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Cumulative Actual</td>
                  {monthlyTrackingData.cumulativeActual.map((value, index) => (
                    <td key={index} className="border p-2 text-center">
                      {value || "-"}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-2 font-medium">Surplus / (Deficit)</td>
                  {monthlyTrackingData.cumulativeDiff.map((value, index) => (
                    <td
                      key={index}
                      className={`border p-2 text-center ${value >= 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {value > 0 ? `+${value}` : value || "-"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button variant="outline" size="sm" onClick={goToPreviousGPI} className="flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Previous GPI
        </Button>
        <Button variant="outline" size="sm" onClick={goToNextGPI} className="flex items-center gap-1">
          Next GPI
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
