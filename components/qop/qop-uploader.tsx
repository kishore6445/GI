"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  FileDown,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react"

interface ErrorDetail {
  type: string
  message: string
  details?: string
}

export function QOPUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>("2025")
  const [selectedQuarter, setSelectedQuarter] = useState<string>("Q2")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "validating" | "success" | "error">("idle")
  const [errorDetails, setErrorDetails] = useState<ErrorDetail[]>([])
  const [showRequirements, setShowRequirements] = useState(false)
  const [showErrorDetails, setShowErrorDetails] = useState(false)

  const years = ["2025", "2024", "2023"]
  const quarters = ["Q1", "Q2", "Q3", "Q4"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    setUploadStatus("idle")
    setErrorDetails([])
  }

  const validateFile = (file: File): Promise<{ valid: boolean; errors: ErrorDetail[] }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!file.name.endsWith(".xlsx")) {
          resolve({
            valid: false,
            errors: [
              {
                type: "File format not supported",
                message: "Only .xlsx files are allowed to be imported",
                details: `File '${file.name}' has an unsupported extension. Please upload an Excel file with .xlsx extension.`,
              },
            ],
          })
          return
        }

        const randomSuccess = Math.random() > 0.7
        if (randomSuccess) {
          resolve({ valid: true, errors: [] })
        } else {
          const possibleErrors: ErrorDetail[] = [
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
            {
              type: "Missing AOP GPI",
              message: "GPI 'Customer Satisfaction' from AOP is missing in QOP",
              details:
                "All GPIs from the AOP must be present in the QOP. The GPI 'Customer Satisfaction' is in the AOP but missing from your QOP file. Please add this GPI and try again.",
            },
          ]

          const numErrors = Math.floor(Math.random() * 2) + 1
          const selectedErrors = []
          for (let i = 0; i < numErrors; i++) {
            const randomIndex = Math.floor(Math.random() * possibleErrors.length)
            selectedErrors.push(possibleErrors[randomIndex])
            possibleErrors.splice(randomIndex, 1)
            if (possibleErrors.length === 0) break
          }

          resolve({
            valid: false,
            errors: selectedErrors,
          })
        }
      }, 1500)
    })
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploadStatus("validating")
    setErrorDetails([])

    try {
      const result = await validateFile(selectedFile)
      if (result.valid) {
        setUploadStatus("success")
      } else {
        setUploadStatus("error")
        setErrorDetails(result.errors)
      }
    } catch (error) {
      setUploadStatus("error")
      setErrorDetails([
        {
          type: "Unexpected error",
          message: "An unexpected error occurred during validation",
          details:
            "The system encountered an unexpected error while validating your file. Please try again or contact support if the issue persists.",
        },
      ])
    }
  }

  const handleDownloadTemplate = () => {
    alert(`Downloading template for ${selectedYear} ${selectedQuarter}`)
  }

  const handleDownloadErrorLog = () => {
    if (errorDetails.length === 0) return

    const timestamp = new Date().toISOString()
    const fileName = selectedFile?.name || "unknown-file"

    let logContent = `GI Software - QOP Validation Error Report\n`
    logContent += `=======================================\n\n`
    logContent += `File: ${fileName}\n`
    logContent += `Date: ${new Date().toLocaleString()}\n`
    logContent += `Year: ${selectedYear}\n`
    logContent += `Quarter: ${selectedQuarter}\n`
    logContent += `\n`
    logContent += `VALIDATION ERRORS\n`
    logContent += `----------------\n\n`

    errorDetails.forEach((error, index) => {
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

  const getStatusColor = () => {
    switch (uploadStatus) {
      case "success":
        return "text-green-600"
      case "error":
        return "text-red-600"
      case "validating":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusText = () => {
    switch (uploadStatus) {
      case "success":
        return "Upload Successful"
      case "error":
        return "Validation Failed"
      case "validating":
        return "Validating File..."
      default:
        return "Ready to Upload"
    }
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      {/* Header with Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Upload QOP File</h2>
          <p className="text-sm text-muted-foreground">Upload your Quarterly Operating Plan Excel file</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</div>
          {uploadStatus === "validating" && (
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1">
        {/* Left Column - File Upload */}
        <div className="lg:col-span-2 space-y-4">
          {/* Configuration Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="year-select" className="block text-sm font-medium mb-1">
                Year
              </label>
              <select
                id="year-select"
                className="w-full max-w-xs p-2 border rounded-md text-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quarter-select" className="block text-sm font-medium mb-1">
                Quarter
              </label>
              <select
                id="quarter-select"
                className="w-full max-w-xs p-2 border rounded-md text-sm"
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
              >
                {quarters.map((quarter) => (
                  <option key={quarter} value={quarter}>
                    {quarter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="flex-1">
            <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
              QOP File
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer h-32 flex flex-col items-center justify-center"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input id="file-upload" type="file" accept=".xlsx" className="hidden" onChange={handleFileChange} />
              {selectedFile ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-sm">{selectedFile.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-6"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                    }}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                  <div>
                    <p className="text-sm font-medium">Drop your Excel file here</p>
                    <p className="text-xs text-muted-foreground">or click to browse</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {uploadStatus === "success" && (
            <Alert className="bg-green-50 border-green-200 py-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600 text-sm">Success!</AlertTitle>
              <AlertDescription className="text-green-700 text-xs">
                Your QOP file has been validated and uploaded successfully.
              </AlertDescription>
            </Alert>
          )}

          {uploadStatus === "error" && (
            <Alert className="bg-red-50 border-red-200 py-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-600 text-sm">Validation Failed</AlertTitle>
              <AlertDescription className="text-red-700 text-xs">
                <div className="space-y-1">
                  <p>{errorDetails.length} error(s) found in your file:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {errorDetails.slice(0, 2).map((error, index) => (
                      <li key={index} className="text-xs">
                        <span className="font-medium">{error.type}:</span> {error.message}
                      </li>
                    ))}
                  </ul>
                  {errorDetails.length > 2 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-red-600 p-0 h-auto text-xs"
                      onClick={() => setShowErrorDetails(!showErrorDetails)}
                    >
                      {showErrorDetails ? "Show Less" : `Show ${errorDetails.length - 2} More`}
                      {showErrorDetails ? (
                        <ChevronUp className="h-3 w-3 ml-1" />
                      ) : (
                        <ChevronDown className="h-3 w-3 ml-1" />
                      )}
                    </Button>
                  )}
                  {showErrorDetails && (
                    <ul className="list-disc list-inside space-y-1 mt-2">
                      {errorDetails.slice(2).map((error, index) => (
                        <li key={index + 2} className="text-xs">
                          <span className="font-medium">{error.type}:</span> {error.message}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Right Column - Actions & Info */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="p-4">
            <h3 className="font-medium text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs h-8"
                onClick={handleDownloadTemplate}
              >
                <Download className="h-3 w-3 mr-2" />
                Download Template
              </Button>
              {uploadStatus === "error" && errorDetails.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-xs h-8 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={handleDownloadErrorLog}
                >
                  <FileDown className="h-3 w-3 mr-2" />
                  Download Error Report
                </Button>
              )}
            </div>
          </Card>

          {/* File Requirements */}
          <Card className="p-4">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between p-0 h-auto font-medium text-sm"
              onClick={() => setShowRequirements(!showRequirements)}
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                File Requirements
              </div>
              {showRequirements ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {showRequirements && (
              <div className="mt-3 space-y-2">
                <div className="space-y-1">
                  {[
                    "Only .xlsx files allowed",
                    "Must contain GPI and PPI sheets",
                    "All required fields filled",
                    "Numeric fields contain numbers only",
                    "No duplicate entries",
                  ].map((requirement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-xs text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Current Selection */}
          {(selectedYear || selectedQuarter) && (
            <Card className="p-4">
              <h3 className="font-medium text-sm mb-2">Current Selection</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {selectedYear}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {selectedQuarter}
                  </Badge>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploadStatus === "validating"}
          className="px-6"
          size="sm"
        >
          {uploadStatus === "validating" ? (
            <>
              <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
              Validating...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload & Validate
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
