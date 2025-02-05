"use client"

import { useState } from "react"
import {
  Home,
  ShoppingBag,
  Heart,
  MessageSquare,
  History,
  Receipt,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import clsx from "clsx"

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: ShoppingBag, label: "Food Order" },
  { icon: Heart, label: "Favorite" },
  { icon: MessageSquare, label: "Message" },
  { icon: History, label: "Order History" },
  { icon: Receipt, label: "Bills" },
  { icon: Settings, label: "Setting" },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="absolute -right-3 top-8 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-white"
      >
        {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>

      <nav
        className={clsx(
          "relative h-screen border-r bg-white transition-all duration-300",
          expanded ? "w-[240px]" : "w-[70px]",
        )}
      >
        <div className="p-4">
          <div
            className={clsx("flex items-center gap-2 overflow-hidden", expanded ? "justify-start" : "justify-center")}
          >
            <span className="text-xl font-bold">
              Go<span className="text-[#FFB800]">Meal</span>
              {expanded && "."}
            </span>
          </div>
        </div>

        <div className="space-y-2 p-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className={clsx(
                "group flex items-center gap-2 rounded-lg transition-all",
                expanded ? "px-3 py-2" : "justify-center p-2",
                item.active ? "bg-[#FFB800] text-white" : "text-gray-500 hover:bg-[#FFB800]/10 hover:text-[#FFB800]",
              )}
            >
              <item.icon className="h-5 w-5" />
              {expanded && <span>{item.label}</span>}
              {!expanded && (
                <div className="absolute left-full ml-6 hidden rounded-md bg-black px-2 py-1 text-xs text-white group-hover:block">
                  {item.label}
                </div>
              )}
            </a>
          ))}
        </div>

        {expanded && (
          <div className="absolute bottom-8 left-4 right-4">
            <div className="rounded-xl bg-[#FFB800]/10 p-4">
              <h3 className="text-sm font-medium mb-2">Upgrade your Account to Get Free Voucher</h3>
              <button className="w-full rounded-lg bg-[#FFB800] px-4 py-2 text-sm text-white">Upgrade</button>
            </div>
          </div>
        )}
      </nav>
    </aside>
  )
}

