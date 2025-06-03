import type React from "react"
import Link from "next/link"
import { BarChart3, Calendar, ClipboardList, FileText, Home, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardShell() {
  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm border">
      <NavItem href="/" icon={<Home className="mr-2 h-4 w-4" />}>
        Dashboard
      </NavItem>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight mt-4">Planning</h2>
      <NavItem href="/planning/aop" icon={<FileText className="mr-2 h-4 w-4" />}>
        AOP Upload
      </NavItem>
      <NavItem href="/planning/qop" icon={<FileText className="mr-2 h-4 w-4" />}>
        QOP Upload
      </NavItem>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight mt-4">Review</h2>
      <NavItem href="/review/cft" icon={<Users className="mr-2 h-4 w-4" />}>
        CFT Review
      </NavItem>
      <NavItem href="/review/one-on-one" icon={<Calendar className="mr-2 h-4 w-4" />}>
        1-1 Review
      </NavItem>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight mt-4">Execution</h2>
      <NavItem href="/execution/gpi" icon={<BarChart3 className="mr-2 h-4 w-4" />}>
        My GPI/Activities
      </NavItem>
      <NavItem href="/execution/tasks" icon={<ClipboardList className="mr-2 h-4 w-4" />}>
        My Tasks
      </NavItem>
      <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight mt-4">Admin</h2>
      <NavItem href="/admin/settings" icon={<Settings className="mr-2 h-4 w-4" />}>
        Settings
      </NavItem>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  children: React.ReactNode
  className?: string
}

function NavItem({ href, icon, children, className }: NavItemProps) {
  return (
    <Button variant="ghost" className={cn("w-full justify-start", className)} asChild>
      <Link href={href}>
        {icon}
        {children}
      </Link>
    </Button>
  )
}
