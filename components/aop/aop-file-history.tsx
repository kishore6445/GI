"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, AlertCircle, CheckCircle, FileDown, Filter, Search } from "lucide-react"

interface FileRecord {
  id: string
  date: string
  uploadedBy: string
  fileName: string
  status: "Successful" | "Failed"
  version: string
  year: string
  errorDetails?: {
    type: string
    message: string
    details?: string
  }[]
}

export function AOPFileHistory() {
  const [selectedMember, setSelectedMember] = useState<string>("self")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState<string>("")

  const teamMembers = [
    { id: "self", name: "Self (John Doe)" },
    { id: "sarah", name: "Sarah Kim" },
    { id: "alex", name: "Alex Chen" },
    { id: "maria", name: "Maria Garcia" },
    { id: "robert", name: "Robert Johnson" },
  ]

  const years = ["all", "2025", "2024", "2023"]

  const fileRecords: FileRecord[] = [
    {
      id: "file-1",
      date: "2025-05-08T14:30:00",
      uploadedBy: "John Doe",
      fileName: "AOP_2025_Marketing_V3.xlsx",
      status: "Successful",
      version: "V3",
      year: "2025",
    },
    {
      id: "file-2",
      date: "2025-05-08T11:15:00",
      uploadedBy: "John Doe",
      fileName: "AOP_2025_Marketing_V2.xlsx",
      status: "Failed",
      version: "V2",
      year: "2025",
      errorDetails: [
        {
          type: "File format not supported",
          message: "Only .xlsx files are allowed to be imported",
          details:
            "File 'AOP_2025_Marketing_V2.xls' has an unsupported extension. Please upload an Excel file with .xlsx extension.",
        },
      ],
    },
    {
      id: "file-3",
      date: "2025-05-07T09:45:00",
      uploadedBy: "John Doe",
      fileName: "AOP_2025_Marketing_V1.xlsx",
      status: "Successful",
      version: "V1",
      year: "2025",
    },
    {
      id: "file-4",
      date: "2025-04-15T16:20:00",
      uploadedBy: "Sarah Kim",
      fileName: "AOP_2025_Sales_V2.xlsx",
      status: "Successful",
      version: "V2",
      year: "2025",
    },
    {
      id: "file-5",
      date: "2025-04-10T10:30:00",
      uploadedBy: "Sarah Kim",
      fileName: "AOP_2025_Sales_V1.xlsx",
      status: "Failed",
      version: "V1",
      year: "2025",
      errorDetails: [
        {
          type: "Missing required sheets",
          message: "Sheet named FPI is missing",
          details:
            "The uploaded Excel file must contain sheets named GPI, PPI, and FPI (for Board team type). Please add the missing FPI sheet and try again.",
        },
        {
          type: "Invalid data in column F",
          message: "Cell F5 in GPI sheet contains text instead of a number",
          details:
            "Column F in the GPI sheet should contain numeric values only. Cell F5 contains 'N/A' which is not a valid number. Please correct this value and try again.",
        },
      ],
    },
    {
      id: "file-6",
      date: "2024-12-05T13:45:00",
      uploadedBy: "John Doe",
      fileName: "AOP_2024_Marketing_V1.xlsx",
      status: "Successful",
      version: "V1",
      year: "2024",
    },
  ]

  const filteredRecords = fileRecords.filter((record) => {
    const matchesYear = selectedYear === "all" || record.year === selectedYear
    const matchesMember = selectedMember === "self" ? record.uploadedBy === "John Doe" : true
    const matchesSearch =
      searchTerm === "" ||
      record.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesYear && matchesMember && matchesSearch
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
    alert(`Downloading file with ID: ${fileId}`)
  }

  const handleDownloadErrorLog = (record: FileRecord) => {
    if (!record.errorDetails || record.errorDetails.length === 0) return

    const timestamp = new Date(record.date).toISOString()
    const fileName = record.fileName

    let logContent = `GI Software - AOP Validation Error Report\n`
    logContent += `=======================================\n\n`
    logContent += `File: ${fileName}\n`
    logContent += `Date: ${new Date(record.date).toLocaleString()}\n`
    logContent += `Year: ${record.year}\n`
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

  const successfulUploads = filteredRecords.filter((r) => r.status === "Successful").length
  const failedUploads = filteredRecords.filter((r) => r.status === "Failed").length

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">AOP File History</CardTitle>
              <CardDescription className="text-lg mt-2">
                View and download previously uploaded AOP files
              </CardDescription>
            </div>
            <div className="flex gap-4 text-center">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{successfulUploads}</div>
                <div className="text-sm text-green-700">Successful</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{failedUploads}</div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Enhanced Filters */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter & Search</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="member-select" className="block text-sm font-medium text-gray-700">
                  Team Member
                </label>
                <select
                  id="member-select"
                  className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

              <div className="space-y-2">
                <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <select
                  id="year-filter"
                  className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

              <div className="space-y-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700">
                  Search Files
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by filename or uploader..."
                    className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="bg-white rounded-lg border-2 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Upload Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Uploaded By</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">File Details</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.length > 0 ? (
                    filteredRecords.map((record, index) => (
                      <tr key={record.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{formatDate(record.date)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{record.uploadedBy}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <FileText className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-medium text-gray-900 break-all">{record.fileName}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {record.version}
                                </Badge>
                                <Badge variant="secondary" className="text-xs">
                                  {record.year}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {record.status === "Successful" ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-500" />
                              <span className="text-sm font-medium text-green-700">Successful</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5 text-red-500" />
                              <span className="text-sm font-medium text-red-700">Failed</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-2"
                              onClick={() => handleDownloadFile(record.id)}
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                            {record.status === "Failed" && record.errorDetails && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-2 text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleDownloadErrorLog(record)}
                              >
                                <FileDown className="h-4 w-4" />
                                Error Log
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <FileText className="h-12 w-12 text-gray-300" />
                          <div className="text-gray-500">
                            <p className="text-lg font-medium">No files found</p>
                            <p className="text-sm">Try adjusting your filters or search terms</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Results Summary */}
          {filteredRecords.length > 0 && (
            <div className="text-sm text-gray-600 text-center">
              Showing {filteredRecords.length} of {fileRecords.length} files
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
