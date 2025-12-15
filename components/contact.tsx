"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"


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
    window.location.href = 'mailto:admin@yarndev.co.uk?subject=Project Inquiry'
  }

  const handleScheduleCall = () => {
    // Replace with your actual calendar booking URL (e.g., Calendly)
    window.open('https://calendly.com/yarndev', '_blank')
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Initialize Connection
            </h2>
            <p className="text-gray-400 font-mono">
              Ready to weave your idea into code?
            </p>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-8 backdrop-blur-md shadow-2xl">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl text-white font-serif mb-2">Message Received</h3>
                <p className="text-gray-400 font-mono">We will return the signal shortly.</p>
              </div>
            ) : (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Name</label>
                    <Input className="bg-white/5 border-white/10 text-white font-mono focus:border-cyan-500/50 focus:ring-cyan-500/20" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Email</label>
                    <Input className="bg-white/5 border-white/10 text-white font-mono focus:border-cyan-500/50 focus:ring-cyan-500/20" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Project Type</label>
                  <select className="w-full h-10 rounded-md bg-white/5 border border-white/10 text-white font-mono px-3 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20">
                    <option className="bg-black">Full-Stack Development</option>
                    <option className="bg-black">AI Integration</option>
                    <option className="bg-black">EdTech Platform</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Brief</label>
                  <Textarea 
                    className="bg-white/5 border-white/10 text-white font-mono min-h-[150px] focus:border-cyan-500/50 focus:ring-cyan-500/20" 
                    placeholder="Describe your requirements..." 
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white font-mono uppercase tracking-widest h-12">
                  Transmit Data <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}