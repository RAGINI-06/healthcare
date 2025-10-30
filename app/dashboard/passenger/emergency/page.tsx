"use client"

import type React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { AlertCircle, Activity, Heart, MessageSquare, FileText } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

export default function EmergencyPage() {
  const [symptoms, setSymptoms] = useState("")
  const [severity, setSeverity] = useState("moderate")
  const [submitted, setSubmitted] = useState(false)

  const navigation = [
    { label: "Dashboard", href: "/dashboard/passenger", icon: <Activity className="w-5 h-5" /> },
    { label: "Emergency Request", href: "/dashboard/passenger/emergency", icon: <AlertCircle className="w-5 h-5" /> },
    { label: "Messages", href: "/dashboard/passenger/messages", icon: <MessageSquare className="w-5 h-5" /> },
    { label: "Vitals", href: "/dashboard/passenger/vitals", icon: <Heart className="w-5 h-5" /> },
    { label: "Prescriptions", href: "/dashboard/passenger/prescriptions", icon: <FileText className="w-5 h-5" /> },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <DashboardLayout title="Emergency Request" role="passenger" navigation={navigation}>
      <div className="space-y-6 max-w-2xl">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Emergency Medical Request</CardTitle>
            <CardDescription>Describe your medical emergency and symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="severity">Severity Level</Label>
                <select
                  id="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Describe Your Symptoms</Label>
                <Textarea
                  id="symptoms"
                  placeholder="Please describe what you're experiencing..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="min-h-32"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-destructive hover:bg-destructive/90">
                Submit Emergency Request
              </Button>
            </form>

            {submitted && (
              <div className="mt-4 p-4 bg-[var(--success)]/10 border border-[var(--success)] rounded-lg">
                <p className="text-[var(--success)] font-medium">✓ Emergency request submitted successfully</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Medical staff has been notified and will assist you shortly.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle>Emergency Response Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <div className="w-3 h-3 rounded-full bg-[var(--warning)] animate-pulse"></div>
                <div>
                  <p className="font-medium text-foreground">Attendant Assigned</p>
                  <p className="text-sm text-muted-foreground">Paramedic John Smith - ETA 2 minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
