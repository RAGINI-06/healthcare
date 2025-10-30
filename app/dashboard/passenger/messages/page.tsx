"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Activity, Heart, MessageSquare, FileText, AlertCircle, Send } from "lucide-react"
import { useState } from "react"

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Sarah", role: "Doctor", message: "How are you feeling now?", time: "10:30 AM" },
    { id: 2, sender: "You", role: "Passenger", message: "Better, thank you for checking", time: "10:32 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const navigation = [
    { label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> },
    { label: "Emergency Request", href: "/dashboard/passenger/emergency", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Messages", href: "/dashboard/passenger/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Vitals", href: "/dashboard/passenger/vitals", icon: <Heart className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/passenger/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "You", role: "Passenger", message: newMessage, time: "Now" },
      ])
      setNewMessage("")
    }
  }

  return (
    <DashboardLayout title="Live Chat" role="passenger" navigation={navigation}>
      <div className="space-y-6 max-w-2xl">
        <Card className="border-border flex flex-col h-[600px]">
          <CardHeader>
            <CardTitle>Chat with Medical Staff</CardTitle>
            <CardDescription>Connected with Dr. Sarah and Paramedic John</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm font-medium">{msg.sender}</p>
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
          <div className="border-t border-border p-4 space-y-2">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
