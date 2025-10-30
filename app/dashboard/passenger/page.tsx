"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Activity, Send, Download } from "lucide-react"
import { useState } from "react"

export default function PassengerDashboard() {
  const [emergencyActive, setEmergencyActive] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [messages, setMessages] = useState([
    { id: 1, sender: "Dr. Smith", text: "How are you feeling?", time: "2:30 PM" },
    { id: 2, sender: "You", text: "Better, thank you", time: "2:35 PM" },
  ])
  const [messageInput, setMessageInput] = useState("")

  const navigation = [{ label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> }]

  const vitals = [
    { label: "Blood Pressure", value: "120/80", status: "normal", emoji: "💓" },
    { label: "Heart Rate", value: "72 bpm", status: "normal", emoji: "❤️" },
    { label: "SpO2", value: "98%", status: "normal", emoji: "💨" },
    { label: "Temperature", value: "37.2°C", status: "normal", emoji: "🌡️" },
  ]

  const prescriptions = [
    { id: 1, medication: "Aspirin", dosage: "500mg", frequency: "Twice daily", date: "2024-10-20" },
    { id: 2, medication: "Vitamin D", dosage: "1000 IU", frequency: "Once daily", date: "2024-10-18" },
  ]

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: "You", text: messageInput, time: "Now" }])
      setMessageInput("")
    }
  }

  return (
    <DashboardLayout title="🚑 Passenger Portal" role="passenger" navigation={navigation}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="emergency">🚨 Emergency</TabsTrigger>
          <TabsTrigger value="messages">💬 Messages</TabsTrigger>
          <TabsTrigger value="vitals">📊 Vitals</TabsTrigger>
          <TabsTrigger value="prescriptions">💊 Prescriptions</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-border bg-gradient-to-br from-red-50 to-transparent hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">🚨 Emergency Assistance</CardTitle>
                <CardDescription>Request immediate medical help</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className={`w-full transition-all duration-300 ${
                    emergencyActive
                      ? "bg-destructive hover:bg-destructive/90 animate-pulse"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                  onClick={() => setEmergencyActive(!emergencyActive)}
                >
                  {emergencyActive ? "❌ Cancel Request" : "🆘 Request Help"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-gradient-to-br from-blue-50 to-transparent hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">💬 Live Chat</CardTitle>
                <CardDescription>Connect with medical staff</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent hover:bg-primary/10 transition-colors">
                  💭 Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--success)] animate-pulse"></div>
                  <span className="text-lg font-semibold text-foreground">✅ Stable</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Train Info</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">🚂 Express 12A</p>
                <p className="text-xs text-muted-foreground">Coach C, Seat 45</p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Next Station</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-foreground">🏁 Central Station</p>
                <p className="text-xs text-muted-foreground">45 minutes away</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📋 Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border hover:bg-muted/30 p-2 rounded transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">📊 Vitals recorded</p>
                    <p className="text-sm text-muted-foreground">BP: 120/80, SPO2: 98%</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 hover:bg-muted/30 p-2 rounded transition-colors">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-foreground">✅ Checked in with attendant</p>
                    <p className="text-sm text-muted-foreground">All systems normal</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Tab */}
        <TabsContent value="emergency" className="space-y-6">
          <Card className="border-border border-red-200 bg-red-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🚨 Report Emergency</CardTitle>
              <CardDescription>Describe your medical emergency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Severity Level</label>
                <div className="flex gap-2">
                  {["🟢 Low", "🟡 Medium", "🟠 High", "🔴 Critical"].map((level) => (
                    <Button
                      key={level}
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-primary/10 transition-colors"
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Symptoms</label>
                <Textarea placeholder="Describe your symptoms..." className="min-h-24" />
              </div>
              <Button className="w-full bg-destructive hover:bg-destructive/90 transition-all">
                🆘 Submit Emergency Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💬 Live Chat with Medical Staff</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-96 border border-border rounded-lg p-4 overflow-y-auto space-y-3 bg-muted/30">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} animate-fadeIn`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg transition-all duration-300 ${
                        msg.sender === "You"
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-foreground border border-border shadow-sm"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="transition-all focus:ring-2"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 transition-all"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vitals Tab */}
        <TabsContent value="vitals" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📊 Current Vital Signs</CardTitle>
              <CardDescription>Real-time health monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vitals.map((vital) => (
                  <div
                    key={vital.label}
                    className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-blue-50 to-transparent"
                  >
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      {vital.emoji} {vital.label}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-foreground">{vital.value}</p>
                      <Badge className="bg-[var(--success)] animate-pulse">{vital.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📈 Vitals History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm py-2 border-b border-border hover:bg-muted/30 px-2 rounded transition-colors">
                  <span className="text-muted-foreground">💓 BP: 120/80</span>
                  <span className="text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-b border-border hover:bg-muted/30 px-2 rounded transition-colors">
                  <span className="text-muted-foreground">❤️ HR: 72 bpm</span>
                  <span className="text-muted-foreground">4 hours ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">💊 E-Prescriptions</CardTitle>
              <CardDescription>Your digital prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 border border-border rounded-lg flex items-center justify-between hover:shadow-md transition-all duration-300 bg-gradient-to-r from-green-50 to-transparent"
                  >
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">💊 {rx.medication}</p>
                      <p className="text-sm text-muted-foreground">
                        {rx.dosage} • {rx.frequency}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">📅 {rx.date}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover:bg-primary/10 transition-colors bg-transparent"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
