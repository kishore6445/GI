"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Calendar, FileText, MessageSquare, Link } from "lucide-react"

export function IntegrationSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Calendar Integration</span>
          </CardTitle>
          <CardDescription>Configure calendar integration settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="google-calendar">Google Calendar</Label>
              <div className="text-sm text-gray-500">Sync meetings with Google Calendar</div>
            </div>
            <Switch id="google-calendar" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="outlook-calendar">Microsoft Outlook</Label>
              <div className="text-sm text-gray-500">Sync meetings with Microsoft Outlook</div>
            </div>
            <Switch id="outlook-calendar" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="calendar-api-key">Calendar API Key</Label>
            <Input id="calendar-api-key" type="password" value="●●●●●●●●●●●●●●●●" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-create-events">Auto-Create Calendar Events</Label>
              <div className="text-sm text-gray-500">Automatically create calendar events for new meetings</div>
            </div>
            <Switch id="auto-create-events" defaultChecked />
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
            <FileText className="h-5 w-5" />
            <span>Document Integration</span>
          </CardTitle>
          <CardDescription>Configure document storage and sharing settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="google-drive">Google Drive</Label>
              <div className="text-sm text-gray-500">Connect with Google Drive for document storage</div>
            </div>
            <Switch id="google-drive" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="onedrive">Microsoft OneDrive</Label>
              <div className="text-sm text-gray-500">Connect with OneDrive for document storage</div>
            </div>
            <Switch id="onedrive" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-api-key">Document API Key</Label>
            <Input id="document-api-key" type="password" value="●●●●●●●●●●●●●●●●" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup-docs">Auto-Backup Documents</Label>
              <div className="text-sm text-gray-500">Automatically backup documents to cloud storage</div>
            </div>
            <Switch id="auto-backup-docs" defaultChecked />
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
            <MessageSquare className="h-5 w-5" />
            <span>Communication Integration</span>
          </CardTitle>
          <CardDescription>Configure communication and messaging integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="slack-integration">Slack</Label>
              <div className="text-sm text-gray-500">Connect with Slack for notifications and updates</div>
            </div>
            <Switch id="slack-integration" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="teams-integration">Microsoft Teams</Label>
              <div className="text-sm text-gray-500">Connect with Microsoft Teams for notifications</div>
            </div>
            <Switch id="teams-integration" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input id="webhook-url" placeholder="https://hooks.slack.com/services/..." />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="send-notifications">Send Notifications</Label>
              <div className="text-sm text-gray-500">Send system notifications to messaging platforms</div>
            </div>
            <Switch id="send-notifications" defaultChecked />
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
            <Link className="h-5 w-5" />
            <span>API Access</span>
          </CardTitle>
          <CardDescription>Manage API access and authentication</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enable-api">Enable API Access</Label>
              <div className="text-sm text-gray-500">Allow external systems to access data via API</div>
            </div>
            <Switch id="enable-api" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="flex gap-2">
              <Input id="api-key" readOnly value="pa_api_8f7d6e5c4b3a2190" className="flex-1" />
              <Button variant="outline">Regenerate</Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="rate-limiting">Rate Limiting</Label>
              <div className="text-sm text-gray-500">Limit API requests to prevent abuse</div>
            </div>
            <Switch id="rate-limiting" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="api-logging">API Request Logging</Label>
              <div className="text-sm text-gray-500">Log all API requests for security and debugging</div>
            </div>
            <Switch id="api-logging" defaultChecked />
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
