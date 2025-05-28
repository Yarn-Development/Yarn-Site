import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  	{
		title: "Sendix",
		description:
			"AI-powered cold email platform that personalizes outreach based on enriched lead data with GPT-based message personalization and smart follow-up suggestions.",
		image: "/sendix.png?height=200&width=400",
		tags: ["GPT-4", "Hunter.io", "Supabase", "TypeScript", "React"],
		category: "Sales Enablement / Outreach SaaS",
		status: "Actively developed",
	},
	{
		title: "Statisfy",
		description:
			"Uses large language models to provide deep, contextual analysis of social media performance with GPT-powered post interpretation and auto-generated content improvement suggestions.",
		image: "/statisfy.png?height=200&width=400",
		tags: ["OpenAI", "Supabase", "React", "Node.js", "LLMs"],
		category: "Social Media Analytics",
		status: "MVP in testing",
	},
	{
		title: "QGenie",
		description:
			"Generates exam-style questions and answer keys from any topic using GPT-4, with LaTeX-powered formatting for GCSE and A-level exam preparation.",
		image: "/qgenie.png?height=200&width=400",
		tags: ["GPT-4", "LaTeX", "React", "Express", "MongoDB"],
		category: "EdTech / AI Content Generation",
		status: "Actively developed",
	},
	{
		title: "Scrybe",
		description:
			"Real-time handwritten and printed note scanning with live text extraction, translation, and export capabilities. Works offline with progressive enhancement.",
		image: "/placeholder.svg?height=200&width=400",
		tags: ["Tesseract.js", "Google Vision API", "React", "TypeScript", "OCR"],
		category: "OCR / Real-Time Transcription",
		status: "Proof of concept complete",
	},
	{
		title: "EduCast",
		description:
			"Full-stack educational platform for hosting curriculum-based video content, worksheets, and assessments with AI-generated assessment builder and teacher dashboards.",
		image: "/placeholder.svg?height=200&width=400",
		tags: ["React", "Bootstrap", "Node.js", "Supabase", "Stripe"],
		category: "Educational Video Platform",
		status: "Ongoing commission",
	},

]

export function Projects() {
	return (
		<section id="projects" className="py-20 bg-white">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Our Portfolio
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Discover Yarn Development's innovative solutions spanning AI
						integrations, educational technology, and specialized SaaS platforms
						designed to solve real-world problems.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, index) => (
						<Card
							key={index}
							className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
						>
							<div className="relative overflow-hidden">
								<img
									src={project.image || "/placeholder.svg"}
									alt={project.title}
									className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute top-4 left-4">
									<Badge
										variant="secondary"
										className="bg-white/90 text-gray-700"
									>
										{project.category}
									</Badge>
								</div>
								<div className="absolute top-4 right-4">
									<Badge
										variant="outline"
										className="bg-white/90 text-gray-700 text-xs"
									>
										{project.status}
									</Badge>
								</div>
							</div>

							<CardHeader>
								<CardTitle className="text-xl font-bold text-gray-900">
									{project.title}
								</CardTitle>
								<CardDescription className="text-gray-600">
									{project.description}
								</CardDescription>
							</CardHeader>

							<CardContent>
								<div className="flex flex-wrap gap-2 mb-4">
									{project.tags.map((tag, tagIndex) => (
										<Badge
											key={tagIndex}
											variant="outline"
											className="text-xs"
										>
											{tag}
										</Badge>
									))}
								</div>

								<div className="flex gap-2">
									<Button
										size="sm"
										variant="outline"
										className="flex-1"
									>
										<Github className="w-4 h-4 mr-2" />
										Code
									</Button>
									<Button
										size="sm"
										className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600"
									>
										<ExternalLink className="w-4 h-4 mr-2" />
										Demo
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<Button size="lg" variant="outline" className="px-8">
						View All Projects
					</Button>
				</div>
			</div>
		</section>
	)
}
