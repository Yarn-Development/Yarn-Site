import type { Metadata } from 'next'
import { Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css' // We will fix this connection in Step 3
import { Toaster } from "@/components/ui/toaster"
import { VisualEffects } from "@/components/layout/VisualEffects"

const serif = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yarn Development',
  keywords: ['Yarn', 'Development', 'Web Development', 'Software Engineering'],
  authors: [{ name: 'Yarn Development Team', url: 'https://yarndev.co.uk' }],
  openGraph: {
    title: 'Yarn Development',
    description: 'Yarn Development - Building the Future of Web Applications',
    url: 'https://yarndev.co.uk',
    siteName: 'Yarn Development',
    images: [
      {
        url: 'https://yarndev.co.uk/yarntp.png',
        width: 1200,
        height: 630,
        alt: 'Yarn Development Logo Image',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yarn Development',
    description: 'Yarn Development - Building the Future of Web Applications',
    site: '@yarndev',
    creator: '@aspekts',
    images: ['https://yarndev.co.uk/yarntp.png'],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${serif.variable} ${mono.variable}`}>
      <body 
        className="font-mono antialiased"
        // CRITICAL: These inline styles fix the white screen issues
        style={{ 
          backgroundColor: '#050505', 
          color: '#ffffff',
          minHeight: '100vh',
          margin: 0
        }}
      >
        
        {/* Visual Effects Layer (Self-contained) */}
        <VisualEffects />
        
        {/* Content Layer */}
        {/* position: relative ensures this sits ON TOP of the fixed background */}
        <div 
          style={{ position: 'relative', zIndex: 10 }}
          className="flex flex-col min-h-screen"
        >
          {children}
        </div>
        
        <Toaster />
      </body>
    </html>
  )
}