import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'DeGi Folio - Digital Portfolio Analysis',
  description: 'Discover opportunities based on your digital presence',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          firaCode.variable,
          'font-sans antialiased'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex flex-col min-h-screen">
            {/* Background elements */}
            <div className="fixed inset-0 -z-10 bg-background" />
            <div
              className="fixed inset-0 -z-10 opacity-20 
              bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] 
              pointer-events-none dark:opacity-10"
            />

            <Navbar />
            <main
              className="flex-1 pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 lg:pb-20 
              px-4 sm:px-6 md:px-8 mx-auto w-full max-w-7xl"
            >
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-border">
              <div
                className="container max-w-7xl mx-auto py-6 px-4 sm:px-6 md:px-8
                flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-tr 
                    from-primary to-accent flex items-center 
                    justify-center text-white font-bold"
                  >
                    DF
                  </div>
                  <span className="font-bold gradient-heading">DeGi Folio</span>
                </div>
                <div className="text-muted-foreground">
                  &copy; {new Date().getFullYear()} DeGi Folio. All rights
                  reserved.
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
