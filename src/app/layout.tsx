import './globals.css'
import { Mulish } from 'next/font/google'

const mulish = Mulish({ subsets: ['latin'], weight: '300' })

export const metadata = {
  title: 'Video Messages',
  description: 'Send a video message!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={mulish.className}>{children}</body>
    </html>
  )
}
