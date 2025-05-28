"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Calendar, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  description: string
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    projectType: "Full-Stack Development",
    description: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          to: 'admin@yarndev.co.uk',
          subject: `New Project Inquiry: ${formData.projectType}`
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "Full-Stack Development",
          description: ""
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@yarndev.co.uk?subject=Project Inquiry'
  }

  const handleScheduleCall = () => {
    // Replace with your actual calendar booking URL (e.g., Calendly)
    window.open('https://calendly.com/yarndev', '_blank')
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Let's Build Something Amazing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to turn your innovative idea into a practical digital solution? Let's discuss your project and
              explore how we can help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Options */}
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Email Us</CardTitle>
                  <CardDescription>Get in touch for project inquiries</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={handleEmailClick}>
                    hello@yarndev.co.uk
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Schedule a Call</CardTitle>
                  <CardDescription>Book a free consultation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" onClick={handleScheduleCall}>
                    Book Meeting
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Start Your Project</CardTitle>
                  <CardDescription>Tell us about your idea and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span>Thank you! We'll get back to you within 24 hours.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      <AlertCircle className="w-5 h-5" />
                      <span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                        <Input 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your name" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                        <Input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                      <Input 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company (optional)" 
                      />
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Project Type</label>
                      <select 
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option>Full-Stack Development</option>
                        <option>AI Integration</option>
                        <option>Educational Technology</option>
                        <option>MVP Development</option>
                        <option>Sales Enablement Tools</option>
                        <option>OCR/Document Processing</option>
                        <option>Consulting</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Project Description</label>
                      <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>

                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Project Details'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
