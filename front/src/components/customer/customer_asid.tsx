"use client"
import ChatSidebarcustomer from "./ChatCustomer/chatcustomerSidebar"
import ChatWindowcustomer from "./ChatCustomer/chatwindowcustomer"
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

export function Sidebar() {
  const [expanded, setExpanded] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'messages'>('profile');
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: ShoppingBag, label: "Food Order" },
    { icon: Heart, label: "Favorite" },
    { 
      icon: MessageSquare, 
      label: "Messages", 
      onClick: () => {
        setActiveTab('messages');
        setActiveChat(null);
      }
    },
    { icon: History, label: "Order History" },
    { icon: Receipt, label: "Bills" },
    { icon: Settings, label: "Setting" },
  ];

  return (
    <aside className="relative">
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
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() => {
                  if (item.onClick) {
                    item.onClick();
                  } else {
                    setActiveTab(item.label.toLowerCase() as any);
                  }
                }}
                className={clsx(
                  "flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-gray-100",
                  activeTab === item.label.toLowerCase() ? 'bg-[#FFB800]/10 text-[#FFB800]' : ''
                )}
              >
                <item.icon className="h-5 w-5" />
                {expanded && <span>{item.label}</span>}
              </li>
            ))}
          </ul>
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

      {activeTab === 'messages' && (
        <div className="fixed left-[240px] top-0 h-screen w-[800px] bg-white shadow-lg z-50 flex transform transition-transform duration-300">
          <div className="relative flex w-full">
            <button
              onClick={() => setActiveTab('profile')}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <ChatSidebarcustomer onSelectChat={setActiveChat} />
            {activeChat && (
              <div className="flex-1 border-l border-gray-200">
                <ChatWindowcustomer chatId={activeChat} />
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  )
}
