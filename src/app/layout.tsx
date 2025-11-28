import type { Metadata } from "next";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://remix-of-monochrome-app-directory.vercel.app'),
  title: {
    default: 'Curated iOS & macOS Apps, Workflows & Tools Directory',
    template: '%s | AppDirectory'
  },
  description: 'Discover hand-picked iOS & macOS apps, n8n workflows, GitHub repositories, and MCPs. Free and premium tools curated for quality and innovation. Built with Atomize Design System v3.0.',
  keywords: [
    'iOS apps',
    'macOS apps',
    'free apps',
    'paid apps',
    'premium apps',
    'n8n workflows',
    'automation',
    'GitHub repositories',
    'MCP',
    'Model Context Protocol',
    'curated apps',
    'app directory',
    'iOS development',
    'macOS development',
    'student apps',
    'productivity apps',
    'developer tools',
    'Atomize Design System'
  ],
  authors: [{ name: 'AppDirectory Team' }],
  creator: 'AppDirectory',
  publisher: 'AppDirectory',
  openGraph: {
    title: 'Curated iOS & macOS Apps, Workflows & Tools Directory',
    description: 'Discover hand-picked free and premium iOS & macOS tools, n8n workflows, and developer resources',
    url: 'https://remix-of-monochrome-app-directory.vercel.app',
    siteName: 'AppDirectory',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AppDirectory - Curated iOS & macOS Apps'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Curated iOS & macOS Apps, Workflows & Tools Directory',
    description: 'Discover hand-picked free and premium tools for developers and students',
    images: ['/og-image.png'],
    creator: '@appdirectory'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen bg-background text-foreground font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorReporter />
          <Script
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
            strategy="afterInteractive"
            data-target-origin="*"
            data-message-type="ROUTE_CHANGE"
            data-include-search-params="true"
            data-only-in-iframe="true"
            data-debug="true"
            data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
          />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <VisualEditsMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}