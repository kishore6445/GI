"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Mail, AlertTriangle } from "lucide-react"

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>System Notifications</span>
          </CardTitle>
          <CardDescription>Configure system-wide notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="task-notifications">Task Notifications</Label>
              <div className="text-sm text-gray-500">Notify users about task assignments and updates</div>
            </div>
            <Switch id="task-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="meeting-notifications">Meeting Notifications</Label>
              <div className="text-sm text-gray-500">Send reminders for upcoming meetings</div>
            </div>
            <Switch id="meeting-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="deadline-notifications">Deadline Notifications</Label>
              <div className="text-sm text-gray-500">Alert users about approaching deadlines</div>
            </div>
            <Switch id="deadline-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="system-notifications">System Updates</Label>
              <div className="text-sm text-gray-500">Notify users about system maintenance and updates</div>
            </div>
            <Switch id="system-notifications" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications</span>
          </CardTitle>
          <CardDescription>Configure email notification settings and templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email-frequency">Email Digest Frequency</Label>
              <Select defaultValue="daily">
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-format">Email Format</Label>
              <Select defaultValue="html">
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="plain">Plain Text</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-footer">Email Footer Text</Label>
            <Textarea
              id="email-footer"
              placeholder="Enter footer text for all system emails"
              defaultValue="© 2025 Premm Anand Technologies. All rights reserved."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="include-logo">Include Company Logo</Label>
              <div className="text-sm text-gray-500">Add company logo to all email notifications</div>
            </div>
            <Switch id="include-logo" defaultChecked />
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
            <AlertTriangle className="h-5 w-5" />
            <span>Alert Settings</span>
          </CardTitle>
          <CardDescription>Configure critical alert thresholds and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alert-priority">Default Alert Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="escalation-time">Escalation Time (minutes)</Label>
              <Select defaultValue="30">
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sms-alerts">SMS Alerts</Label>
              <div className="text-sm text-gray-500">Send critical alerts via SMS</div>
            </div>
            <Switch id="sms-alerts" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-escalation">Automatic Escalation</Label>
              <div className="text-sm text-gray-500">Automatically escalate unacknowledged alerts</div>
            </div>
            <Switch id="auto-escalation" defaultChecked />
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
