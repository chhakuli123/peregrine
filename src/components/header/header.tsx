"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, Settings, User } from "lucide-react"

import { useApp } from "@/providers/AppProvider"
import { Button, Input, Separator} from "../ui"

export const Header = () => {
  const pathname = usePathname()
  const { currentProject, searchQuery, setSearchQuery } = useApp()
  
  const getNormalizedPath = () => {
    const parts = pathname.split("/");
    return parts.length > 2 ? `/${parts[2]}` : pathname;
  };
  
  const normalizedPath = getNormalizedPath();

  const getTitle = () => {
    switch (normalizedPath) {
      case "/dashboard":
        return "Dashboard";
      case "/board":
        return "Board";
      case "/timeline":
        return "Timeline";
      case "/calendar":
        return "Calendar";
      case "/settings":
        return "Settings";
      case "/team":
        return "Team";
      default:
        return currentProject?.name || "Project";
    }
  };

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">{getTitle()}</h1>
        {["/dashboard", "/board", "/timeline", "/calendar"].includes(normalizedPath) && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className={pathname === "/dashboard" ? "bg-primary/10" : ""} asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" size="sm" className={pathname === "/board" ? "bg-primary/10" : ""} asChild>
              <Link href="/board">Board</Link>
            </Button>
            <Button variant="outline" size="sm" className={pathname === "/timeline" ? "bg-primary/10" : ""} asChild>
              <Link href="/timeline">Timeline</Link>
            </Button>
            <Button variant="outline" size="sm" className={pathname === "/calendar" ? "bg-primary/10" : ""} asChild>
              <Link href="/calendar">Calendar</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-64 pl-9 bg-background border-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

