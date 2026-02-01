"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle } from "lucide-react"


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

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-zinc-100 mb-6 text-balance">
              Initialize <em className="font-serif not-italic text-zinc-400">Connection</em>
            </h2>
            <p className="text-zinc-500 font-mono text-sm text-pretty">
              Ready to weave your idea into code?
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-yarn-surface border border-zinc-800/50 rounded-sm p-8">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="size-16 text-zinc-400 mx-auto mb-4" />
                <h3 className="text-2xl text-zinc-100 font-sans font-semibold mb-2 text-balance">
                  Message Received
                </h3>
                <p className="text-zinc-500 font-mono text-sm text-pretty">
                  We will return the signal shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">
                      Name
                    </label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-yarn-base border-zinc-800/50 text-zinc-100 font-mono rounded-sm focus:border-zinc-600 focus:ring-zinc-700/30 placeholder:text-zinc-600" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-zinc-500 uppercase">
                      Email
                    </label>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-yarn-base border-zinc-800/50 text-zinc-100 font-mono rounded-sm focus:border-zinc-600 focus:ring-zinc-700/30 placeholder:text-zinc-600" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase">
                    Project Type
                  </label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-sm bg-yarn-base border border-zinc-800/50 text-zinc-100 font-mono px-3 focus:outline-none focus:border-zinc-600 focus:ring-2 focus:ring-zinc-700/30"
                  >
                    <option className="bg-yarn-base">Full-Stack Development</option>
                    <option className="bg-yarn-base">AI Integration</option>
                    <option className="bg-yarn-base">EdTech Platform</option>
                    <option className="bg-yarn-base">Custom Software</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-zinc-500 uppercase">
                    Brief
                  </label>
                  <Textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="bg-yarn-base border-zinc-800/50 text-zinc-100 font-mono min-h-[150px] rounded-sm focus:border-zinc-600 focus:ring-zinc-700/30 placeholder:text-zinc-600" 
                    placeholder="Describe your requirements..." 
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-zinc-100 hover:bg-white text-zinc-900 font-mono uppercase h-12 rounded-sm transition-colors duration-150 disabled:opacity-50"
                >
                  {isSubmitting ? "Transmitting..." : "Transmit Data"}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </form>
            )}
          </div>

          {/* Alternative Contact */}
          <div className="mt-8 text-center">
            <p className="text-zinc-600 font-mono text-xs">
              Prefer direct contact?{" "}
              <a 
                href="mailto:admin@yarndev.co.uk" 
                className="text-zinc-400 hover:text-zinc-300 underline underline-offset-2 transition-colors duration-150"
              >
                admin@yarndev.co.uk
              </a>
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
