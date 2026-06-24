import type { Metadata, Viewport } from 'next';
import { Fraunces, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { AmbientBackground } from '@/components/ui/AmbientBackground';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

// Display: Fraunces — a contemporary serif with a sharp, optical "Soft/Wonky"
// axis that echoes the classical, wide-tracked SPECTRE wordmark.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '900'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Body/UI: Space Grotesk — a characterful geometric grotesk whose angular
// terminals mirror the prismatic logo while staying crisp at text sizes.
const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    'tech support',
    'web development',
    'digital marketing',
    'accounting services',
    'HR outsourcing',
    'SaaS support',
    'Spectre',
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#07306d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    telephone: site.phones[0],
    sameAs: site.socials.map((s) => s.href),
    areaServed: 'Global',
    serviceType: [
      'Tech Support',
      'Web Development',
      'Digital Marketing',
      'Accounting Services',
      'HR Outsourcing',
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${grotesk.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10000] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <CustomCursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
