"use client"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ChevronDown, Edit2, Filter, Check, Eye, EyeOff } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Textarea } from "@/components/ui/textarea"

interface FinancialMetric {
  id: string
  name: string
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
  isCalculated?: boolean
  isPercentage?: boolean
}

export function ExecutionFPISection() {
  const [currentMonth, setCurrentMonth] = useState("May 2025")
  const [open, setOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const [metrics, setMetrics] = useState<FinancialMetric[]>([
    {
      id: "revenue",
      name: "Revenue",
      lastMonthBudget: "₹ 13,00,000",
      lastMonthPlan: "₹ 12,80,000",
      lastMonthActual: "₹ 12,45,000",
      nextMonthBudget: "₹ 13,50,000",
      nextMonthPlan: "₹ 13,20,000",
      thisMonthBudget: "₹ 13,25,000",
      thisMonthPlan: "₹ 13,00,000",
      thisMonthActual: "₹ 12,85,000",
      qtdBudget: "₹ 39,75,000",
      qtdActual: "₹ 38,30,000",
      ytdBudget: "₹ 1,59,00,000",
      ytdActual: "₹ 1,53,20,000",
      qtrBudget: "₹ 40,50,000",
      yearBudget: "₹ 1,62,00,000",
      comments: "Slightly below plan due to delayed contract signing with Client A.",
    },
    {
      id: "variable-cost",
      name: "Variable Cost",
      lastMonthBudget: "₹ 7,80,000",
      lastMonthPlan: "₹ 7,68,000",
      lastMonthActual: "₹ 7,47,000",
      nextMonthBudget: "₹ 8,10,000",
      nextMonthPlan: "₹ 7,92,000",
      thisMonthBudget: "₹ 7,95,000",
      thisMonthPlan: "₹ 7,80,000",
      thisMonthActual: "₹ 7,71,000",
      qtdBudget: "₹ 23,85,000",
      qtdActual: "₹ 22,98,000",
      ytdBudget: "₹ 95,40,000",
      ytdActual: "₹ 91,92,000",
      qtrBudget: "₹ 24,30,000",
      yearBudget: "₹ 97,20,000",
      comments: "Material costs lower than expected.",
    },
    {
      id: "gross-margin",
      name: "Gross Margin",
      lastMonthBudget: "₹ 5,20,000",
      lastMonthPlan: "₹ 5,12,000",
      lastMonthActual: "₹ 4,98,000",
      nextMonthBudget: "₹ 5,40,000",
      nextMonthPlan: "₹ 5,28,000",
      thisMonthBudget: "₹ 5,30,000",
      thisMonthPlan: "₹ 5,20,000",
      thisMonthActual: "₹ 5,14,000",
      qtdBudget: "₹ 15,90,000",
      qtdActual: "₹ 15,32,000",
      ytdBudget: "₹ 63,60,000",
      ytdActual: "₹ 61,28,000",
      qtrBudget: "₹ 16,20,000",
      yearBudget: "₹ 64,80,000",
      comments: "",
      isCalculated: true,
    },
    {
      id: "gross-margin-percent",
      name: "Gross Margin %",
      lastMonthBudget: "40.0%",
      lastMonthPlan: "40.0%",
      lastMonthActual: "40.0%",
      nextMonthBudget: "40.0%",
      nextMonthPlan: "40.0%",
      thisMonthBudget: "40.0%",
      thisMonthPlan: "40.0%",
      thisMonthActual: "40.0%",
      qtdBudget: "40.0%",
      qtdActual: "40.0%",
      ytdBudget: "40.0%",
      ytdActual: "40.0%",
      qtrBudget: "40.0%",
      yearBudget: "40.0%",
      comments: "",
      isCalculated: true,
      isPercentage: true,
    },
    {
      id: "operating-expenses",
      name: "Operating Expenses",
      lastMonthBudget: "₹ 2,60,000",
      lastMonthPlan: "₹ 2,56,000",
      lastMonthActual: "₹ 2,49,000",
      nextMonthBudget: "₹ 2,70,000",
      nextMonthPlan: "₹ 2,64,000",
      thisMonthBudget: "₹ 2,65,000",
      thisMonthPlan: "₹ 2,60,000",
      thisMonthActual: "₹ 2,54,000",
      qtdBudget: "₹ 7,95,000",
      qtdActual: "₹ 7,63,000",
      ytdBudget: "₹ 31,80,000",
      ytdActual: "₹ 30,52,000",
      qtrBudget: "₹ 8,10,000",
      yearBudget: "₹ 32,40,000",
      comments: "Reduced office expenses due to partial remote work.",
    },
    {
      id: "operating-profit",
      name: "Operating Profit",
      lastMonthBudget: "₹ 2,60,000",
      lastMonthPlan: "₹ 2,56,000",
      lastMonthActual: "₹ 2,49,000",
      nextMonthBudget: "₹ 2,70,000",
      nextMonthPlan: "₹ 2,64,000",
      thisMonthBudget: "₹ 2,65,000",
      thisMonthPlan: "₹ 2,60,000",
      thisMonthActual: "₹ 2,60,000",
      qtdBudget: "₹ 7,95,000",
      qtdActual: "₹ 7,69,000",
      ytdBudget: "₹ 31,80,000",
      ytdActual: "₹ 30,76,000",
      qtrBudget: "₹ 8,10,000",
      yearBudget: "₹ 32,40,000",
      comments: "",
      isCalculated: true,
    },
    {
      id: "operating-profit-percent",
      name: "Operating Profit %",
      lastMonthBudget: "20.0%",
      lastMonthPlan: "20.0%",
      lastMonthActual: "20.0%",
      nextMonthBudget: "20.0%",
      nextMonthPlan: "20.0%",
      thisMonthBudget: "20.0%",
      thisMonthPlan: "20.0%",
      thisMonthActual: "20.2%",
      qtdBudget: "20.0%",
      qtdActual: "20.1%",
      ytdBudget: "20.0%",
      ytdActual: "20.1%",
      qtrBudget: "20.0%",
      yearBudget: "20.0%",
      comments: "",
      isCalculated: true,
      isPercentage: true,
    },
    {
      id: "other-expenses",
      name: "Other Expenses",
      lastMonthBudget: "₹ 65,000",
      lastMonthPlan: "₹ 64,000",
      lastMonthActual: "₹ 62,250",
      nextMonthBudget: "₹ 67,500",
      nextMonthPlan: "₹ 66,000",
      thisMonthBudget: "₹ 66,250",
      thisMonthPlan: "₹ 65,000",
      thisMonthActual: "₹ 63,500",
      qtdBudget: "₹ 1,98,750",
      qtdActual: "₹ 1,90,750",
      ytdBudget: "₹ 7,95,000",
      ytdActual: "₹ 7,63,000",
      qtrBudget: "₹ 2,02,500",
      yearBudget: "₹ 8,10,000",
      comments: "No significant variances to report.",
    },
    {
      id: "net-profit",
      name: "Net Profit",
      lastMonthBudget: "₹ 1,95,000",
      lastMonthPlan: "₹ 1,92,000",
      lastMonthActual: "₹ 1,86,750",
      nextMonthBudget: "₹ 2,02,500",
      nextMonthPlan: "₹ 1,98,000",
      thisMonthBudget: "₹ 1,98,750",
      thisMonthPlan: "₹ 1,95,000",
      thisMonthActual: "₹ 1,96,500",
      qtdBudget: "₹ 5,96,250",
      qtdActual: "₹ 5,78,250",
      ytdBudget: "₹ 23,85,000",
      ytdActual: "₹ 23,13,000",
      qtrBudget: "₹ 6,07,500",
      yearBudget: "₹ 24,30,000",
      comments: "",
      isCalculated: true,
    },
    {
      id: "net-profit-percent",
      name: "Net Profit %",
      lastMonthBudget: "15.0%",
      lastMonthPlan: "15.0%",
      lastMonthActual: "15.0%",
      nextMonthBudget: "15.0%",
      nextMonthPlan: "15.0%",
      thisMonthBudget: "15.0%",
      thisMonthPlan: "15.0%",
      thisMonthActual: "15.3%",
      qtdBudget: "15.0%",
      qtdActual: "15.1%",
      ytdBudget: "15.0%",
      ytdActual: "15.1%",
      qtrBudget: "15.0%",
      yearBudget: "15.0%",
      comments: "",
      isCalculated: true,
      isPercentage: true,
    },
  ])

  const handleValueChange = (id: string, field: string, value: string) => {
    const updatedMetrics = metrics.map((metric) => {
      if (metric.id === id) {
        return { ...metric, [field]: value }
      }
      return metric
    })
    setMetrics(updatedMetrics)
  }

  const getValueColor = (actual: string, budget: string) => {
    if (actual.includes("%") && budget.includes("%")) {
      const actualValue = Number.parseFloat(actual.replace("%", ""))
      const budgetValue = Number.parseFloat(budget.replace("%", ""))
      if (actualValue > budgetValue) return "text-green-600"
      if (actualValue < budgetValue) return "text-red-600"
      return ""
    }

    const actualValue = Number.parseFloat(actual.replace(/[₹,\s]/g, ""))
    const budgetValue = Number.parseFloat(budget.replace(/[₹,\s]/g, ""))
    if (actualValue > budgetValue) return "text-green-600"
    if (actualValue < budgetValue) return "text-red-600"
    return ""
  }

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

  const isFieldEditable = (metric: FinancialMetric, field: string) => {
    if (metric.isCalculated) return false
    return (
      field === "lastMonthActual" ||
      field === "nextMonthPlan" ||
      field === "comments" ||
      field === "thisMonthActual" ||
      field === "qtdActual" ||
      field === "ytdActual"
    )
  }

  const renderEditableField = (metric: FinancialMetric, field: string, value: string, colorClass = "") => {
    if (!isFieldEditable(metric, field)) {
      return <span className={`text-gray-700 ${colorClass}`}>{value}</span>
    }

    const getFieldColor = () => {
      if (field.includes("Actual")) return "border-blue-200 bg-blue-50 hover:border-blue-300 focus:border-blue-500"
      if (field.includes("Plan")) return "border-green-200 bg-green-50 hover:border-green-300 focus:border-green-500"
      return "border-purple-200 bg-purple-50 hover:border-purple-300 focus:border-purple-500"
    }

    if (field === "comments") {
      return (
        <div className="relative group">
          <Textarea
            className={`w-full text-sm min-h-[60px] resize-y border-2 ${getFieldColor()} focus:bg-white focus:outline-none transition-all duration-200`}
            value={value}
            onChange={(e) => handleValueChange(metric.id, field, e.target.value)}
            placeholder="Add comments..."
          />
          <Edit2 className="absolute right-2 top-2 h-3 w-3 text-purple-500 group-hover:text-purple-700" />
        </div>
      )
    }

    return (
      <div className="relative group">
        <input
          type="text"
          className={`w-full p-2 border-2 rounded-md text-right text-sm ${getFieldColor()} focus:bg-white focus:outline-none transition-all duration-200 ${colorClass}`}
          value={value}
          onChange={(e) => handleValueChange(metric.id, field, e.target.value)}
          placeholder={field.includes("Actual") ? "Enter actual" : "Enter plan"}
        />
        <Edit2
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 ${field.includes("Actual") ? "text-blue-500 group-hover:text-blue-700" : field.includes("Plan") ? "text-green-500 group-hover:text-green-700" : "text-purple-500 group-hover:text-purple-700"}`}
        />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="border-b border-brand-primary/10 bg-gradient-to-r from-brand-primary/10 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-brand-primary">Financial Performance Indicators (FPI)</CardTitle>
            <CardDescription>Review and update financial performance metrics</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="gap-1 border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                >
                  <Filter className="h-4 w-4" />
                  <span className="max-w-[100px] truncate">{currentMonth}</span>
                  <ChevronDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
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
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="gap-1 border-brand-primary text-brand-primary hover:bg-brand-primary/10"
            >
              {showDetails ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showDetails ? "Hide Details" : "Show Details"}
            </Button>
            <Button
              variant="outline"
              className="gap-1 border-brand-primary text-brand-primary hover:bg-brand-primary/10"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-6 px-2 md:px-6">
        <div className="overflow-x-auto -mx-2 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow-sm rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="bg-white sticky left-0 z-10 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Head
                    </th>
                    {!showDetails ? (
                      <>
                        <th className="px-2 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Last Month Budget
                        </th>
                        <th className="px-2 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Last Month Plan
                        </th>
                        <th className="px-2 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Last Month Actual
                        </th>
                        <th className="px-2 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Next Month Budget
                        </th>
                        <th className="px-2 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Next Month Plan
                        </th>
                        <th className="px-2 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Comments
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          This Mth Budget
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          This Mth Plan
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          This Mth Actual
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          QTD Budget
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          QTD Actual
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          YTD Budget
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          YTD Actual
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Next Mth Budget
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Next Mth Plan
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Qtr Budget
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Year Budget
                        </th>
                        <th className="px-1 py-3 text-center bg-brand-primary/80 text-white text-xs font-medium uppercase tracking-wider">
                          Comments
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {metrics.map((metric) => (
                    <tr key={metric.id} className="hover:bg-gray-50">
                      <td
                        className={`px-3 py-2 font-medium bg-white sticky left-0 z-10 whitespace-nowrap ${metric.isCalculated ? "text-blue-700 font-semibold" : ""}`}
                      >
                        <span className="truncate max-w-[150px]">{metric.name}</span>
                      </td>

                      {!showDetails ? (
                        <>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.lastMonthBudget}
                          </td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.lastMonthPlan}
                          </td>
                          <td className="px-3 py-2">
                            {renderEditableField(
                              metric,
                              "lastMonthActual",
                              metric.lastMonthActual,
                              getValueColor(metric.lastMonthActual, metric.lastMonthBudget),
                            )}
                          </td>
                          <td className="px-3 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.nextMonthBudget}
                          </td>
                          <td className="px-3 py-2">
                            {renderEditableField(metric, "nextMonthPlan", metric.nextMonthPlan)}
                          </td>
                          <td className="px-3 py-2">{renderEditableField(metric, "comments", metric.comments)}</td>
                        </>
                      ) : (
                        <>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.thisMonthBudget}
                          </td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.thisMonthPlan}
                          </td>
                          <td className="px-2 py-2">
                            {renderEditableField(metric, "thisMonthActual", metric.thisMonthActual)}
                          </td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.qtdBudget}
                          </td>
                          <td className="px-2 py-2">{renderEditableField(metric, "qtdActual", metric.qtdActual)}</td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.ytdBudget}
                          </td>
                          <td className="px-2 py-2">{renderEditableField(metric, "ytdActual", metric.ytdActual)}</td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.nextMonthBudget}
                          </td>
                          <td className="px-2 py-2">
                            {renderEditableField(metric, "nextMonthPlan", metric.nextMonthPlan)}
                          </td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.qtrBudget}
                          </td>
                          <td className="px-2 py-2 bg-gray-100 text-right text-sm border border-gray-200">
                            {metric.yearBudget}
                          </td>
                          <td className="px-2 py-2">{renderEditableField(metric, "comments", metric.comments)}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 mt-4">
          <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/10">
            Reset
          </Button>
          <Button variant="brand">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
