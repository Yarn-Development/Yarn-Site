import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
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
import { Playfair_Display } from 'next/font/google'
const editorial = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Yarn Development | Creative Technology Studio',
  description: 'Software is woven, not just written. A creative technology studio turning innovative concepts into scalable digital products.',
  keywords: ['Yarn', 'Development', 'Web Development', 'Software Engineering', 'Creative Technology', 'Next.js', 'React'],
  authors: [{ name: 'Yarn Development Team', url: 'https://yarndev.co.uk' }],
  openGraph: {
    title: 'Yarn Development | Creative Technology Studio',
    description: 'Software is woven, not just written. A creative technology studio turning innovative concepts into scalable digital products.',
    url: 'https://yarndev.co.uk',
    siteName: 'Yarn Development',
    images: [
      {
        url: 'https://yarndev.co.uk/yarntp.png',
        width: 1200,
        height: 630,
        alt: 'Yarn Development Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yarn Development | Creative Technology Studio',
    description: 'Software is woven, not just written.',
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
    <html 
      lang="en" 
      className={`dark ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${editorial.variable}`}
    >
      <body 
        className="font-body antialiased min-h-dvh"
        style={{ 
          backgroundColor: '#030303', 
          color: '#fafafa',
        }}
      >
        {/* Content Layer */}
        <div className="relative z-10 flex flex-col min-h-dvh">
          {children}
        </div>
        
        <Toaster />
      </body>
    </html>
  )
}
