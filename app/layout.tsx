import type { Metadata, Viewport } from 'next'
import { Schibsted_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

// One family for everything; hierarchy comes from size, weight and colour
const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f0e0c',
}

export const metadata: Metadata = {
  // Base URL for canonical and OG images
  metadataBase: new URL('https://yarndev.co.uk'),
  
  // Primary SEO
  title: {
    default: 'Yarn Development | Software is woven, not just written',
    template: '%s | Yarn Development',
  },
  description: 'Yarn Development is a UK software studio that has spent five years building for education: maths assessment, exam generation and tools for special educational needs.',
  keywords: [
    'Yarn Development',
    'educational software',
    'EdTech UK',
    'software for schools',
    'SEND software',
    'maths assessment software',
    'exam generation',
  ],
  authors: [{ name: 'Yarn Development', url: 'https://yarndev.co.uk' }],
  creator: 'Yarn Development',
  publisher: 'Yarn Development',
  
  // Canonical URL
  alternates: {
    canonical: '/',
  },
  
  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://yarndev.co.uk',
    siteName: 'Yarn Development',
    title: 'Yarn Development | Software for education',
    description: 'Software is woven, not just written. A UK studio building software for education since 2021.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Yarn Development - Educational software',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Yarn Development | Software for education',
    description: 'Software is woven, not just written. A UK studio building software for education since 2021.',
    site: '@yarndev',
    creator: '@aspekts',
    images: ['/og.png'],
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/mark.svg', type: 'image/svg+xml' },
      { url: '/icon-512.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/icon-512.png',
  },
  
  // Manifest for PWA
  manifest: '/manifest.json',
  
  // Additional meta
  category: 'technology',
  classification: 'Software Development',
}

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://yarndev.co.uk/#organization',
      name: 'Yarn Development',
      url: 'https://yarndev.co.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yarndev.co.uk/icon-512.png',
        width: 512,
        height: 512,
      },
      description: 'A UK software studio building for education since 2021.',
      email: 'admin@yarndev.co.uk',
      sameAs: [
        'https://github.com/Yarn-Development',
        'https://linkedin.com/company/yarndev',
        'https://twitter.com/yarndev',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'admin@yarndev.co.uk',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      foundingDate: '2021',
      areaServed: {
        '@type': 'Country',
        name: 'United Kingdom',
      },
      knowsAbout: [
        'Web Development',
        'Software Engineering',
        'AI Integration',
        'EdTech',
        'Next.js',
        'React',
        'TypeScript',
        'Supabase',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://yarndev.co.uk/#website',
      url: 'https://yarndev.co.uk',
      name: 'Yarn Development',
      description: 'Educational software. Software is woven, not just written.',
      publisher: {
        '@id': 'https://yarndev.co.uk/#organization',
      },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://yarndev.co.uk/#webpage',
      url: 'https://yarndev.co.uk',
      name: 'Yarn Development | Software for education',
      description: 'Software is woven, not just written. A UK studio building software for education since 2021.',
      isPartOf: {
        '@id': 'https://yarndev.co.uk/#website',
      },
      about: {
        '@id': 'https://yarndev.co.uk/#organization',
      },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://yarndev.co.uk/#service',
      name: 'Yarn Development',
      description: 'Educational software: tools for teachers, evidence and progress tracking, and school data integrations.',
      url: 'https://yarndev.co.uk',
      logo: 'https://yarndev.co.uk/logo.svg',
      image: 'https://yarndev.co.uk/og.png',
      priceRange: '$$',
      areaServed: 'United Kingdom',
      serviceType: [
        'Educational Software Development',
        'EdTech Platform Development',
        'School Data Integration',
        'AI for Education',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Educational software services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Tools for teachers',
              description: 'Assessment, marking and question generation for schools.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Evidence and progress',
              description: 'One clear view of how each pupil is doing against their plan.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Working with school data',
              description: 'Connecting to MIS data, Microsoft 365 folders and forms.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI that shows its working',
              description: 'Language models that save staff time, with every suggestion traced to its source.',
            },
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-GB" className={`dark ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh bg-bg font-sans text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
