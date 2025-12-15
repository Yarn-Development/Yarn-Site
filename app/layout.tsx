import type { Metadata } from 'next'
import dynamic from 'next/dynamic' // <--- 1. Import dynamic
import { Playfair_Display, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

// 2. Dynamically import the heavy visual components
// { ssr: false } prevents the server from trying to render WebGL/Window logic
const LoomBackground = dynamic(
  () => import('@/components/canvas/LoomBackground').then((mod) => mod.LoomBackground),
  { ssr: false }
)

const WovenScroll = dynamic(
  () => import('@/components/ui/woven-scroll').then((mod) => mod.WovenScroll),
  { ssr: false }
)

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
  title: 'Yarn Development | Digital Product Studio',
  description: 'Weaving innovative ideas into scalable code.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${serif.variable} ${mono.variable}`}>
      <body className="font-mono antialiased bg-black text-white min-h-screen selection:bg-fuchsia-500 selection:text-white">
        
        {/* 3. Render the dynamic components */}
        <LoomBackground />
        <WovenScroll />
        
        {/* Ensure z-index is explicitly higher than the background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
        
        <Toaster />
      </body>
    </html>
  )
}