"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Filter, Search, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface GPI {
  id: string
  name: string
  category: string
  weeks: {
    target: string
    actual: string
    deficit: string
  }[]
}

export function CFTGPISection() {
  const [selectedGPICategory, setSelectedGPICategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Sample data for GPIs with weekly breakdown
  const [gpis, setGpis] = useState<GPI[]>([
    {
      id: "gpi-1",
      name: "Customer Satisfaction Score",
      category: "Customer",
      weeks: [
        { target: "90%", actual: "92%", deficit: "+2%" },
        { target: "90%", actual: "88%", deficit: "-2%" },
        { target: "90%", actual: "91%", deficit: "+1%" },
        { target: "90%", actual: "93%", deficit: "+3%" },
      ],
    },
    {
      id: "gpi-2",
      name: "Bug Resolution Rate",
      category: "Product",
      weeks: [
        { target: "85%", actual: "78%", deficit: "-7%" },
        { target: "85%", actual: "82%", deficit: "-3%" },
        { target: "85%", actual: "86%", deficit: "+1%" },
        { target: "85%", actual: "88%", deficit: "+3%" },
      ],
    },
    {
      id: "gpi-3",
      name: "Feature Completion",
      category: "Product",
      weeks: [
        { target: "100%", actual: "75%", deficit: "-25%" },
        { target: "100%", actual: "80%", deficit: "-20%" },
        { target: "100%", actual: "85%", deficit: "-15%" },
        { target: "100%", actual: "90%", deficit: "-10%" },
      ],
    },
    {
      id: "gpi-4",
      name: "Revenue Growth",
      category: "Financial",
      weeks: [
        { target: "5%", actual: "4.2%", deficit: "-0.8%" },
        { target: "5%", actual: "4.5%", deficit: "-0.5%" },
        { target: "5%", actual: "5.1%", deficit: "+0.1%" },
        { target: "5%", actual: "5.3%", deficit: "+0.3%" },
      ],
    },
    {
      id: "gpi-5",
      name: "New Customers",
      category: "Customer",
      weeks: [
        { target: "50", actual: "62", deficit: "+12" },
        { target: "50", actual: "55", deficit: "+5" },
        { target: "50", actual: "48", deficit: "-2" },
        { target: "50", actual: "53", deficit: "+3" },
      ],
    },
  ])

  // Filter by category and search query
  const filteredGPIs = gpis.filter((gpi) => {
    const matchesCategory = selectedGPICategory === "all" || gpi.category === selectedGPICategory
    const matchesSearch = searchQuery === "" || gpi.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "Customer", label: "Customer" },
    { id: "Product", label: "Product" },
    { id: "Development", label: "Development" },
    { id: "Financial", label: "Financial" },
    { id: "HR", label: "HR" },
  ]

  // Helper function to get color based on deficit value
  const getDeficitColor = (deficit: string) => {
    if (deficit.startsWith("+")) return "text-green-600 bg-green-50"
    if (deficit.startsWith("-")) return "text-red-600 bg-red-50"
    return "text-gray-600 bg-gray-50"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>GPI / Activities Management</CardTitle>
          <CardDescription>Review and analyze team performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Select value={selectedGPICategory} onValueChange={setSelectedGPICategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by GPI Category" />
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
            <div className="flex items-center gap-2">
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border p-2 text-left min-w-[200px]">Indicator</th>
                  <th className="border p-2 text-center">Week 1</th>
                  <th className="border p-2 text-center">Week 2</th>
                  <th className="border p-2 text-center">Week 3</th>
                  <th className="border p-2 text-center">Week 4</th>
                </tr>
              </thead>
              <tbody>
                {filteredGPIs.length > 0 ? (
                  filteredGPIs.map((gpi) => (
                    <>
                      {/* Target Row */}
                      <tr key={`${gpi.id}-target`} className="bg-gray-50">
                        <td className="border p-2">
                          <div className="font-medium">{gpi.name}</div>
                          <div className="text-xs text-gray-500">Target</div>
                          <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700">
                            {gpi.category}
                          </Badge>
                        </td>
                        {gpi.weeks.map((week, index) => (
                          <td key={`${gpi.id}-target-${index}`} className="border p-2 text-center font-medium">
                            {week.target}
                          </td>
                        ))}
                      </tr>

                      {/* Actual Row */}
                      <tr key={`${gpi.id}-actual`}>
                        <td className="border p-2 bg-gray-50">
                          <div className="text-xs text-gray-500">Actual</div>
                        </td>
                        {gpi.weeks.map((week, index) => (
                          <td key={`${gpi.id}-actual-${index}`} className="border p-2 text-center">
                            {week.actual}
                          </td>
                        ))}
                      </tr>

                      {/* Deficit Row */}
                      <tr key={`${gpi.id}-deficit`} className="border-b-4 border-white">
                        <td className="border p-2 bg-gray-50">
                          <div className="text-xs text-gray-500">Deficit</div>
                        </td>
                        {gpi.weeks.map((week, index) => (
                          <td
                            key={`${gpi.id}-deficit-${index}`}
                            className={`border p-2 text-center font-medium ${getDeficitColor(week.deficit)}`}
                          >
                            {week.deficit}
                          </td>
                        ))}
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="border p-4 text-center text-muted-foreground">
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
            <span className="font-medium">Note:</span> Target values are pulled from the approved QOP.
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
