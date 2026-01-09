import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evriyana Indra Saputra - Frontend Developer",
  description: "A minimalist portfolio and blog for Evriyana Indra Saputra, a Frontend Developer based in Indonesia.",
  openGraph: {
    title: "Evriyana Indra Saputra - Frontend Developer",
    description: "Building beautiful, functional, and user-friendly digital experiences.",
    url: "https://evriyana.com", // Placeholder URL, update if real one exists
    siteName: "Evriyana Indra Saputra",
    images: [
      {
        url: "https://github.com/evriyanaindrasaputra.png", // Fallback to GitHub avatar for OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evriyana Indra Saputra - Frontend Developer",
    description: "Building beautiful, functional, and user-friendly digital experiences.",
    creator: "@evriyana", // Placeholder handle
    images: ["https://github.com/evriyanaindrasaputra.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
