import Link from "next/link"
import { Logo } from "@/components/logo"

export function MainNav() {
  return (
    <div className="flex items-center space-x-2 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Logo />
        <span className="font-bold text-lg md:text-xl hidden sm:inline-block">GI Software</span>
      </Link>
    </div>
  )
}
