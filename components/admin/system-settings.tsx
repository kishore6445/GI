"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { AlertCircle, RefreshCw, Database, HardDrive } from "lucide-react"

export function SystemSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <span>Database Settings</span>
          </CardTitle>
          <CardDescription>Configure database connection and backup settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backup-frequency">Backup Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select backup frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention-period">Retention Period (days)</Label>
              <Input id="retention-period" type="number" defaultValue="30" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup">Automatic Backups</Label>
              <div className="text-sm text-gray-500">Enable scheduled automatic backups</div>
            </div>
            <Switch id="auto-backup" defaultChecked />
          </div>

          <div className="flex justify-end">
            <Button variant="outline" className="flex items-center gap-1">
              <RefreshCw className="h-4 w-4" />
              <span>Run Backup Now</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            <span>Storage Management</span>
          </CardTitle>
          <CardDescription>Manage storage settings and file retention policies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Storage Usage</Label>
              <span className="text-sm font-medium">65% (6.5 GB / 10 GB)</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-full w-[65%] rounded-full bg-emerald-600"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="file-retention">File Retention Policy</Label>
              <Select defaultValue="90days">
                <SelectTrigger>
                  <SelectValue placeholder="Select retention policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30days">30 Days</SelectItem>
                  <SelectItem value="90days">90 Days</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
              <Input id="max-file-size" type="number" defaultValue="25" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="auto-cleanup">Automatic Cleanup</Label>
              <div className="text-sm text-gray-500">Automatically remove old files based on retention policy</div>
            </div>
            <Switch id="auto-cleanup" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            <span>System Maintenance</span>
          </CardTitle>
          <CardDescription>Schedule maintenance windows and system updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maintenance-day">Maintenance Day</Label>
              <Select defaultValue="sunday">
                <SelectTrigger>
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maintenance-time">Maintenance Time</Label>
              <Select defaultValue="midnight">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midnight">12:00 AM - 2:00 AM</SelectItem>
                  <SelectItem value="early-morning">4:00 AM - 6:00 AM</SelectItem>
                  <SelectItem value="evening">8:00 PM - 10:00 PM</SelectItem>
                  <SelectItem value="late-night">10:00 PM - 12:00 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="auto-updates">Automatic Updates</Label>
              <div className="text-sm text-gray-500">
                Automatically install system updates during maintenance window
              </div>
            </div>
            <Switch id="auto-updates" defaultChecked />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="maintenance-notifications">Maintenance Notifications</Label>
              <div className="text-sm text-gray-500">Send notifications to users before scheduled maintenance</div>
            </div>
            <Switch id="maintenance-notifications" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Reset</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
