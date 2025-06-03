"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, AlertCircle, CheckCircle, FileDown } from "lucide-react"

interface FileRecord {
  id: string
  date: string
  uploadedBy: string
  fileName: string
  status: "Successful" | "Failed"
  version: string
  year: string
  quarter: string
  errorDetails?: {
    type: string
    message: string
    details?: string
  }[]
}

export function QOPFileHistory() {
  const [selectedMember, setSelectedMember] = useState<string>("self")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("all")

  const teamMembers = [
    { id: "self", name: "Self (John Doe)" },
    { id: "sarah", name: "Sarah Kim" },
    { id: "alex", name: "Alex Chen" },
    { id: "maria", name: "Maria Garcia" },
    { id: "robert", name: "Robert Johnson" },
  ]

  const years = ["all", "2025", "2024", "2023"]
  const quarters = ["all", "Q1", "Q2", "Q3", "Q4"]

  const fileRecords: FileRecord[] = [
    {
      id: "file-1",
      date: "2025-05-08T14:30:00",
      uploadedBy: "John Doe",
      fileName: "QOP_2025_Q2_Marketing_V3.xlsx",
      status: "Successful",
      version: "V3",
      year: "2025",
      quarter: "Q2",
    },
    {
      id: "file-2",
      date: "2025-05-08T11:15:00",
      uploadedBy: "John Doe",
      fileName: "QOP_2025_Q2_Marketing_V2.xlsx",
      status: "Failed",
      version: "V2",
      year: "2025",
      quarter: "Q2",
      errorDetails: [
        {
          type: "File format not supported",
          message: "Only .xlsx files are allowed to be imported",
          details:
            "File 'QOP_2025_Q2_Marketing_V2.xls' has an unsupported extension. Please upload an Excel file with .xlsx extension.",
        },
      ],
    },
    {
      id: "file-3",
      date: "2025-05-07T09:45:00",
      uploadedBy: "John Doe",
      fileName: "QOP_2025_Q2_Marketing_V1.xlsx",
      status: "Successful",
      version: "V1",
      year: "2025",
      quarter: "Q2",
    },
    {
      id: "file-4",
      date: "2025-04-15T16:20:00",
      uploadedBy: "Sarah Kim",
      fileName: "QOP_2025_Q2_Sales_V2.xlsx",
      status: "Successful",
      version: "V2",
      year: "2025",
      quarter: "Q2",
    },
    {
      id: "file-5",
      date: "2025-04-10T10:30:00",
      uploadedBy: "Sarah Kim",
      fileName: "QOP_2025_Q2_Sales_V1.xlsx",
      status: "Failed",
      version: "V1",
      year: "2025",
      quarter: "Q2",
      errorDetails: [
        {
          type: "Missing required sheets",
          message: "Sheet named GPI is missing",
          details:
            "The uploaded Excel file must contain sheets named GPI and PPI. Please add the missing GPI sheet and try again.",
        },
        {
          type: "Invalid data in column F",
          message: "Cell F5 in PPI sheet contains text instead of a number",
          details:
            "Column F in the PPI sheet should contain numeric values only. Cell F5 contains 'N/A' which is not a valid number. Please correct this value and try again.",
        },
      ],
    },
    {
      id: "file-6",
      date: "2025-01-05T13:45:00",
      uploadedBy: "John Doe",
      fileName: "QOP_2025_Q1_Marketing_V1.xlsx",
      status: "Successful",
      version: "V1",
      year: "2025",
      quarter: "Q1",
    },
    {
      id: "file-7",
      date: "2024-10-15T09:30:00",
      uploadedBy: "John Doe",
      fileName: "QOP_2024_Q4_Marketing_V1.xlsx",
      status: "Successful",
      version: "V1",
      year: "2024",
      quarter: "Q4",
    },
  ]

  const filteredRecords = fileRecords.filter((record) => {
    if (selectedYear !== "all" && record.year !== selectedYear) return false
    if (selectedQuarter !== "all" && record.quarter !== selectedQuarter) return false
    if (selectedMember === "self") return record.uploadedBy === "John Doe"
    return true // For demo purposes, we're not filtering by team member other than self
  })

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

  const handleDownloadFile = (fileId: string) => {
    // In a real application, this would trigger a download of the file
    alert(`Downloading file with ID: ${fileId}`)
  }

  const handleDownloadErrorLog = (record: FileRecord) => {
    if (!record.errorDetails || record.errorDetails.length === 0) return

    // Create error log content
    const timestamp = new Date(record.date).toISOString()
    const fileName = record.fileName

    let logContent = `GI Software - QOP Validation Error Report\n`
    logContent += `=======================================\n\n`
    logContent += `File: ${fileName}\n`
    logContent += `Date: ${new Date(record.date).toLocaleString()}\n`
    logContent += `Year: ${record.year}\n`
    logContent += `Quarter: ${record.quarter}\n`
    logContent += `Uploaded By: ${record.uploadedBy}\n\n`
    logContent += `VALIDATION ERRORS\n`
    logContent += `----------------\n\n`

    record.errorDetails.forEach((error, index) => {
      logContent += `ERROR ${index + 1}: ${error.type}\n`
      logContent += `Message: ${error.message}\n`
      if (error.details) {
        logContent += `Details: ${error.details}\n`
      }
      logContent += `\n`
    })

    logContent += `\nFor assistance, please contact support@gisoftware.com\n`

    // Create and download the text file
    const blob = new Blob([logContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `error-log-${timestamp.slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QOP File History</CardTitle>
        <CardDescription>View and download previously uploaded QOP files</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between flex-wrap">
          <div className="flex items-center gap-2">
            <label htmlFor="member-select" className="text-sm font-medium whitespace-nowrap">
              Select Files for:
            </label>
            <select
              id="member-select"
              className="p-2 border rounded-md"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
            >
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="year-filter" className="text-sm font-medium whitespace-nowrap">
              Filter by Year:
            </label>
            <select
              id="year-filter"
              className="p-2 border rounded-md"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year === "all" ? "All Years" : year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="quarter-filter" className="text-sm font-medium whitespace-nowrap">
              Filter by Quarter:
            </label>
            <select
              id="quarter-filter"
              className="p-2 border rounded-md"
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
            >
              {quarters.map((quarter) => (
                <option key={quarter} value={quarter}>
                  {quarter === "all" ? "All Quarters" : quarter}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border p-2 text-left">Date of Upload</th>
                <th className="border p-2 text-left">Uploaded By</th>
                <th className="border p-2 text-left">File Name</th>
                <th className="border p-2 text-left">Quarter</th>
                <th className="border p-2 text-left">Version</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="border p-2">{formatDate(record.date)}</td>
                    <td className="border p-2">{record.uploadedBy}</td>
                    <td className="border p-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {record.fileName}
                      </div>
                    </td>
                    <td className="border p-2">
                      <Badge variant="outline">{record.quarter}</Badge>
                    </td>
                    <td className="border p-2">
                      <Badge variant="outline">{record.version}</Badge>
                    </td>
                    <td className="border p-2">
                      {record.status === "Successful" ? (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">Successful</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Failed</span>
                        </div>
                      )}
                    </td>
                    <td className="border p-2">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() => handleDownloadFile(record.id)}
                        >
                          <Download className="h-3 w-3" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        {record.status === "Failed" && record.errorDetails && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1 text-red-600 border-red-200 hover:bg-red-100"
                            onClick={() => handleDownloadErrorLog(record)}
                          >
                            <FileDown className="h-3 w-3" />
                            <span className="hidden sm:inline">Error Report</span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="border p-4 text-center text-muted-foreground">
                    No files found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
