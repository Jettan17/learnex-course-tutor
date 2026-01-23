import type { Metadata } from "next";
import { Oswald, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NTU Course Tutor",
  description: "Adaptive learning platform for NTU Semester 2 courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex justify-between h-20">
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-3 group">
                  <span className="font-heading text-2xl font-bold tracking-tight text-neutral-900 dark:text-white uppercase">
                    NTU <span className="text-neutral-400">Course Tutor</span>
                  </span>
                </Link>
                <div className="hidden sm:ml-16 sm:flex sm:space-x-2">
                  <Link
                    href="/"
                    className="nav-link text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href="/courses"
                    className="nav-link text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    Courses
                  </Link>
                  <Link
                    href="/review"
                    className="nav-link text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    Review
                  </Link>
                  <Link
                    href="/visualize"
                    className="nav-link text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors"
                  >
                    Visualize
                  </Link>
                </div>
              </div>
              {/* Mobile menu */}
              <div className="flex items-center sm:hidden">
                <div className="flex space-x-4">
                  <Link href="/" className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </Link>
                  <Link href="/courses" className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </Link>
                  <Link href="/review" className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </Link>
                  <Link href="/visualize" className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>

        {/* Footer */}
        <footer className="mt-24 py-12 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <span className="font-heading text-sm font-medium tracking-widest text-neutral-400 uppercase">
                NTU Course Tutor
              </span>
              <p className="text-sm text-neutral-400 tracking-wide">
                Powered by FSRS spaced repetition
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
