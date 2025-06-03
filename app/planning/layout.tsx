import type React from "react"

export default function PlanningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container py-6">{children}</div>
}
