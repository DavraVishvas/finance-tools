import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfimageconvert.com"),

  title:
    "Finance Tools - Free EMI, SIP, and Compound Interest Calculators",

  description:
    "Free online financial calculators. Calculate EMI for loans, SIP returns, and compound interest in seconds. Fast, secure, and accurate.",

  keywords: [
    "emi calculator",
    "sip calculator",
    "compound interest calculator",
    "financial tools",
    "loan calculator",
    "mutual fund calculator",
    "investment tools",
  ],

  openGraph: {
    title: "Finance Tools - Free EMI, SIP, and Compound Interest Calculators",
    description: "Free online financial calculators. Calculate EMI for loans, SIP returns, and compound interest in seconds.",
    url: "https://pdfimageconvert.com",
    siteName: "Finance Tools",
    type: "website",
    images: [
      {
        url: "https://pdfimageconvert.com/logo.png",
        width: 800,
        height: 600,
        alt: "Finance Tools Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Finance Tools - Free EMI, SIP, and Compound Interest Calculators",
    description: "Free online financial calculators. Calculate EMI for loans, SIP returns, and compound interest in seconds.",
    images: ["https://pdfimageconvert.com/logo.png"],
  },

  icons: {
    icon: "/icon.png",
  },

  other: {
    "ff798ddb2835c2248764bcc390c440b9ab04b787": "ff798ddb2835c2248764bcc390c440b9ab04b787",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://pdfimageconvert.com/#website",
      url: "https://pdfimageconvert.com",
      name: "Finance Tools",
      description: "Free online financial calculators. Calculate EMI for loans, SIP returns, and compound interest in seconds.",
      publisher: {
        "@id": "https://pdfimageconvert.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://pdfimageconvert.com/#organization",
      name: "Finance Tools",
      url: "https://pdfimageconvert.com",
      logo: {
        "@type": "ImageObject",
        url: "https://pdfimageconvert.com/logo.png",
      },
    },
  ],
};

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "next-themes";

import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <head suppressHydrationWarning>
        <meta name="referrer" content="no-referrer-when-downgrade" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body suppressHydrationWarning className={`${ibmPlexSans.className} antialiased min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300 overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              className: '!bg-zinc-900 !text-white dark:!bg-zinc-800 dark:!text-white border border-zinc-800 dark:border-zinc-700 shadow-2xl rounded-2xl font-medium px-5 py-4',
              error: {
                icon: '❌',
                className: '!bg-red-600 !text-white !border-red-700 dark:!bg-red-900 dark:!text-red-100 dark:!border-red-800 shadow-2xl shadow-red-900/50 rounded-2xl font-medium px-5 py-4',
                duration: 5000,
              },
              success: {
                icon: '✅',
                className: '!bg-green-600 !text-white !border-green-700 dark:!bg-green-900 dark:!text-green-100 dark:!border-green-800 shadow-2xl shadow-green-900/50 rounded-2xl font-medium px-5 py-4',
                duration: 4000,
              }
            }}
          />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html >
  );
}
