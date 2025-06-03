"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Download, Eye, EyeOff, Filter, Check, Calendar } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

interface FinancialMetric {
  id: string
  name: string
  isCalculated: boolean
  isPercentage: boolean
  lastMonthBudget: string
  lastMonthPlan: string
  lastMonthActual: string
  nextMonthBudget: string
  nextMonthPlan: string
  comments: string
  // Additional details fields
  thisMonthBudget: string
  thisMonthPlan: string
  thisMonthActual: string
  qtdBudget: string
  qtdActual: string
  ytdBudget: string
  ytdActual: string
  qtrBudget: string
  yearBudget: string
}

interface CFTFPISectionProps {
  context?: "cft" | "one-on-one"
}

export function CFTFPISection({ context = "cft" }: CFTFPISectionProps) {
  const [currentMonth, setCurrentMonth] = useState("May 2025")
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const [metrics, setMetrics] = useState<FinancialMetric[]>([
    {
      id: "revenue",
      name: "Revenue",
      isCalculated: false,
      isPercentage: false,
      lastMonthBudget: "₹ 13,00,000",
      lastMonthPlan: "₹ 12,80,000",
      lastMonthActual: "₹ 12,45,000",
      nextMonthBudget: "₹ 13,50,000",
      nextMonthPlan: "₹ 13,20,000",
      comments: "Q2 target on track",
      thisMonthBudget: "₹ 13,25,000",
      thisMonthPlan: "₹ 13,00,000",
      thisMonthActual: "₹ 12,85,000",
      qtdBudget: "₹ 39,75,000",
      qtdActual: "₹ 38,50,000",
      ytdBudget: "₹ 65,00,000",
      ytdActual: "₹ 62,30,000",
      qtrBudget: "₹ 40,50,000",
      yearBudget: "₹ 1,56,00,000",
    },
    {
      id: "variable-cost",
      name: "Variable Cost",
      isCalculated: false,
      isPercentage: false,
      lastMonthBudget: "₹ 7,80,000",
      lastMonthPlan: "₹ 7,68,000",
      lastMonthActual: "₹ 7,47,000",
      nextMonthBudget: "₹ 8,10,000",
      nextMonthPlan: "₹ 7,92,000",
      comments: "Cost optimization ongoing",
      thisMonthBudget: "₹ 7,95,000",
      thisMonthPlan: "₹ 7,80,000",
      thisMonthActual: "₹ 7,71,000",
      qtdBudget: "₹ 23,85,000",
      qtdActual: "₹ 23,10,000",
      ytdBudget: "₹ 39,00,000",
      ytdActual: "₹ 37,38,000",
      qtrBudget: "₹ 24,30,000",
      yearBudget: "₹ 93,60,000",
    },
    {
      id: "gross-margin",
      name: "Gross Margin",
      isCalculated: true,
      isPercentage: false,
      lastMonthBudget: "₹ 5,20,000",
      lastMonthPlan: "₹ 5,12,000",
      lastMonthActual: "₹ 4,98,000",
      nextMonthBudget: "₹ 5,40,000",
      nextMonthPlan: "₹ 5,28,000",
      comments: "Margin pressure from costs",
      thisMonthBudget: "₹ 5,30,000",
      thisMonthPlan: "₹ 5,20,000",
      thisMonthActual: "₹ 5,14,000",
      qtdBudget: "₹ 15,90,000",
      qtdActual: "₹ 15,40,000",
      ytdBudget: "₹ 26,00,000",
      ytdActual: "₹ 24,92,000",
      qtrBudget: "₹ 16,20,000",
      yearBudget: "₹ 62,40,000",
    },
    {
      id: "gross-margin-percent",
      name: "Gross Margin %",
      isCalculated: true,
      isPercentage: true,
      lastMonthBudget: "40.0%",
      lastMonthPlan: "40.0%",
      lastMonthActual: "40.0%",
      nextMonthBudget: "40.0%",
      nextMonthPlan: "40.0%",
      comments: "Target maintained",
      thisMonthBudget: "40.0%",
      thisMonthPlan: "40.0%",
      thisMonthActual: "40.0%",
      qtdBudget: "40.0%",
      qtdActual: "40.0%",
      ytdBudget: "40.0%",
      ytdActual: "40.0%",
      qtrBudget: "40.0%",
      yearBudget: "40.0%",
    },
    {
      id: "operating-expenses",
      name: "Operating Expenses",
      isCalculated: false,
      isPercentage: false,
      lastMonthBudget: "₹ 2,60,000",
      lastMonthPlan: "₹ 2,56,000",
      lastMonthActual: "₹ 2,49,000",
      nextMonthBudget: "₹ 2,70,000",
      nextMonthPlan: "₹ 2,64,000",
      comments: "Efficiency improvements",
      thisMonthBudget: "₹ 2,65,000",
      thisMonthPlan: "₹ 2,60,000",
      thisMonthActual: "₹ 2,57,000",
      qtdBudget: "₹ 7,95,000",
      qtdActual: "₹ 7,70,000",
      ytdBudget: "₹ 13,00,000",
      ytdActual: "₹ 12,46,000",
      qtrBudget: "₹ 8,10,000",
      yearBudget: "₹ 31,20,000",
    },
    {
      id: "operating-profit",
      name: "Operating Profit",
      isCalculated: true,
      isPercentage: false,
      lastMonthBudget: "₹ 2,60,000",
      lastMonthPlan: "₹ 2,56,000",
      lastMonthActual: "₹ 2,49,000",
      nextMonthBudget: "₹ 2,70,000",
      nextMonthPlan: "₹ 2,64,000",
      comments: "Strong performance",
      thisMonthBudget: "₹ 2,65,000",
      thisMonthPlan: "₹ 2,60,000",
      thisMonthActual: "₹ 2,57,000",
      qtdBudget: "₹ 7,95,000",
      qtdActual: "₹ 7,70,000",
      ytdBudget: "₹ 13,00,000",
      ytdActual: "₹ 12,46,000",
      qtrBudget: "₹ 8,10,000",
      yearBudget: "₹ 31,20,000",
    },
    {
      id: "operating-profit-percent",
      name: "Operating Profit %",
      isCalculated: true,
      isPercentage: true,
      lastMonthBudget: "20.0%",
      lastMonthPlan: "20.0%",
      lastMonthActual: "20.0%",
      nextMonthBudget: "20.0%",
      nextMonthPlan: "20.0%",
      comments: "Consistent margins",
      thisMonthBudget: "20.0%",
      thisMonthPlan: "20.0%",
      thisMonthActual: "20.0%",
      qtdBudget: "20.0%",
      qtdActual: "20.0%",
      ytdBudget: "20.0%",
      ytdActual: "20.0%",
      qtrBudget: "20.0%",
      yearBudget: "20.0%",
    },
    {
      id: "other-expenses",
      name: "Other Expenses",
      isCalculated: false,
      isPercentage: false,
      lastMonthBudget: "₹ 65,000",
      lastMonthPlan: "₹ 64,000",
      lastMonthActual: "₹ 62,250",
      nextMonthBudget: "₹ 67,500",
      nextMonthPlan: "₹ 66,000",
      comments: "Under control",
      thisMonthBudget: "₹ 66,250",
      thisMonthPlan: "₹ 65,000",
      thisMonthActual: "₹ 64,250",
      qtdBudget: "₹ 1,98,750",
      qtdActual: "₹ 1,92,500",
      ytdBudget: "₹ 3,25,000",
      ytdActual: "₹ 3,11,500",
      qtrBudget: "₹ 2,02,500",
      yearBudget: "₹ 7,80,000",
    },
    {
      id: "net-profit",
      name: "Net Profit",
      isCalculated: true,
      isPercentage: false,
      lastMonthBudget: "₹ 1,95,000",
      lastMonthPlan: "₹ 1,92,000",
      lastMonthActual: "₹ 1,86,750",
      nextMonthBudget: "₹ 2,02,500",
      nextMonthPlan: "₹ 1,98,000",
      comments: "Solid bottom line",
      thisMonthBudget: "₹ 1,98,750",
      thisMonthPlan: "₹ 1,95,000",
      thisMonthActual: "₹ 1,92,750",
      qtdBudget: "₹ 5,96,250",
      qtdActual: "₹ 5,77,500",
      ytdBudget: "₹ 9,75,000",
      ytdActual: "₹ 9,34,500",
      qtrBudget: "₹ 6,07,500",
      yearBudget: "₹ 23,40,000",
    },
    {
      id: "net-profit-percent",
      name: "Net Profit %",
      isCalculated: true,
      isPercentage: true,
      lastMonthBudget: "15.0%",
      lastMonthPlan: "15.0%",
      lastMonthActual: "15.0%",
      nextMonthBudget: "15.0%",
      nextMonthPlan: "15.0%",
      comments: "Target achieved",
      thisMonthBudget: "15.0%",
      thisMonthPlan: "15.0%",
      thisMonthActual: "15.0%",
      qtdBudget: "15.0%",
      qtdActual: "15.0%",
      ytdBudget: "15.0%",
      ytdActual: "15.0%",
      qtrBudget: "15.0%",
      yearBudget: "15.0%",
    },
  ])

  const months = [
    "April 2025",
    "May 2025",
    "June 2025",
    "July 2025",
    "August 2025",
    "September 2025",
    "October 2025",
    "November 2025",
    "December 2025",
    "January 2026",
    "February 2026",
    "March 2026",
  ]

  const handleValueChange = (id: string, field: string, value: string) => {
    setMetrics((prev) => prev.map((metric) => (metric.id === id ? { ...metric, [field]: value } : metric)))
  }

  const getFieldStyle = (isEditable: boolean, fieldType: "actual" | "plan" | "comment" | "readonly") => {
    if (!isEditable) {
      return "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
    }

    switch (fieldType) {
      case "actual":
        return "bg-blue-50 border-blue-200 hover:border-blue-300 focus:border-blue-400 focus:bg-white transition-all duration-200"
      case "plan":
        return "bg-green-50 border-green-200 hover:border-green-300 focus:border-green-400 focus:bg-white transition-all duration-200"
      case "comment":
        return "bg-purple-50 border-purple-200 hover:border-purple-300 focus:border-purple-400 focus:bg-white transition-all duration-200"
      default:
        return "bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-gradient-to-r from-brand-primary/5 to-transparent">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-brand-primary rounded-full"></div>
              <div>
                <h3 className="text-brand-primary text-xl font-bold">Financial Performance Indicators</h3>
                <p className="text-gray-600 text-sm">Review and analyze financial metrics for {currentMonth}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg border">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">{currentMonth}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5"
                  >
                    <Filter className="h-4 w-4" />
                    Change Month
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandGroup>
                        {months.map((month) => (
                          <CommandItem
                            key={month}
                            value={month}
                            onSelect={() => {
                              setCurrentMonth(month)
                              setOpen(false)
                            }}
                          >
                            {month}
                            {currentMonth === month && <Check className="ml-auto h-4 w-4" />}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button
                variant={showDetails ? "default" : "outline"}
                size="sm"
                onClick={() => setShowDetails(!showDetails)}
                className="gap-2"
              >
                {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showDetails ? "Simple View" : "Detailed View"}
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/5"
            >
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>
      </div>

      {/* Table Container with Fixed Height */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto">
          {!showDetails ? (
            // Default View - Better aligned
            <div className="min-h-full">
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-800 bg-gray-50 sticky left-0 z-20 min-w-[160px] border-r border-gray-200">
                      <div className="flex items-center gap-2">
                        <span>Financial Head</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-700 bg-gray-50 min-w-[120px] border-r border-gray-100">
                      <div className="flex flex-col items-center">
                        <span>Last Month</span>
                        <span className="text-xs text-gray-500">Budget</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-700 bg-gray-50 min-w-[120px] border-r border-gray-100">
                      <div className="flex flex-col items-center">
                        <span>Last Month</span>
                        <span className="text-xs text-gray-500">Plan</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-semibold text-blue-700 bg-blue-50 min-w-[120px] border-r border-blue-200">
                      <div className="flex flex-col items-center">
                        <span>Last Month</span>
                        <span className="text-xs text-blue-600">Actual</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-semibold text-gray-700 bg-gray-50 min-w-[120px] border-r border-gray-100">
                      <div className="flex flex-col items-center">
                        <span>Next Month</span>
                        <span className="text-xs text-gray-500">Budget</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-semibold text-green-700 bg-green-50 min-w-[120px] border-r border-green-200">
                      <div className="flex flex-col items-center">
                        <span>Next Month</span>
                        <span className="text-xs text-green-600">Plan</span>
                      </div>
                    </th>
                    <th className="text-center p-3 font-semibold text-purple-700 bg-purple-50 min-w-[160px]">
                      <div className="flex flex-col items-center">
                        <span>Comments</span>
                        <span className="text-xs text-purple-600">& Notes</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {metrics.map((metric, index) => (
                    <tr
                      key={metric.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="p-3 font-medium text-gray-800 bg-white sticky left-0 z-10 border-r border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="truncate">{metric.name}</span>
                          {metric.isCalculated && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                              Auto
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 border-r border-gray-100">
                        <div className="p-2 rounded border bg-gray-50 text-center text-sm font-mono">
                          {metric.lastMonthBudget}
                        </div>
                      </td>
                      <td className="p-2 border-r border-gray-100">
                        <div className="p-2 rounded border bg-gray-50 text-center text-sm font-mono">
                          {metric.lastMonthPlan}
                        </div>
                      </td>
                      <td className="p-2 border-r border-blue-100">
                        <input
                          type="text"
                          value={metric.lastMonthActual}
                          onChange={(e) => handleValueChange(metric.id, "lastMonthActual", e.target.value)}
                          className={`w-full p-2 rounded border text-center text-sm font-mono ${getFieldStyle(!metric.isCalculated, "actual")}`}
                          placeholder={metric.isCalculated ? "Auto" : "Enter"}
                          disabled={metric.isCalculated}
                        />
                      </td>
                      <td className="p-2 border-r border-gray-100">
                        <div className="p-2 rounded border bg-gray-50 text-center text-sm font-mono">
                          {metric.nextMonthBudget}
                        </div>
                      </td>
                      <td className="p-2 border-r border-green-100">
                        <input
                          type="text"
                          value={metric.nextMonthPlan}
                          onChange={(e) => handleValueChange(metric.id, "nextMonthPlan", e.target.value)}
                          className={`w-full p-2 rounded border text-center text-sm font-mono ${getFieldStyle(true, "plan")}`}
                          placeholder="Enter"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={metric.comments}
                          onChange={(e) => handleValueChange(metric.id, "comments", e.target.value)}
                          className={`w-full p-2 rounded border text-sm ${getFieldStyle(true, "comment")}`}
                          placeholder="Add comments..."
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Detailed View - Better aligned
            <div className="min-h-full">
              <table className="w-full text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-2 font-semibold text-gray-800 bg-gray-50 sticky left-0 z-20 min-w-[140px] border-r border-gray-200">
                      <div className="flex items-center gap-1">
                        <span>Head</span>
                      </div>
                    </th>
                    {[
                      { label: "This Mth B", color: "gray" },
                      { label: "This Mth P", color: "gray" },
                      { label: "This Mth A", color: "blue" },
                      { label: "QTD B", color: "gray" },
                      { label: "QTD A", color: "gray" },
                      { label: "YTD B", color: "gray" },
                      { label: "YTD A", color: "gray" },
                      { label: "Next B", color: "green" },
                      { label: "Next P", color: "green" },
                      { label: "Qtr B", color: "gray" },
                      { label: "Year B", color: "gray" },
                      { label: "Comments", color: "purple" },
                    ].map((col, idx) => (
                      <th
                        key={idx}
                        className={`text-center p-2 font-semibold min-w-[80px] border-r border-gray-100 ${
                          col.color === "blue"
                            ? "text-blue-700 bg-blue-50"
                            : col.color === "green"
                              ? "text-green-700 bg-green-50"
                              : col.color === "purple"
                                ? "text-purple-700 bg-purple-50 min-w-[140px]"
                                : "text-gray-700 bg-gray-50"
                        }`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-xs leading-tight">{col.label}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {metrics.map((metric, index) => (
                    <tr
                      key={metric.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="p-2 font-medium text-gray-800 bg-white sticky left-0 z-10 border-r border-gray-200">
                        <div className="flex items-center gap-1">
                          <span className="truncate text-xs">{metric.name}</span>
                          {metric.isCalculated && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-1 rounded border">A</span>
                          )}
                        </div>
                      </td>
                      {[
                        { field: "thisMonthBudget", editable: false, type: "readonly" },
                        { field: "thisMonthPlan", editable: false, type: "readonly" },
                        { field: "thisMonthActual", editable: !metric.isCalculated, type: "actual" },
                        { field: "qtdBudget", editable: false, type: "readonly" },
                        { field: "qtdActual", editable: false, type: "readonly" },
                        { field: "ytdBudget", editable: false, type: "readonly" },
                        { field: "ytdActual", editable: false, type: "readonly" },
                        { field: "nextMonthBudget", editable: false, type: "readonly" },
                        { field: "nextMonthPlan", editable: true, type: "plan" },
                        { field: "qtrBudget", editable: false, type: "readonly" },
                        { field: "yearBudget", editable: false, type: "readonly" },
                        { field: "comments", editable: true, type: "comment" },
                      ].map((col, idx) => (
                        <td key={idx} className="p-1 border-r border-gray-100">
                          {col.editable ? (
                            <input
                              type="text"
                              value={metric[col.field]}
                              onChange={(e) => handleValueChange(metric.id, col.field, e.target.value)}
                              className={`w-full p-1 rounded border text-center text-xs font-mono ${getFieldStyle(col.editable, col.type)}`}
                              disabled={!col.editable}
                            />
                          ) : (
                            <div className="p-1 rounded border bg-gray-50 text-center text-xs font-mono">
                              {metric[col.field]}
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
