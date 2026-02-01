import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

// Geist Sans - Primary heading font
const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

// Geist Mono - Technical/code font
const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

// Inter - Body text font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Editorial New - Serif accent font (fallback to system serif if not available)
// Using Playfair Display as a fallback since Editorial New requires licensing
const editorial = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
  style: ['normal', 'italic'],
})

// Viewport configuration for mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#030303',
}

export const metadata: Metadata = {
  // Base URL for canonical and OG images
  metadataBase: new URL('https://yarndev.co.uk'),
  
  // Primary SEO
  title: {
    default: 'Yarn Development | Creative Technology Studio in the UK',
    template: '%s | Yarn Development',
  },
  description: 'Software is woven, not just written. Yarn Development is a UK-based creative technology studio specializing in full-stack development, AI integration, and EdTech platforms. We transform ambitious ideas into scalable digital products.',
  keywords: [
    'Yarn Development',
    'web development UK',
    'software engineering',
    'creative technology studio',
    'full-stack development',
    'Next.js development',
    'React developers',
    'AI integration',
    'EdTech platforms',
    'custom software development',
    'Supabase',
    'TypeScript',
    'digital product development',
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
    title: 'Yarn Development | Creative Technology Studio',
    description: 'Software is woven, not just written. A UK-based creative technology studio turning innovative concepts into scalable digital products with full-stack development, AI integration, and EdTech expertise.',
    images: [
      {
        url: '/yarntp.png',
        width: 1200,
        height: 630,
        alt: 'Yarn Development - Creative Technology Studio',
        type: 'image/png',
      },
    ],
  },
  
  // Twitter/X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Yarn Development | Creative Technology Studio',
    description: 'Software is woven, not just written. Full-stack development, AI integration, and EdTech platforms.',
    site: '@yarndev',
    creator: '@aspekts',
    images: ['/yarntp.png'],
  },
  
  // Icons
  icons: {
    icon: [
      { url: '/yarntp.svg', type: 'image/svg+xml' },
      { url: '/yarntp.png', type: 'image/png' },
    ],
    apple: '/yarntp.png',
    shortcut: '/yarntp.png',
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
        url: 'https://yarndev.co.uk/yarntp.png',
        width: 512,
        height: 512,
      },
      description: 'A UK-based creative technology studio specializing in full-stack development, AI integration, and EdTech platforms.',
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
      foundingDate: '2024',
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
      description: 'Creative Technology Studio - Software is woven, not just written.',
      publisher: {
        '@id': 'https://yarndev.co.uk/#organization',
      },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://yarndev.co.uk/#webpage',
      url: 'https://yarndev.co.uk',
      name: 'Yarn Development | Creative Technology Studio',
      description: 'Software is woven, not just written. A UK-based creative technology studio turning innovative concepts into scalable digital products.',
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
      description: 'Full-stack development, AI integration, and EdTech platform development services.',
      url: 'https://yarndev.co.uk',
      logo: 'https://yarndev.co.uk/yarntp.png',
      image: 'https://yarndev.co.uk/yarntp.png',
      priceRange: '$$',
      areaServed: 'United Kingdom',
      serviceType: [
        'Full-Stack Development',
        'AI Integration',
        'EdTech Platform Development',
        'Custom Software Development',
        'Product Strategy',
        'MVP Development',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Development Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full-Stack Engineering',
              description: 'Next.js, Supabase, and Vercel architecture. Scalable, type-safe applications with modern tooling.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Integration',
              description: 'LLM implementation & RAG pipelines for intelligent applications.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'EdTech Platforms',
              description: 'Specialized learning environments with real-time assessment tools.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Product Strategy',
              description: 'From napkin sketch to validated MVP. Bridging creative spark and technical execution.',
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
    <html 
      lang="en-GB" 
      className={`dark ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${editorial.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body 
        className="font-body antialiased min-h-dvh"
        style={{ 
          backgroundColor: '#030303', 
          color: '#fafafa',
        }}
      >
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-zinc-900 focus:rounded-sm"
        >
          Skip to main content
        </a>
        
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-dvh">
          {children}
        </div>
        
        <Toaster />
      </body>
    </html>
  )
}
