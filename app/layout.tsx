import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CampusFlow - Campus Clubs',
  description: 'Campus event automation platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
