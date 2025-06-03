"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface GPITrackerProps {
  period: "weekly" | "monthly"
}

interface GPI {
  id: string
  name: string
  lastBudget: string
  lastPlan: number
  lastActual: string
  nextBudget: string
  nextPlan: number
  comments: string
  category: string
}

export function GPITracker({ period }: GPITrackerProps) {
  const [selectedWeek, setSelectedWeek] = useState<string>("current")
  const [selectedMonth, setSelectedMonth] = useState<string>("may")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Sample data for weekly GPIs
  const [weeklyGPIs, setWeeklyGPIs] = useState<GPI[]>([
    {
      id: "gpi-1",
      name: "Customer Satisfaction Score",
      lastBudget: "90%",
      lastPlan: 85,
      lastActual: "92%",
      nextBudget: "93%",
      nextPlan: 90,
      comments: "Exceeded target due to new customer service training",
      category: "Customer",
    },
    {
      id: "gpi-2",
      name: "Bug Resolution Rate",
      lastBudget: "85%",
      lastPlan: 80,
      lastActual: "78%",
      nextBudget: "87%",
      nextPlan: 85,
      comments: "Delayed due to unexpected system outage",
      category: "Product",
    },
    {
      id: "gpi-3",
      name: "Feature Completion",
      lastBudget: "100%",
      lastPlan: 95,
      lastActual: "75%",
      nextBudget: "100%",
      nextPlan: 100,
      comments: "Resource constraints affected timeline",
      category: "Product",
    },
  ])

  // Sample data for monthly GPIs
  const [monthlyGPIs, setMonthlyGPIs] = useState<GPI[]>([
    {
      id: "gpi-m1",
      name: "Revenue Growth",
      lastBudget: "5%",
      lastPlan: 4.5,
      lastActual: "4.2%",
      nextBudget: "5.5%",
      nextPlan: 5.0,
      comments: "Slightly below target but showing positive trend",
      category: "Financial",
    },
    {
      id: "gpi-m2",
      name: "New Customers",
      lastBudget: "50",
      lastPlan: 45,
      lastActual: "62",
      nextBudget: "65",
      nextPlan: 60,
      comments: "Campaign performed better than expected",
      category: "Customer",
    },
  ])

  const gpis = period === "weekly" ? weeklyGPIs : monthlyGPIs

  // Filter by category and search query
  const filteredGPIs = gpis.filter((gpi) => {
    const matchesCategory = selectedCategory === "all" || gpi.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      gpi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gpi.comments.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const weeks = [
    { id: "previous", label: "May 1-7" },
    { id: "current", label: "May 8-14 (Current)" },
    { id: "next", label: "May 15-21" },
    { id: "future", label: "May 22-28" },
  ]

  const months = [
    { id: "march", label: "March 2025" },
    { id: "april", label: "April 2025" },
    { id: "may", label: "May 2025 (Current)" },
    { id: "june", label: "June 2025" },
  ]

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Customer", label: "Customer" },
    { id: "Product", label: "Product" },
    { id: "Development", label: "Development" },
    { id: "Financial", label: "Financial" },
    { id: "HR", label: "HR" },
  ]

  const handleInputChange = (id: string, field: keyof GPI, value: string | number) => {
    if (field === "nextPlan") {
      // Convert string to number for nextPlan
      const numValue = Number.parseFloat(value as string) || 0

      if (period === "weekly") {
        setWeeklyGPIs(weeklyGPIs.map((gpi) => (gpi.id === id ? { ...gpi, [field]: numValue } : gpi)))
      } else {
        setMonthlyGPIs(monthlyGPIs.map((gpi) => (gpi.id === id ? { ...gpi, [field]: numValue } : gpi)))
      }
    } else {
      // Handle other fields normally
      if (period === "weekly") {
        setWeeklyGPIs(weeklyGPIs.map((gpi) => (gpi.id === id ? { ...gpi, [field]: value } : gpi)))
      } else {
        setMonthlyGPIs(monthlyGPIs.map((gpi) => (gpi.id === id ? { ...gpi, [field]: value } : gpi)))
      }
    }
  }

  const saveChanges = () => {
    // In a real app, this would save to a database
    console.log("Saving GPI data:", period === "weekly" ? weeklyGPIs : monthlyGPIs)
    alert("Changes saved successfully!")
  }

  const getDateRanges = () => {
    // This is a simplified implementation - in a real app, you would calculate these dynamically
    const dateRanges = {
      weekly: {
        previous: {
          last: "May 1-7",
          next: "May 8-14",
        },
        current: {
          last: "May 8-14",
          next: "May 15-21",
        },
        next: {
          last: "May 15-21",
          next: "May 22-28",
        },
        future: {
          last: "May 22-28",
          next: "May 29-Jun 4",
        },
      },
      monthly: {
        march: {
          last: "February 2025",
          next: "March 2025",
        },
        april: {
          last: "March 2025",
          next: "April 2025",
        },
        may: {
          last: "April 2025",
          next: "May 2025",
        },
        june: {
          last: "May 2025",
          next: "June 2025",
        },
      },
    }

    const selectedPeriod = period === "weekly" ? selectedWeek : selectedMonth
    return period === "weekly"
      ? dateRanges.weekly[selectedPeriod as keyof typeof dateRanges.weekly]
      : dateRanges.monthly[selectedPeriod as keyof typeof dateRanges.monthly]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
          <div>
            <CardTitle>My {period === "weekly" ? "Weekly" : "Monthly"} GPIs / Activities</CardTitle>
            <CardDescription className="text-gray-100">
              Track and update your {period === "weekly" ? "weekly" : "monthly"} performance metrics
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select
                value={period === "weekly" ? selectedWeek : selectedMonth}
                onValueChange={period === "weekly" ? setSelectedWeek : setSelectedMonth}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={period === "weekly" ? "Select Week" : "Select Month"} />
                </SelectTrigger>
                <SelectContent>
                  {(period === "weekly" ? weeks : months).map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search GPIs..."
                  className="pl-8 w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-emerald-50 dark:bg-emerald-900">
                  <th className="border p-2 text-left">GPI</th>
                  <th className="border p-2 text-left">
                    Last {period === "weekly" ? "Week" : "Month"} Budget
                    <div className="text-xs font-normal text-gray-500">{getDateRanges().last}</div>
                  </th>
                  <th className="border p-2 text-left">
                    Last {period === "weekly" ? "Week" : "Month"} Plan
                    <div className="text-xs font-normal text-gray-500">{getDateRanges().last}</div>
                  </th>
                  <th className="border p-2 text-left">
                    Last {period === "weekly" ? "Week" : "Month"} Actual
                    <div className="text-xs font-normal text-gray-500">{getDateRanges().last}</div>
                  </th>
                  <th className="border p-2 text-left">
                    Next {period === "weekly" ? "Week" : "Month"} Budget
                    <div className="text-xs font-normal text-gray-500">{getDateRanges().next}</div>
                  </th>
                  <th className="border p-2 text-left">
                    Next {period === "weekly" ? "Week" : "Month"} Plan
                    <div className="text-xs font-normal text-gray-500">{getDateRanges().next}</div>
                  </th>
                  <th className="border p-2 text-left">Comments</th>
                </tr>
              </thead>
              <tbody>
                {filteredGPIs.length > 0 ? (
                  filteredGPIs.map((gpi) => (
                    <tr key={gpi.id} className="hover:bg-muted/50">
                      <td className="border p-2 font-medium">{gpi.name}</td>
                      <td className="border p-2 bg-gray-50">{gpi.lastBudget}</td>
                      <td className="border p-2">{gpi.lastPlan}</td>
                      <td className="border p-2">
                        <input
                          type="text"
                          className="w-full p-1 border rounded"
                          value={gpi.lastActual}
                          onChange={(e) => handleInputChange(gpi.id, "lastActual", e.target.value)}
                        />
                      </td>
                      <td className="border p-2 bg-gray-50">{gpi.nextBudget}</td>
                      <td className="border p-2">
                        <input
                          type="number"
                          className="w-full p-1 border rounded"
                          value={gpi.nextPlan}
                          onChange={(e) => handleInputChange(gpi.id, "nextPlan", e.target.value)}
                          step="0.1"
                          min="0"
                        />
                      </td>
                      <td className="border p-2">
                        <textarea
                          className="w-full p-1 border rounded min-h-[60px]"
                          value={gpi.comments}
                          onChange={(e) => handleInputChange(gpi.id, "comments", e.target.value)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="border p-4 text-center text-muted-foreground">
                      No GPIs found for the selected criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Note:</span> Only Last {period === "weekly" ? "Week" : "Month"} Actual, Next{" "}
            {period === "weekly" ? "Week" : "Month"} Plan, and Comments fields are editable.
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={saveChanges} className="bg-emerald-600 hover:bg-emerald-700">
              Save Changes
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
