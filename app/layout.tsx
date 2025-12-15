import type { Metadata } from 'next';
import './globals.css';
import { Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { LoomBackground } from '@/components/canvas/LoomBackground';
import { Toaster } from '@/components/ui/toaster';
import { WovenScroll } from '@/components/ui/woven-scroll';
const serif = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-serif' 
})
const mono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono' 
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
      <body className="font-mono antialiased bg-black text-white min-h-screen selection:bg-fuchsia-500 selection:text-white">
        
        {/* The Digital Loom Background (The Void) */}
        <LoomBackground />
        <WovenScroll />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
        
        <Toaster />
      </body>
    </html>
  )
}