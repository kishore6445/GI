"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  FileDown,
  FileText,
  X,
  Info,
  Clock,
  ChevronDown,
} from "lucide-react"

interface ErrorDetail {
  type: string
  message: string
  details?: string
}

export function AOPUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedYear, setSelectedYear] = useState<string>("2025")
  const [uploadStatus, setUploadStatus] = useState<"idle" | "validating" | "success" | "error">("idle")
  const [errorDetails, setErrorDetails] = useState<ErrorDetail[]>([])
  const [validationProgress, setValidationProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showRequirements, setShowRequirements] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const years = ["2025", "2024", "2023"]
  const maxFileSize = 10 * 1024 * 1024 // 10MB
  const acceptedFormats = [".xlsx"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    handleFileSelection(file)
  }

  const handleFileSelection = (file: File | null) => {
    if (!file) return

    // Validate file size
    if (file.size > maxFileSize) {
      setErrorDetails([
        {
          type: "File too large",
          message: "File size exceeds 10MB limit",
          details: `Selected file is ${(file.size / 1024 / 1024).toFixed(2)}MB. Please choose a smaller file.`,
        },
      ])
      setUploadStatus("error")
      return
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith(".xlsx")) {
      setErrorDetails([
        {
          type: "Invalid file format",
          message: "Only .xlsx files are supported",
          details: "Please select an Excel file with .xlsx extension.",
        },
      ])
      setUploadStatus("error")
      return
    }

    setSelectedFile(file)
    setUploadStatus("idle")
    setErrorDetails([])
    setValidationProgress(0)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileSelection(file)
  }

  const validateFile = (file: File): Promise<{ valid: boolean; errors: ErrorDetail[] }> => {
    return new Promise((resolve) => {
      setValidationProgress(0)

      // Simulate validation steps with progress
      const steps = [
        { progress: 20, message: "Checking file format..." },
        { progress: 40, message: "Validating file structure..." },
        { progress: 60, message: "Checking required sheets..." },
        { progress: 80, message: "Validating data integrity..." },
        { progress: 100, message: "Finalizing validation..." },
      ]

      let currentStep = 0
      const stepInterval = setInterval(() => {
        if (currentStep < steps.length) {
          setValidationProgress(steps[currentStep].progress)
          currentStep++
        } else {
          clearInterval(stepInterval)

          // Simulate validation result
          const randomSuccess = Math.random() > 0.3
          if (randomSuccess) {
            resolve({ valid: true, errors: [] })
          } else {
            const possibleErrors: ErrorDetail[] = [
              {
                type: "Missing required sheets",
                message: "Sheet named FPI is missing",
                details:
                  "The uploaded Excel file must contain sheets named GPI, PPI, and FPI (for Board team type). Please add the missing FPI sheet and try again.",
              },
              {
                type: "Invalid data format",
                message: "Cell F5 in GPI sheet contains invalid data",
                details:
                  "Column F in the GPI sheet should contain numeric values only. Cell F5 contains 'N/A' which is not a valid number.",
              },
              {
                type: "Duplicate entries",
                message: "Duplicate entry found in PPI sheet",
                details:
                  "The name column in the PPI sheet contains duplicate entries: 'Customer Satisfaction Survey' appears on rows 5 and 12.",
              },
            ]

            const numErrors = Math.floor(Math.random() * 2) + 1
            const selectedErrors = possibleErrors.slice(0, numErrors)
            resolve({ valid: false, errors: selectedErrors })
          }
        }
      }, 300)
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
          type: "System error",
          message: "An unexpected error occurred",
          details: "Please try again or contact support if the issue persists.",
        },
      ])
    }
  }

  const handleDownloadTemplate = () => {
    alert(`Downloading template for year ${selectedYear}`)
  }

  const handleDownloadErrorLog = () => {
    if (errorDetails.length === 0) return

    const timestamp = new Date().toISOString()
    const fileName = selectedFile?.name || "unknown-file"

    let logContent = `GI Software - AOP Validation Error Report\n`
    logContent += `=======================================\n\n`
    logContent += `File: ${fileName}\n`
    logContent += `Date: ${new Date().toLocaleString()}\n`
    logContent += `Year: ${selectedYear}\n\n`
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
    link.download = `aop-error-log-${timestamp.slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const clearFile = () => {
    setSelectedFile(null)
    setUploadStatus("idle")
    setErrorDetails([])
    setValidationProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-3 border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl font-bold">Upload AOP File</CardTitle>
              <CardDescription className="text-sm">
                Upload your Annual Operating Plan Excel file for validation and storage
              </CardDescription>
            </div>

            {/* Compact Progress Steps */}
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    selectedFile ? "bg-green-500 text-white" : "bg-blue-500 text-white"
                  }`}
                >
                  1
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    uploadStatus === "validating"
                      ? "bg-blue-500 text-white"
                      : uploadStatus === "success" || uploadStatus === "error"
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                  }`}
                >
                  2
                </div>
                <div className="w-8 h-0.5 bg-gray-300"></div>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    uploadStatus === "success" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Column - Year Selection */}
            <div className="space-y-2">
              <label htmlFor="year-select" className="block text-sm font-medium">
                Select Planning Year <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col space-y-2">
                <select
                  id="year-select"
                  className="w-full p-2 border rounded-md text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => setShowRequirements(!showRequirements)}
                >
                  <span className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    File Requirements
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showRequirements ? "rotate-180" : ""}`} />
                </Button>

                {showRequirements && (
                  <div className="bg-blue-50 p-3 rounded-md text-xs text-blue-700 mt-2">
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Excel format (.xlsx) only</li>
                      <li>Maximum file size: 10MB</li>
                      <li>Required sheets: GPI, PPI, FPI</li>
                      <li>Follow template format</li>
                    </ul>
                  </div>
                )}

                <Button variant="outline" size="sm" className="gap-2 mt-2" onClick={handleDownloadTemplate}>
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </div>

            {/* Middle and Right Columns - File Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                AOP File Upload <span className="text-red-500">*</span>
              </label>

              <div
                className={`relative border-2 border-dashed rounded-md p-6 transition-all duration-200 ${
                  isDragOver
                    ? "border-blue-500 bg-blue-50"
                    : selectedFile
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                aria-label="File upload area"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    fileInputRef.current?.click()
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  id="file-upload"
                  type="file"
                  accept=".xlsx"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />

                {selectedFile ? (
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-green-500 flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-medium text-green-700 truncate">{selectedFile.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        <Badge variant="outline" className="text-xs">
                          Excel File
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearFile()
                      }}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Upload className="h-10 w-10 text-gray-400 flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-medium text-gray-700">Drop your Excel file here or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">Supports .xlsx files up to 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Validation Status - Shown inline */}
              {uploadStatus === "validating" && (
                <div className="bg-blue-50 p-3 rounded-md mt-3 flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500 animate-spin flex-shrink-0" />
                  <div className="flex-grow">
                    <span className="text-sm font-medium text-blue-700">Validating...</span>
                    <Progress value={validationProgress} className="h-2 mt-1" />
                  </div>
                </div>
              )}

              {/* Success State - Compact */}
              {uploadStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-md p-3 mt-3 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-700">File uploaded successfully!</p>
                    <p className="text-xs text-green-600 mt-1">
                      Your AOP file has been validated and stored in the system.
                    </p>
                  </div>
                </div>
              )}

              {/* Error State - Compact */}
              {uploadStatus === "error" && errorDetails.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-3 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Validation failed: {errorDetails.length} issue{errorDetails.length > 1 ? "s" : ""} found
                    </p>
                    <ul className="text-xs text-red-600 mt-1 space-y-1 list-disc list-inside">
                      {errorDetails.map((error, index) => (
                        <li key={index}>{error.message}</li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-300 hover:bg-red-100 mt-2"
                      onClick={handleDownloadErrorLog}
                    >
                      <FileDown className="h-3 w-3 mr-1" />
                      Error Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end p-4 border-t bg-gray-50">
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploadStatus === "validating"}
            className="gap-2"
            variant="brand"
          >
            {uploadStatus === "validating" ? (
              <>
                <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Validating...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload & Validate
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
