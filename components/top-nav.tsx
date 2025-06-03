"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, ChevronDown, ClipboardList, FileText, Home, Menu, Settings, Users, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TopNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Planning",
      items: [
        {
          title: "AOP Upload",
          href: "/planning/aop",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "QOP Upload",
          href: "/planning/qop",
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Review",
      items: [
        {
          title: "CFT Review",
          href: "/review/cft",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "1-1 Review",
          href: "/review/one-on-one",
          icon: <Calendar className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Execution",
      items: [
      {
          title: "FPI",
          href: "/execution/fpi",
          icon: <BarChart3 className="h-4 w-4" />,
        },
        {
          title: "My GPI/Activities",
          href: "/execution/gpi",
          icon: <BarChart3 className="h-4 w-4" />,
        },
        {
          title: "My Tasks",
          href: "/execution/tasks",
          icon: <ClipboardList className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Admin",
      href: "/admin/settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
        {navItems.map((item, index) => {
          // If the item has sub-items, render a dropdown
          if ("items" in item) {
            return (
              <DropdownMenu key={index}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 text-sm lg:text-base">
                    {item.title}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.items.map((subItem, subIndex) => (
                    <DropdownMenuItem key={subIndex} asChild>
                      <Link
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-2 w-full",
                          pathname === subItem.href ? "font-medium text-brand-primary" : "text-muted-foreground",
                        )}
                      >
                        {subItem.icon}
                        {subItem.title}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          }

          // Otherwise, render a simple link
          return (
            <Button key={index} variant="ghost" asChild className="text-sm lg:text-base">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2",
                  pathname === item.href ? "font-medium text-brand-primary" : "text-muted-foreground",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </Button>
          )
        })}
      </div>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
              {navItems.map((item, index) => {
                // If the item has sub-items, render a collapsible section
                if ("items" in item) {
                  return (
                    <div key={index} className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">{item.title}</h3>
                      <div className="pl-4 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                          <Button
                            key={subIndex}
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMobileMenuOpen(false)}
                            asChild
                          >
                            <Link
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-2",
                                pathname === subItem.href ? "font-medium text-brand-primary" : "text-muted-foreground",
                              )}
                            >
                              {subItem.icon}
                              {subItem.title}
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )
                }

                // Otherwise, render a simple link
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2",
                        pathname === item.href ? "font-medium text-brand-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </Button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
