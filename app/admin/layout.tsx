import type React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="container py-6">{children}</div>
}
