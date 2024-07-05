import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { Providers } from './providers'
import React from 'react'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Simple wallet app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={poppins.className}>{children}</body>
      </Providers>
    </html>
  )
}
