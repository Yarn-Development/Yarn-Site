import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
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
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
