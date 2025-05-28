# Yarn Development Portfolio Website

A modern, responsive portfolio website showcasing Yarn Development's innovative technology solutions and services.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/aspekts-projects/v0-yarn-development-portfolio)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🧶 About Yarn Development

Yarn Development is a creative technology studio that transforms innovative ideas into practical digital solutions. We specialize in:

- **AI Integration** - LLM-powered applications and intelligent automation
- **Educational Technology** - Interactive learning platforms and assessment tools
- **Full-Stack Development** - Scalable web and mobile applications
- **Sales Enablement** - Data-driven outreach and analytics platforms
- **OCR & Document Processing** - Real-time transcription and text extraction

## 🚀 Featured Projects

### [Statisfy](https://statisfy.js.org) - Social Media Analytics
AI-powered platform using LLMs for deep social media analysis and content optimization.
**Tech Stack:** OpenAI, Supabase, React, Node.js

### [QGenie](https://qgenie.co.uk) - AI Question Generator
Generates exam-style questions with LaTeX formatting for GCSE and A-level preparation.
**Tech Stack:** GPT-4, LaTeX, React, Express, MongoDB

### [Sendix](https://sendix.ai) - Sales Outreach SaaS
AI-powered cold email platform with lead enrichment and personalization.
**Tech Stack:** GPT-4, Hunter.io API, Supabase, TypeScript, React

### [Scrybe]() - Real-time OCR
Live handwriting and document transcription with translation capabilities.
**Tech Stack:** Tesseract.js, Google Vision API, React, TypeScript

### EduCast - Educational Platform
Full-stack video learning platform with AI-generated assessments.
**Tech Stack:** React, Bootstrap, Node.js, Supabase, Stripe



## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

### Backend & Services
- **Email:** Nodemailer with SMTP
- **Database:** Supabase (PostgreSQL)
- **AI Integration:** OpenAI GPT-4
- **Deployment:** Vercel

### Development Tools
- **Package Manager:** npm/yarn
- **Code Quality:** ESLint, Prettier
- **Version Control:** Git

## 📁 Project Structure

```
yarn-site/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── privacy/           # Privacy policy page
│   ├── terms/             # Terms of service page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── contact.tsx       # Contact form
│   ├── header.tsx        # Navigation header
│   ├── hero.tsx          # Hero section
│   ├── projects.tsx      # Projects showcase
│   └── legal-layout.tsx  # Legal pages layout
├── public/               # Static assets
└── lib/                  # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-repo/yarn-site.git
cd yarn-site
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your environment variables:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

The contact form requires SMTP configuration. Supported providers:
- Gmail (with app passwords)
- SendGrid
- Mailgun
- Custom SMTP servers

## 🎨 Design Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Custom CSS animations and transitions
- **Modern UI** - Clean, professional design with gradient accents
- **Accessibility** - WCAG compliant with proper semantic HTML
- **SEO Optimized** - Meta tags, structured data, and performance optimized

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website:** [yarndev.co.uk](https://yarndev.co.uk)
- **Email:** hello@yarndev.co.uk
- **Projects:** View our live portfolio at [yarndev.co.uk/#projects](https://yarndev.co.uk/#projects)

---

**Built with ❤️ by Yarn Development**

*Weaving Technology Into Stories*