import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import SessionProviderWrapper from '@/components/sessionProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Microservices Shop Frontend',
  description: 'Microservices Frontend developed with Next.js, backend with Java Spring Boot',
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="p-4">
            {children}
          </main>
        </body>
      </html>
    </SessionProviderWrapper>
  )
}