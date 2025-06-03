"use client"

import { useEffect } from "react"

export function FontLoader() {
  useEffect(() => {
    // Remove any existing font links
    document.querySelectorAll('link[href*="fonts.googleapis.com"]').forEach((el) => el.remove())
  }, [])

  return null
}
