import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";
import SmoothScroll from "./components/system/SmoothScroll";
import CustomCursor from "./components/system/CustomCursor";
import CommandPalette from "./components/system/CommandPalette";
import Telemetry from "./components/system/Telemetry";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.role}`,
  description: "I design the systems that don't page you at 3 AM — event pipelines, cloud infrastructure, and platforms other engineers actually enjoy.",
  alternates: {
    canonical: SITE.url,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: "Built for failure. Designed for scale.",
    url: SITE.url,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: "Built for failure. Designed for scale.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Script to prevent hydration mismatch on modality
  const modalityScript = `
    (function() {
      document.body.setAttribute("data-cursor-modality", "mouse");
    })();
  `;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": SITE.name,
        "jobTitle": SITE.role,
        "url": SITE.url,
        "sameAs": SITE.socials.map(s => s.href)
      },
      {
        "@type": "WebSite",
        "name": `${SITE.name} Portfolio`,
        "url": SITE.url
      }
    ]
  };

  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-cyan selection:text-black">
        <script dangerouslySetInnerHTML={{ __html: modalityScript }} />
        
        {/* Accessibility Skip Link */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        
        {/* Subtle grain texture overlay */}
        <div className="grain-overlay" />

        {/* Global Systems */}
        <SmoothScroll />
        <CustomCursor />
        <CommandPalette />
        <Telemetry />

        {children}
      </body>
    </html>
  );
}